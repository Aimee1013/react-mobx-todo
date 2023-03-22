import React from "react";
import TaskStore from "./taskStore";

class RootStore {
  constructor() {
    this.taskStore = new TaskStore();
  }
}

// 实例化根 store 并注入 context
const rootStore = new RootStore();
const StoresContext = React.createContext(rootStore);
// 导出方法，供组件调用方法使用 store 根实例
export const useStore = () => React.useContext(StoresContext);