<template>
    <div>
        <layout>
            <!--            <Types :value.sync="value" class-prefix="xxx"/>-->
            <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>

            <!--            <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>-->
            <ol>
                <li v-for="(group,index) in result" :key="index">
                    <h3 class="title">{{beautify(group.title)}}<span>￥{{group.total}}</span></h3>
                    <ol>
                        <li v-for="item in group.items" :key="item.id" class="record">
                            <span>{{tagString(item.tags)}}</span>
                            <span class="note">{{item.notes}}</span>
                            <span>￥{{item.amount}} </span>
                        </li>
                    </ol>
                </li>
            </ol>
            <div class="tips" v-if="result.length===0">
                <Icon name="not-found"/>
                <span class="word">您还没有添加相关记录</span></div>
        </layout>

    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    import Tabs from "@/components/Tabs.vue";
    import intervalList from "@/constant/intervalList";
    import recordTypeList from "@/constant/recordTypeList";
    import store from "@/store";
    import dayjs from "dayjs";

    const api = dayjs();
    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        interval = 'day';
        type = '-';
        intervalList = intervalList;
        recordTypeList = recordTypeList;

        beforeCreate() {
            store.commit('fetchRecords');

        }


        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(tag => tag.name).join(',');
        }

        beautify(string: string) {
            const now = dayjs();
            const api = dayjs(string);
            if (api.isSame(now, 'day')) {
                return '今天';

            } else if (api.isSame(now.subtract(1, 'day'), 'day')) {
                return '昨天';
            } else {
                if (api.isSame(now, 'year')) {
                    return now.format('M月D日');
                }
                return now.format('YYYY年M月D日');
            }


        }

        get recordList() {
            return store.state.recordList;
        }

        get result() {
            type HashTableValue = { title: string,total?:number, items: RecordItem[] };
            const {recordList} = this;
            const recordListWithType = recordList.filter(r => r.type === this.type).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
            if (recordListWithType.length === 0) {
                return [];
            }
            const groupedList: HashTableValue[] = [{
                title: dayjs(recordListWithType[0].createAt).format('YYYY-MM-DD'),
                items: [recordListWithType[0]]
            }];
            for (let i = 1; i < recordListWithType.length; i++) {
                const current = recordListWithType[i];
                const last = groupedList[groupedList.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
                    last.items.push(current);
                } else {
                    groupedList.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
                }
            }
            groupedList.forEach(group=>{
                group.total = group.items.reduce((sum,item)=>sum + item.amount,0);
            });
            return groupedList;
        }


    }
</script>

<style lang="scss" scoped>
    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    .title {
        @extend %item;
    }

    .record {
        background-color: white;
        @extend %item;
    }

    .tips {
        margin-top: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        >.icon{
            height: 64px;
            width: 64px;
        }
        >.word{
            padding-top: 15px;
        }

    }

    .note {
        margin-right: auto;
        margin-left: 16px;
        color: #999;

    }

    ::v-deep {
        .type-tabs-item {
            background-color: #c4c4c4;

            &.selected {
                background-color: white;

                &::after {
                    display: none;
                }
            }

        }

        .interval-tabs-item {
            height: 48px;
        }
    }

</style>