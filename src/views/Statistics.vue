<template>
    <layout>
        <TopNav>本月支出统计</TopNav>
        <div >
            <div class="title">每日支出</div>
            <v-chart    class="v-chart"  :options="bar" ></v-chart>

        </div>
        <div>
            <div class="title">支出类型占比</div>
            <v-chart  class="v-chart"  :options="pie" ></v-chart>
        </div>
    </layout>
</template>

<script lang="js">
    import ECharts from 'vue-echarts';
    import dayjs from "dayjs";
    import 'echarts/lib/chart/pie'
    import 'echarts/lib/chart/bar'
    import clone from "@/lib/clone";
    import TopNav from "@/components/TopNav";
    export default {
        components:{
            TopNav,
            'v-chart':ECharts
        },
        beforeCreate() {
            this.$store.commit('fetchRecords');
        },
        beforeMount() {
            if(this.$store.state.recordList.length===0){
                window.alert('还没有内容，先去记一笔账吧');
                this.$router.push("/money")
            }

        },
        data(){
            return{

                bar: {
                    grid: {
                        x: 15,
                        y: 40,
                        x2: 20,
                        y2: 30,
                        borderWidth: 1
                    },

                    xAxis: {

                        type: 'category',
                        data: this.days('day'),
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#F5F4F9'],
                            }
                        },

                        axisLine: {//坐标线

                            lineStyle: {
                                type: 'solid',
                                color: '#F5F4F9',//轴线的颜色
                                width: '1',//坐标线的宽度
                            }
                        },
                        axisTick: {//刻度

                            show: false//不显示刻度线
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#000',//坐标值的具体的颜色
                                fontSize: 8,
                            }
                        },

                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {//线
                            show: false
                        },
                        axisTick: {//刻度
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                    },
                    series: [
                        {
                            type: "bar",
                            data: this.days('amounts','-'),


                            itemStyle: {
                                normal: {
                                    barBorderRadius: [20, 10, 0, 0],
                                    color: '#FD6B71',//设置柱子颜色
                                    label: {
                                        show: true,//柱子上显示值
                                        position: 'top',//值在柱子上方显示
                                        textStyle: {
                                            color: '#FD6B71',//值得颜色

                                        }
                                    }
                                }
                            },
                            barWidth: 5//设置柱子宽度，单位为px
                        }
                    ],
                },

                pie: {

                    series: [
                        {

                            type: 'pie',//图形类型，如饼状图，柱状图等
                            radius: ['35%', '65%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
                            //roseType:'area',是否显示成南丁格尔图，默认false
                            itemStyle: {
                                normal:{
                                    label:{
                                        show:true,
                                        textStyle:{color:'#3c4858',fontSize:"12"},
                                        formatter:function(val){   //让series 中的文字进行换行
                                            return val.name.split("-").join("\n");}
                                    },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
                                    labelLine:{
                                        show:true,
                                        lineStyle:{color:'#3c4858'}
                                    }//线条颜色
                                },//基本样式
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)',//鼠标放在区域边框颜色
                                    textColor:'#000'
                                }//鼠标放在各个区域的样式
                            },
                            data:
                                this.pieData('-')
                            ,//数据，数据中其他属性，查阅文档
                            color: ['#C0504D','#F79646','#772C2A','#B65708','#CD7371','#F9AB6B','#9F3B38','#F3740B','#D99694','#8064A2'],//各个区域颜色
                        },//数组中一个{}元素，一个图，以此可以做出环形图
                    ],//系列列表
                },

            }
        },
        methods:{
            pieData(type){
                const amount=this.billDetail('amount',type);


                const typeList=[];
                const result =[];
                const recordList = this.$store.state.recordList;
                const newList=clone(recordList).filter(r=>r.type===type);
                for(let i=0;i<newList.length;i++) {
                    let current = newList.filter(item=>item.tags[0].name===newList[i].tags[0].name);
                    if(!typeList.find((i)=>JSON.stringify(i)===JSON.stringify(current))){
                        typeList.push(newList.filter(item=>item.tags[0].name===newList[i].tags[0].name))
                    }

                }

                for(let val of typeList){

                    let num = (val.reduce((x,y)=>x+y.amount,0)/amount*100).toFixed(2);
                    let strNum = num.toString() + '%';
                    result.push({name:val[0].tags[0].name+'-'+ strNum,value:num});
                }


                return result;
            },
            billDetail(name,type){
                let amount=0;
                let count =0;
                const now = dayjs();
                const recordList = this.$store.state.recordList;
                const newList=clone(recordList).filter(r=>r.type===type);
                for(let i=0;i<newList.length;i++){
                    if(now.isSame(dayjs(newList[i].createAt),'month')){
                        amount+=newList[i].amount;
                        count+=1;
                    }
                }
                if (name==='amount'){  return amount;}
                if(name==='count'){    return count;}
            },
            getDays() {
                const [year, month] = [dayjs().year(), dayjs().month()];
                const d = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
                    if (month === 1) {
                        return 29;
                    } else {
                        return d[month];
                    }
                } else {
                    return d[month];
                }
            },
            days(name,type){
                const day=[];
                const days=this.getDays();
                const amounts=[];
                let amount=null;
                for(let i=1;i<=days;i++){
                    const date =dayjs().date(i);
                    for (let j=0;j<this.$store.state.recordList.length;j++){
                        if(dayjs(this.$store.state.recordList[j].createAt).isSame(date,'day')){
                            if(this.$store.state.recordList[j].type===type){amount+=this.$store.state.recordList[j].amount;}

                        }
                    }
                    day.push(i);
                    amounts.push(amount);
                    amount=null;
                }

                if(name==='day'){
                    return day;}
                if(name==='amounts'){ return amounts;}
            },
        }


    }
</script>

<style lang="scss" scoped>
    .v-chart{
        background: #FFFFFF;
        width: 100%;
        height: 250px;
        margin-top: 10px;


    }
    .title{
        margin-top: 10px;
        text-align: center;
    }
</style>