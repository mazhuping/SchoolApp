import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class StudentEdit extends Component {
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
            .get(`/Student?Id=${encodeURIComponent(id)}`)
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
            ajax(`/Student`, params)
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
        const title = data.id ? '修改Student' : '添加Student';
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
                            label="学生ID"
                            type="input"
                            field="StudentId"
                            decorator={{
                                initialValue: data.StudentId,
                                rules: [
                                    {required: true, message: '学生ID不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学号"
                            type="input"
                            field="ClassRollNo"
                            decorator={{
                                initialValue: data.ClassRollNo,
                                rules: [
                                    {required: true, message: '学号不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="姓名"
                            type="input"
                            field="Name"
                            decorator={{
                                initialValue: data.Name,
                                rules: [
                                    {required: true, message: '姓名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="生日"
                            type="date"
                            field="Brithday"
                            decorator={{
                                initialValue: data.Brithday,
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
                            label="就读学校"
                            type="select"
                            field="School"
                            decorator={{
                                initialValue: data.School,
                                rules: [
                                    {required: true, message: '就读学校不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="年级"
                            type="select"
                            field="Grade"
                            decorator={{
                                initialValue: data.Grade,
                                rules: [
                                    {required: true, message: '年级不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="VIP类型"
                            type="select"
                            field="VIP_DCID"
                            decorator={{
                                initialValue: data.VIP_DCID,
                                rules: [
                                    {required: true, message: 'VIP类型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="入学时间"
                            type="date"
                            field="AdmissionDate"
                            decorator={{
                                initialValue: data.AdmissionDate,
                                rules: [
                                    {required: true, message: '入学时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="联系人"
                            type="input"
                            field="EmergencyContact1Name"
                            decorator={{
                                initialValue: data.EmergencyContact1Name,
                                rules: [
                                    {required: true, message: '联系人不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="联系电话"
                            type="mobile"
                            field="EmergencyContact1MobilePhone"
                            decorator={{
                                initialValue: data.EmergencyContact1MobilePhone,
                                rules: [
                                    {required: true, message: '联系电话不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="母亲姓名"
                            type="input"
                            field="MotherName"
                            decorator={{
                                initialValue: data.MotherName,
                                rules: [
                                    {required: true, message: '母亲姓名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="母亲电话"
                            type="mobile"
                            field="MotherMobilePhone"
                            decorator={{
                                initialValue: data.MotherMobilePhone,
                                rules: [
                                    {required: true, message: '母亲电话不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="母亲工作单位"
                            type="input"
                            field="MotherCompany"
                            decorator={{
                                initialValue: data.MotherCompany,
                                rules: [
                                    {required: true, message: '母亲工作单位不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="母亲职位"
                            type="input"
                            field="MotherJob"
                            decorator={{
                                initialValue: data.MotherJob,
                                rules: [
                                    {required: true, message: '母亲职位不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="父亲姓名"
                            type="input"
                            field="FatherName"
                            decorator={{
                                initialValue: data.FatherName,
                                rules: [
                                    {required: true, message: '父亲姓名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="父亲电话"
                            type="mobile"
                            field="FatherMobilePhone"
                            decorator={{
                                initialValue: data.FatherMobilePhone,
                                rules: [
                                    {required: true, message: '父亲电话不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="父亲工作单位"
                            type="input"
                            field="FatherCompany"
                            decorator={{
                                initialValue: data.FatherCompany,
                                rules: [
                                    {required: true, message: '父亲工作单位不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="父亲职位"
                            type="input"
                            field="FatherJob"
                            decorator={{
                                initialValue: data.FatherJob,
                                rules: [
                                    {required:true , message: '父亲职位不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="省份"
                            type="select"
                            field="ProvinceId"
                            decorator={{
                                initialValue: data.ProvinceId,
                                rules: [
                                    {required:true , message: '省份不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="城市"
                            type="select"
                            field="CityId"
                            decorator={{
                                initialValue: data.CityId,
                                rules: [
                                    {required: true, message: '城市不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="详细地址"
                            type="input"
                            field="DetailedAddress"
                            decorator={{
                                initialValue: data.DetailedAddress,
                                rules: [
                                    {required: true, message: '详细地址不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="公立学校"
                            type="input"
                            field="publicSchoolAndGrade"
                            decorator={{
                                initialValue: data.publicSchoolAndGrade,
                                rules: [
                                    {required:true , message: '公立学校不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="家庭地址"
                            type="input"
                            field="Address"
                            decorator={{
                                initialValue: data.Address,
                                rules: [
                                    {required: true, message: '家庭地址不能为空！'},
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
