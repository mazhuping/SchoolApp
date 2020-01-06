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
    path: '/element',
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.roles}
    },

})

@Form.create()
export default class  extends Component {
    state = {
        loading: false,
        elements: [],//所有元素数据
        treeData: [],//树数据
        selectData: [],//所有API数据，给select做数据源
        // selectedID: undefined,//当前api的select的数据
        selectedElement: {},//当前选中的元素节点
        disabled: true,//是否可编辑（多种应用）
        iconVisible: false,

    };

    componentDidMount() {
        this.getAllElement();
        this.getApi("");

    }

    componentDidUpdate(prevProps) {

    }

    getIdentification=()=>{
        this.props.ajax
            .get('/getIdentifycations')
            .then(res=>{
                let loginUser = getLoginUser();
                loginUser.permissions=res;
                setLoginUser(loginUser)
            })
            .finally(()=>{
                window.location.href=`${ROUTE_BASE_NAME}/element`;
            })
    }

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

        // 第一级节点
        elements.forEach(element => {
            if (!element.upId) {
                this.nodes.push(
                    {
                        title: element.name,
                        key: element.id,
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
                const childs = elements.filter(element => element.upId === key);

                // 查找treenodeoption
                this.GetTreeNodeOptionByKey(this.nodes, key);

                // 设置子节点
                this.findTreeNode.children = [];


                // 查找到的节点推入节点的子节点
                childs.forEach(element => {
                    this.findTreeNode.children.push(
                        {
                            title: element.name,
                            key: element.id,
                            icon: this.getIcon(element.elementType),
                            isLeaf: this.isLeaf(element.elementType)
                        }
                    );
                    newLoopKeys.push(element.id);
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
    }

    getApi = (value) => {

        this.apiName = [];

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
            this.setState({selectData: this.apiName});
        })


    }

    onSelect = (selectedKeys) => {


        const {disabled} = this.state;

        //编辑状态下，就好好编辑当下那个，不可以再切换为其他的了！
        if (!disabled)
            return;


        const {resetFields, setFieldsValue} = this.props.form;
        if(Object.keys(selectedKeys).length===0){
            this.setState({selectedElement: {}});
            resetFields();
            return;

        }
        const {elements} = this.state;

        this.selectedElement = elements.find(n => n.id === Number(selectedKeys[0]));

        this.setState({selectedElement: this.selectedElement});

        resetFields();

        let parent = elements.find(n => n.id === this.selectedElement.upId);
        let name = "";
        let upId=0;
        if (parent) {
            name = parent.name;
            upId=this.selectedElement.upId;
        }
        const {
            id,
            elementType,
            identification,
            route,
            apis,
            order,
            icon,
            local,
            isEnable,

        } = this.selectedElement;

        setTimeout(() => {
            setFieldsValue({
                id,
                upId,
                parentElement: name,
                elementName: this.selectedElement.name,
                elementType,
                identification,
                route,
                apis,
                order,
                icon,
                local,
                isEnable
            })
        })


    }

    onSelectSearch = (value) => {
        if (value) {
            this.getApi(value);
        } else {
            this.setState({selectData: []});
        }

    }


    // onSelectChange = (value) => {
    //     // this.setState({selectedID: value})
    // }

    addElement = () => {

        const {selectedElement} = this.state;
        console.log(`selectedElement:${JSON.stringify(selectedElement)}`)

        //按钮和链接就不需要再加子元素了
        if (Object.keys(selectedElement).length!==0 && selectedElement.elementType !== 1)
            return;


        const {resetFields, setFieldsValue} = this.props.form;

        resetFields();

        this.setState({disabled: false});

        if (Object.keys(selectedElement).length !== 0) {
            setTimeout(() => {
                setFieldsValue({
                    upId: selectedElement.id,
                    parentElement: selectedElement.name,
                    elementType: 1,
                })
            })
        } else {
            setTimeout(() => {
                setFieldsValue({
                    elementType: 1,
                })
            })
        }


    }

    editElement = () => {


        const {selectedElement} = this.state;

        //没有选择节点，编辑个毛线
        if (Object.keys(selectedElement).length === 0)
            return;

        console.log(`selectedElement:${JSON.stringify(selectedElement)}`)

        this.setState({disabled: false})


    }

    // delElement = () => {
    //     const {selectedElement} = this.state;
    //     alert("")
    //     console.log(`selectedElement:${JSON.stringify(selectedElement)}`)
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
                    name:values.elementName,
                    elementType:values.elementType,
                    identification:values.identification,
                    route:values.route,
                    apis:values.apis,
                    icon:values.icon,
                    order:values.order,
                    local:values.local,
                    isEnable:values.isEnable,
                };
                const successTip="add Success!";
                ajax('/element', params,{successTip:successTip})
                    .then(() => {
                        this.getAllElement();
                        this.getApi("");
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

        const {selectedElement, elements} = this.state;

        console.log(`selectedElement:${JSON.stringify(selectedElement)}`);

        if (Object.keys(selectedElement).length === 0)
            return;

        let delElement = [];

        let generationNodes = getGenerationsByid(elements, selectedElement.id);
        console.log(`generationNodes:${JSON.stringify(generationNodes)}`);

        generationNodes.forEach(item => {
            delElement.push(item.id);
        });

        console.log(`delELment:${delElement}`);

        //这里如何写更好
        delElement.forEach(item => {
            this.props.ajax
                .del(`/element?Id=${encodeURIComponent(item)}`)
                .then(res => {
                    this.getAllElement();
                    this.getApi("");
                    this.getIdentification();

                })
                .finally(() => this.setState({loading: false}))
        })


    }
    cancel = () => {

    }
    handleIconClick = () => {
        this.setState({iconVisible: true});
    };

    FormElement = (props) => <FormElement form={this.props.form} labelCol={{span: 10}} {...props}/>;


    render() {
        const {treeData, selectData, selectedElement, disabled,iconVisible} = this.state;
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
        const tip=`Are you sure delete ${selectedElement.name}`;

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
                                {selectedElement.id ? (
                                    <FormElement type="hidden" field="id"
                                                 decorator={{initialValue: null}}/>) : null}

                                    <FormElement type="hidden" field="upId" decorator={{initialValue: 0}}/>


                                <Row>
                                    <Col span={10} offset={1}>
                                        <FormElement
                                            label="parentElement"
                                            disabled={true}
                                            type="input"
                                            field="parentElement"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />

                                        <FormElement
                                            label="elementName"
                                            disabled={disabled}
                                            type="input"
                                            field="elementName"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />

                                        <FormElement
                                            label="elementType"
                                            disabled={disabled}
                                            type="select"
                                            field="elementType"
                                            placeholder={""}
                                            options={[
                                                {label: 'menu', value: 1},
                                                {label: 'button', value: 2},
                                                {label: 'link', value: 3},

                                            ]}
                                        />

                                        <FormElement
                                            label="identification"
                                            disabled={disabled}
                                            type="input"
                                            placeholder={""}
                                            field="identification"
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />


                                        <FormElement
                                            mode="multiple"
                                            disabled={disabled}
                                            label="apis"
                                            type="select"
                                            field="apis"
                                            showSearch
                                            value={this.state.selectedID}
                                            // placeholder="please select correct api！"
                                            placeholder={""}
                                            defaultActiveFirstOption={false}
                                            showArrow={false}
                                            filterOption={false}
                                            onSearch={this.onSelectSearch}
                                            onChange={this.onSelectChange}
                                            notFoundContent={null}
                                            options={selectData}
                                            style={this.props.style}
                                        />
                                    </Col>
                                    <Col span={10}>
                                        <FormElement
                                            label="route"
                                            disabled={disabled}
                                            type="input"
                                            placeholder={""}
                                            field="route"
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />
                                        <FormElement
                                            label="order"
                                            disabled={disabled}
                                            type="number"
                                            placeholder={""}
                                            field="order"
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />
                                        <FormElement
                                            label="local"
                                            disabled={disabled}
                                            type="input"
                                            field="local"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                        />
                                        <FormElement
                                            label="icon"
                                            disabled={disabled}
                                            type="input"
                                            field="icon"
                                            placeholder={""}
                                            decorator={{
                                                initialValue: null,
                                                rules: [],
                                            }}
                                            addonAfter={<Icon style={{cursor: 'pointer' }}  onClick={this.handleIconClick} type={getFieldValue('icon') || 'search'}/>}
                                        />

                                        <Form.Item label="isEnable" labelCol={{span: 10}}  >
                                            {getFieldDecorator('isEnable', { valuePropName: 'checked',initialValue: true })(<Switch disabled={disabled}/>)}
                                        </Form.Item>




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
                <IconPicker
                    visible={iconVisible}
                    onOk={(type) => {
                        this.setState({iconVisible: false});
                        setFieldsValue({icon: type});
                    }}
                    onCancel={() => this.setState({iconVisible: false})}
                />

            </PageContent>


        );

    }


}