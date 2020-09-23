import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/idCreator";
import router from "@/router";
import {consumeTypeList, incomeTypeList} from "@/constant/tagTypeList"

Vue.use(Vuex);

const store = new Vuex.Store({
        state: {
            recordList: [],
            createRecordError: null,
            consumeTagList: [],
            incomeTagList: [],
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
            fetchTags(state) {


                state.consumeTagList = JSON.parse(window.localStorage.getItem('consumeTagList') || '[]');
                if (!state.consumeTagList || state.consumeTagList.length === 0) {
                    for (let i = 0; i < consumeTypeList.length; i++) {
                        store.commit('createTag', {
                            name: consumeTypeList[i],
                            iconName: consumeTypeList[i],
                            type: 'consume'
                        });
                    }
                }

                state.incomeTagList = JSON.parse(window.localStorage.getItem('incomeTagList') || '[]');
                if (!state.incomeTagList || state.incomeTagList.length === 0) {
                    for (let i = 0; i < incomeTypeList.length; i++) {
                        store.commit('createTag', {name: incomeTypeList[i], iconName: incomeTypeList[i], type: 'income'});
                    }
                }
            }

            ,
            saveTags(state, type) {
                if (type === 'consume') {
                    window.localStorage.setItem('consumeTagList', JSON.stringify(state.consumeTagList));
                } else {
                    window.localStorage.setItem('incomeTagList', JSON.stringify(state.incomeTagList));
                }

            },
            removeTag(state, payload: { id: string, type: string }) {
                const {id, type} = payload
                let index = -1;
                if (type === 'consume') {
                    for (let i = 0; i < state.consumeTagList.length; i++) {
                        if (state.consumeTagList[i].id === id) {
                            index = i;
                            break;
                        }
                    }
                } else {
                    for (let i = 0; i < state.incomeTagList.length; i++) {
                        if (state.incomeTagList[i].id === id) {
                            index = i;
                            break;
                        }
                    }
                }

                if (index >= 0) {
                    if (type === 'consume') {
                        state.consumeTagList.splice(index, 1);
                        store.commit('saveTags', 'consume');
                    } else {
                        state.incomeTagList.splice(index, 1);
                        store.commit('saveTags', 'income');
                    }

                    router.back();
                } else {
                    window.alert('删除失败');
                }


            },
            // findTag(state, id) {
            //     return state.tagList.filter(t => t.id === id)[0];
            //
            // },
            updateTag(state, payload: { id: string, name: string, iconName: string, type: string }) {
                const {id, name, iconName, type} = payload;
                let idList, names, tag
                if (type === 'consume') {
                    idList = state.consumeTagList.map((item: Tag) => item.id);
                    names = state.consumeTagList.map((item: Tag) => item.name)
                    tag = state.consumeTagList.filter((item: Tag) => item.id === id)[0];
                } else {
                    idList = state.incomeTagList.map((item: Tag) => item.id)
                    names = state.incomeTagList.map((item: Tag) => item.name)
                    tag = state.incomeTagList.filter((item: Tag) => item.id === id)[0];
                }

                if (idList.indexOf(id) >= 0) {

                    if (names.indexOf(name) >= 0) {
                        window.alert('标签名重复');
                    } else {

                        tag.name = name;
                        tag.iconName = iconName;
                        store.commit('saveTags', 'consume');


                    }
                }
            },
            createTag(state, payload: { name: string, iconName: string, type: 'income' | 'consume' }) {
                const {name, iconName, type} = payload;
                state.createTagError = null;
                const names = state.consumeTagList.map(tag => tag.name);
                if (names.indexOf(name) >= 0) {
                    state.createTagError = new Error('tag name duplicated');
                    return;
                }

                const id = createId().toString();
                if (type === 'consume') {
                    state.consumeTagList.push({id, name: name, iconName: iconName, type});
                } else {
                    state.incomeTagList.push({id, name: name, iconName: iconName, type});
                }

                store.commit('saveTags', type);

            },
            setCurrentTag(state, id: string) {
                state.currentTag = state.consumeTagList.filter(t => t.id === id)[0] || state.incomeTagList.filter(t => t.id === id)[0];

            }
        },

        actions: {},
        modules: {}
    })
;
export default store;
