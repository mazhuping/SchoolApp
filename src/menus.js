import antdMenus from './menus-ant-design-example';
import {getLoginUser} from '@/commons';
/*
* 菜单数据 返回Promise各式，支持前端硬编码、异步获取菜单数据
* */
export default function getMenus(userId) {
    // TODO 根据userId获取菜单数据 或在此文件中前端硬编码菜单
    // const currentUser = getLoginUser() || {};
    // if(!currentUser.token){
    //     return Promise.resolve([])
    // }
    //
    // return fetch(`/api/getElements?type=${encodeURIComponent(1)}`, {
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${currentUser.token}`
    //
    //     },
    // })
    //     .then(res => res.json())


    return Promise.resolve( [
       {"key":"rightmanage","parentKey":"","path":"","text":"AuthorityManage","icon":"ant-design","url":"","target":"","order":1000,"type":1,"code":"rightmanage","local":"sysManage"},
        {"key":"usermanage","parentKey":"rightmanage","path":"/users","text":"UserManage","icon":"user","url":"","target":"","order":999,"type":1,"code":"usermanage","local":"users"},
        {"key":"rolemanage","parentKey":"rightmanage","path":"/roles","text":"RoleManage","icon":"team","url":"","target":"","order":998,"type":1,"code":"rolemanage","local":"roles"},
        {"key":"groupmanage","parentKey":"rightmanage","path":"/group","text":"GroupManage","icon":"team","url":"","target":"","order":997,"type":1,"code":"groupmanage","local":"Group"},
        {"key":"elementmanage","parentKey":"rightmanage","path":"/element","text":"ElementManage","icon":"lock","url":"","target":"","order":996,"type":1,"code":"elementmanage","local":"menus"},
        {"key":"apimanage","parentKey":"rightmanage","path":"/function","text":"APIManage","icon":"user","url":"","target":"","order":995,"type":1,"code":"apimanage","local":"APIList"},
        {"key":"rulemanage","parentKey":"rightmanage","path":"/ruleManage","text":"RuleManage","icon":"trademark","url":"","target":"","order":994,"type":1,"code":"rulemanage","local":"rules"},
        {"key":"entitymanage","parentKey":"rightmanage","path":"/dataentity","text":"EntityManage","icon":"database","url":"","target":"","order":993,"type":1,"code":"entitymanage","local":"entity"},
        {"key":"consultmanage","parentKey":"","path":"","text":"咨询管理","icon":"database","url":"","target":"","order":991,"type":1,"code":"consultmanage","local":"consultmanage"},
        {"key":"studentConsult","parentKey":"consultmanage","path":"/studentregister","text":"学员咨询","icon":"database","url":"","target":"","order":990,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"schoolmanage","parentKey":"","path":"/","text":"学校管理","icon":"database","url":"","target":"","order":989,"type":1,"code":"schoolmanage","local":"schoolmanage"},
        {"key":"schoollist","parentKey":"schoolmanage","path":"/schoollist","text":"学校列表","icon":"database","url":"","target":"","order":988,"type":1,"code":"schoollist","local":"schoollist"},
        {"key":"addschool","parentKey":"schoolmanage","path":"/addschool","text":"新增学校","icon":"database","url":"","target":"","order":987,"type":1,"code":"addschool","local":"addschool"},
        {"key":"classroomanage","parentKey":"schoolmanage","path":"/ClassRoomList","text":"课室管理","icon":"database","url":"","target":"","order":986,"type":1,"code":"classroomanage","local":"classroomanage"},
        {"key":"addclassroom","parentKey":"schoolmanage","path":"/addclassroom","text":"新增课室","icon":"database","url":"","target":"","order":985,"type":1,"code":"addclassroom","local":"addclassroom"},
        {"key":"classlevelist","parentKey":"schoolmanage","path":"/gradelist","text":"年级列表","icon":"database","url":"","target":"","order":984,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addclasslevel","parentKey":"schoolmanage","path":"/addclasslevel","text":"新增年级","icon":"database","url":"","target":"","order":983,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentmanage","parentKey":"","path":"","text":"学员管理","icon":"database","url":"","target":"","order":982,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentlist","parentKey":"studentmanage","path":"/studentlist","text":"学员列表","icon":"database","url":"","target":"","order":981,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentregister","parentKey":"studentmanage","path":"/studentregister","text":"学员登记","icon":"database","url":"","target":"","order":980,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"delstudentlist","parentKey":"studentmanage","path":"/DelStudentList","text":"已删除学员","icon":"database","url":"","target":"","order":979,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"interviewlist","parentKey":"studentmanage","path":"/interviewlist","text":"回访列表","icon":"database","url":"","target":"","order":978,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addSubType","parentKey":"studentmanage","path":"/addSubType","text":"添加子类型","icon":"database","url":"","target":"","order":977,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"testlist","parentKey":"studentmanage","path":"/interviewlist","text":"测验列表","icon":"database","url":"","target":"","order":976,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"teachermanage","parentKey":"","path":"/teachermanage","text":"教师管理","icon":"database","url":"","target":"","order":975,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"teacherlist","parentKey":"teachermanage","path":"/teacherlist","text":"教师列表","icon":"database","url":"","target":"","order":974,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addteacher","parentKey":"teachermanage","path":"/addteacher","text":"教师登记","icon":"database","url":"","target":"","order":973,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"classmanage","parentKey":"","path":"","text":"班级管理","icon":"database","url":"","target":"","order":972,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"courselist","parentKey":"classmanage","path":"/courselist","text":"课程列表","icon":"database","url":"","target":"","order":971,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addcourse","parentKey":"classmanage","path":"/addcourse","text":"创建课程","icon":"database","url":"","target":"","order":970,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentclass","parentKey":"classmanage","path":"/studentclass","text":"学员分班","icon":"database","url":"","target":"","order":969,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"adjustcourse","parentKey":"classmanage","path":"/adjustcourse","text":"课程调整","icon":"database","url":"","target":"","order":968,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"paymentmanage","parentKey":"","path":"","text":"收支管理","icon":"database","url":"","target":"","order":967,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"paylist","parentKey":"paymentmanage","path":"/incomelist","text":"收入表","icon":"database","url":"","target":"","order":966,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addpay","parentKey":"paymentmanage","path":"/addpay","text":"添加缴费","icon":"database","url":"","target":"","order":965,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"statistics","parentKey":"","path":"/statistics","text":"报表中心","icon":"database","url":"","target":"","order":964,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"totalclasshour","parentKey":"statistics","path":"/totalclasshour","text":"总课时消耗","icon":"database","url":"","target":"","order":963,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"goonstudent","parentKey":"statistics","path":"/goonstudent","text":"续课学员","icon":"database","url":"","target":"","order":962,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"teacherclasshour","parentKey":"statistics","path":"/teacherclasshour","text":"教师课时","icon":"database","url":"","target":"","order":961,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentclasshour","parentKey":"statistics","path":"/studentclasshour","text":"学员课时","icon":"database","url":"","target":"","order":960,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"totalclasshour","parentKey":"statistics","path":"/totalclasshour","text":"总课时消耗","icon":"database","url":"","target":"","order":959,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"surplusmoney","parentKey":"statistics","path":"/surplusmoney","text":"剩余金额","icon":"database","url":"","target":"","order":958,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"teacherClassstatus","parentKey":"statistics","path":"/teacherClassstatus","text":"教师带班情况","icon":"database","url":"","target":"","order":957,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"classschduletime","parentKey":"statistics","path":"/classschduletime","text":"时间排班","icon":"database","url":"","target":"","order":956,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"classschduleteacher","parentKey":"statistics","path":"/classschduleteacher","text":"教师排班","icon":"database","url":"","target":"","order":955,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"classschduleClass","parentKey":"statistics","path":"/classschduleClass","text":"课时排班","icon":"database","url":"","target":"","order":954,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"classhourDiagram","parentKey":"statistics","path":"/classhourDiagram","text":"课时图表","icon":"database","url":"","target":"","order":953,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"homeschoolconnect","parentKey":"","path":"","text":"家校互联","icon":"database","url":"","target":"","order":952,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"homeschool","parentKey":"homeschoolconnect","path":"/homeschool","text":"家校互联","icon":"database","url":"","target":"","order":951,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"messagemanage","parentKey":"","path":"","text":"消息管理","icon":"database","url":"","target":"","order":950,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"remindclass","parentKey":"messagemanage","path":"/remindclass","text":"提醒上课","icon":"database","url":"","target":"","order":949,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"dataimport","parentKey":"","path":"","text":"数据导入","icon":"database","url":"","target":"","order":948,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"studentimport","parentKey":"dataimport","path":"/studentimport","text":"学生导入","icon":"database","url":"","target":"","order":947,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"attendancemanage","parentKey":"","path":"","text":"考勤管理","icon":"database","url":"","target":"","order":946,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"attendance","parentKey":"attendancemanage","path":"/attendance","text":"考勤管理","icon":"database","url":"","target":"","order":945,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"attendancelist","parentKey":"attendancemanage","path":"/attendancelist","text":"考勤管理","icon":"database","url":"","target":"","order":944,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"attendancehistory","parentKey":"attendancemanage","path":"/attendancehistory","text":"考勤历史","icon":"database","url":"","target":"","order":943,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"attendancehistory","parentKey":"attendancemanage","path":"/attendancehistory","text":"考勤历史","icon":"database","url":"","target":"","order":942,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"commoditymanage","parentKey":"","path":"","text":"商品管理","icon":"database","url":"","target":"","order":941,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"commoditylist","parentKey":"commoditymanage","path":"/commoditylist","text":"商品列表","icon":"database","url":"","target":"","order":939,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"outinlist","parentKey":"commoditymanage","path":"/outinlist","text":"存取列表","icon":"database","url":"","target":"","order":938,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"addcommodity","parentKey":"commoditymanage","path":"/addcommodity","text":"添加商品","icon":"database","url":"","target":"","order":937,"type":1,"code":"studentConsult","local":"studentConsult"},
        {"key":"outincommdity","parentKey":"commoditymanage","path":"/outincommdity","text":"商品存取","icon":"database","url":"","target":"","order":936,"type":1,"code":"studentConsult","local":"studentConsult"},



    ])




    //
    // const data=[
    // {key:'KafkaAmazon',local:'kafkaAmazon',text:'KafkaAmazon',icon:'book',path:'/kafkahandle',order:100},
    //     {key: 'sysManage', local: 'sysManage', text: 'SystemManage', icon: 'ant-design', order: 1000},
    //     {key: 'menus', parentKey: 'sysManage', local: 'menus', text: 'Element List', icon: 'lock', path: '/element', order: 1000},
    //     {key: 'role',  parentKey: 'sysManage',local: 'roles', text: 'RoleList ', icon: 'team', path: '/roles', order: 800},
    //     {key: 'apiFunction',  parentKey: 'sysManage',local: 'API List', text: 'API List', icon: 'user', path: '/function', order: 600},
    //     {key: 'user',  parentKey: 'sysManage',local: 'users', text: 'UserList', icon: 'user', path: '/users', order: 900}
    // ];
    //
    // return Promise.resolve(data);
    // return Promise.resolve([
    //     {key: '1', text: 'level-1', icon: 'align-left'},
    //     {key: '1-1', parentKey: '1', text: 'level-1-1', icon: 'align-left'},
    //     {key: '1-2', parentKey: '1', text: 'level-1-2', icon: 'align-left'},
    //     {key: '1-3', parentKey: '1', text: 'level-1-3', icon: 'align-left'},
    //     {key: '1-4', parentKey: '1', text: 'level-1-4', icon: 'align-left'},
    //     {key: '1-4-1', parentKey: '1-4', text: 'level-1-4-1', icon: 'align-left'},
    //     {key: '1-4-2', parentKey: '1-4', text: 'level-1-4-2', icon: 'align-left'},
    //     {key: '1-4-3', parentKey: '1-4', text: 'level-1-4-3', icon: 'align-left'},
    //     {key: '1-4-4', parentKey: '1-4', text: 'level-1-4-4', icon: 'align-left'},
    //     {key: '1-4-3-1', parentKey: '1-4-3', text: 'level-1-4-3-1', icon: 'align-left'},
    //     {key: '1-4-3-2', parentKey: '1-4-3', text: 'level-1-4-3-2', icon: 'align-left'},
    //     {key: '1-4-3-3', parentKey: '1-4-3', text: 'level-1-4-3-3', icon: 'align-left'},
    //     {key: '1-4-3-4', parentKey: '1-4-3', text: 'level-1-4-3-4', icon: 'align-left'},
    //
    //
    //     {key: 'antDesign222', local: 'antDesign', text: 'Ant Design 官网22', icon: 'ant-design', url: 'https://ant-design.gitee.io', order: 2000},
    //     {key: 'google', local: 'google', text: '谷歌', icon: 'google', url: 'https://www.google.com', target: '_blank', order: 1200},
    //     {key: 'document', local: 'document', text: '文档', icon: 'book', url: 'https://open.vbill.cn/react-admin', target: '_blank', order: 1200},
    //
    //     {key: 'menus', local: 'menus', text: '菜单编辑', icon: 'lock', path: '/menu-permission', order: 1000},
    //     {key: 'codeGenerator', local: 'codeGenerator', text: '代码生成', icon: 'code', path: '/admin-crud', order: 999},
    //     {key: 'ajax', local: 'ajax', text: 'ajax请求', icon: 'api', path: '/example/ajax', order: 998},
    //     {key: 'user', local: 'users', text: '用户列表', icon: 'user', path: '/users', order: 900},
    //     {key: 'role', local: 'roles', text: '角色列表 ', icon: 'team', path: '/roles', order: 800},
    //     {key: 'page404', local: 'page404', text: '404页面不存', icon: 'file-search', path: '/404', order: 700},
    //     {key: 'user-center', local: 'userCenter', text: '用户中心', icon: 'user', path: '/user-center', order: 600},
    //     {key: 'component', local: 'component', text: '组件', icon: 'ant-design', order: 700},
    // ].concat(antdMenus));
}
