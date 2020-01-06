import React, {Component} from 'react';
import {Modal, Form, Spin, Table, Icon, Row, Col, TreeSelect} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';
import localMenus from "@/menus";
import {convertToTree, getGenerationKeys} from "@/library/utils/tree-utils";
import {arrayRemove, arrayPush} from '@/library/utils';
import {setLoginUser,getLoginUser} from '@/commons';
import {ROUTE_BASE_NAME} from '@/router/AppRouter';


const {SHOW_PARENT} = TreeSelect;
@config({
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})
@Form.create()
export default class RoleEdit extends Component {
    state = {
        loading: false,
        elements: [],//所有元素数据
        treeData: [],//树数据
        // selectedRole:{} ,
        powerValue: null

    };


    componentDidMount() {
        // const{elements,treeData}=this.props;
        // this.setState({elements:elements,treeData:treeData});
        console.log(`Mount`)
    }

    componentDidUpdate(prevProps) {
        console.log(`updateDid `)
        // const {visible, form: {resetFields, setFieldsValue}, selectedRole} = this.props;
        // this.setState({selectedRole:selectedRole});

        // 打开弹框
        // if (!prevProps.visible && visible) {
        //     // 重置表单，接下来填充新的数据
        //     resetFields();
        //
        //     const {
        //         id,
        //         name,
        //         description,
        //     } = selectedRole;
        //
        //     setTimeout(() => {
        //         setFieldsValue({
        //             id,
        //             name,
        //             description
        //         })
        //     });
        //
        // }
    }


    onPowerChange = (value) => {
        this.setState({powerValue: value});
        // this.setState({loading: true});
        // this.props.ajax
        //     .put('')
        //     .then()
        //     .finally(()=>this.setState({loading:false}));
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
                window.location.href=`${ROUTE_BASE_NAME}/roles`;
            })
    }


    handleOk = () => {

        const {onOk, form: {validateFieldsAndScroll}, refresh} = this.props;

        validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // selectedRole.name = values.name;
                // selectedRole.describe = values.describe;
                // selectedRole.elements = powerValue ? powerValue : selectedRole.elements;
                const {id} = values;
                const ajax = id ? this.props.ajax.put : this.props.ajax.post;
                const successTip = id ? 'edit Success!' : 'add success!';
                this.setState({loading: true});
                ajax('/role', values, {successTip: successTip})
                    .then(() => {
                        if(refresh) refresh();
                        this.getIdentification();
                    })
                    .finally(() =>{
                        this.setState({loading: false})


                    })

            }


        });

        if (onOk) onOk();


    }

    handleCancel = () => {
        const {onCancel} = this.props;
        if (onCancel) onCancel();
    }

    FormElement = (props) => <FormElement form={this.props.form} labelCol={{span: 7}}   {...props}/>;

    render() {
        const {visible, local, selectedRole, treeData, powerValue,ruleValue,ruleData} = this.props;
        const {loading} = this.state;

        const FormElement = this.FormElement;


        return (
            <Modal
                destroyOnClose
                // width="70%"
                confirmLoading={loading}
                visible={visible}
                title={selectedRole.id ? local.editRole : local.addRole}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading}>
                    <Form>
                        {selectedRole.id ? (
                            <FormElement type="hidden" field="id" decorator={{initialValue: selectedRole.id}}/>) : null}
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label={local.name}
                                    field="name"
                                    decorator={{
                                        initialValue: selectedRole.name,
                                        rules: [
                                            {required: true, message: ''}
                                        ],
                                    }}
                                />
                                <FormElement
                                    label={local.description}
                                    type="input"
                                    field="describe"
                                    decorator={{
                                        initialValue: selectedRole.describe,
                                    }}
                                />
                                <FormElement
                                    label="ElementPower"
                                    field="elements"
                                    type="select-tree"
                                    options={treeData}
                                    treeCheckable={true}
                                    placeholder={""}
                                    // showCheckedStrategy={SHOW_PARENT}
                                    // searchPlaceholder="Please select"
                                    value={powerValue}
                                    onChange={this.onPowerChange}
                                    decorator={{initialValue: powerValue}}
                                />
                                <FormElement
                                    mode="multiple"
                                    label="dataRules"
                                    field="dataRules"
                                    type="select"
                                    options={ruleData}
                                    placeholder={""}
                                    // showCheckedStrategy={SHOW_PARENT}
                                    // searchPlaceholder="Please select"
                                    value={ruleValue}
                                    // onChange={this.onPowerChange}
                                    decorator={{initialValue: ruleValue}}
                                />
                                {/*<TreeSelect offset={7} {...tProps} />;*/}


                            </Col>

                        </Row>
                    </Form>

                </Spin>
            </Modal>
        );
    }
}
