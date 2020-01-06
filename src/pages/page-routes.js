// 此文件是通过脚本生成的，直接编辑无效！！！

// 不需要导航框架的页面路径
export const noFrames = [
    '/login',
];

// 不需要登录就可以访问的页面路径
export const noAuths = [
    '/login',
];

// 需要keep alive 页面
export const keepAlives = [
    {
        path: '/iframe_page_/:src',
        keepAlive: true,
    },
    {
        path: '/login',
        keepAlive: false,
    },
    {
        path: '/roles/_/RoleElement/:id',
        keepAlive: true,
    },
    {
        path: '/users/_/UserEdit/:id',
        keepAlive: true,
    },
];

// 页面路由配置
export default [
    {
        path: '/dataentity',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\Entity\\EntityList.jsx'),
    },
    {
        path: '/element',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\Element\\Element.jsx'),
    },
    {
        path: '/kafkahandle',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\Test\\index.jsx'),
    },
    {
        path: '/function',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\apiFunction\\ApiFunctionList.jsx'),
    },
    {
        path: '/group',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\group\\index.jsx'),
    },
    {
        path: '/iframe_page_/:src',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\iframe\\index.jsx'),
    },
    {
        path: '/menu-permission',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\menu-permission\\index.jsx'),
    },
    {
        path: '/',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\home\\index.jsx'),
    },
    {
        path: '/login',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\login\\index.jsx'),
    },
    {
        path: '/roles/_/RoleElement/:id',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\roles\\RoleElement.jsx'),
    },
    {
        path: '/roles',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\roles\\index.jsx'),
    },
    {
        path: '/ruleManage',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\rule\\ruleManage.jsx'),
    },
    {
        path: '/users/_/UserEdit/:id',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\users\\UserEdit.jsx'),
    },
    {
        path: '/users',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\users\\index.jsx'),
    },
    {
        path: '/user-center',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\user-center\\UserCenterList.jsx'),
    },
    {
        path: '/settings',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\setting\\index.jsx'),
    },
    {
        path: '/example/ajax',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\ajax\\index.jsx'),
    },
    {
        path: '/admin-crud',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\generator\\admin-crud\\AdminCrud.jsx'),
    },
    {
        path: '/example/antd/form-element',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\form-element\\index.jsx'),
    },
    {
        path: '/example/antd/async-select',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\async-select\\index.jsx'),
    },
    {
        path: '/example/antd/pagination',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\pagination\\index.jsx'),
    },
    {
        path: '/example/antd/operator',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\operator\\index.jsx'),
    },
    {
        path: '/example/antd/query-bar',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\query-bar\\index.jsx'),
    },
    {
        path: '/example/antd/query-item',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\query-item\\index.jsx'),
    },
    {
        path: '/example/antd/table-editable',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\table-editable\\index.jsx'),
    },
    {
        path: '/example/antd/user-avatar',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\user-avatar\\index.jsx'),
    },
    {
        path: '/example/antd/table-row-draggable',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\table-row-draggable\\index.jsx'),
    },
    {
        path: '/example/antd/tool-bar',
        component: () => import('E:\\TFSWorkSpace\\Utilities\\Tools.KafkaDataArchive\\WebUI\\React.WebUI\\ClientApp\\src\\pages\\examples\\antd\\tool-bar\\index.jsx'),
    },
];
