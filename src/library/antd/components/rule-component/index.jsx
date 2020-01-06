import React, { Component } from 'react';
import { Table, Icon, Modal, Form, Tree, Row, Col, Button, Select, Card, Input } from 'antd';
import { FormElement } from '@/library/antd';
import {newGuid} from '@/library/utils';
import PropTypes from 'prop-types';
import './index.less';
const { Option } = Select;
const combineType = [
    { value: "1", label: "And" },
    { value: "2", label: "Or" }
];

const operatorType = [
    { value: "1", label: "Equal" },
    { value: "2", label: " Not Equal" },
    { value: "3", label: "String Contain" },
    { value: "4", label: "String not Contain" },
    // { value: "5", label: "list包含" },
    // { value: "6", label: "list不包含" },

];


//

export default class RuleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // allFieldData:props.fields,
            option:props.option,

            // childRuleOption:{},
            // upperOption:props.upperOption,
            // findedRule:{},
        };
    }



    componentDidMount() {
    }

    componentDidUpdate(prevProps) {

        //绝对不可以这么做，不然会陷入死循环更新
        // this.setState({option:this.props.option})

    }

    FormElement = (props) => <FormElement form={this.props.form} labelWidth={130} {...props}/>;

    RuleList=(props)=>{
        // const {items,upperOption,fields,form}=this.props;
        const {form,fields,upperOption,items}=props;
        // const {option}=this.state;
        this.upperOption=this.props.upperOption;
        return React.cloneElement(
            <div>
                {items?.map(item=>{
                    return(
                        <RuleComponent
                            updateUpperState={this.updateUpperState.bind(this)}
                            // updateUpperState={()=>this.props.updateUpperState({option:upperOption})}
                            option={item}
                            upperOption={upperOption}
                            fields={fields}
                            form={form}
                        />
                    )
                })}
            </div>
            )
    };

    ConditionElement=(props)=>{
        const FormElement = this.FormElement;
        const {allFieldData,option} =props;
        // this.setState({option:option});
        // const {  option}=this.state;
        // console.log(`allFieldData:${JSON.stringify(this.allFieldData)}`)
        let conditions=option?.childCondition;

        return React.cloneElement(
            <div>
                {conditions?.map(item=>{
                    return (
                        <Row >
                            <Col span={1}  style={{height:40}}><Icon type="minus-circle-o" className="dynamic-delete-button" key={item.guid} onClick={this.removeCondition.bind(this, item.guid)} /></Col>
                            <Col span={3}  style={{height:40}}>
                                <FormElement
                                    type="select"
                                    field={`field_${item.guid}`}
                                    placeholder=""
                                    value={item.field}
                                    notFoundContent={null}
                                    onChange={(value)=>item.field=value}
                                    options={allFieldData}
                                    decorator={{
                                        initialValue: item.field,
                                        rules: [{required: true, message: '请完善对应规则！'}],
                                    }}
                                />
                            </Col>
                            <Col span={3}  style={{height:40}}>
                                <FormElement
                                    type="select"
                                    field={`operateType_${item.guid}`}
                                    placeholder=""
                                    value={item.operateType}
                                    notFoundContent={null}
                                    onChange={(value)=>item.operateType=value}
                                    options={operatorType}
                                    decorator={{
                                        initialValue: item.operateType,
                                        rules: [{required: true, message: '请完善对应规则！'}],
                                    }}
                                />
                            </Col>
                            <Col span={17}  style={{height:40}}>
                                <FormElement
                                    type="input"
                                    field={`value_${item.guid}`}
                                    onChange={(e)=>item.value=e.target.value}
                                    placeholder=""
                                    decorator={{
                                        initialValue: item.value,
                                        rules: [{required: true, message: '请完善对应规则！'}],
                                    }}
                                />
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    };



    // 添加条件
    addCondition=(guid)=> {

        // this.findRule(this.state.option, guid);
        this.findRule(this.props.option, guid);

        // this.tempFindedRule=this.state.findedRule || [];
        // this.tempFindedRule=
        this.findedRule.childCondition.push({ guid: newGuid(), field: '', operateType: '', value: ''});
        this.setState({
            findedRule:this.tempFindedRule,
            option:this.props.option,
        });
    }

    // 删除条件
    removeCondition(guid) {
        this.deleteCondition(this.props.option, guid);
        this.setState({
            option:this.props.option,
        });
    }

    // 删除组
    removeGroup(guid) {
        if(!this.upperOption)
            return;
        this.deleteGroup(this.upperOption.childRuleOption, guid);

        const {updateUpperState}=this.props;
        updateUpperState({option:this.upperOption});
        // this.setState({
        //     upperOption:this.upperOption,
        // });
    }

    // 添加条件
    addGroup=(option)=> {
        option.push(
            {
                guid: newGuid(),
                childCondition: [
                ],
                childRuleOption: [
                ]
            }
        );
        this.setState({
            option:this.props.option,
        });
    };

    // 查找规则
    findRule=(option, guid)=> {
        if (option.guid === guid) {
            // this.setState({findedRule:option});
            this.findedRule=option;
        } else {
            for (let o in option.childRuleOption) {
                this.findRule(o, guid);
            }
        }
    }

    // 删除条件
    deleteCondition=(option, guid)=> {

        const index = option.childCondition.findIndex(condition => condition.guid === guid);
        if (index === -1) {
            if (option.childRuleOption) {
                this.deleteCondition(option.childRuleOption, guid);
            }
        } else {
            option.childCondition.splice(index, 1);
        }

    }

    // 删除条件组
    deleteGroup=(option, guid)=> {
        const index = option.findIndex(o => o.guid === guid);

        if (index === -1) {
            for (let o in option) {
                if (o.childRuleOption) {
                    this.deleteGroup(o.childRuleOption, guid);
                }
            }
        } else {
            option.splice(index, 1);
        }
    }

    unique=(arr)=> {
        return Array.from(new Set(arr))
    }

    updateUpperState=(obj)=>{
        this.setState(obj)
    }


    render() {
        const {  form,fields } = this.props;
        let option=this.props.option;

        // const {upperOption}  = this.state;
        // const RuleElement = this.RuleElement;
        // const InputComponent = this.inputComponent;
        const ConditionElement=this.ConditionElement;
        const FormElement = this.FormElement;
        const RuleList=this.RuleList;


        return (

        <Card style={{ marginTop: 5, background: 'grey',padding:-10 }}>
            <ConditionElement
                option={option}
                allFieldData={fields}>
            </ConditionElement>



            <div style={{textAlign: 'center'}} >
                <Button onClick={e => {
                    e.preventDefault();
                    this.addCondition(option?.guid)
                }}>
                    <Icon type="plus" /> Add Condition
                </Button>
            </div>

            <RuleList
                items={option?.childRuleOption}
                upperOption={option}
                fields={fields}
                form={form}
                changeState={()=>this.props.changeState.bind(this)}

            >
            </RuleList>

            <Row >
                <Col span={3} style={{height:40}}>

                    <FormElement
                        style={{padding:5}}
                        type="select"
                        placeholder=""
                        field={`combineType_${option.guid}`}
                        notFoundContent={null}
                        options={combineType}
                        onChange={(value)=>option.combineType=value}
                        decorator={{
                            initialValue: option?.combineType,
                            rules: [],
                        }}

                    />
                </Col>
                <Col span={3} style={{height:40}}>
                    <Form.Item>
                        <Button onClick={e => {
                            e.preventDefault();
                            this.addGroup(option.childRuleOption)
                        }}>
                            <Icon type="plus" /> Add Rule
                        </Button>
                   </Form.Item>
                </Col>
                <Col span={17} style={{height:40}}>
                    <Form.Item>
                        <Button onClick={e => {
                            e.preventDefault();
                            this.removeGroup(option.guid)
                        }}>
                            <Icon type="delete" /> Del Rule
                        </Button>
                    </Form.Item>
                </Col>
            </Row>

        </Card>


        );
    }


}

{/*{rules.map(index => {*/}
{/*console.log(index)*/}
{/*return <RuleElement key={index} />*/}
{/*})}*/}