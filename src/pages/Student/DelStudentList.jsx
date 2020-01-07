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
import StudentEdit from './StudentEdit';

@config({
    path: '/DelStudentList',
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.commonPage}
    }

})
export default class StudentList extends Component {
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
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '学院登记',
            icon: 'plus',
            onClick: () => {
                // TODO
            },
        },
        {
            type: 'default',
            text: '重算所有学院剩余课时',
            icon: 'hourglass',
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
        {title: '学生ID', dataIndex: 'StudentId'},
        {title: '学号', dataIndex: 'ClassRollNo'},
        {title: '姓名', dataIndex: 'Name'},
        {title: '性别', dataIndex: 'Gender'},
        {title: '会员', dataIndex: 'VIP'},
        {title: '课时消耗', dataIndex: 'UnitCost'},
        {title: '剩余课时', dataIndex: 'BalanceClassHour'},
        {title: '剩余金额', dataIndex: 'AccountAmount'},
        {title: '生日', dataIndex: 'BrithdayStr'},
        {title: '联系人', dataIndex: 'EmergencyContact1Name'},
        {title: '联系电话', dataIndex: 'EmergencyContact1MobilePhone'},
        {
            title: 'operator',
            key: 'operator',
            render: (text, record) => {
                const {id, StudentId} = record;
                const successTip = `delete“${StudentId}”successful！`;
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
                            title: `您确定要删除“${StudentId}”？`,
                            onConfirm: () => {
                                this.setState({loading: true});
                                this.props.ajax
                                    .del(`/Student?Id=${encodeURIComponent(id)}`, null, {successTip})
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
            .get('/Student', {...params, PageIndex, pageSize})
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

                <StudentEdit
                    id={id}
                    visible={visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
