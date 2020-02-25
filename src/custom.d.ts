type RecordItem = {
    tags: Tag[]
    notes: string
    type: string
    amount: number // 数据类型
    createAt?: string  // 类/构造函数
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' //success表示成功  duplicated表示name重复 可以指定返回的值，只能返回这两个字符串
    save: () => void
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    delete: (id: string) => boolean
}
type Tag = {
    id: string;
    name: string;
}

type RootState = {
    recordList:RecordItem[],
    tagList:Tag[],
    currentTag?:Tag
}


//
// interface Window {
//     tagList: Tag[];
//     createTag: (name: string) => void;
//     removeTag: (id: string) => boolean;
//     findTag: (id: string) => Tag | undefined;
//     updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
//     recordList: RecordItem[];
//     createRecord: (record: RecordItem) => void
// }