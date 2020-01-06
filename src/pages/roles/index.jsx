import React, {Component} from 'react';
import {Table} from 'antd';
import PageContent from '@/layouts/page-content';
import {Operator, ToolBar} from "@/library/antd";
import config from '@/commons/config-hoc';
import RoleEdit from './RoleEdit';

@config({
    path: '/roles',
    ajax:true,
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})
export default class RoleList extends Component {
    state = {
        roleId: void 0,
        visible: false,
        dataSource: [],     // 表格数据
        selectedRole:{},
        elements: [],//所有元素数据
        treeData: [],//树数据
        ruleData:[],

    };

    columns = [
        // {title: "id", dataIndex: 'id', key: 'id'},
        {title: this.props.local.name, dataIndex: 'name', key: 'name'},
        {title: this.props.local.description, dataIndex: 'describe', key: 'describe'},
        {
            title: this.props.local.operator, dataIndex: 'operator', key: 'operator',
            render: (value, record) => {
                const {id, name} = record;
                const items = [
                    {
                        label: this.props.local.edit,
                        onClick: () => this.handleEdit(record),
                    },
                    {
                        label: this.props.local.del,
                        color: 'red',
                        confirm: {
                            title: this.props.local.confirmDial,
                            onConfirm: () => this.handleDelete(id),
                        },
                    },
                    // {
                    //
                    //     label: this.props.local.ele,
                    //     onClick: () => this.props.history.push(`/roles/_/RoleElement/${id}?userName=${name}`),
                    // }
                ];

                return <Operator items={items}/>
            },
        }
    ];

    componentDidMount() {
        this.handleSearch();

        this.getAllElement();
        this.getApi("");
        this.getAllRuleGroup();

    }

    getAllRuleGroup=()=>{

        this.RuleGroup=[]
        this.props.ajax
            .get('/ruleGroup')
            .then(res=>{
                res.forEach(item => {
                    this.RuleGroup.push({
                        value: item.guid.toString(),
                        label: item.name,
                    });

                })

            })
            .finally(()=>{
                this.setState({ruleData: this.RuleGroup})
            })
    }

    handleSearch = () => {
        // const pageNum = 1;
        // const pageSize = 20;
        // const dataSource = [];
        // for (let i = 0; i < pageSize; i++) {
        //     const id = pageSize * (pageNum - 1) + i + 1;
        //     dataSource.push({id: `${id}`, name: `管理员${id}`, description: '角色描述'});
        // }

        this.props.ajax
            .get('/roles')
            .then(res=>{
                this.setState({dataSource:res.data})
            })
            .finally()
    };


    handleAdd = () => {
        this.setState({roleId: void 0, visible: true});
    };

    handleDelete = (id) => {

        this.props.ajax
            .del(`/role?Id=${encodeURIComponent(id)}`)
            .then(res => {
                this.handleSearch();

                this.getAllElement();
                this.getApi("");
            })
            .finally()

    };

    handleEdit = (record) => {
        this.props.ajax
            .get(`/role?Id=${encodeURIComponent(record.id)}`)
            .then(res=>{
                this.setState({selectedRole:res, visible: true});
            })
    };

    //获取所有元素数据
    getAllElement = () => {
        this.setState({loading: true});
        this.props.ajax
            .get('/element')
            .then(res => {
                this.setState({elements: res});
                this.makeTreeData(res);
            })
            .finally(() => this.setState({loading: false}))
    };

    getIcon = (elementType) => {
        switch (elementType) {
            case 1:
                return 'menu';
            case 2:
                return 'plus-square';
            case 3:
                return 'link';
            default:
                return 'menu';
        }
    }

    // 是否是子叶节点
    isLeaf = (elementType) => {
        return (elementType === 2 || elementType === 3);
    }


    makeTreeData = (elements) => {

        this.nodes = [];

        // this.strElements=[];

        // elements.forEach(element=>{
        //     this.strElements.push(
        //         {
        //             id:element.id.toString(),
        //             name:element.name.toString(),
        //             elementType:element.elementType.toString(),
        //             upId:element.upId.toString(),
        //             identification:element.identification,
        //             route:element.route,
        //             apis:element.apis,
        //         }
        //     )
        //
        // })

        // 第一级节点
        elements.forEach(element => {
            if (!element.upId) {
                this.nodes.push(
                    {
                        title: element.name,
                        value:element.id.toString(),
                        key: element.id.toString(),
                        icon: this.getIcon(element.elementType),
                        isLeaf: this.isLeaf(element.elementType)
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
                const childs = elements.filter(element => element.upId.toString() === key.toString());

                // 查找treenodeoption
                this.GetTreeNodeOptionByKey(this.nodes, key);

                // 设置子节点
                this.findTreeNode.children = [];


                // 查找到的节点推入节点的子节点
                childs.forEach(element => {
                    this.findTreeNode.children.push(
                        {
                            title: element.name,
                            key: element.id.toString(),
                            value:element.id.toString(),
                            icon: this.getIcon(element.elementType),
                            isLeaf: this.isLeaf(element.elementType)
                        }
                    );
                    newLoopKeys.push(element.id.toString());
                });

            });

            // 查找下一轮的子节点
            loopKeys = [];
            Object.assign(loopKeys, newLoopKeys);
        }
        this.setState({treeData: this.nodes});
        console.log(`treeData:${JSON.stringify(this.nodes)}`)
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
    }


    getApi = (value) => {

        this.apiName = [];
        this.setState({loading: true})

        this.props.ajax
            .get('/AllFunction')
            .then(res => {

                res.forEach(item => {
                    this.apiName.push({
                        value: item.id.toString(),
                        label: item.name,
                    });

                })

            }).finally(() => {
            this.setState({loading: false})
            this.setState({selectData: this.apiName});
        })


    }


    visibleEdit=()=>{
        this.setState({visible: false,selectedRole:{}})
    }

    render() {
        const {
            dataSource,
            visible,
            elements,
            treeData,
            ruleData,
            selectedRole,
        } = this.state;
        const lang = this.props.local;
        // console.log(`Role,render,treeData:${JSON.stringify(treeData)}`);
        return (
            <PageContent>
                <ToolBar
                    items={[
                        {type: 'primary', text: lang.add, icon: 'plus', onClick: this.handleAdd}
                    ]}
                />

                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />
                <RoleEdit
                    selectedRole={selectedRole}
                    elements={elements}
                    treeData={treeData}
                    ruleData={ruleData}
                    visible={visible}
                    powerValue={selectedRole.elements}
                    ruleValue={selectedRole.dataRules}
                    onOk={this.visibleEdit}
                    onCancel={this.visibleEdit}
                    refresh={this.handleSearch}
                />
            </PageContent>
        );
    }
}
