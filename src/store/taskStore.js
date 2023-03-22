import { makeAutoObservable } from 'mobx'

class TaskStore {
  list = [
    {
      id: 1,
      name: "学习react",
      isDone: true,
    },
    {
      id: 2,
      name: "搞定mobx",
      isDone: false,
    },
  ];
  constructor() {
    makeAutoObservable(this);
  }

  // 单选操作
  singleCheck = (id, isDone) => {
    const item = this.list.find(item => item.id === id)
    item.isDone = isDone
  }

  // 全选操作
  allCheck = (checked) => {
    this.list.map(item => item.isDone = checked)
  }

  // 计算属性：所有子项都选中时，全选为选中状态
  get isAll () {
    return this.list.every(item => item.isDone)
  }

  // 计算已完成的数量
  get isDoneNum () {
    return this.list.filter(item => item.isDone === true).length
  }

  // 删除操作
  deleteTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }

  // 新增操作
  addTask = (task) => {
    this.list.push(task)
  }

}
export default TaskStore