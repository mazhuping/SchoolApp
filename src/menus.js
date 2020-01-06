import antdMenus from './menus-ant-design-example';
import {getLoginUser} from '@/commons';
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
    // TODO 根据userId获取菜单数据 或在此文件中前端硬编码菜单
    const currentUser = getLoginUser() || {};
    // const currentUser = getLoginUser() || {};
    // return Promise.resolve(currentUser.menu || [])
    if(!currentUser.token){
        return Promise.resolve([])
    }

    return fetch(`/api/getElements?type=${encodeURIComponent(1)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.token}`

        },
    })
        .then(res => res.json())


    //
    // const data=[
    // {key:'KafkaAmazon',local:'kafkaAmazon',text:'KafkaAmazon',icon:'book',path:'/kafkahandle',order:100},
    //     {key: 'sysManage', local: 'sysManage', text: 'SystemManage', icon: 'ant-design', order: 1000},
    //     {key: 'menus', parentKey: 'sysManage', local: 'menus', text: 'Element List', icon: 'lock', path: '/element', order: 1000},
    //     {key: 'role',  parentKey: 'sysManage',local: 'roles', text: 'RoleList ', icon: 'team', path: '/roles', order: 800},
    //     {key: 'apiFunction',  parentKey: 'sysManage',local: 'API List', text: 'API List', icon: 'user', path: '/function', order: 600},
    //     {key: 'user',  parentKey: 'sysManage',local: 'users', text: 'UserList', icon: 'user', path: '/users', order: 900}
    // ];
    //
    // return Promise.resolve(data);
    // return Promise.resolve([
    //     {key: '1', text: 'level-1', icon: 'align-left'},
    //     {key: '1-1', parentKey: '1', text: 'level-1-1', icon: 'align-left'},
    //     {key: '1-2', parentKey: '1', text: 'level-1-2', icon: 'align-left'},
    //     {key: '1-3', parentKey: '1', text: 'level-1-3', icon: 'align-left'},
    //     {key: '1-4', parentKey: '1', text: 'level-1-4', icon: 'align-left'},
    //     {key: '1-4-1', parentKey: '1-4', text: 'level-1-4-1', icon: 'align-left'},
    //     {key: '1-4-2', parentKey: '1-4', text: 'level-1-4-2', icon: 'align-left'},
    //     {key: '1-4-3', parentKey: '1-4', text: 'level-1-4-3', icon: 'align-left'},
    //     {key: '1-4-4', parentKey: '1-4', text: 'level-1-4-4', icon: 'align-left'},
    //     {key: '1-4-3-1', parentKey: '1-4-3', text: 'level-1-4-3-1', icon: 'align-left'},
    //     {key: '1-4-3-2', parentKey: '1-4-3', text: 'level-1-4-3-2', icon: 'align-left'},
    //     {key: '1-4-3-3', parentKey: '1-4-3', text: 'level-1-4-3-3', icon: 'align-left'},
    //     {key: '1-4-3-4', parentKey: '1-4-3', text: 'level-1-4-3-4', icon: 'align-left'},
    //
    //
    //     {key: 'antDesign222', local: 'antDesign', text: 'Ant Design 官网22', icon: 'ant-design', url: 'https://ant-design.gitee.io', order: 2000},
    //     {key: 'google', local: 'google', text: '谷歌', icon: 'google', url: 'https://www.google.com', target: '_blank', order: 1200},
    //     {key: 'document', local: 'document', text: '文档', icon: 'book', url: 'https://open.vbill.cn/react-admin', target: '_blank', order: 1200},
    //
    //     {key: 'menus', local: 'menus', text: '菜单编辑', icon: 'lock', path: '/menu-permission', order: 1000},
    //     {key: 'codeGenerator', local: 'codeGenerator', text: '代码生成', icon: 'code', path: '/admin-crud', order: 999},
    //     {key: 'ajax', local: 'ajax', text: 'ajax请求', icon: 'api', path: '/example/ajax', order: 998},
    //     {key: 'user', local: 'users', text: '用户列表', icon: 'user', path: '/users', order: 900},
    //     {key: 'role', local: 'roles', text: '角色列表 ', icon: 'team', path: '/roles', order: 800},
    //     {key: 'page404', local: 'page404', text: '404页面不存', icon: 'file-search', path: '/404', order: 700},
    //     {key: 'user-center', local: 'userCenter', text: '用户中心', icon: 'user', path: '/user-center', order: 600},
    //     {key: 'component', local: 'component', text: '组件', icon: 'ant-design', order: 700},
    // ].concat(antdMenus));
}
