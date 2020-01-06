import React, {Component} from 'react';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import {RuleComponent, FormElement} from '@/library/antd';
import {newGuid} from '@/library/utils';
import {Table, message, Modal, Form, Card, Row, Col, Button, Select, Popconfirm, List} from 'antd';

import './style.less';

const { confirm } = Modal;
@config({
    ajax: true,
    path:'/ruleManage',
    connect(state) {
        return {local: state.system.i18n.roles}
    }
})




@Form.create()
export default class  extends Component {
    state = {
        loading: false,
        selectedRuleGroup:{},
        allContextData:[],
        allEntityData:[],
        allFieldData:[],
        selectedContext:"",
        selectedEntity:"",
        ruleGroups: [],
        ruleGroup:{},
        rules:[],
        ruleConditions:[],
        ruleOptions:[],
        isRuleShow:false,
        findedRule:{},
    };





    componentDidMount() {
        this.getRuleGroup();
        this.getAllDBContext();
        this.initEntityData();

    }

    componentDidUpdate(prevProps) {

    }

    getRuleGroup=()=>{
        this.setState({loading:false});
        this.props.ajax
            .get('/ruleGroup')
            .then(res=>{
                this.setState({ruleGroups:res})
            })
            .finally({loading:false});
    }

    getAllDBContext=()=>{
        this.setState({loading:false});
        this.AllContext=[];
        this.props.ajax
            .get('/GetDbContexts')
            .then(res=>{
                res.forEach(item => {
                    this.AllContext.push({
                        value: item,
                        label: item,
                    });

                })
            })
            .finally(()=>{
                this.setState({loading:false,allContextData:this.AllContext})
            });
    };

    initEntityData=()=>{
        this.setState({loading:false});
        this.entityData=[];
        this.props.ajax
            .get('/entities')
            .then(res=>{
                this.entityData = res;
            })
            .finally(()=>{
                this.setState({loading:false})
            });
    }

    contextChange=(value)=>{
        this.setState({loading:false});
        let ruleGroup=this.state.ruleGroup;
        ruleGroup.dbContext=value;
        this.setState({ruleGroup:ruleGroup});
        this.tableByContext=[];
        this.props.ajax
            .get(`/GetTablesByDbContext?context=${encodeURIComponent(value)}`)
            .then(res=>{
                res.forEach(item => {
                    this.tableByContext.push({
                        value: item,
                        label: item,
                    });

                });
            })
            .finally(()=>{
                this.setState({loading:false,allEntityData:this.tableByContext,selectedContext:value})
            });
    }
    tableChange=(value)=>{
        this.setState({loading:false});
        this.fieldByTable=[];
        let ruleGroup=this.state.ruleGroup;
        ruleGroup.entity=value;
        this.setState({ruleGroup:ruleGroup});
        this.props.ajax
            .get(`/GetFeildsByDbAndTb?context=${encodeURIComponent(this.state.selectedContext)}&table=${encodeURIComponent(value)}`)
            .then(res=>{
                res.forEach(item => {
                    this.fieldByTable.push({
                        value: item,
                        label: item,
                    });

                });
            })
            .finally(()=>{
                this.setState({loading:false,allFieldData:this.fieldByTable,selectedEntity:value})
            });

    };
    tableChange2=(dbContext,value)=>{
        this.setState({loading:false});
        this.fieldByTable=[];
        this.props.ajax
            .get(`/GetFeildsByDbAndTb?context=${encodeURIComponent(dbContext)}&table=${encodeURIComponent(value)}`)
            .then(res=>{
                res.forEach(item => {
                    this.fieldByTable.push({
                        value: item,
                        label: item,
                    });

                });
            })
            .finally(()=>{
                this.setState({loading:false,allFieldData:this.fieldByTable,selectedEntity:value})
            });

    };

    // 添加规则组
    addRuleGroup=()=> {
        let tempOption={ guid: newGuid(), childCondition: [], childRuleOption: [], combineType: '1' };
        let tempGroup={ guid: newGuid(), name: '', dbContext: null, entity: null };
        this.setState({ruleOptions:tempOption,ruleGroup:tempGroup,isRuleShow:true})
    };


    // 删除规则组
    delete=(item) =>{
        const that=this;
        confirm({
            title: 'DelRuleGroup',
            content: `Do you want to DelRuleGroup 【${item.name}】?`,
            onOk() {
                that.delRuleGroup(item.id);
            },
            onCancel() {},
        });

    }

    delRuleGroup=(id)=>{
        this.props.ajax
            .del(`/ruleGroup?Id=${encodeURIComponent(id)}`)
            .then(res=>{
                this.getRuleGroup();
            })
            .finally({})
    };

    editRuleGroup=(id)=>{
        this.props.ajax
            .get(`/ruleDetail?Id=${encodeURIComponent(id)}`)
            .then(res=>{
                this.setState({
                    ruleGroup:res.ruleGroup,
                    rules:res.rules,
                    ruleConditions:res.ruleConditions,
                    isRuleShow:true,
                });
                this.initOption(res.rules,res.ruleConditions);
                this.contextChange(res.ruleGroup.dbContext);
                this.tableChange2(res.ruleGroup.dbContext,res.ruleGroup.entity);
            })
    };

    // 初始化数据结构
    initOption=(rules,ruleConditions)=> {
        // 构造规则
        for (let index in rules) {
            let rule=rules[index];
            // 第一级规则
            if (!rule.upRuleGuid) {
                let tempOption={ guid: rule.guid, childRuleOption: [], childCondition: [], combineType: rule.combineType };
                this.setState({ruleOptions:tempOption})
                this.pushRule(rule.guid);
            }
        }


        // 构造条件
        for (let index in ruleConditions) {
            let condition=ruleConditions[index];

            let ruleOption = this.findRuleById(condition.ruleGuid);

            ruleOption.childCondition.push({
                guid: newGuid(), field: condition.field, operateType: condition.operateType, value: condition.value
            });
        }

    };
    // 构造规则
    pushRule=(guid)=> {
        let ruleOption = this.findRuleById(guid);
        let childs = this.state.rules.filter(rule => rule.upRuleGuid === guid);
        childs.forEach(element => {
            ruleOption.childRuleOption.push({ guid: element.guid, childRuleOption: [], childCondition: [], combineType: element.combineType });
            this.pushRule(element.guid);
        });
    }
    // 根据id查找规则对应的节点
    findRuleById=(guid)=> {
        this.findRule(this.state.ruleOptions, guid);
        return  this.findedRule;
    };

    findRule=(option, guid)=> {
        if (option.guid === guid) {
            this.findedRule = option;
        } else {
            if (option.childRuleOption) {
                option.childRuleOption.forEach(o => {
                    this.findRule(o, guid);
                });
            }
        }
    };

    // 保存规则组
    saveRule=(e)=> {
        // const upperOption=this.upperOption;

        const {ruleGroup,ruleOptions}=this.state;
        const {resetFields} = this.props.form;
        e.preventDefault();


        // if (!ruleGroup.name) {
        //     message.error("请输入规则组名称！");
        //     return;
        // }
        if (ruleOptions.childCondition.length === 0) {
            message.error("请输入内容！");
            return;
        }

        if (!this.isRuleValid()) {
            message.error("请确认所有规则内容的完整！");
            return;
        }

        if (!this.isConditionValid()) {
            message.error("请确认所有条件的完整！");
            return;
        }

        let rs = [];
        let rConditions = [];
        let rGroup = { guid: newGuid(), name: '', dbContext: null, entity: null };;

        Object.assign(rGroup, ruleGroup);

        // 做成规则
        rs.push({ guid: ruleOptions.guid, upRuleGuid: '', ruleGroupGuid: ruleGroup.guid, combineType: ruleOptions.combineType });
        this.makeRule(ruleOptions.childRuleOption, ruleOptions.guid, rs);

        // 做成条件
        this.makeCondition(ruleOptions, ruleOptions.guid, rConditions);
        const result={
            rules:rs,
            ruleConditions:rConditions,
            ruleGroup:rGroup
        };

        this.props.ajax
            .put('/ruleDetail',result)
            .then(res=>{
                message.success("操作成功");
                this.setState({isRuleShow:false});
                this.getRuleGroup();
                resetFields();
            })



    }

    // 取消
    cancel=()=> {
        const {resetFields} = this.props.form;

        resetFields();

        this.setState({
            isRuleShow:false,
            ruleGroup:{},
            rules:[],
            ruleConditions:[],
            ruleOptions:[],
        });

    }

    // 生成规则
    makeRule=(options, guid, rs)=> {
        for (let index in options) {
            let option=options[index];
            rs.push({ guid: option.guid, upRuleGuid: guid, ruleGroupGuid: this.state.ruleGroup.guid, combineType: option.combineType });
            this.makeRule(option.childRuleOption, option.guid, rs);
        }
    }

    // 生成条件
    makeCondition(option, guid, cs) {
        const {ruleGroup}=this.state;
        option.childCondition.forEach(condition => {
            cs.push({
                guid: condition.guid, ruleGuid: guid, ruleGroupGuid: ruleGroup.guid,
                field: condition.field, operateType: condition.operateType, value: condition.value
            });
        });

        for (let index in option.childRuleOption) {
            let option2=option.childRuleOption[index];
            this.makeCondition(option2, option2.guid, cs);
        }

    }

    // 重置规则条件字段值
    resetRuleConditionField=(options)=> {
        if (options.childCondition) {
            for (let index in options.childCondition) {
                let condition=options.childCondition[index];
                condition.field = null;
            }
        }
        if (options.childRuleOption) {
            this.resetRuleConditionField(options.childRuleOption);
        }
    }

    // 去重
    unique=(arr)=> {
        return Array.from(new Set(arr))
    };

    checkRule=(options)=> {
        if (options.childCondition.length === 0 || !options.combineType) {
            this.checkRuleResult = false;
        }
        if (options.childRuleOption.length>0) {
            for (let index in options.childRuleOption) {
                let ruleOption=options.childRuleOption[index];
                this.checkRule(ruleOption);
            }
        }
    };

    isRuleValid=()=> {
        this.checkRuleResult = true;
        this.checkRule(this.state.ruleOptions);
        let result = this.checkRuleResult;
        return result;
    };

    // 检查条件的内容是否完整
    checkCondition=(options)=> {

        for (let index in options.childCondition) {
            let condition=options.childCondition[index];
            if (!condition.field || !condition.operateType || !condition.value) {
                this.checkConditionResult = false;
            }
        }

        if (options.childRuleOption.length>0) {
            options.childRuleOption.forEach(o => {
                this.checkCondition(o);
            });
        }
    };

    isConditionValid=()=> {
        this.checkConditionResult = true;
        this.checkCondition(this.state.ruleOptions);
        let result = this.checkConditionResult;
        return result;
    }

    FormElement = (props) => <FormElement form={this.props.form} labelCol={{span: 10}} style={{}} {...props}/>;

    changeState=(obj)=>{
        this.setState(obj)
    };


    render() {
        const { isRuleShow, allFieldData,loading, ruleGroups,selectedRuleGroup,allContextData,allEntityData,selectedContext,selectedEntity,ruleOptions,ruleGroup } = this.state;

        const {form, form: {getFieldValue, setFieldsValue,getFieldDecorator}} = this.props;
        const FormElement = this.FormElement;

        return (
            <PageContent styleName="root">
                <div>
                    <Row style={{height: 800}}>
                        <Col styleName="ruleGroups" span={7}>
                            <Button onClick={this.addRuleGroup} style={{marginBottom:10}}>AddRuleGroup</Button>
                            <List
                                className="ruleGroup-list"
                                loading={loading}
                                itemLayout="horizontal"
                                dataSource={ruleGroups}
                                bordered={true}
                                split={false}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<a key="ruleGroup-list" hidden={isRuleShow} onClick={e => {
                                            e.preventDefault();
                                            this.editRuleGroup(item.id);
                                        }}>edit</a>, <a hidden={isRuleShow} onClick={e => {
                                            e.preventDefault();
                                            this.delete(item);
                                        }} key="ruleGroup-list">del</a>]}
                                    >
                                        <div style={{minWidth: '70%'}}>{item.name}</div>
                                    </List.Item>
                                )}
                            />
                        </Col>
                        <Col styleName="condition" span={17} hidden={!isRuleShow}>
                            <Form onSubmit={this.saveRule}>
                                {selectedRuleGroup.id ? (
                                    <FormElement type="hidden" field="id"
                                                 decorator={{initialValue: ruleGroup.guid}}/>) : null}


                                <Row>
                                    <Col span={6} className="prefixClass">
                                        <FormElement
                                            type="input"
                                            field="name"
                                            placeholder="please input ruleGroupName"
                                            onChange={(e)=>{
                                                let ruleGroup=this.state.ruleGroup;
                                                ruleGroup.name=e.target.value;
                                                this.setState({ruleGroup:ruleGroup})
                                            }}
                                            decorator={{
                                                initialValue: ruleGroup.name,
                                                rules: [{required: true, message: '填写规则组名！'}],
                                            }}
                                        />
                                    </Col>

                                </Row>

                                <Row>
                                    <Col span={6} className="prefixClass">
                                        <FormElement
                                            type="select"
                                            field="dbContext"
                                            placeholder="please select dbContext"
                                            onChange={this.contextChange}
                                            notFoundContent={null}
                                            options={allContextData}
                                            decorator={{
                                                initialValue: ruleGroup.dbContext,
                                                rules: [{required: true, message: '请选择对应数据库上下文！'}],
                                            }}
                                        />
                                    </Col>
                                    <Col span={6} className="prefixClass">
                                        <FormElement
                                            type="select"
                                            field="entity"
                                            placeholder="please select entity"
                                            onChange={this.tableChange}
                                            notFoundContent={null}
                                            options={allEntityData}
                                            decorator={{
                                                initialValue: ruleGroup.entity,
                                                rules: [{required: true, message: '请选择对应对应数据实体！'}],
                                            }}
                                        />
                                    </Col>

                                </Row>
                                <RuleComponent
                                    changeState={this.changeState.bind(this)}
                                    option={ruleOptions}
                                    fields={allFieldData}
                                    form={form}

                                >
                                </RuleComponent>
                                <Row>
                                    <Col span={10} >
                                        <div
                                            style={{marginTop: 50}}>
                                            <Button  type="primary" htmlType="submit">sumbit</Button>
                                            <Button  style={{marginLeft: 8}}
                                                    onClick={this.cancel}>cancel</Button>
                                        </div>
                                    </Col>

                                </Row>

                            </Form>





                        </Col>
                    </Row>


                </div>


            </PageContent>


        );

    }


}