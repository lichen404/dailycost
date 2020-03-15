import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/idCreator";
import router from "@/router";
import {consumeTypeList,incomeTypeList} from "@/constant/tagTypeList"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        createRecordError: null,
        consumeTagList: [],
        incomeTagList:[],
        currentTag: undefined,
        createTagError: null,

    } as RootState,
    mutations: {
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createAt = new Date().toISOString();
            state.recordList.push(record2);
            store.commit('saveRecords');

        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        fetchTags(state,type) {
            if (type === 'consume') {

                state.consumeTagList = JSON.parse(window.localStorage.getItem('consumeTagList') || '[]');
                if (!state.consumeTagList || state.consumeTagList.length === 0) {
                    for (let i = 0; i < consumeTypeList.length; i++) {
                        store.commit('createTag', {name: consumeTypeList[i], iconName: consumeTypeList[i],type});
                    }


                }
            } else {

                    state.incomeTagList = JSON.parse(window.localStorage.getItem('incomeTagList') || '[]');
                    if (!state.incomeTagList || state.incomeTagList.length === 0) {
                        for (let i = 0; i < incomeTypeList.length; i++) {
                            store.commit('createTag', {name: incomeTypeList[i], iconName: incomeTypeList[i],type});
                        }
                    }



            }

        },
        saveTags(state,type) {
            if(type==='consume'){
                window.localStorage.setItem('consumeTagList', JSON.stringify(state.consumeTagList));
            }else{
                window.localStorage.setItem('incomeTagList',JSON.stringify(state.incomeTagList));
            }

        },
        removeTag(state, id) {

            let index = -1;
            for (let i = 0; i < state.consumeTagList.length; i++) {
                if (state.consumeTagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.consumeTagList.splice(index, 1);
                store.commit('saveTags','consume');
                router.back();
            } else {
                window.alert('删除失败');
            }


        },
        // findTag(state, id) {
        //     return state.tagList.filter(t => t.id === id)[0];
        //
        // },
        updateTag(state, payload: { id: string, name: string,iconName:string }) {
            const {id, name,iconName} = payload;
            const idList = state.consumeTagList.map((item: Tag) => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.consumeTagList.map((item: Tag) => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复');
                } else {
                    const tag = state.consumeTagList.filter((item: Tag) => item.id === id)[0];
                    tag.name = name;
                    tag.iconName =iconName;
                    console.log(tag);
                    console.log(state.consumeTagList);
                    store.commit('saveTags','consume');


                }
            }
        },
        createTag(state, payload:{name:string,iconName:string,type:string}) {
            const {name,iconName,type} = payload;
            state.createTagError = null;
            const names = state.consumeTagList.map(tag => tag.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError = new Error('tag name duplicated');
                return;
            }

            const id = createId().toString();
            if(type==='consume'){
                state.consumeTagList.push({id, name: name,iconName:iconName});
            }
            else{
                state.incomeTagList.push({id, name: name,iconName:iconName});
            }

            store.commit('saveTags',type);

        },
        setCurrentTag(state, id: string) {
            state.currentTag = state.consumeTagList.filter(t => t.id === id)[0];

        }
    },

    actions: {},
    modules: {}
});
export default store;
