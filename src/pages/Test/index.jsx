import React, {Component} from 'react';
import {Table, Button, Modal, Form, Row, Input,Col,Icon,message,Spin,Alert,Drawer } from 'antd';
import config from '@/commons/config-hoc';
import PageContent from '@/layouts/page-content';
import localMenus from '../../menus';
import {convertToTree} from "@/library/utils/tree-utils";
import {ToolBar, Operator, FormElement  ,QueryBar, QueryItem,} from '@/library/antd';
import IconPicker from "@/components/icon-picker";
import {Pagination} from '@/library/antd/index';
import moment from 'moment';
import {sxAjax, ajax, gary} from '@/commons/ajax';
import Permission from '@/components/permission';
import {Constant} from '../../Constant';
import './style.less';
const { confirm } = Modal;

   


@config({
    path: '/kafkahandle',
    title: {text: 'kafkaHandle', icon: 'lock'},
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.users}
    }
})
@Form.create()  //这是Ant Design 组件
export default class index extends Component {
    state = {
        loading: false,
        menus: [],
        visible: false,
        record: {},
        iconVisible: false,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        sorter:{},
        selectedRowKeys:[],
        collapsed: false,    // 是否收起
        FinishedJobs:[],
        PendingJobs:[],
        drawerVisiable:false,
    };


    columns = [
        // key 与parentKey自动生成了，不需要展示和编辑
        // {title: 'key', dataIndex: 'key', key: 'key'},
        // {title: 'parentKey', dataIndex: 'parentKey', key: 'parentKey'},
        // {
        //     title: '名称', dataIndex: 'text', key: 'text', width: 200,
        //     render: (value, record) => {
        //         const {icon} = record;
        //
        //         if (icon) return <span><Icon type={icon}/> {value}</span>;
        //
        //         return value;
        //     }
        // },
        {title: 'ID', dataIndex: 'archiveID', key: 'archiveID',sorter: true,align:'center'},
        {title: 'ServerAddress', dataIndex: 'kafkaServerAddress', key: 'kafkaServerAddress',sorter: true,align:'center'},
        // {title: 'kafkaTopic', dataIndex: 'kafkaTopic', key: 'kafkaTopic',sorter: true,},
        {title: 'key', dataIndex: 'amazonFileName', key: 'amazonFileName',sorter: true,align:'center'},
        {title: 'FileName', dataIndex: 'amazonS3Path', key: 'amazonS3Path',sorter: true,align:'center'},
        // {title: 'amazonPubURL', dataIndex: 'amazonPubURL', key: 'amazonPubURL', width: 50,sorter: true,},
        {title: 'Partition', dataIndex: 'kafkaPartitionID', key: 'KafkaPartitionID', sorter: true,align:'center'},
        {title: 'dataTime', dataIndex: 'dataTime', key: 'dataTime',sorter: true,align:'center',
            render: val => {
                return val ? <span>{moment(val).format('YYYY-MM-DD HH')}</span> : ""
            }},
        // {
        //     title: 'createTime', dataIndex: 'createTime', key: 'createTime', width: 100, sorter: true,
        //     render: val => {
        //         return val ? <span>{moment(val).format('YYYY-MM-DD')}</span> : ""
        //     }
        // },
        // {
        //     title: '类型', dataIndex: 'type', key: 'type', width: 60,
        //     render: value => {
        //         if (value === '1') return '菜单';
        //         if (value === '2') return '功能';
        //         // 默认都为菜单
        //         return '菜单';
        //     }
        // },
        // {title: '功能编码', dataIndex: 'code', key: 'code', width: 100},
        // {title: '排序', dataIndex: 'order', key: 'order', width: 60},
        {
            title: 'operator', dataIndex: 'operator', key: 'operator',align:'center',
            render: (value, record) => {
                const items =[
                    {
                        label: 'download',
                        icon: 'download',
                        onClick: () => this.handleDownLoad(record),
                    },
                    {
                        label: 'unzip',
                        icon: 'scissor',
                        onClick: () => this.handleUnzip(record),

                    },
                    {
                        label: 'send',
                        icon: 'folder-open',
                        onClick: () => this.handleSendData(record),

                    },
                    {
                        label: 'allTask',
                        icon: 'gateway',
                        onClick: () => this.handleAllTask(record),

                    },
                    {
                        label: 'clear',
                        icon: 'delete',
                        color: 'red',
                        confirm: {
                            title: `are you sure clear ${record.archiveID}？`,
                            onConfirm: () => this.handleClear(record),
                        }
                    },
                    // {
                    //      label: 'add',
                    //      icon: 'folder-add',
                    //      onClick: () => this.handleAdd(),
                    //  }
                ];

                //数组内权限的顺序必须对应上面item的顺序   //Constant.addkafkabtn
                const codeArr=[Constant.downloadlink,Constant.unziplink,Constant.sendatalink,Constant.alltasklink,Constant.clearbufferlink];
                return <Permission code={codeArr} useDisabled={true} isNative={false}><Operator items={items}/></Permission>
                // return <Operator items={items}/>

            },
        },
    ];


    queryItems = [
        // [
        //     // {
        //     //     type: 'select',
        //     //     field: 'position',
        //     //     label: '职位',
        //     //     placeholder: '请选择职位',
        //     //     itemStyle: {flex: '0 0 200px'}, // 固定宽度
        //     //     disable:true,
        //     // },
        //     // {
        //     //     type: 'select',
        //     //     field: 'job',
        //     //     label: '工作',
        //     //     placeholder: '请选择工作',
        //     //     itemStyle: {flex: '0 0 200px'}, // 固定宽度
        //     // },
        //
        // ],
        [
            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'kafkaServerUrl',
                label: "kafkaServerUrl",
                placeholder: 'kafkaServerUrl',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'topicName',
                label: "topicName",
                placeholder: 'topicName',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },

            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'securityProtocol',
                label: "securityProtocol",
                decorator:{initialValue: 'Plaintext'},
                placeholder: 'securityProtocol',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'saslMechanism',
                label: "saslMechanism",
                placeholder: 'saslMechanism',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
                decorator:{initialValue: 'Plain'},
            },
        ],
        [
            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'saslUserName',
                label: "saslUserName",
                placeholder: 'saslUserName',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
            {
                // collapsedShow: false, // 收起时显示
                type: 'password',
                field: 'saslPassword',
                label: "saslPassword",
                placeholder: 'saslPassword',
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
        ],

        [
            {
                // collapsedShow: false, // 收起时显示
                type: 'input',
                field: 'SearchText',
                label: "FileName",
                placeholder: this.props.local.searchPHL,
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },

            {
                // collapsedShow: true, // 收起时显示
                type: 'date-range',
                field: 'dateRange',
                label: "DataTime",
                format:"YYYY-MM-DD HH",
                showTime:{ format: 'HH' },
                // placeholder: this.props.local.searchPHL,
                itemStyle: {flex: '0 0 450px'}, // 固定宽度
            },
            // {
            //     collapsedShow: true,
            //     type: 'number',
            //     field: 'age',
            //     label: '年龄',
            //     min: 0,
            //     max: 150,
            //     step: 1,
            //     placeholder: '请输入年龄',
            //     itemStyle: {flex: '0 0 200px'}, // 固定宽度
            // },
        ],
    ];



    componentDidMount=()=> {
        this.fetchMenus(this.state.pageNum, this.state.pageSize);
        setInterval(()=>{
            console.log("interval")

            this.props.ajax
                .get('/GetFinishedJob')
                .then(res=>{
                        this.setState({FinishedJobs:res})
                    }
                )
                .finally(() => {
                    this.setState({loading: false})
                })

            this.props.ajax
                .get('/GetPendingJob')
                .then(res=>{
                    if(res.length>0){
                        this.setState({PendingJobs:res})
                    }
                })
                .finally(() => {
                    this.setState({loading: false})
                })

        },3000);

    }


    handleAllTask=(record)=>{

        const params = {
            ArchiveKey: record.archiveID.toString(),
            ZipFileName: "1",
        };
        const result={
            downloadJobs:[params],
            kafkaServerUrl:document.getElementById("kafkaServerUrl").value,
            topicName:document.getElementById("topicName").value,
            saslUserName:document.getElementById("saslUserName").value,
            saslPassword:document.getElementById("saslPassword").value,
            securityProtocol:document.getElementById("securityProtocol").value,
            saslMechanism:document.getElementById("saslMechanism").value,
        }

        this.setState({loading: true});

        this.props.ajax
            .post('/AllTask', result, {successTip: "allTask cmd sended successfully"})
            .then()
            .finally(() => {
                this.setState({loading: false})
            })



    }

    checkInput=()=>{
        if(
            document.getElementById("topicName").value==="" ||
            document.getElementById("kafkaServerUrl").value==="" ||
            document.getElementById("securityProtocol").value==="" ||
            document.getElementById("saslMechanism").value===""
        ){
            message.info("please complete all the input!");
            return true;
        }
        return false;
    }

    handleSendData=(record)=>{

        if(this.checkInput())
            return;

        const params = {
            ArchiveKey: record.archiveID.toString(),
            ZipFileName: "1",
        };
        const result={
            downloadJobs:[params],
            kafkaServerUrl:document.getElementById("kafkaServerUrl").value,
            topicName:document.getElementById("topicName").value,
            saslUserName:document.getElementById("saslUserName").value,
            saslPassword:document.getElementById("saslPassword").value,
            securityProtocol:document.getElementById("securityProtocol").value,
            saslMechanism:document.getElementById("saslMechanism").value,
    }

        this.setState({loading: true});

        this.props.ajax
            .post('/SendArchiveData', result, {successTip: "send cmd sended successfully"})
            .then()
            .finally(() => {
                this.setState({loading: false})
            })


    }

    handleUnzip=(record)=>{

        const params = {
            ArchiveKey: record.archiveID.toString(),
            ZipFileName: "1",
        };

        this.setState({loading: true});

        this.props.ajax
            .post('/UnzipData', params, {successTip: "unzip cmd sended successfully"})
            .then()
            .finally(() => {
                this.setState({loading: false})
            })
    };

    handleDownLoad=(record)=> {
        const params = {
            ArchiveKey: record.archiveID.toString(),
            ZipFileName: "1",
        };

        this.setState({loading: true});

        this.props.ajax
            .post('/DownloadData', params, {successTip: "downLoad cmd sended successfully"})
            .then()
            .finally(() => {
                this.setState({loading: false})
            })

    }

    handleSearch = () => {
        const {params, pageNum, pageSize,sorter} = this.state;
        const Begin=params.dateRange ? (params.dateRange)[0] : null;
        const dateBegin=Begin ? moment(Begin).format('YYYY-MM-DD HH'):"";
        const End=params.dateRange ? (params.dateRange)[1] : null;
        const dateEnd=End ? moment(End).format('YYYY-MM-DD HH'): "";

        const getParams = {
            PageIndex: pageNum,
            PageSize: pageSize,
            SearchText: params.SearchText,
            SortField:sorter?.field,
            SortType:sorter?.order,
            RangeBegin:dateBegin,
            RangeEnd:dateEnd,
        };

        this.setState({loading: true});
        this.props.ajax
            .get('/ArchiveData', getParams, {noEmpty: true})
            .then(res => {
                // console.log(`ajax发送好的token:${currentUser.token}`)

                this.setState({menus: res.data, total: res.total});
            })
            .finally(() => this.setState({loading: false}));

    };



    handleTableChange = (pagination, filters, sorter) => {
        this.setState({sorter:sorter});

        setTimeout(()=>{
            this.fetchMenus(this.state.pageNum,this.state.pageSize)
        });
    };


    fetchMenus(pageNum, pageSize) {


        const params = {
            PageIndex: pageNum,
            PageSize: pageSize,
            SortField:this.state.sorter?.field,
            SortType:this.state.sorter?.order,
        };


        this.setState({loading: true});
        this.props.ajax
            .get('/ArchiveData', params, {noEmpty: true})
            .then(res => {
                // console.log(`ajax发送好的token:${currentUser.token}`)

                this.setState({menus: res.data, total: res.total});
            })
            .finally(() => this.setState({loading: false}));
    }

    // handleAddTopMenu = () => {
    //     this.props.form.resetFields();
    //     this.setState({visible: true});
    // };

    ConfirmClearAll=()=>{
        const that=this;
        confirm({
            title: 'clearAllBuffer?',
            content: 'Do you want to clearAllBuffer?',
            onOk() {
                that.ClearAllBuffer();
            },
            onCancel() {},
        });

    }

    ClearAllBuffer=()=>{
        this.setState({loading: true});
        this.props.ajax
            .get(`/ClearKafka/?Id=${encodeURIComponent(0)}`,null,{successTip:"Clear Successfully"})
            .then(() => {
                this.setState({visible: false});
                this.fetchMenus(this.state.pageNum, this.state.pageSize);
            })
            .finally(() => this.setState({loading: false}));

    }


    // handleDownLoad = (record) => {
    //     const {archiveID} = record;
    //
    //     //
    //     // this.setState({loading: true});
    //     // this.props.ajax
    //     //     .get('/Archive/ArchiveData',{pageNum,pageSize},{noEmpty: true, successTip: '请求成功！'})
    //     //     .then(res => {
    //     //         this.setState({menus: res.data});
    //     //     })
    //     //     .finally(() => this.setState({loading: false}));
    //
    //     // TODO
    //     // this.setState({loading: true});
    //     // this.props.ajax
    //     //     .del(`/menus/${key}`)
    //     //     .then(() => {
    //     //         this.setState({visible: false});
    //     //     })
    //     //     .finally(() => this.setState({loading: false}));
    //     alert("下载,archiveID:" + archiveID);
    // };
    //
    // handleAdd = () => {
    //     this.props.form.resetFields();
    //     this.setState({visible: true});
    // };



    // handleEdit = (record) => {
    //     const {resetFields, setFieldsValue} = this.props.form;
    //
    //     resetFields();
    //     const {
    //         archiveID,
    //         kafkaServerAddress,
    //         kafkaTopic,
    //         amazonFileName,
    //         amazonS3Path,
    //         amazonPubURL,
    //         createTime
    //     } = record;
    //     console.log(record)
    //
    //     const date = moment(record.createTime, 'YYYY/MM/DD');
    //
    //
    //     setTimeout(() => {
    //         setFieldsValue({
    //             archiveID,
    //             kafkaServerAddress,
    //             kafkaTopic,
    //             amazonFileName,
    //             amazonS3Path,
    //             amazonPubURL,
    //             "createTime": date
    //         })
    //     });
    //     this.setState({visible: true, record});
    // };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // 如果key存在视为修改，其他为添加
                const {archiveID} = values;
                const ajax = archiveID ? this.props.ajax.put : this.props.ajax.post;

                // TODO
                this.setState({loading: true});
                ajax('/ArchiveData', values)
                    .then(() => {
                        this.setState({visible: false,pageSize:10,pageNum:1});
                        this.fetchMenus(this.state.pageNum,this.state.pageSize);
                    })
                    .finally(() => this.setState({loading: false}));
            }
        });
    };


    handleClear = (record) => {
        const {archiveID} = record;

        this.setState({loading: true});
        this.props.ajax
            .get(`/ClearKafka/?Id=${encodeURIComponent(archiveID)}`,null,{successTip:"Clear Successfully"})
            .then(() => {
                // this.setState({visible: false});
                // this.fetchMenus(this.state.pageNum, this.state.pageSize);
            })
            .finally(() => this.setState({loading: false}));
    };

    handlePageSizeChange = (pageSize) => {
        this.setState({pageSize});
        this.fetchMenus(this.state.pageNum, pageSize)


    };

    handlePageNumChange = (pageNum) => {
        this.setState({pageNum});
        this.fetchMenus(pageNum, this.state.pageSize)
    };

    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     getCheckboxProps: record => ({
    //         disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //         name: record.name,
    //     }),
    // };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    intervalBatchTaskDetail=()=>{

        console.log("interval")

        this.props.ajax
            .get('/GetFinishedJob')
            .then(res=>{
                if(res.length>0){
                    this.setState({FinishedJobs:res})
                }
            })
            .finally(() => {
                this.setState({loading: false})
            })

        this.props.ajax
            .get('/GetPendingJob')
            .then(res=>{
                if(res.length>0){
                    this.setState({PendingJobs:res})
                }
            })
            .finally(() => {
                this.setState({loading: false})
            })

    };

    AllBatchTask=()=>{


        let archive=[];

        if(this.state.selectedRowKeys.length===0){
            this.setState({hiddenHandleInfo: false});
            message.info('please select item ! ');
            return;
        }

        if(this.checkInput())
            return;



        this.state.selectedRowKeys.forEach(item=>{
            archive.push({archiveKey:item.toString(),zipFileName:""})
        });
        const result={
            downloadJobs:archive,
            kafkaServerUrl:document.getElementById("kafkaServerUrl").value,
            topicName:document.getElementById("topicName").value,
            saslUserName:document.getElementById("saslUserName").value,
            saslPassword:document.getElementById("saslPassword").value,
            securityProtocol:document.getElementById("securityProtocol").value,
            saslMechanism:document.getElementById("saslMechanism").value,
    }



        this.props.ajax
            .post(`/AllBatchTask`,result,{successTip:"AllBatchTask send Successfully"})
            .then(() => {
                // this.setState({visible: false});
                // this.fetchMenus(this.state.pageNum, this.state.pageSize);
            })
            .finally(() => this.setState({loading: false,selectedRowKeys:[]}));





    };
    onClose = () => {
        this.setState({
            drawerVisiable: false,
        });
    };

    ShowTaskDraw=()=>{
        this.setState({
            drawerVisiable:true,
        })
    }

    Process=(props)=>{
        const {items}=props;
        return React.cloneElement(
            <div>
                {items?.map(item=>{
                    return(
                        <li>{item}</li>
                    )
                })}
            </div>
        )

    }

    FormElement = (props) => <FormElement form={this.props.form} labelWidth={130} {...props}/>;

    render() {

        const {
            menus,
            visible,
            loading,
            iconVisible,
            total,
            pageNum,
            pageSize,
            selectedRowKeys,
            collapsed,
            FinishedJobs,
            PendingJobs,
            drawerVisiable,
        } = this.state;
        const {form, form: {getFieldValue, setFieldsValue}} = this.props;
        const lang = this.props.local;
        const FormElement = this.FormElement;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        let Finished="";
        FinishedJobs.forEach(item=>{
            Finished+=`<p>${item}</p>`
        })
        let Pending="";
        PendingJobs.forEach(item=>{
            Pending+=`<p>${item}</p>`
        })

        const Process=this.Process;


        return (
            <PageContent styleName="root">
                <QueryBar
                    showCollapsed={false}
                    collapsed={collapsed}
                    onCollapsedChange={collapsed => this.setState({collapsed})}
                >
                    <QueryItem
                        collapsed={collapsed}
                        submitText={lang.search}
                        resetText={lang.reset}
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params,pageNum: 1}, this.handleSearch)}
                        // extra={<Button type="primary" icon="user-add" onClick={this.handleAdd}>{lang.addUser}</Button>}
                    />
                </QueryBar>
                <Permission code={[Constant.clearallbufferbtn,Constant.AllBatchTask,Constant.ViewTaskProcess]} useDisabled={true} isNative={false}>
                    <ToolBar items={[
                        {type: 'primary', text: 'ClearAllBuffer', onClick: this.ConfirmClearAll},
                        {type: 'primary', text: 'AllBatchTask', onClick: this.AllBatchTask},
                        {type: 'primary', text: 'TaskProcess',icon:'eye', onClick: this.ShowTaskDraw},
                        ]}/>
                </Permission>
                <Drawer
                    title="Task Process"
                    placement="right"
                    closable={false}
                    width={418}
                    onClose={this.onClose}
                    visible={drawerVisiable}
                >
                    <h2>Finished Jobs:</h2>
                    <Process items={FinishedJobs}/>

                    <h2>Pending Jobs:</h2>
                    <Process items={PendingJobs}/>
                </Drawer>

                <Table rowKey="archiveID"
                       loading={loading}
                       columns={this.columns}
                       dataSource={menus}
                       pagination={false}
                       onChange={this.handleTableChange}
                       rowSelection={rowSelection}
                />
                <Modal
                    // id="menu-modal"
                    title="Add Record"
                    visible={visible}
                    onOk={this.handleSubmit}
                    onCancel={() => this.setState({visible: false})}
                >
                    <Form onSubmit={this.handleSubmit}>
                        <FormElement type="hidden" field="archiveID"/>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label="kafkaServerAddress"
                                    field="kafkaServerAddress"
                                    decorator={{
                                        rules: [
                                            {required: true, message: 'please input address！'},
                                        ],
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label="kafkaTopic"
                                    field="kafkaTopic"
                                    decorator={{
                                        rules: [
                                            {required: true, message: 'please input topic！'},
                                        ],
                                    }}
                                    // addonAfter={<Icon style={{cursor: 'pointer'}} onClick={this.handleIconClick} type={getFieldValue('icon') || 'search'}/>}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label="amazonFileName"
                                    // type="select"
                                    // options={[
                                    //     {value: '1', label: '菜单'},
                                    //     {value: '2', label: '功能'},
                                    // ]}
                                    field="amazonFileName"
                                    decorator={{
                                        rules: [
                                            {required: true, message: 'please input fileName！'},
                                        ],
                                    }}
                                    // getPopupContainer={() => document.querySelector('.ant-modal-wrap')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label="amazonS3Path"
                                    field="amazonS3Path"
                                    decorator={{
                                        rules: [
                                            {required: true, message: 'please input path！'},
                                        ],
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    label="amazonPubURL"
                                    field="amazonPubURL"
                                    decorator={{
                                        rules: [
                                            {required: true, message: 'please input URL！'},
                                        ],
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20}>
                                <FormElement
                                    type="date"
                                    field="createTime"
                                    label="createTime"
                                    // format='YYYY/MM/DD'
                                    placeholder="please input time"
                                />
                            </Col>
                        </Row>

                    </Form>
                </Modal>
                <IconPicker
                    visible={iconVisible}
                    onOk={(type) => {
                        this.setState({iconVisible: false});
                        setFieldsValue({icon: type});
                    }}
                    onCancel={() => this.setState({iconVisible: false})}
                />
                <div>
                    <Pagination
                        total={total}
                        pageNum={pageNum}
                        pageSize={pageSize}
                        onPageSizeChange={this.handlePageSizeChange}
                        onPageNumChange={this.handlePageNumChange}
                    />
                </div>
            </PageContent>
        );
    }
}

