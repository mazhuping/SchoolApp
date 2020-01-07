import React, {Component} from 'react';
import {Table} from 'antd';
import FixBottom from '@/layouts/fix-bottom';
import {
    QueryBar,
    QueryItem,
    ToolItem,
    Pagination,
    Operator,
    ToolBar,
} from "@/library/antd";
import PageContent from '@/layouts/page-content';
import config from '@/commons/config-hoc';
import IncomeEdit from './IncomeEdit';

@config({
    path: '/IncomeList',
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.commonPage}
    }

})
export default class IncomeList extends Component {
    state = {
        loading: false,
        dataSource: [],
        total: 0,
        pageSize: 10,
        pageIndex: 1,
        params: {},
        id: void 0,
        visible: false,
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'SearchText',
                label: '搜索',
            },
            {
                type: 'select',
                field: 'SchoolID',
                label: '学校',
            },
            {
                type: 'select',
                field: 'ClassTypeID',
                label: '课程类型',
            },
            {
                type: 'date-range',
                field: 'paytime',
                label: '缴费时间',
            },
            {
                type: 'select',
                field: 'PayReasonType',
                label: '缴费类型',
            },
            {
                type: 'select',
                field: 'StuType',
                label: '学生分类',
            },
            {
                type: 'select',
                field: 'StudyAdviser',
                label: '学习顾问',
            },
            {
                type: 'select',
                field: 'ClassAdviserUserID',
                label: '带班老师',
            },
            {
                type: 'select',
                field: 'RecommendUserID',
                label: '转介绍老师',
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加缴费',
            icon: 'plus',
            onClick: () => {
                // TODO
            },
        },
    ];

    // TODO 底部工具条
    bottomToolItems = [
        {
            type: 'default',
            text: 'exportCurrent',
            icon: '',
            onClick: () => {
                // TODO
            },
        },
        {
            type: 'primary',
            text: 'exportAll',
            icon: '',
            onClick: () => {
                // TODO
            },
        },
    ];

    columns = [
        {title: '支付ID', dataIndex: 'PaymentID'},
        {title: '缴费类型', dataIndex: 'PayReasonTypeName'},
        {title: '学生姓名', dataIndex: 'StudentName'},
        {title: '学生类型', dataIndex: 'StuTypeName'},
        {title: '学生来源', dataIndex: 'StudentSourceName'},
        {title: '付款日期', dataIndex: 'PayDateString'},
        {title: '报读课程', dataIndex: 'CourseName'},
        {title: '购买课时', dataIndex: 'ClassHourBuy'},
        {title: '赠送课时', dataIndex: 'ClassHourFree'},
        {title: '支付金额', dataIndex: 'PayAmount'},
        {title: '欠款金额', dataIndex: 'DebtAmount'},
        {title: '代金券', dataIndex: 'Voucher'},
        {title: '收据编号', dataIndex: 'PaySeriaNo'},
        {title: '支付方式', dataIndex: 'PaymentType_Name'},
        {title: '学习顾问', dataIndex: 'StudyAdviserName'},
        {title: '带班老师', dataIndex: 'ClassAdviserUserName'},
        {title: '转介绍老师', dataIndex: 'RecommendUserName'},
        {title: '赠送礼物', dataIndex: 'Present'},
        {title: '负责人', dataIndex: 'PerformanceUserName'},
        {title: '备注', dataIndex: 'Memo'},
        {
            title: 'operator',
            key: 'operator',
            render: (text, record) => {
                const {id, PaymentID} = record;
                const successTip = `delete“${PaymentID}”successful！`;
                const items = [
                    {
                        label: 'edit',
                        onClick: () => {
                            this.handleEdit(id);
                        },
                    },
                    {
                        label: 'del',
                        color: 'red',
                        confirm: {
                            title: `您确定要删除“${PaymentID}”？`,
                            onConfirm: () => {
                                this.setState({loading: true});
                                this.props.ajax
                                    .del(`/Income?Id=${encodeURIComponent(id)}`, null, {successTip})
                                    .then(() => this.handleSearch())
                                    .finally(() => this.setState({loading: false}));
                            },
                        },
                    },
                ];

                return (<Operator items={items}/>);
            },
        },
    ];

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {
        const {params, PageIndex, pageSize} = this.state;

        this.setState({loading: true});
        this.props.ajax
            .get('/Income', {...params, PageIndex, pageSize})
            .then(res => {
                if (res) {
                    const {data: dataSource, total} = res;
                    this.setState({
                        dataSource,
                        total,
                    });
                }
            })
            .finally(() => this.setState({loading: false}));
    };

    handleAdd = () => {
        this.setState({id: void 0, visible: true});
    };

    handleEdit = (id) => {
        this.setState({id, visible: true});
    };

    render() {
        const {
            loading,
            dataSource,
            total,
            PageIndex,
            pageSize,
            visible,
            id,
        } = this.state;

        return (
            <PageContent loading={loading}>
                <QueryBar>
                    <QueryItem
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params}, this.handleSearch)}
                    />
                </QueryBar>
                
                <ToolBar items={this.toolItems}/>
                    
                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />

                <Pagination
                    total={total}
                    PageNum={PageIndex}
                    pageSize={pageSize}
                    onPageNumChange={ PageIndex => this.setState({PageIndex}, this.handleSearch)}
                    onPageSizeChange={pageSize => this.setState({pageSize, PageIndex: 1}, this.handleSearch)}
                />
                <FixBottom>
                    <ToolItem items={this.bottomToolItems}/>
                </FixBottom>

                <IncomeEdit
                    id={id}
                    visible={visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
