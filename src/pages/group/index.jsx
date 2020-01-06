import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import {setLoginUser,getLoginUser} from '@/commons';
import {ROUTE_BASE_NAME} from '@/router/AppRouter';
import {ToolBar, Operator, FormElement} from '@/library/antd';
import IconPicker from "@/components/icon-picker";
import {Table, Icon, Modal, Form, Tree, Row, Col, Button, Select, Popconfirm, Switch} from 'antd';
import {getGenerationsByid} from "@/library/utils/tree-utils";
import './style.less';

const {Option} = Select;
const ButtonGroup = Button.Group;
const TreeNode = Tree.TreeNode;

@config({
    ajax: true,
    path: '/group',
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})
@Form.create()
export default class  extends Component {
    state = {
        loading: false,
        departments: [],//所有元素数据
        treeData: [],//树数据
        selectData: [],//所有API数据，给select做数据源
        // selectedID: undefined,//当前api的select的数据
        selectedDepartment: {},//当前选中的元素节点
        disabled: true,//是否可编辑（多种应用）
    };

    componentDidMount() {
        this.getAllDepartments();
    }
    //获取所有元素数据
    getAllDepartments = () => {
        this.setState({loading: true});
        this.props.ajax
            .get('/department')
            .then(res => {
                this.setState({departments: res});
                this.makeTreeData(res);
            })
            .finally(() => this.setState({loading: false}))
    };

    getIdentification=()=>{
        this.props.ajax
            .get('/getIdentifycations')
            .then(res=>{
                let loginUser = getLoginUser();
                loginUser.permissions=res;
                setLoginUser(loginUser)
            })
            .finally(()=>{
                window.location.href=`${ROUTE_BASE_NAME}/group`;
            })
    }

    makeTreeData = (departments) => {

        this.nodes = [];

        // 第一级节点
        departments.forEach(department => {
            if (!department.upId) {
                this.nodes.push(
                    {
                        title: department.departmentName,
                        key: department.id,
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
                const childs = departments.filter(department => department.upId === key);

                // 查找treenodeoption
                this.GetTreeNodeOptionByKey(this.nodes, key);

                // 设置子节点
                this.findTreeNode.children = [];


                // 查找到的节点推入节点的子节点
                childs.forEach(department => {
                    this.findTreeNode.children.push(
                        {
                            title: department.departmentName,
                            key: department.id,
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
        if (nodes.find(n => n.key === key)) {
            this.findTreeNode = nodes.find(n => n.key === key);
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

    onSelect = (selectedKeys) => {


        const {disabled} = this.state;

        //编辑状态下，就好好编辑当下那个，不可以再切换为其他的了！
        if (!disabled)
            return;


        const {resetFields, setFieldsValue} = this.props.form;
        if(Object.keys(selectedKeys).length===0){
            this.setState({selectedDepartment: {}});
            resetFields();
            return;

        }
        const {departments} = this.state;

        this.selectedDepartment = departments.find(n => n.id === Number(selectedKeys[0]));

        this.setState({selectedDepartment: this.selectedDepartment});

        resetFields();

        let parent = departments.find(n => n.id === this.selectedDepartment.upId);
        let name = "";
        let upId=0;
        if (parent) {
            name = parent.departmentName;
            upId=this.selectedDepartment.upId;
        }
        const {
            id,
            departmentName,
            remark
        } = this.selectedDepartment;

        setTimeout(() => {
            setFieldsValue({
                id,
                upId,
                parentDepartment: name,
                departmentName,
                remark
            })
        })


    };

    addElement = () => {

        const {selectedDepartment} = this.state;
        console.log(`selectedDepartment:${JSON.stringify(selectedDepartment)}`)

        //按钮和链接就不需要再加子元素了
        // if (Object.keys(selectedDepartment).length!==0 && selectedDepartment.elementType !== 1)
        //     return;


        const {resetFields, setFieldsValue} = this.props.form;

        resetFields();

        this.setState({disabled: false});

        if (Object.keys(selectedDepartment).length !== 0) {
            setTimeout(() => {
                setFieldsValue({
                    upId: selectedDepartment.id,
                    parentDepartment: selectedDepartment.departmentName,
                })
            })
        } else {
            setTimeout(() => {
                setFieldsValue({

                })
            })
        }


    }

    editElement = () => {


        const {selectedDepartment} = this.state;

        //没有选择节点，编辑个毛线
        if (Object.keys(selectedDepartment).length === 0)
            return;

        console.log(`selectedDepartment:${JSON.stringify(selectedDepartment)}`)

        this.setState({disabled: false})


    }

    // delElement = () => {
    //     const {selectedDepartment} = this.state;
    //     alert("")
    //     console.log(`selectedDepartment:${JSON.stringify(selectedDepartment)}`)
    //
    //
    // }

    handleSubmit = (e) => {
        this.setState({loading: true});
        e.preventDefault();

        const {resetFields, setFieldsValue} = this.props.form;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);



                // 如果key存在视为修改，其他为添加
                const {id} = values;
                const ajax = id ? this.props.ajax.put : this.props.ajax.post;
                // if(id){
                //     params.id=values.id;
                // }

                let params={
                    id:id ? values.id:0,
                    upId:values.upId ? values.upId:0,
                    departmentName:values.departmentName,
                    remark:values.remark,
                };
                const successTip="add Success!";
                ajax('/department', params,{successTip:successTip})
                    .then(() => {
                        this.getAllDepartments();
                        resetFields();
                    })
                    .finally(()=>{
                        this.setState({loading:false,disabled:true})
                        this.getIdentification();
                    });
            }
        });


    }

    handleCancel = () => {
        this.setState({disabled: true})

    }
    confirm = () => {

        this.setState({loading: true})

        const {selectedDepartment, departments} = this.state;

        console.log(`selectedDepartment:${JSON.stringify(selectedDepartment)}`);

        if (Object.keys(selectedDepartment).length === 0)
            return;

        let delElement = [];

        let generationNodes = getGenerationsByid(departments, selectedDepartment.id);
        console.log(`generationNodes:${JSON.stringify(generationNodes)}`);

        generationNodes.forEach(item => {
            delElement.push(item.id);
        });

        console.log(`delELment:${delElement}`);

        //这里如何写更好
        delElement.forEach(item => {
            this.props.ajax
                .del(`/department?Id=${encodeURIComponent(item)}`)
                .then(res => {
                    this.getAllDepartments();

                    this.getIdentification();

                })
                .finally(() => this.setState({loading: false}))
        })


    }
    cancel = () => {

    };

    FormElement = (props) => <FormElement form={this.props.form} labelCol={{span: 10}} {...props}/>;





    render() {

        const {treeData, selectData, selectedDepartment, disabled,iconVisible} = this.state;
        const {form, form: {getFieldValue, setFieldsValue,getFieldDecorator}} = this.props;

        const loop = dataTree => dataTree.map((item) => {
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={item.title} icon={<Icon type={item.icon}/>}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.title}/>;
        });
        const FormElement = this.FormElement;
        const tip=`Are you sure delete ${selectedDepartment.departmentName}`;


        return (
            <PageContent styleName="root">
                <div>
                    <Row style={{height: 800}}>
                        <Col styleName="tree" span={5}>
                            <ButtonGroup>
                                <Button type="ghost" disabled={!disabled} onClick={this.addElement}>
                                    <Icon type="plus"/>
                                </Button>
                                <Button type="ghost" disabled={!disabled} onClick={this.editElement}>
                                    <Icon type="edit"/>
                                </Button>
                                <Popconfirm
                                    title={tip}
                                    onConfirm={this.confirm}
                                    onCancel={this.cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="ghost" disabled={!disabled}>
                                        <Icon type="delete"/>
                                    </Button>
                                </Popconfirm>

                            </ButtonGroup>

                            <Tree
                                showIcon={true}
                                defaultExpandAll={true}
                                autoExpandParent={true}
                                // expandedKeys={this.state.expandedKeys}
                                onSelect={this.onSelect}>
                                {loop(treeData)}
                            </Tree>


                        </Col>
                        <Col styleName="content" span={19}>

                            <Form onSubmit={this.handleSubmit}>
                                {selectedDepartment.id ? (
                                    <FormElement type="hidden" field="id"
                                                 decorator={{initialValue: null}}/>) : null}

                                <FormElement type="hidden" field="upId" decorator={{initialValue: 0}}/>


                                <Row>
                                    <Col span={10} offset={1}>
                                        <FormElement
                                            label="parentDepartment"
                                            disabled={true}
                                            type="input"
                                            field="parentDepartment"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />

                                        <FormElement
                                            label="departmentName"
                                            disabled={disabled}
                                            type="input"
                                            field="departmentName"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />

                                        <FormElement
                                            label="remark"
                                            disabled={disabled}
                                            type="textarea"
                                            field="remark"
                                            rows={4}
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={10} offset={7}>
                                        <div
                                            style={{marginTop: 50}}>
                                            <Button hidden={disabled} type="primary" htmlType="submit">sumbit</Button>
                                            <Button hidden={disabled} style={{marginLeft: 8}}
                                                    onClick={this.handleCancel}>cancel</Button>
                                        </div>
                                    </Col>

                                </Row>

                            </Form>

                        </Col>
                    </Row>
                </div>
            </PageContent>


        );

    }


}