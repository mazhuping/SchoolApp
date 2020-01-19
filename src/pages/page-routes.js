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
        path: '/SignHistoryList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Attendance\\SignHistoryList.jsx'),
    },
    {
        path: '/SignList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Attendance\\SignedList.jsx'),
    },
    {
        path: '/SignedManage',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Attendance\\SignedManage.jsx'),
    },
    {
        path: '/ClassHourStudent',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\ClassHourStudent.jsx'),
    },
    {
        path: '/ClassHourTeacher',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\ClassHourTeacher.jsx'),
    },
    {
        path: '/InsuffHourStus',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\InsuffHourStus.jsx'),
    },
    {
        path: '/TeacherClassSituation',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\TeacherClassSituation.jsx'),
    },
    {
        path: '/TotalClassHourListForDate',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\TotalClassHourListForDate.jsx'),
    },
    {
        path: '/TotalClassHourListForSchool',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\TotalClassHourListForSchool.jsx'),
    },
    {
        path: '/BalanceMoney',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassHour\\tBalanceMoney.jsx'),
    },
    {
        path: '/ClassRoomList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassRoom\\ClassRoomList.jsx'),
    },
    {
        path: '/TeacherSchedule',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassSchedule\\TeacherSchedule.jsx'),
    },
    {
        path: '/TimeSchedule',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\ClassSchedule\\TimeSchedule.jsx'),
    },
    {
        path: '/CommodityInOutList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Commodity\\CommodityInOutList.jsx'),
    },
    {
        path: '/CommodityList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Commodity\\CommodityList.jsx'),
    },
    {
        path: '/CourseList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Course\\CourseList.jsx'),
    },
    {
        path: '/element',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Element\\Element.jsx'),
    },
    {
        path: '/dataentity',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Entity\\EntityList.jsx'),
    },
    {
        path: '/IncomeList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Income\\IncomeList.jsx'),
    },
    {
        path: '/DelStudentList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Student\\DelStudentList.jsx'),
    },
    {
        path: '/ImportStudents',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Student\\ImportStudents.jsx'),
    },
    {
        path: '/StudentList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Student\\StudentList.jsx'),
    },
    {
        path: '/TeacherList',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Teacher\\TeacherList.jsx'),
    },
    {
        path: '/kafkahandle',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\Test\\index.jsx'),
    },
    {
        path: '/function',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\apiFunction\\ApiFunctionList.jsx'),
    },
    {
        path: '/gradelist',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\grade\\GradeList.jsx'),
    },
    {
        path: '/group',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\group\\index.jsx'),
    },
    {
        path: '/',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\home\\index.jsx'),
    },
    {
        path: '/iframe_page_/:src',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\iframe\\index.jsx'),
    },
    {
        path: '/interviewlist',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\interview\\InterviewList.jsx'),
    },
    {
        path: '/login',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\login\\index.jsx'),
    },
    {
        path: '/menu-permission',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\menu-permission\\index.jsx'),
    },
    {
        path: '/roles',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\roles\\index.jsx'),
    },
    {
        path: '/roles/_/RoleElement/:id',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\roles\\RoleElement.jsx'),
    },
    {
        path: '/ruleManage',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\rule\\ruleManage.jsx'),
    },
    {
        path: '/schoollist',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\school\\SchoolList.jsx'),
    },
    {
        path: '/settings',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\setting\\index.jsx'),
    },
    {
        path: '/user-center',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\user-center\\UserCenterList.jsx'),
    },
    {
        path: '/users/_/UserEdit/:id',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\users\\UserEdit.jsx'),
    },
    {
        path: '/users',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\users\\index.jsx'),
    },
    {
        path: '/example/ajax',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\ajax\\index.jsx'),
    },
    {
        path: '/admin-crud',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\generator\\admin-crud\\AdminCrud.jsx'),
    },
    {
        path: '/example/antd/async-select',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\async-select\\index.jsx'),
    },
    {
        path: '/example/antd/form-element',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\form-element\\index.jsx'),
    },
    {
        path: '/example/antd/operator',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\operator\\index.jsx'),
    },
    {
        path: '/example/antd/pagination',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\pagination\\index.jsx'),
    },
    {
        path: '/example/antd/table-editable',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\table-editable\\index.jsx'),
    },
    {
        path: '/example/antd/query-item',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\query-item\\index.jsx'),
    },
    {
        path: '/example/antd/query-bar',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\query-bar\\index.jsx'),
    },
    {
        path: '/example/antd/table-row-draggable',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\table-row-draggable\\index.jsx'),
    },
    {
        path: '/example/antd/tool-bar',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\tool-bar\\index.jsx'),
    },
    {
        path: '/example/antd/user-avatar',
        component: () => import('F:\\UtilWorkSpace\\SchoolApp\\src\\pages\\examples\\antd\\user-avatar\\index.jsx'),
    },
];
