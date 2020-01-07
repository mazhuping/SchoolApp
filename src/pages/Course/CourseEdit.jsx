import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class CourseEdit extends Component {
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
            .get(`/Course?Id=${encodeURIComponent(id)}`)
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
            ajax(`/Course`, params)
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
        const title = data.id ? '修改Course' : '添加Course';
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
                            label="课程ID"
                            type="hidden"
                            field="CourseID"
                            decorator={{
                                initialValue: data.CourseID,
                                rules: [
                                    {required: true, message: '课程ID不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="课程名"
                            type="input"
                            field="CourseName"
                            decorator={{
                                initialValue: data.CourseName,
                                rules: [
                                    {required: true, message: '课程名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学校"
                            type="select"
                            field="SchoolID"
                            decorator={{
                                initialValue: data.SchoolID,
                                rules: [
                                    {required:true , message: '学校不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="主教师"
                            type="select"
                            field="MainTeacherUserID"
                            decorator={{
                                initialValue: data.MainTeacherUserID,
                                rules: [
                                    {required: true, message: '主教师不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="外教"
                            type="select"
                            field="ClassAdviserUserID"
                            decorator={{
                                initialValue: data.ClassAdviserUserID,
                                rules: [
                                    {required: true, message: '外教不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="辅助教师"
                            type="select"
                            field="AssentTeacherUserID"
                            decorator={{
                                initialValue: data.AssentTeacherUserID,
                                rules: [
                                    {required: true, message: '辅助教师不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="阅读教师"
                            type="select"
                            field="ReadingTeacherUserID"
                            decorator={{
                                initialValue: data.ReadingTeacherUserID,
                                rules: [
                                    {required: true, message: '阅读教师不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="年级"
                            type="input"
                            field="Grade"
                            decorator={{
                                initialValue: data.Grade,
                                rules: [
                                    {required: true, message: '年级不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="当前/预招"
                            type="input"
                            field="Num4Stu"
                            decorator={{
                                initialValue: data.Num4Stu,
                                rules: [
                                    {required: true, message: '当前/预招不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="消耗/计划"
                            type="input"
                            field="StudyHourNow"
                            decorator={{
                                initialValue: data.StudyHourNow,
                                rules: [
                                    {required: true, message: '消耗/计划不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="开课时间"
                            type="input"
                            field="BeginDate"
                            decorator={{
                                initialValue: data.BeginDate,
                                rules: [
                                    {required: true, message: '开课时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="上课时间"
                            type="input"
                            field="CoursePlans"
                            decorator={{
                                initialValue: data.CoursePlans,
                                rules: [
                                    {required: true, message: '上课时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="创建时间"
                            type="input"
                            field="CreatedOn"
                            decorator={{
                                initialValue: data.CreatedOn,
                                rules: [
                                    {required: true, message: '创建时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="课程类型"
                            type="select"
                            field="ClassType_DCID"
                            decorator={{
                                initialValue: data.ClassType_DCID,
                                rules: [
                                    {required: true, message: '课程类型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="课程级别"
                            type="input"
                            field="Grade_DCID"
                            decorator={{
                                initialValue: data.Grade_DCID,
                                rules: [
                                    {required: true, message: '课程级别不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="收费标准"
                            type="number"
                            field="StandAmount"
                            decorator={{
                                initialValue: data.StandAmount,
                                rules: [
                                    {required: true, message: '收费标准不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="预招人数"
                            type="number"
                            field="NumberOfStudent"
                            decorator={{
                                initialValue: data.NumberOfStudent,
                                rules: [
                                    {required: true, message: '预招人数不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="计划课时"
                            type="number"
                            field="StudyHour"
                            decorator={{
                                initialValue: data.StudyHour,
                                rules: [
                                    {required: true, message: '计划课时不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="教材"
                            type="input"
                            field="TextBookName"
                            decorator={{
                                initialValue: data.TextBookName,
                                rules: [
                                    {required:true , message: '教材不能为空！'},
                                ],
                            }}
                        />
    
                    </Form>
                </Spin>
            </Modal>
        );
    }
}
