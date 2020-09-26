
import createId from "@/lib/idCreator";

const tagStore = {

    tagList: [] as Tag[],
    fetchTags(){
        this.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        return this.tagList;
        },
    createTag(name: string) {
        const names = this.tagList.map(tag => tag.name);
        if (names.indexOf(name) >= 0) {
            window.alert('标签名重复了');
            return 'duplicated';
        }
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        const id = createId().toString();
        // this.tagList.push({id, name: name,iconName:name});
        this.saveTags();
        window.alert('添加成功');
        return 'success'
    },
    saveTags() {
        window.localStorage.setItem('tagList', JSON.stringify(this.tagList));
    },
    removeTag(id: string) {

        let index = -1;
        for (let i = 0; i < this.tagList.length; i++) {
            if (this.tagList[i].id === id) {
                index = i;
                break;
            }
        }

        this.tagList.splice(index, 1);
        this.saveTags();


    },
    updateTag(id: string, name: string) {
        const idList = this.tagList.map(item => item.id);
        if (idList.indexOf(id) >= 0) {
            const names = this.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.tagList.filter(item => item.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success'
            }
        } else {
            return 'not found';
        }

    },
    findTag(id: string) {
        return this.tagList.filter(t => t.id === id)[0];

    }
};
tagStore.fetchTags();
export  default  tagStore;