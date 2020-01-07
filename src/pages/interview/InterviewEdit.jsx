import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class InterviewEdit extends Component {
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
            .get(`/interview?Id=${encodeURIComponent(id)}`)
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
            ajax(`/interview`, params)
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
        const title = data.id ? '修改interview' : '添加interview';
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
                            label="回访ID"
                            type="hidden"
                            field="StudentSubId"
                            decorator={{
                                initialValue: data.StudentSubId,
                                rules: [
                                    {required: true, message: '回访ID不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学生名"
                            type="input"
                            field="StudentName"
                            decorator={{
                                initialValue: data.StudentName,
                                rules: [
                                    {required: true, message: '学生名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="内容"
                            type="input"
                            field="Content"
                            decorator={{
                                initialValue: data.Content,
                                rules: [
                                    {required: true, message: '内容不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="结果"
                            type="input"
                            field="Result"
                            decorator={{
                                initialValue: data.Result,
                                rules: [
                                    {required: true, message: '结果不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="得分"
                            type="input"
                            field="Score"
                            decorator={{
                                initialValue: data.Score,
                                rules: [
                                    {required: true, message: '得分不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="登记人"
                            type="input"
                            field="RegisterUserName"
                            decorator={{
                                initialValue: data.RegisterUserName,
                                rules: [
                                    {required: true, message: '登记人不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="备注"
                            type="input"
                            field="Memo"
                            decorator={{
                                initialValue: data.Memo,
                                rules: [
                                    {required: true, message: '备注不能为空！'},
                                ],
                            }}
                        />
    
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
