import clone from "@/lib/clone";

const recordListModel = {
    data:[] as RecordItem[],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        return this.data;
        },
    save() {
        window.localStorage.setItem('recordList', JSON.stringify(this.data));
    },

    create(record: RecordItem){
        const record2:RecordItem = clone(record);
        record2.createAt = new Date();
        this.data.push(record2);
        this.save();
    }
};
export default recordListModel;