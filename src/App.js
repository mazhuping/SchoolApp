import React from 'react';
import AppRouter from './router/AppRouter';
import {connect} from './models';
import Local from './i18n/Local';
import {getMenuTreeDataAndPermissions, getLoginUser, setLoginUser} from './commons'

@connect()
export default class App extends React.Component {
    constructor(...props) {

        super(...props);
        // 从Storage中获取出需要同步到redux的数据
        this.props.action.getStateFromStorage();

        // console.log(`props:${JSON.stringify(props)}`)

        const {system, menu} = this.props.action;


        // alert("我就是想测试一下，是否每个url都会调用到app.js")////只要是浏览器访问，都会
        // console.log(`system:${JSON.stringify(system)}`)
        // console.log(`menu:${JSON.stringify(menu)}`)


        const loginUser = getLoginUser();


        // 获取系统菜单 和 随菜单携带过来的权限
        this.state.loading = true;
        menu.getMenus({
            params: {userId: loginUser?.id},
            onResolve: (res) => {
                let menus = res || [];
                // console.log(`这里的menu应该有值：${JSON.stringify(menus)}`)
                const {permissions} = getMenuTreeDataAndPermissions(menus);

                // console.log(`当前用户：${JSON.stringify(loginUser)}`)

                if (loginUser) {
                    // loginUser.permissions = permissions;//现在的权限系统中，直接在登录的时候将权限返回
                    setLoginUser(loginUser);
                }

                // 设置当前登录的用户到model中
                system.setLoginUser(loginUser);
                // 保存用户权限到model中
                system.setPermissions(loginUser?.permissions);
                console.log(`permissions:${permissions}`)
            },
            onComplete: () => {
                this.setState({loading: false});
            },
        });
    }

    state = {
        loading: true,
    };

    render() {
        return (
            <Local>
                <AppRouter/>
            </Local>
        );
    }
}
