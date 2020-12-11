import ReactDOM from 'react-dom';

// import Monut from './mount/index.js'; // 生命周期
// import EventThis from './event-this/index.js'; // 事件处理this指向
// import Slot from './slot/index.js'; // 组合（即vue中的slot插槽）
// import Router from './router/index.js'; // 模块异步加载
// import Context from './context/index.js'; // 上下文（即Vue中的inject、provide）
// import ErrorBoundary from './error-boundary/index.js'; // 错误边界
// import Refs from './refs/index.js'; // Refs转发
// import Fragments from './fragments/index.js'; // Fragments 分组(组件内不在固定只有一个根节点)
// import Hoc from './hoc/index.js'; // 高阶组件
// import ThreeOperator from './three-operator/index.js'; // 展开运算符
import ShouldComponentUpdate from './should-component-update/index.js'; // 渲染提速
// import Portals from './portals/index.js'; // Portals 跳出父级容器

// ========================================

ReactDOM.render(ShouldComponentUpdate, document.getElementById('root'));
