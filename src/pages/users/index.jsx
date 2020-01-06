import React, {Component} from 'react';
import {Button, Table, Modal, Checkbox} from 'antd';
import PageContent from '@/layouts/page-content';
import FixBottom from '@/layouts/fix-bottom';
import './style.less';
// import RoleTree from './RoleTree'
import moment from 'moment';

import {
    QueryBar,
    QueryItem,
    Pagination,
    Operator,
    ToolBar,
} from "@/library/antd";
import config from '@/commons/config-hoc';

const CheckboxGroup = Checkbox.Group;
@config({
    path: '/users',
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.users}
    }
})
export default class UserCenter extends Component {
    state = {
        loading: false,
        dataSource: [],     // 表格数据
        total: 0,           // 分页中条数
        pageSize: 10,       // 分页每页显示条数
        pageNum: 1,         // 分页当前页
        params: {},         // 查询条件
        jobs: [],           // 工作下拉数据
        positions: [],      // 职位下拉数据
        collapsed: false,    // 是否收起
        roleTreeShow: false, // 角色树是否显示
        roleTreeDefault: [], // 用于菜单树，默认需要选中的项
        roleData: [], // 所有的角色数据
        nowData: null, // 当前选中用户的信息，用于查看详情、修改、分配菜单
        roleTreeLoading: false,
        tempCheckedValue:[],
        sorter:{}
    };

    queryItems = [
        // [
        //     {
        //         type: 'select',
        //         field: 'position',
        //         label: '职位',
        //         placeholder: '请选择职位',
        //         itemStyle: {flex: '0 0 200px'}, // 固定宽度
        //         disable:true,
        //     },
        //     {
        //         type: 'select',
        //         field: 'job',
        //         label: '工作',
        //         placeholder: '请选择工作',
        //         itemStyle: {flex: '0 0 200px'}, // 固定宽度
        //     },
        // ],
        [
            {
                collapsedShow: true, // 收起时显示
                type: 'input',
                field: 'SearchText',
                label: this.props.local.search,
                placeholder: this.props.local.searchPHL,
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
            // {
            //     collapsedShow: true,
            //     type: 'number',
            //     field: 'age',
            //     label: '年龄',
            //     min: 0,
            //     max: 150,
            //     step: 1,
            //     placeholder: '请输入年龄',
            //     itemStyle: {flex: '0 0 200px'}, // 固定宽度
            // },
        ],
    ];

    columns = [
        {title: this.props.local.name, dataIndex: 'userName', key: 'userName',sorter: true},
        {title: 'fullName', dataIndex: 'fullName',sorter: true},
        {title: 'email', dataIndex: 'email',sorter: true},
        {title: 'phoneNumber', dataIndex: 'phoneNumber',sorter: true},
        {title: 'openId', dataIndex: 'openId',sorter: true},
        {title: 'nickName', dataIndex: 'nickName',sorter: true},
        {
            title: 'gender', dataIndex: 'gender',sorter: true,
            render: (value) => {
                if (value === 1) return 'man';
                if (value === 2) return 'female';
                // 默认都为菜单
                return 'secret';
            }
        },
        {
            title: 'birthday', dataIndex: 'birthday', type: 'date',sorter: true,
            render: val => {
                return val ? <span>{moment(val).format('YYYY-MM-DD')}</span> : ""
            }
            // render: (value) => {
            //
            //     return  moment(value, 'YYYY/MM/DD');
            // }

        },
        // {title: 'native', dataIndex: 'native'},
        // {title: 'graduate', dataIndex: 'graduate'},
        // {title: 'education', dataIndex: 'education'},
        {
            title: this.props.local.operator, dataIndex: 'operator', key: 'operator',
            render: (value, record) => {
                const {id, userName} = record;
                const items = [
                    {
                        label: this.props.local.edit,
                        onClick: () => this.props.history.push(`/users/_/UserEdit/${id}?userName=${userName}`),
                    },
                    {
                        label: this.props.local.del,
                        color: 'red',
                        confirm: {
                            title: this.props.local.confirmDial,
                            onConfirm: () => this.handleDel(id),
                        },
                    },
                    {
                        label: this.props.local.role,
                        onClick: () => this.TreeShowClick(record),
                        // color: 'red',
                        // confirm: {
                        //     title: this.props.local.confirmDial,
                        //     onConfirm: () => this.handleDel(id),
                        // },
                    }
                ];

                return <Operator items={items}/>
            },
        }
    ];

    componentDidMount() {
        this.handleSearch();
        this.GetRoleTreeData();
    }
    handleTableChange = (pagination, filters, sorter) => {
        this.setState({sorter:sorter});
        setTimeout(this.handleSearch)
    };

    GetRoleTreeData = () => {

        this.setState({loading: true})
        this.props.ajax
            .get('/roleNames')
            .then(res => {
                this.setState({roleData: res})
            })
            .finally(this.setState({loading: false}))


    };


    TreeShowClick = (record) => {

        this.GetRoleTreeData();
        this.setState({
            nowData: record,
            roleTreeDefault: record.roles,
            roleTreeShow: true,
        });

    };

    RoleTreeOK = () => {

        // const params = {
        //     id: this.state.nowData.id,
        //     // roles: keys.map(item => Number(item))
        //     roles: this.state.nowData.roles,
        // };

        // alert(`${params.roles},${params.id}`)
        this.setState({
            roleTreeLoading: true
        });
        let nowData=this.state.nowData;
        nowData.roles=this.state.tempCheckedValue;


        this.props.ajax
            .put('/UpdateUserRole', nowData, {successTip: "add Suceess!"})
            .then(res => {

                this.handleSearch();
                // this.RoleTreeClose();

            })
            .finally(() => {
                this.setState({
                    roleTreeLoading: false,
                    roleTreeShow: false,
                    tempCheckedValue:[]
                });
            });
    };

    // RoleTreeClose = () => {
    //     alert("close")
    //     this.setState({
    //         roleTreeShow: false
    //     });
    // };


    handleSearch = () => {
        const {params, pageNum, pageSize,sorter} = this.state;

        const getParams = {
            PageIndex: pageNum,
            PageSize: pageSize,
            SearchText: params.SearchText,
            SortField:sorter?.field,
            SortType:sorter?.order,
        };

        this.setState({loading: true});
        this.props.ajax
            .get('/AllUsers', getParams, {noEmpty: true})
            .then(res => {
                this.setState({dataSource: res.data, total: res.total});

            })
            .finally(() => this.setState({loading: false}))

    };

    handleDel = (id) => {
        const params = {
            Id: id
        };
        this.setState({loading: true});
        this.props.ajax
            .del(`/userDetail?Id=${encodeURIComponent(id)}`)
            .then(res => {
                this.handleSearch();
            })
            .finally(() => this.setState({loading: false}))

    }

    fetchOptions = () => {
        const jobs = [
            {value: '11', label: '产品经理'},
            {value: '22', label: '测试专员'},
            {value: '33', label: '前端开发'},
            {value: '44', label: '后端开发'},
        ];

        const positions = [
            {value: '11', label: 'CEO'},
            {value: '22', label: 'CFO'},
            {value: '33', label: 'CTO'},
            {value: '44', label: 'COO'},
        ];

        this.setState({jobs, positions});

        return Promise.resolve({job: jobs, position: positions})
    };

    handleAdd = () => {
        // TODO
        this.props.history.push('/users/_/UserEdit/:id');
    };

    onChangeRoles = (checkedValues) => {

        // let {nowData} = this.state;

        //如果改变角色后直接取消，选择会短暂记录
        // nowData.roles = checkedValues;

        this.setState({roleTreeDefault:checkedValues,tempCheckedValue:checkedValues})

        // alert(`已选角色：${checkedValues}`)

        // this.props.ajax
        //     .put('',nowData)
        //     .then(res=>{
        //
        //     })
        //     .finally(res=>{})
    };

    render() {
        const {
            total,
            pageNum,
            pageSize,
            collapsed,
            dataSource,
            roleData,
            roleTreeDefault,
            roleTreeShow,
            roleTreeLoading,

        } = this.state;
        console.log('render users');
        const lang = this.props.local;
        return (
            <PageContent>
                <QueryBar
                    showCollapsed={false}
                    collapsed={collapsed}
                    onCollapsedChange={collapsed => this.setState({collapsed})}
                >
                    <QueryItem
                        collapsed={collapsed}
                        submitText={lang.search}
                        resetText={lang.reset}
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params,pageNum: 1}, this.handleSearch)}
                        // extra={<Button type="primary" icon="user-add" onClick={this.handleAdd}>{lang.addUser}</Button>}
                    />
                </QueryBar>

                <ToolBar
                    items={[
                        {type: 'primary', text: lang.addUser, icon: 'user-add', onClick: this.handleAdd}
                    ]}
                />

                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                    onChange={this.handleTableChange}
                />

                <Pagination
                    total={total}
                    pageNum={pageNum}
                    pageSize={pageSize}
                    onPageNumChange={pageNum => this.setState({pageNum}, this.handleSearch)}
                    onPageSizeChange={pageSize => this.setState({pageSize, pageNum: 1}, this.handleSearch)}
                />
                {/*如果角色存在层级关系，就得使用Tree组件*/}
                {/*<RoleTree*/}
                {/*title={"AssignRole"}*/}
                {/*data={this.state.roleData}*/}
                {/*visible={this.state.roleTreeShow}*/}
                {/*defaultKeys={this.state.roleTreeDefault}*/}
                {/*loading={this.state.roleTreeLoading}*/}
                {/*onOk={v => this.RoleTreeOK(v)}*/}
                {/*onClose={() => this.RoleTreeClose()}*/}
                {/*/>*/}
                <Modal
                    title={"AssignRole"}
                    visible={roleTreeShow}
                    loading={roleTreeLoading}
                    onOk={v => this.RoleTreeOK(v)}
                    onCancel={() => this.setState({roleTreeShow: false,tempCheckedValue:[]})}
                >
                    <CheckboxGroup style={{display: 'grid',}}
                                   className="prefixClass"
                                   options={roleData}
                                   value={roleTreeDefault}
                                   onChange={this.onChangeRoles}/>
                </Modal>

                <FixBottom>
                    <Button>{lang.exportCurrent}</Button>
                    <Button type="primary">{lang.exportAll}</Button>
                </FixBottom>
            </PageContent>
        );
    }
}
