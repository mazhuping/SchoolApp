import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class ApiFunctionEdit extends Component {
    state = {
        loading: false,
        data: {},
    };

    componentDidUpdate(prevProps) {
        const {visible, form: {resetFields}} = this.props;

        // 打开弹框
        if (!prevProps.visible && visible) {
            // 重置表单，接下来填充新的数据
            resetFields();

            // 重新获取数据
            this.fetchData();
        }
    }

    fetchData() {
        const {id} = this.props;

        // 添加操作
        if (!id) return this.setState({data: {}});

        // 修改操作
        // TODO 根据id 发送ajax请求获取数据
        this.setState({loading: true});
        this.props.ajax
            .get(`/GetFunById/?Id=${encodeURIComponent(id)}`)
            .then(res => {
                this.setState({data: res});
            })
            .finally(() => this.setState({loading: false}));
    }

    handleOk = () => {
        const {loading} = this.state;
        if (loading) return;
        const {onOk, form: {validateFieldsAndScroll}} = this.props;

        validateFieldsAndScroll((err, values) => {
            if (err) return ;

            const params = {...values};
            const {id} = values;

            // TODO ajax 提交数据
            // id存在未修改，不存在未添加
            const ajax = id ? this.props.ajax.put : this.props.ajax.post;

            this.setState({loading: true});
            ajax('/function', params)
                .then(() => {
                    if (onOk) onOk();
                })
                .finally(() => this.setState({loading: false}));
        });
    };

    handleCancel = () => {
        const {onCancel} = this.props;
        if (onCancel) onCancel();
    };


    handleReset = () => {
        this.props.form.resetFields();
    };

    FormElement = (props) => <FormElement form={this.props.form} labelWidth={100} {...props}/>;

    render() {
        const {visible} = this.props;
        const {loading, data} = this.state;
        const title = data.id ? '修改apiFunction' : '添加apiFunction';
        const FormElement = this.FormElement;

        return (
            <Modal
                destroyOnClose
                confirmLoading={loading}
                visible={visible}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Spin spinning={loading}>
                    <Form>
                        {data.id ? (<FormElement type="hidden" field="id" decorator={{initialValue: data.id}}/>) : null}
    
                        <FormElement
                            label="name"
                            type="input"
                            field="name"
                            decorator={{
                                initialValue: data.name,
                                rules: [
                                    {required: true, message: 'name不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="controller"
                            type="input"
                            field="controller"
                            decorator={{
                                initialValue: data.controller,
                                rules: [
                                    {required: true, message: 'controller不能为空！'},
                                ],
                            }}
                        />
                        <FormElement
                            label="type"
                            type="input"
                            field="type"
                            decorator={{
                                initialValue: data.type,
                                rules: [
                                    {required: true, message: 'type不能为空！'},
                                ],
                            }}
                        />

                        <FormElement
                            label="address"
                            type="input"
                            field="address"
                            decorator={{
                                initialValue: data.address,
                                rules: [
                                    {required: true, message: 'address不能为空！'},
                                ],
                            }}
                        />
    

    
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
