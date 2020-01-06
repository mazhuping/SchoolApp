import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    middlewareUtils,
    createConnectHOC,
    middlewarePromise,
    connect as _connect,
    getActionsAndReducers,
    middlewareAsyncActionCallback,
    middlewareSyncReducerToLocalStorage,
} from '@/library/redux';
import middlewareLocal from '@/i18n/redux-middleware';
import * as models from './all-models';

console.log(`models:${JSON.stringify(models)}`)

const {actions, reducers} = getActionsAndReducers({models});

console.log(`model/actions:${JSON.stringify(actions)}`)
console.log(`model/reducers:${JSON.stringify(reducers)}`)


const middleware = [
    middlewareLocal,
    thunkMiddleware,
    middlewarePromise,
    middlewareAsyncActionCallback,
    middlewareUtils,
    middlewareSyncReducerToLocalStorage,
];

export function configureStore(initialState) {
    return applyMiddleware(...middleware)(createStore)(combineReducers(reducers), initialState);
}

// 与redux进行连接 函数
export const connectComponent = _connect({actions, options: {ref: true}});

// 与redux进行连接 装饰器
export const connect = createConnectHOC(connectComponent);


