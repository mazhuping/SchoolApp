import React, {Component} from 'react';
import config from '@/commons/config-hoc';

@config({
    path:'/roles/_/RoleElement/:id',
    keepAlive:true,
    query:true,
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.roles}
    },
    title:'RoleElement',
    // title:(props)=>{
    //     const {query,match:{params},local:{edit,add}}=props;
    //     if(params.id && params.id !==':id'){
    //         return {text: `${edit}-${query.userName}`, icon: 'edit'};
    //     }
    //
    //     return {text: `${add}`, icon: 'user-add'};
    // }
    breadcrumbs: (props) => {
        const breadcrumbs = [
            {key: 'home', local: 'home', text: '首页', icon: 'home', path: '/'},
            {key: 'roles', local: 'roles', text: '角色列表', icon: 'role', path: '/roles'},
            {key: 'roleElement', local: 'roleElement', icon: 'role', text: 'roleElement'},
        ];
        return breadcrumbs;
    },
})

export default class  extends Component {
    state = {};

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }


    render() {

        return (
            <div></div>
        );

    }


}