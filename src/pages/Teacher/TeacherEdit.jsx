import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class TeacherEdit extends Component {
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
            .get(`/Teacher?Id=${encodeURIComponent(id)}`)
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
            ajax(`/Teacher`, params)
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
        const title = data.id ? '修改Teacher' : '添加Teacher';
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
                            label="教师ID"
                            type="hidden"
                            field="EmployeeId"
                            decorator={{
                                initialValue: data.EmployeeId,
                                rules: [
                                    {required: true, message: '教师ID不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="教师名"
                            type="input"
                            field="Name"
                            decorator={{
                                initialValue: data.Name,
                                rules: [
                                    {required: true, message: '教师名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="生日"
                            type="date"
                            field="Birthday"
                            decorator={{
                                initialValue: data.Birthday,
                                rules: [
                                    {required: true, message: '生日不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="性别"
                            type="select"
                            field="Gender"
                            decorator={{
                                initialValue: data.Gender,
                                rules: [
                                    {required: true, message: '性别不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="手机号码"
                            type="mobile"
                            field="ContactNo1"
                            decorator={{
                                initialValue: data.ContactNo1,
                                rules: [
                                    {required:true , message: '手机号码不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="入职时间"
                            type="date"
                            field="EntryDate"
                            decorator={{
                                initialValue: data.EntryDate,
                                rules: [
                                    {required: true, message: '入职时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="婚姻状况"
                            type="select"
                            field="MaritalStatus"
                            decorator={{
                                initialValue: data.MaritalStatus,
                                rules: [
                                    {required: true, message: '婚姻状况不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="血型"
                            type="select"
                            field="BloodGroup"
                            decorator={{
                                initialValue: data.BloodGroup,
                                rules: [
                                    {required: true, message: '血型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="微信"
                            type="select"
                            field="UserInfoId"
                            decorator={{
                                initialValue: data.UserInfoId,
                                rules: [
                                    {required: true, message: '微信不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="邮箱"
                            type="email"
                            field="Email"
                            decorator={{
                                initialValue: data.Email,
                                rules: [
                                    {required: true, message: '邮箱不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="省份"
                            type="select"
                            field="CurrenttProvinceId"
                            decorator={{
                                initialValue: data.CurrenttProvinceId,
                                rules: [
                                    {required:true , message: '省份不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="城市"
                            type="select"
                            field="CurrentCityId"
                            decorator={{
                                initialValue: data.CurrentCityId,
                                rules: [
                                    {required: true, message: '城市不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="现居地址"
                            type="input"
                            field="CurrentAddress"
                            decorator={{
                                initialValue: data.CurrentAddress,
                                rules: [
                                    {required: true, message: '现居地址不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="省份"
                            type="select"
                            field="PermanentProvinceId"
                            decorator={{
                                initialValue: data.PermanentProvinceId,
                                rules: [
                                    {required: true, message: '省份不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="城市"
                            type="select"
                            field="PermanentCityId"
                            decorator={{
                                initialValue: data.PermanentCityId,
                                rules: [
                                    {required: true, message: '城市不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="家庭住址"
                            type="input"
                            field="PermanentAddress"
                            decorator={{
                                initialValue: data.PermanentAddress,
                                rules: [
                                    {required: true, message: '家庭住址不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="备注"
                            type="input"
                            field="Note"
                            decorator={{
                                initialValue: data.Note,
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
