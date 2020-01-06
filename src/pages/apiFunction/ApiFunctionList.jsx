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
import ApiFunctionEdit from './ApiFunctionEdit';

@config({
    path: '/function',
    ajax: true,
    title: {text: 'API List', icon: 'lock'},
    connect(state) {
        return {local: state.system.i18n.commonPage}
    }
})
export default class ApiFunctionList extends Component {
    state = {
        loading: false,
        dataSource: [],
        total: 0,
        pageSize: 10,
        pageNum: 1,
        params:"",
        id: void 0,
        visible: false,
        sorter:{}
    };

    // TODO 查询条件
    queryItems = [
        [
            {
                type: 'input',
                field: 'SearchText',
                label: this.props.local.search,
                placeholder: this.props.local.searchPHL,
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: 'Add API',
            icon: 'add',
            onClick: () => {
                // TODO
                this.handleAdd();
            },
        },
    ];

    // TODO 底部工具条
    bottomToolItems = [
        {
            type: 'default',
            text: this.props.local.del,
            icon: 'del',
            onClick: () => {
                // TODO
            },
        },
    ];

    columns = [
        // {title: 'id', dataIndex: 'id'},
        {title: 'name', dataIndex: 'name',sorter: true},
        {title: 'controller', dataIndex: 'controller',sorter: true},
        {title: 'type', dataIndex: 'type',sorter: true},
        {title: 'address', dataIndex: 'address',sorter: true},
        {
            title: 'operator',
            key: 'operator',
            render: (text, record) => {
                const {id, name} = record;
                const successTip = `delete“${name}”successful！`;
                const items = [
                    {
                        label: this.props.local.edit,
                        onClick: () => {
                            this.handleEdit(id);
                        },
                    },
                    {
                        label: this.props.local.del,
                        color: 'red',
                        confirm: {
                            title: this.props.local.confirmDial,
                            onConfirm: () => {
                                this.setState({loading: true});
                                this.props.ajax
                                    .del(`/function?Id=${encodeURIComponent(id)}`, null, {successTip})
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

    handleTableChange = (pagination, filters, sorter) => {
        this.setState({sorter:sorter})
        setTimeout(this.handleSearch)
    };

    handleSearch = () => {
        const {params, pageNum, pageSize,sorter} = this.state;
        const PA = {
            PageIndex: pageNum,
            PageSize: pageSize,
            SearchText:params.SearchText,
            SortField:sorter?.field,
            SortType:sorter?.order,
        };


        this.setState({loading: true});
        this.props.ajax
            // .get('/function', {...params, pageNum, pageSize})
            .get('/function', PA)
            .then(res => {
                if (res) {
                    console.log(`res:${JSON.stringify(res)}`)

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
            pageNum,
            pageSize,
            visible,
            id,
        } = this.state;
        const lang = this.props.local;
        return (
            <PageContent loading={loading}>
                <QueryBar span={10}>
                    <QueryItem
                        submitText={lang.search}
                        resetText={lang.reset}
                        loadOptions={this.fetchOptions}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params,pageNum: 1}, this.handleSearch)}
                    />
                </QueryBar>

                <ToolBar items={this.toolItems}/>

                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                    onChange={this.handleTableChange}
                />

                <Pagination
                    total={total}
                    pageNum={pageNum}
                    pageSize={pageSize}
                    onPageNumChange={pageNum => this.setState({pageNum}, this.handleSearch)}
                    onPageSizeChange={pageSize => this.setState({pageSize, pageNum: 1}, this.handleSearch)}
                />
                {/*<FixBottom>*/}
                    {/*<ToolItem items={this.bottomToolItems}/>*/}
                {/*</FixBottom>*/}

                <ApiFunctionEdit
                    id={id}
                    visible={visible}
                    onOk={() => {
                        this.setState({visible: false});
                        this.handleSearch();
                    }}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
