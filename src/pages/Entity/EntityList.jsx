import React, {Component} from 'react';
import {Table} from 'antd';
import {
    QueryBar,
    QueryItem,
    Pagination,
    Operator,
} from "@/library/antd";
import PageContent from '@/layouts/page-content';
import config from '@/commons/config-hoc';
import EntityEdit from './EntityEdit';

@config({
    path: '/dataentity',
    ajax: true,
    title: {text: 'Entity List', icon: 'lock'},
    connect(state) {
        return {local: state.system.i18n.commonPage}
    }
})
export default class EntityList extends Component {
    state = {
        loading: false,
        dataSource: [],
        total: 0,
        pageSize: 10,
        PageIndex: 1,
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
                label: 'SearchText',
                placeholder: this.props.local.searchPHL,
                itemStyle: {flex: '0 0 300px'}, // 固定宽度
            },
        ],
    ];

    columns = [
        {title: 'dbContext', dataIndex: 'dbContext'},
        {title: 'table', dataIndex: 'table'},
        {title: 'tableDescribe', dataIndex: 'tableDescribe'},
        {title: 'field', dataIndex: 'field'},
        {title: 'fieldDescribe', dataIndex: 'fieldDescribe'},
        // {
        //     title: 'operator',
        //     key: 'operator',
        //     render: (text, record) => {
        //         const {id, DbContext} = record;
        //         const successTip = `delete“${DbContext}”successful！`;
        //         const items = [
        //             {
        //                 label: 'edit',
        //                 onClick: () => {
        //                     this.handleEdit(id);
        //                 },
        //             },
        //             {
        //                 label: 'del',
        //                 color: 'red',
        //                 confirm: {
        //                     title: `您确定要删除“${DbContext}”？`,
        //                     onConfirm: () => {
        //                         this.setState({loading: true});
        //                         this.props.ajax
        //                             .del(`/entities?Id=${encodeURIComponent(id)}`, null, {successTip})
        //                             .then(() => this.handleSearch())
        //                             .finally(() => this.setState({loading: false}));
        //                     },
        //                 },
        //             },
        //         ];
        //
        //         return (<Operator items={items}/>);
        //     },
        // },
    ];

    componentDidMount() {
        this.handleSearch();
    }

    handleSearch = () => {
        const {params, PageIndex, pageSize} = this.state;

        this.setState({loading: true});
        this.props.ajax
            .get('/entity', {...params, PageIndex, pageSize})
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

    handlePageSizeChange=(pageSize)=>{
        this.setState({pageSize, PageIndex: 1});
        this.handleSearch();
    }
    handlePageNumChange=(pageNum)=>{
        this.setState({PageIndex:pageNum});
        this.handleSearch();


    }

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
                        submitText={"Search"}
                        resetText={"Reset"}
                        items={this.queryItems}
                        onSubmit={params => this.setState({params}, this.handleSearch)}
                    />
                </QueryBar>
                
                <Table
                    columns={this.columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={false}
                />

                <Pagination
                    total={total}
                    pageNum={PageIndex}
                    pageSize={pageSize}
                    onPageNumChange={this.handlePageNumChange}
                    onPageSizeChange={this.handlePageSizeChange}
                />

                <EntityEdit
                    id={id}
                    visible={visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
