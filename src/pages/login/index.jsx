import React, {Component} from 'react'
import {Helmet} from 'react-helmet';
import {Form, Icon, Input, Button, Row, Col,Captcha} from 'antd';
import {setLoginUser} from '@/commons';
import config from '@/commons/config-hoc';
import Local from '@/layouts/header-i18n';
import Color from '@/layouts/header-color-picker';
import {ROUTE_BASE_NAME} from '@/router/AppRouter';
import {sxAjax, ajax} from '@/commons/ajax'
import './style.less'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@Form.create()

//后台分页，修改API参数，同时确定要哪个字段作为排序字段，是全部还是某个
//后台数据的一个默认排序问题，是一致都默认根据创建时间排序还是在添加的时候才那样做？

@config({
    path: '/login',
    noFrame: true,
    noAuth: true,
    keepAlive: false,
    connect(state) {
        return {local: state.system.i18n.login}
    },
    ajax: true,
})
export default class extends Component {
    state = {
        loading: false,
        message: '',
        captcha:'/api/captcha'
    };

    componentDidMount() {
        const {form: {validateFields, setFieldsValue}} = this.props;
        // 一开始禁用提交按钮
        validateFields(() => void 0);

        // 开发时方便测试，填写表单
        if (process.env.NODE_ENV === 'development') {
            setFieldsValue({userName: 'admin1', password: 'q1w2e3r4!@#$A'});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true, message: ''});



                // TODO 发送请求进行登录，一下为前端硬编码，模拟请求
                const {userName, password} = values;
                const {local} = this.props;
                const params = {
                    userName: userName,
                    password: password
                };

                this.setState({loading: true});


                this.props.ajax
                    .post(`/Account/Login`, params)
                    .then(res => {
                        // console.log(`token:${res.token}`)
                        setLoginUser({
                            id: userName,
                            name: userName,
                            token: res.token,
                            // menu:res.routes,
                            permissions:res.identifycations,
                        });

                        // 跳转页面，优先跳转上次登出页面
                        const lastHref = window.sessionStorage.getItem('last-href');

                        // 强制跳转 进入系统之后，需要一些初始化工作，需要所有的js重新加载
                        // window.location.href = lastHref || `${ROUTE_BASE_NAME}/`;
                        window.location.href = '/kafkahandle';
                        
                        // this.props.history.push(lastHref || '/');
                    })
                    .finally(err => {
                        this.setState({loading: false});
                    });

                // setTimeout(() => {
                //     this.setState({loading: false});
                //
                //     // 当需要指定登陆用户时，前端可以写死
                //     let userA = userName === 'admin' && password === '111';
                //     let userB = userName === 'admin2' && password === '222';
                //     if (userA || userB) {
                //         setLoginUser({
                //             id: 'tempUserId',
                //             name: 'Admin',
                //         });
                //         // 跳转页面，优先跳转上次登出页面
                //         const lastHref = window.sessionStorage.getItem('last-href');
                //
                //         // 强制跳转 进入系统之后，需要一些初始化工作，需要所有的js重新加载
                //         window.location.href = lastHref || `${ROUTE_BASE_NAME}/`;
                //         // this.props.history.push(lastHref || '/');
                //     } else {
                //         this.setState({message: '用户名或密码错误！'});
                //     }
                // }, 1000)
            }
        });
    };

    getBase64=(img)=>{
        const base64Url = `data:image/png;base64,${window.btoa(
            new Uint8Array(img).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
            )
        )}`;
        return base64Url;
    }

    refreshCaptcha = (e) => {


        // fetch('/api/Captcha', {
        //         method: 'GET',
        //         responseType: 'blob',
        //         observe: 'response'
        //         // headers:{
        //         //     'Accept': 'application/json',
        //         //     'Content-Type': 'application/json'
        //         // }
        //     })
        //         .then(response => {
        //             let codeId2 = response.headers.get('CaptchaCodeId');
        //             console.log(`${codeId2}`)
        //                     // that.loginModel.captchaCodeId = codeId;
        //
        //             let image = response.body;  // 获取blob
        //
        //             console.log(image)
        //
        //
        //             this.setState({
        //                     captcha: image
        //                 })
        //
        //         })
        //         .then(data => {
        //             console.log(data);
        //         })
        //         .catch(e => console.log('错误:', e))
        //         .finally(() => this.setState({loading: false}));
        this.setState({loading: true});
        this.props.ajax
            .get('/Captcha',{},{responseType: "arraybuffer"})
            .then(response => {


                // let codeId2 = response.headers.get('CaptchaCodeId');
                // let codeId = response.headers.captchacodeid;
                //
                // // that.loginModel.captchaCodeId = codeId;
                // console.log(`${codeId},${codeId2}`)
                //
                // alert(codeId)
                // let image = response.body;  // 获取blob
                // let str = URL.createObjectURL(image);
                // let url = this.sanitizer.bypassSecurityTrustUrl(str); // url安全转换
                // that.imagesrc = url;

                this.setState({
                    captcha: response
                })
            })
            .finally(this.setState({loading: false}));

        // e.preventDefault();
        // let imgCodePath = this.state.captcha.split('?')[0] +'?id='+parseInt(Math.random()*100000);
        // this.setState({
        //     captcha:imgCodePath
        // })

    }

    render() {
        const {local} = this.props;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const {loading, message,captcha} = this.state;

        // Only show error after a field is touched.
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        // const captchaError = isFieldTouched('captcha') && getFieldError('captcha');

        return (
            <div styleName="root" className="login-bg">

                <Helmet
                    title={local.title}
                />

                <div styleName="menu">
                    <Color/>
                    <Local style={{color: '#fff'}}/>
                </div>
                {/*<div styleName="logo"/>*/}
                {/*<div styleName="note"/>*/}
                <div styleName="box">
                    <div styleName="header">{local.title}</div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            validateStatus={userNameError ? 'error' : ''}
                            help={userNameError || ''}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: local.userNameEmptyTip}],
                            })(
                                <Input allowClear autoFocus prefix={<Icon type="user" style={{fontSize: 13}}/>}
                                       placeholder="用户名1" />
                            )}
                        </Form.Item>
                        <Form.Item
                            validateStatus={passwordError ? 'error' : ''}
                            help={passwordError || ''}
                        >
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: local.passwordEmptyTip}],
                            })(
                                <Input.Password prefix={<Icon type="lock" style={{fontSize: 13}}/>}  placeholder="密码"/>
                            )}
                        </Form.Item>
                        {/*<Form.Item*/}
                        {/*validateStatus={captchaError ? 'error' : ''}*/}
                        {/*help={captchaError || ''}*/}
                        {/*>*/}
                        {/*<Row>*/}
                        {/*<Col span={10}>*/}
                        {/*{getFieldDecorator('captcha', {*/}
                        {/*rules: [{required: true, message: local.captchaEmptyTip}],*/}
                        {/*})(*/}
                        {/*<Input  placeholder="captcha" />*/}
                        {/*)}*/}
                        {/*</Col>*/}
                        {/*<Col span={5} offset={4}>*/}
                        {/*<img style={{marginBottom:4}}   src={captcha}  onClick={this.refreshCaptcha}/>*/}
                        {/*</Col>*/}
                        {/*</Row>*/}
                        {/*</Form.Item>*/}

                        <Button
                            styleName="submit-btn"
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            disabled={hasErrors(getFieldsError())}
                        >
                            {local.submit}
                        </Button>
                    </Form>
                    <div styleName="error-tip">{message}</div>
                    {/*<div styleName="tip">*/}
                    {/*<span>{local.userName}：admin </span>*/}
                    {/*<span>{local.password}：111</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

