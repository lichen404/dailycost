<template>
    <layout>
       <TopNav>账单详情</TopNav>

        <div class="container">
            <div class="tag">
                <Icon :name="currentRecord.tags[0].iconName"></Icon>
                <div class="tagName">{{currentRecord.tags[0].name}}</div>
            </div>

            <div class="amount">{{currentRecord.type}}{{currentRecord.amount}}</div>
            <div class="details">
                <div class="notes">
                    <span>备注：</span>
                    <span>{{currentRecord.notes||'空'}}</span>
                </div>
                <div class="createTime">
                    <span>创建时间：</span>
                    {{beautify(currentRecord.createAt)}}
                </div>
            </div>
        </div>

    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import FormItem from "@/components/Money/FormItem.vue";
    import Button from "@/components/Money/Button.vue";
    import store from "@/store/index";
    import TopNav from "@/components/TopNav.vue";
    import dayjs from "dayjs";

    @Component({
        components: {TopNav, Button, FormItem}
    })
    export default class Record extends Vue {
        type = '-';

        get recordList() {
            return this.$store.state. recordList.filter((r:RecordItem) => r.type === this.type).sort((a,b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
        }

        currentRecord?: RecordItem;

        created() {
            store.commit('fetchRecords');
            const index = this.$route.query.index.toString();
            this.type = this.$route.query.type.toString();

            if (!this.recordList[index]) {
                this.$router.replace('/404');
            }
            this.currentRecord = this.recordList[index]

    }

        beautify(string: string) {

            const api = dayjs(string);
            return api.format('YYYY-MM-DD HH:MM');
        }
    }





</script>

<style lang="scss" scoped>
    .container{
        display: flex;
        flex-direction: column;

        >.tag{
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .icon {

                height: 64px;
                width: 64px;
                border-radius: 50%;
                border: 5px solid #fff;
                margin-bottom: 5px;
                background-color: #fff;
            }
        }
        .amount{
            font-size: 30px;
            text-align: center;
        }
        .details{
            padding:20px;


            .notes{

                display: flex;
                justify-content: space-between;
            }
            .createTime{
                margin-top: 4px;

                display: flex;
                justify-content: space-between;
            }

        }
    }




</style>