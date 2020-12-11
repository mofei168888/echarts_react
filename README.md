### 基础（已完成）

-   tic-tac-toe(三连棋)游戏的所有功能
-   能够判定玩家何时获胜
-   能够记录游戏进程
-   允许玩家查看游戏的历史记录，也可以查看任意一个历史版本的游戏棋盘状态

### 扩展（已完成）

如果你还有充裕的时间，或者想练习一下刚刚学会的 React 新技能，这里有一些可以改进游戏的想法供你参考，这些功能的实现顺序的难度是递增的：

-   在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)
-   在历史记录列表中加粗显示当前选择的项目
-   使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode） `不用两个循环，一个就能搞定`
-   添加一个可以升序或降序显示历史记录的按钮
-   每当有人获胜时，高亮显示连成一线的 3 颗棋子
-   当无人获胜时，显示一个平局的消息

### 完成所有功能

-   js 代码行数 224 （80% = 179）
-   代码精简后行数 184

### 关键词

-   JSX：`JS的扩展，在JS语法中使用HTML标签`
-   组件：`分为函数组件、class 组件，复杂的组件或可复用的组件要进行提取。命名必须为大写驼峰，小写将被识别为HTML元素`
-   props：`不能够直接修改父组件传入的props值。必须遵守单向数据流`
-   state：`不能够直接更改state的值，必须使用this.setState(),否则无法进行render更新`
-   生命周期：`componentDidMount（挂载），componentWillUnmount（取消挂载）。生命周期顺序：constructor -> render -> componentDidMount`
-   属性传参：`字符串使用双引号""，变量使用花括号{}`
-   this 指向：`onClick事件使用箭头函数执行函数，否则函数内的this为undefined`
-   条件渲染：`利用&&与运算符或者三目运算符可以简写if语句, class组件render中返回null，不渲染组件`
-   组合：`即Vue中的slot插槽，使用props.children可以展示组件标签的内容。如果要使用多个slot，则使用props自定义命名传入组件`
-   模块异步加载：`使用React.lazy进行模块异步加载`
-   Context：`上下文，即Vue中的inject、provide`
-   错误边界：`错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误`
-   refs 转发：`获取dom节点`
-   Fragments 分组：`(组件内不在固定只有一个根节点)`
-   高阶组件：`高阶组件是参数为组件，返回值为新组件的函数`
-   展开运算符：`可利用...other接受剩余的props参数`
-   渲染提速：`生命周期方法shouldComponentUpdate 该方法会在重新渲染前被触发。其默认实现总是返回 true，让 React 执行更新`
