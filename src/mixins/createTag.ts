import Vue from 'vue'
import Component from "vue-class-component";
import store from "@/store";
import {consumeTypeList} from "@/constant/tagTypeList";

@Component
export class TagHelper extends Vue {
    createTag(){
        const name = window.prompt('请输入标签名');
        if(!name){
            window.alert('标签名不能为空');

            return;
        }
        else{
            if(consumeTypeList.indexOf(name)>=0){
                //this.$emit('add',name) // 不要直接修改外部参数
                store.commit('createTag',{name,iconName:name,type:'consume'});

            }
            else {
                store.commit('createTag',{name,iconName:'一般',type:'consume'});
            }
            if (store.state.createTagError && store.state.createTagError.message === 'tag name duplicated') {
                window.alert('标签名重复了');
            }




        }
    }

}

export  default  TagHelper;