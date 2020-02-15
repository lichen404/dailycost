<template>
    <div>


        <layout class-prefix="xxx">


            <number-panel/>
            <types/>
            <notes/>
            <tags :data-source.sync="tags"/>


        </layout>
    </div>


</template>

<script lang="ts">
    import Tags from '@/components/Money/Tags.vue'
    import Types from "@/components/Money/Types.vue";
    import NumberPanel from "@/components/Money/NumberPanel.vue";
    import Notes from "@/components/Money/Notes.vue";

    export default {
        name: 'Money',
        components: {Tags, Notes, NumberPanel, Types},
        data(){
            return{
                tags:['衣','食']
            }
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

