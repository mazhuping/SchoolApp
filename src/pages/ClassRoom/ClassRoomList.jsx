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
import ClassRoomEdit from './ClassRoomEdit';

@config({
    path: '/ClassRoomList',
    ajax: true,
    connect(state) {
        return {local: state.system.i18n.commonPage}
    }

})
export default class ClassRoomList extends Component {
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
        ],
    ];

    // TODO 顶部工具条
    toolItems = [
        {
            type: 'primary',
            text: '添加',
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
        {title: '课室ID', dataIndex: 'ClassRoomID'},
        {title: '教室名', dataIndex: 'ClassRoomName'},
        {title: '学校名', dataIndex: 'SchoolName'},
        {title: '备注', dataIndex: 'Remark'},
        {title: '创建用户', dataIndex: 'CreateUser'},
        {title: '创建时间', dataIndex: 'CreateDate'},
        {
            title: 'operator',
            key: 'operator',
            render: (text, record) => {
                const {id, ClassRoomID} = record;
                const successTip = `delete“${ClassRoomID}”successful！`;
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
                            title: `您确定要删除“${ClassRoomID}”？`,
                            onConfirm: () => {
                                this.setState({loading: true});
                                this.props.ajax
                                    .del(`/ClassRoom?Id=${encodeURIComponent(id)}`, null, {successTip})
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
            .get('/ClassRoom', {...params, PageIndex, pageSize})
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

                <ClassRoomEdit
                    id={id}
                    visible={visible}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                />
            </PageContent>
        );
    }
}
