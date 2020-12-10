import ReactDOM from 'react-dom';

// import Monut from './mount/index.js'; // 生命周期
// import EventThis from './event-this/index.js'; // 事件处理this指向
// import Slot from './slot/index.js'; // 组合（即vue中的slot插槽）
import Router from './router/index.js'; // 模块异步加载

// ========================================

ReactDOM.render(Router, document.getElementById('root'));
