
import "./index.scss";
import { observer } from "mobx-react-lite";
import { useStore } from "../store/useStore";
import { useState } from "react";
import { v4 as uuid } from 'uuid'

function Task () {

  // 使用封装好的useStore
  const { taskStore } = useStore()

  // 单选受控
  // 思想：使用mobx Store去维护状态，input只需要把e.target.value交给store来进行修改

  // 切换选中状态事件函数
  const changeCheck = (id, e) => {
    console.log(e.target)
    taskStore.singleCheck(id, e.target.checked)
  }

  // 切换全选/全不选状态事件函数
  const changeAllCheck = (e) => {
    console.log(e.target.checked)
    taskStore.allCheck(e.target.checked)
  }

  // 删除任务事件函数
  const delTask = (id) => {
    taskStore.deleteTask(id)
  }

  // 新增任务事件函数（回车事件--onKeyUp）
  const [taskValue, setTaskValue] = useState('')
  const addTask = (e) => {
    console.log('100', e)
    if (e.code === 'Enter') {
      taskStore.addTask({
        id: uuid(),
        name: taskValue,
        isDone: false
      })
      setTaskValue('')
    }
  }






  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        {/* 新增输入框 */}
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={taskValue}
          onChange={(e) => { setTaskValue(e.target.value) }}
          onKeyUp={(e) => { addTask(e) }}
        />
      </header>
      <section className="main">
        {/* 全选 */}
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={(e) => { changeAllCheck(e) }}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/* completed类名标识 */}
          {taskStore.list.map(item => (
            <li key={item.id} className={item.isDone ? 'todo completed' : 'todo'}>
              <div className="view">
                {/* 单选框--受控和非受控（使用受控的方式） */}
                <input
                  className="toggle"
                  type="checkbox"
                  checked={item.isDone}
                  onChange={(e) => changeCheck(item.id, e)}
                ></input>
                <label>{item.name}</label>
                <button className="destory" onClick={() => { delTask(item.id) }}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          {/* 也可以直接在组件中计算已完成数量：{taskStore.list.filter(item => item.isDone === true).length} */}
          任务总数：{taskStore.list.length} 已完成：{taskStore.isDoneNum}
        </span>
      </footer>
    </section>
  );
}

export default observer(Task);