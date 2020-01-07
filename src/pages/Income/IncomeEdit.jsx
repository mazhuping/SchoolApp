import React, {Component} from 'react';
import {Modal, Form, Spin} from 'antd';
import config from '@/commons/config-hoc';
import {FormElement} from '@/library/antd';

@config({
    ajax: true,
})
@Form.create()
export default class IncomeEdit extends Component {
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
            .get(`/Income?Id=${encodeURIComponent(id)}`)
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
            ajax(`/Income`, params)
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
        const title = data.id ? '修改Income' : '添加Income';
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
                            label="学生姓名"
                            type="select"
                            field="StudentId"
                            decorator={{
                                initialValue: data.StudentId,
                                rules: [
                                    {required: true, message: '学生姓名不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="缴费类型"
                            type="select"
                            field="PayReasonTypeID"
                            decorator={{
                                initialValue: data.PayReasonTypeID,
                                rules: [
                                    {required: true, message: '缴费类型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="教材"
                            type="input"
                            field="Textbook"
                            decorator={{
                                initialValue: data.Textbook,
                                rules: [
                                    {required: true, message: '教材不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="数量"
                            type="number"
                            field="TextbookCount"
                            decorator={{
                                initialValue: data.TextbookCount,
                                rules: [
                                    {required: true, message: '数量不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="支付方式"
                            type="select"
                            field="PaymentType_DCID"
                            decorator={{
                                initialValue: data.PaymentType_DCID,
                                rules: [
                                    {required: true, message: '支付方式不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="收据编号"
                            type="input"
                            field="PaySeriaNo"
                            decorator={{
                                initialValue: data.PaySeriaNo,
                                rules: [
                                    {required: true, message: '收据编号不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="支付时间"
                            type="date"
                            field="PayDate"
                            decorator={{
                                initialValue: data.PayDate,
                                rules: [
                                    {required: true, message: '支付时间不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="实付金额"
                            type="number"
                            field="PayAmount"
                            decorator={{
                                initialValue: data.PayAmount,
                                rules: [
                                    {required: true, message: '实付金额不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="课程类型"
                            type="select"
                            field="CourseID"
                            decorator={{
                                initialValue: data.CourseID,
                                rules: [
                                    {required: true, message: '课程类型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学生类型"
                            type="select"
                            field="StuTypeID"
                            decorator={{
                                initialValue: data.StuTypeID,
                                rules: [
                                    {required: true, message: '学生类型不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="强制为新生"
                            type="switch"
                            field="IsCheck"
                            decorator={{
                                initialValue: data.IsCheck,
                                rules: [
                                    {required: true, message: '强制为新生不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="购买课时"
                            type="number"
                            field="ClassHourBuy"
                            decorator={{
                                initialValue: data.ClassHourBuy,
                                rules: [
                                    {required: true, message: '购买课时不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="赠送课时"
                            type="number"
                            field="ClassHourFree"
                            decorator={{
                                initialValue: data.ClassHourFree,
                                rules: [
                                    {required: true, message: '赠送课时不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="欠款金额"
                            type="number"
                            field="DebtAmount"
                            decorator={{
                                initialValue: data.DebtAmount,
                                rules: [
                                    {required: true, message: '欠款金额不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="课时单价"
                            type="number"
                            field="Average"
                            decorator={{
                                initialValue: data.Average,
                                rules: [
                                    {required: true, message: '课时单价不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="代金券"
                            type="input"
                            field="Voucher"
                            decorator={{
                                initialValue: data.Voucher,
                                rules: [
                                    {required: true, message: '代金券不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学习顾问"
                            type="select"
                            field="StudyAdviser"
                            decorator={{
                                initialValue: data.StudyAdviser,
                                rules: [
                                    {required: true, message: '学习顾问不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="赠送礼物"
                            type="input"
                            field="Present"
                            decorator={{
                                initialValue: data.Present,
                                rules: [
                                    {required: true, message: '赠送礼物不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="学生来源"
                            type="select"
                            field="StudentSource"
                            decorator={{
                                initialValue: data.StudentSource,
                                rules: [
                                    {required: true, message: '学生来源不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="转介绍老师"
                            type="select"
                            field="RecommendUserID"
                            decorator={{
                                initialValue: data.RecommendUserID,
                                rules: [
                                    {required: true, message: '转介绍老师不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="转介绍人"
                            type="input"
                            field="RecommendPeople"
                            decorator={{
                                initialValue: data.RecommendPeople,
                                rules: [
                                    {required: true, message: '转介绍人不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="转介绍人手机"
                            type="input"
                            field="RecommendUserPhone"
                            decorator={{
                                initialValue: data.RecommendUserPhone,
                                rules: [
                                    {required: true, message: '转介绍人手机不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="带班老师"
                            type="select"
                            field="ClassAdviserUserID"
                            decorator={{
                                initialValue: data.ClassAdviserUserID,
                                rules: [
                                    {required: true, message: '带班老师不能为空！'},
                                ],
                            }}
                        />
    
                        <FormElement
                            label="班级号"
                            type="select"
                            field="ClassNo"
                            decorator={{
                                initialValue: data.ClassNo,
                                rules: [
                                    {required: true, message: '班级号不能为空！'},
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
