type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number // 数据类型
    createAt?: Date  // 类/构造函数
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' //success表示成功  duplicated表示name重复 可以指定返回的值，只能返回这两个字符串
    save: () => void
    update:(id:string,name:string)=>'success'|'not found'|'duplicated'
    delete:(id:string)=>boolean
}
type Tag = {
    id:string;
    name:string;
}