const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('tagList') || '[]');
        return this.data;
    },
    create(name: string) {
        const names = this.data.map(tag=>tag.name);
        // if(this.data.indexOf(name)>=0){throw new Error('duplicated')}
        if (names.indexOf(name) >= 0) {
            return 'duplicated';
        }
        this.data.push({id:name,name:name});
        this.save();
        return 'success';
    },
    save() {
        window.localStorage.setItem('tagList', JSON.stringify(this.data));
    },

};
export default tagListModel;