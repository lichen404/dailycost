<template>
    <div>
        <layout>
            <!--            <Types :value.sync="value" class-prefix="xxx"/>-->
            <Tabs :data-source="recordTypeList" :value.sync="type" class-prefix="type"/>

            <Tabs :data-source="intervalList" :value.sync="interval" class-prefix="interval"/>
        </layout>

    </div>
</template>

<script>

    import Vue from 'vue';
    import {Component} from 'vue-property-decorator'
    import Tabs from "@/components/Tabs";
    import intervalList from "@/constant/intervalList";
    import recordTypeList from "@/constant/recordTypeList";

    @Component({
        components: {Tabs}
    })
    export default class Statistics extends Vue {
        value = '-';
        interval = 'day';
        type = '-';
        intervalList = intervalList;
        recordTypeList = recordTypeList;
    }
</script>

<style lang="scss" scoped>
    ::v-deep .type-tabs-item {
        background-color: white;

        &.selected {
            background-color: #c4c4c4;

            &::after {
                display: none;
            }
        }
    }
</style>