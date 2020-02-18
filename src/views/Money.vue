<template>
    <div>


        <layout class-prefix="xxx">


            <number-panel :value.sync="record.amount" @submit="saveRecord"/>
            <types :value.sync="record.type"/>
            <div class="notes">
                <form-item field-name="备注" placeholder="在这里输入内容" @update:value="onUpdateNotes"/>
            </div>

            <tags :data-source.sync="tags" :value.sync="record.tags"/>
            {{recordList}}

        </layout>
    </div>


</template>

<script lang="ts">
    import Vue from 'vue';
    import Tags from '@/components/Money/Tags.vue'
    import Types from "@/components/Money/Types.vue";
    import NumberPanel from "@/components/Money/NumberPanel.vue";
    import FormItem from "@/components/Money/FormItem.vue";
    import {Component, Watch} from "vue-property-decorator";
    import recordListModel from '@/models/recordListModel';
    import tagListModel from '@/models/tagListModel';

    // const version = window.localStorage.getItem('version')||0;
    const recordList = recordListModel.fetch();
    tagListModel.fetch();
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

    @Component({
        components: {
            FormItem,
            Tags, Types, NumberPanel
        }
    })
    export default class Money extends Vue {
        tags = tagListModel.data;

        record: RecordItem = {
            tags: [], notes: '', type: '-', amount: 0
        };
        recordList: RecordItem[] = recordList;

        saveRecord() {
          recordListModel.create(this.record);

        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        @Watch('recordList')
        onRecordListChange() {
            recordListModel.save()
        }


    }
</script>
<style lang="scss">
    .xxx-content {
        //xxx是前缀，传给layout
        display: flex;
        flex-direction: column-reverse;
    }
    .notes{
        padding: 12px 0;
    }

</style>

