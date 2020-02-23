import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import createId from "@/lib/idCreator";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [] as RecordItem[],
        tagList: [] as Tag[]
    },
    mutations: {
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];

        },
        createRecord(state, record) {
            const record2: RecordItem = clone(record);
            record2.createAt = new Date();
            state.recordList.push(record2);
            store.commit('saveRecords');

        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },
        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
        removeTag(state, id) {

            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }

            state.tagList.splice(index, 1);
            store.commit('saveTags');


        },
        findTag(state, id) {
            return state.tagList.filter(t => t.id === id)[0];

        },
        updateTag(state, id, name) {
            const idList = state.tagList.map((item: Tag) => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map((item: Tag) => item.name);
                if (names.indexOf(name) >= 0) {
                    return 'duplicated';
                } else {
                    const tag = state.tagList.filter((item: Tag) => item.id === id)[0];
                    tag.name = name;
                    state.saveTags();
                    return 'success'
                }
            } else {
                return 'not found';
            }
        },
        createTag(state, name) {
            const names = state.tagList.map(tag => tag.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
                return 'duplicated';
            }
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            window.alert('添加成功');
            return 'success'
        },

    },

    actions: {},
    modules: {}
});
export default store;
