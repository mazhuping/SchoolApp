import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import * as storage from '@/library/utils/storage'; //localStorage(本地缓存数据) 和 sessionStorage(页面会话数据) 封装
import * as sxRedux from '@/library/redux';
import App from './App';
import handleSuccess from './commons/handle-success';
import handleError from './commons/handle-error';
import {configureStore} from './models';
import * as serviceWorker from './serviceWorker';
import {getLoginUser} from "./commons";
import './index.css';

//mock 模拟后端数据，当你访问某些链接是给予你res
// dev 模式开启mock
if (process.env.NODE_ENV === 'development') {
    require('./mock/index');
    // console.log('current mode is development, mock is enabled');
}
// alert("我就是想测试一下，是否每个url都会调用到index.js") //只要是浏览器访问，都会

const currentUser = getLoginUser() || {};

// console.log("currentUser:"+JSON.stringify(currentUser));

// 存储初始化 区分不同用户存储的数据，localstorge and sessionStorge
storage.init({
    keyPrefix: currentUser.id,
});


sxRedux.init({storage, handleError, handleSuccess});

// console.log(`sxRedux:${JSON.stringify(sxRedux)}`);

//这时候已经调用了 src/model/ 下面的所有文件了，可能已经将对应的数据或者action缓存进connect store中了
// models store
const store = configureStore();

// console.log(`store:${JSON.stringify(store)}`);

//将App包裹在privider中的目的是为了让app组件中的其他组件都可以使用store对象
ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
