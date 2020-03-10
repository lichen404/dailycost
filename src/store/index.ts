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
        currentTag: undefined,
        createTagError: null,
        firstFetch:true
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
        fetchTags(state) {
            if(state.firstFetch){
                state.consumeTagList = JSON.parse(window.localStorage.getItem('consumeTagList') || '[]');
                if (!state.consumeTagList || state.consumeTagList.length === 0) {
                    for(let i=0;i<consumeTypeList.length;i++){
                        store.commit('createTag',{name:consumeTypeList[i],iconName:consumeTypeList[i]});
                    }


                }
            }

            state.firstFetch = false;
        },
        saveTags(state) {
            window.localStorage.setItem('consumeTagList', JSON.stringify(state.consumeTagList));
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
                store.commit('saveTags');
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
                    store.commit('saveTags');


                }
            }
        },
        createTag(state, payload:{name:string,iconName:string}) {
            const {name,iconName} = payload;
            state.createTagError = null;
            const names = state.consumeTagList.map(tag => tag.name);
            if (names.indexOf(name) >= 0) {
                state.createTagError = new Error('tag name duplicated');
                return;
            }

            const id = createId().toString();
            state.consumeTagList.push({id, name: name,iconName:iconName});
            store.commit('saveTags');

        },
        setCurrentTag(state, id: string) {
            state.currentTag = state.consumeTagList.filter(t => t.id === id)[0];

        }
    },

    actions: {},
    modules: {}
});
export default store;
