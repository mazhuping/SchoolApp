import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class SchoolEdit extends Component {
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
            .get(`/school?Id=${encodeURIComponent(id)}`)
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
            ajax('/roles', params)
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
        const title = data.id ? '修改school' : '添加school';
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
                            label="学校ID"
                            type="hidden"
                            field="SchoolID"
                            decorator={{
                                initialValue: data.SchoolID,
                                rules: [
                                    {required: true, message: '学校ID不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学校名"
                            type="input"
                            field="Name"
                            decorator={{
                                initialValue: data.Name,
                                rules: [
                                    {required: true, message: '学校名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="地址"
                            type="input"
                            field="Address"
                            decorator={{
                                initialValue: data.Address,
                                rules: [
                                    {required: true, message: '地址不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="联系电话"
                            type="mobile"
                            field="Phone"
                            decorator={{
                                initialValue: data.Phone,
                                rules: [
                                    {required: true, message: '联系电话不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="分校区管理员"
                            type="select"
                            field="Leader"
                            decorator={{
                                initialValue: data.Leader,
                                rules: [
                                    {required: true, message: '分校区管理员不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="办公电话"
                            type="mobile"
                            field="OfficePhone"
                            decorator={{
                                initialValue: data.OfficePhone,
                                rules: [
                                    {required: true, message: '办公电话不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学校代码"
                            type="input"
                            field="SchoolCode"
                            decorator={{
                                initialValue: data.SchoolCode,
                                rules: [
                                    {required: true, message: '学校代码不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="是否激活"
                            type="switch"
                            field="IsActive"
                            decorator={{
                                initialValue: data.IsActive,
                                rules: [
                                    {required: true, message: '是否激活不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="是否删除"
                            type="switch"
                            field="IsDeleted"
                            decorator={{
                                initialValue: data.IsDeleted,
                                rules: [
                                    {required: true, message: '是否删除不能为空！'},
                                ],
                            }}
                        />
    
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
