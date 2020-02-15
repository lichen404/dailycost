<template>
    <div>


        <layout class-prefix="xxx">


            <number-panel :value.sync="record.amount" @submit="saveRecord"/>
            <types :value.sync="record.type"/>
            <notes :value.sync="record.notes"/>
            <tags :data-source.sync="tags"  :value.sync="record.tags"/>
            {{recordList}}

        </layout>
    </div>


</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from '@/components/Money/Tags.vue'
    import Types from "@/components/Money/Types.vue";
    import NumberPanel from "@/components/Money/NumberPanel.vue";
    import Notes from "@/components/Money/Notes.vue";
    import {Component, Watch} from "vue-property-decorator";
    // const version = window.localStorage.getItem('version')||0;
     const recordList:Record[] = JSON.parse(window.localStorage.getItem('recordList')||'[]');
    //
    //     if(version==='0.0.1'){
    //         //数据迁移
    //         recordList.forEach(record=>{
    //             record.createAt = new Date(0);
    //         });
    //         window.localStorage.setItem('recordList',JSON.stringify(recordList));
    //     }
    //
    // window.localStorage.setItem('version','0.0.2');
    type Record = {
        tags: string[]
        notes: string
        type: string
        amount: number // 数据类型
        createAt?:Date  // 类/构造函数
    }
    @Component({
        components: {
            Tags, Notes, Types, NumberPanel
        }
    })
    export default class Money extends Vue {
        tags = ['衣', '食', '住', '行'];
        record: Record = {
            tags: [], notes: '', type: '-', amount: 0
        };
        recordList:Record[]=recordList;
        saveRecord(){
            const record2:Record= JSON.parse(JSON.stringify(this.record));
            record2.createAt = new Date();
            this.recordList.push(record2);

        }
        @Watch('recordList')
        onRecordListChange(){
            window.localStorage.setItem('recordList',JSON.stringify(this.recordList))
        }



    }
</script>
<style lang="scss">
    .xxx-content {
        //xxx是前缀，传给layout
        display: flex;
        flex-direction: column-reverse;
    }

</style>

