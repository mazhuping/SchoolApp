import React, {Component} from 'react';
import {Form, Row, Col, Button} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from "@/library/antd";
import PageContent from '@/layouts/page-content';
import moment from "moment/moment";

@config({
    path: '/users/_/UserEdit/:id',
    keepAlive: true,
    query: true,
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.users}
    },
    title: (props) => {
        const {query, match: {params}, local: {edit, add}} = props;
        if (params.id && params.id !== ':id') {
            return {text: `${edit}-${query.userName}`, icon: 'edit'};
        }

        return {text: `${add}`, icon: 'user-add'};

    },
    breadcrumbs: (props) => {
        const {query, match: {params}} = props;
        const breadcrumbs = [
            {key: 'home', local: 'home', text: '首页', icon: 'home', path: '/'},
            {key: 'users', local: 'users', text: '用户列表', icon: 'user', path: '/users'},
        ];

        if (params.id && params.id !== ':id') {
            return breadcrumbs.concat([
                {key: 0, local: 'userEdit', icon: 'edit', text: '编辑用户'},
                {key: 2, text: query.name},
            ]);
        }

        return breadcrumbs.concat([
            {key: 'userAdd', local: 'userAdd', icon: 'user-add', text: '添加用户'},
        ]);
    },
})
@Form.create()
export default class UserEdit extends Component {
    constructor(...props) {
        super(...props);

        this.props.onComponentWillShow(() => {
            console.log('UserEdit onComponentShow');
        });
        this.props.onComponentWillHide(() => {
            console.log('UserEdit onComponentWillHide');
        });
    }

    state = {
        loading: false,
        treeData:[],
        UserGroup:"",
        UserGroupName:"",
        data: {},
    };

    componentDidMount() {
        console.log('UserEdit.js componentDidMount');
        this.getAllDepartments();
        this.fetchData();
    }

    getAllDepartments = () => {
        this.setState({loading: true});
        this.props.ajax
            .get('/department')
            .then(res => {
                this.makeTreeData(res);
            })
            .finally(() => this.setState({loading: false}))
    };
    makeTreeData = (departments) => {

        this.nodes = [];

        // 第一级节点
        departments.forEach(department => {
            if (!department.upId) {
                this.nodes.push(
                    {
                        title: department.departmentName,
                        value:department.id.toString(),
                        key: department.id.toString(),
                        icon: 'cluster',
                    }
                );
            }
        });

        // 循环查找下级节点
        let loopKeys = this.nodes.map(n => n.key);
        while (loopKeys.length > 0) {

            let newLoopKeys = [];

            loopKeys.forEach(key => {

                // 查找以当前节点为父节点的节点
                const childs = departments.filter(department => department.upId.toString() === key.toString());

                // 查找treenodeoption
                this.GetTreeNodeOptionByKey(this.nodes, key);

                // 设置子节点
                this.findTreeNode.children = [];


                // 查找到的节点推入节点的子节点
                childs.forEach(department => {
                    this.findTreeNode.children.push(
                        {
                            title: department.departmentName,
                            value:department.id.toString(),
                            key: department.id.toString(),
                            icon: 'cluster',

                        }
                    );
                    newLoopKeys.push(department.id);
                });

            });

            // 查找下一轮的子节点
            loopKeys = [];
            Object.assign(loopKeys, newLoopKeys);
        }
        this.setState({treeData: this.nodes});
    }

    // 递归查找TreeNodeOption
    GetTreeNodeOptionByKey = (nodes, key) => {
        if (nodes.find(n => n.key.toString() === key.toString())) {
            this.findTreeNode = nodes.find(n => n.key.toString() === key.toString());
        } else {
            nodes.forEach(n => {
                if (n.children) {
                    if (n.children.length !== 0) {
                        this.GetTreeNodeOptionByKey(n.children, key);
                    }
                }
            });
        }
    };

    fetchData = () => {
        const {match: {params: {id}}, query: {userName}} = this.props;

        if (id && id !== ':id') {
            // 修改

            const params={
                Id:id
            };
            this.props.ajax
                .get('/userDetail',params,{noEmpty: true})
                .then(res=> {
                    this.setState({data:res});
                })
                .finally(()=>this.setState({loading:false}));

            //
            // // TODO 根据id获取用户
            //
            // this.setState({loading: true});
            // setTimeout(() => {
            //     this.setState({data: {id, userName, age: 23}});
            //
            //     this.setState({loading: false});
            // }, 500);
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const {id,userGroupId} = values;
                const ajax = id ? this.props.ajax.put : this.props.ajax.post;
                values.userGroupName=this.state.UserGroupName;

                const successTip = id ? 'edit Success!' : 'add success!';
                this.setState({loading: true});

                ajax('/userDetail', values, {successTip: successTip,noEmpty: true})
                    .then(() => {

                    })
                    .finally(() => this.setState({loading: false}))
            }
        });
    };

    handleReset = (e) => {
        e.preventDefault();
        this.props.form.resetFields();
    };

    onUserGroupChange=(value)=>{
        this.setState({UserGroup:value});

    }

    onSelectUserGroup=(value, node)=>{
        this.setState({UserGroupName:node.props.title});
    }

    //labelWidth={100}
    FormElement = (props) => <FormElement form={this.props.form} labelCol={{ span: 10 }} {...props}/>;

    render() {
        console.log('render UserEdit.jsx');
        const {query, local} = this.props;

        const {loading, data,treeData,UserGroup,UserGroupName} = this.state;

        const FormElement = this.FormElement;
        // style={{width: 300}} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
        return (
            <PageContent loading={loading} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 style={{margin:40}}>{data.id ? `${local.edit}-${query.userName}` : `${local.add}`}</h2>
                <Form  style={{width: 1400}}  onSubmit={this.handleSubmit}>
                    {data.id ? <FormElement type="hidden" field="id" decorator={{initialValue: data.id}}/> : null}

                    <Row>
                        <Col span={7}>
                            <FormElement
                                label={local.name}
                                disabled={data.id ? true : false}
                                field="userName"
                                decorator={{
                                    initialValue: data.userName,
                                    rules: [
                                        {
                                            pattern: '[^\u4e00-\u9fa5]',
                                            message: 'username cant be chinese',
                                            required: true,
                                        }
                                    ],
                                }}
                            />

                            <FormElement
                                label="fullName"

                                type="input"
                                field="fullName"
                                decorator={{
                                    initialValue: data.fullName,
                                    rules: [


                                    ],
                                }}
                            />

                            <FormElement
                                label="email"
                                type="input"
                                field="email"
                                decorator={{
                                    initialValue: data.email,
                                    rules: [
                                        {
                                            pattern: '^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$',
                                            message: 'please check email format',
                                        }
                                    ],
                                }}
                            />

                            <FormElement
                                label="phoneNumber"
                                type="input"
                                field="phoneNumber"
                                decorator={{
                                    initialValue: data.phoneNumber,
                                    rules: [
                                        {
                                            pattern: '^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$',
                                            message: 'please check phone format',
                                        }

                                    ],
                                }}
                            />


                        </Col>
                        <Col span={7} offset={1}>
                            <FormElement
                                label="nickName"
                                type="input"
                                field="nickName"
                                decorator={{
                                    initialValue: data.nickName,
                                    rules: [

                                    ],
                                }}
                            />



                            <FormElement
                                label="gender"
                                type="select"
                                field="gender"
                                decorator={{
                                    initialValue: data.gender,
                                    rules: [
                                        {required: true, message: 'gender Required！'},
                                    ],
                                }}
                                placeholder="please select"
                                options={[
                                    {label: 'man', value: 1},
                                    {label: 'female', value: 2},
                                    {label: 'secret', value: 0},
                                ]}
                            />

                            <FormElement
                                label="birthday"
                                type="date"
                                // format="YYYY-MM-DD"
                                field="birthday"
                                decorator={{
                                    initialValue: data.birthday ? moment(data.birthday):null,
                                    rules: [

                                    ],
                                }}
                            />

                            <FormElement
                                label="native"
                                type="input"
                                field="native"
                                decorator={{
                                    initialValue: data.native,
                                    rules: [

                                    ],
                                }}
                            />
                        </Col>
                        <Col span="7">
                            <FormElement
                                label="graduate"
                                type="input"
                                field="graduate"
                                decorator={{
                                    initialValue: data.graduate,
                                    rules: [

                                    ],
                                }}
                            />

                            <FormElement
                                label="education"
                                type="input"
                                field="education"
                                decorator={{
                                    initialValue: data.education,
                                    rules: [

                                    ],
                                }}
                            />
                            <FormElement
                                label="openId"
                                type="input"
                                field="openId"
                                decorator={{
                                    initialValue: data.openId,
                                    rules: [

                                    ],
                                }}
                            />
                            <FormElement
                                label="userGroup"
                                field="userGroupId"
                                type="select-tree"
                                options={treeData}
                                // treeCheckable={true}
                                placeholder={""}
                                value={UserGroup}
                                // labelInValue={true}
                                // showCheckedStrategy={SHOW_PARENT}
                                // searchPlaceholder="Please select"
                                onChange={this.onUserGroupChange}
                                onSelect={this.onSelectUserGroup}
                                decorator={{initialValue: data.userGroupId}}
                            />



                        </Col>

                    </Row>
                    {/*style={{ textAlign: 'right' }}*/}
                    <Row>
                        <Col span="4" offset="11" >
                            <div style={{paddingLeft: 100}} style={{ marginTop:50}}>
                                <Button type="primary" htmlType="submit">{local.submit}</Button>
                                <Button style={{marginLeft: 8}} onClick={this.handleReset}>{local.reset}</Button>
                            </div>
                        </Col>
                    </Row>

                </Form>
            </PageContent>
    );
    }
    }

