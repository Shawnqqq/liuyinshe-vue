const Home = () =>
  import(/* webpackChunkName: "Home" */ "@/views/Home");    //前台页
const AccountLogin = () =>
  import(/* webpackChunkName: "AccountLogin" */ "@/views/Login");    //登录页
const Dashboard = () =>
  import(/* webpackChunkName: "Dashboard" */ "@/views/Dashboard");   //概况页
const Manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/Manager");   //管理员
const ManagerCreate = () =>
  import(/* webpackChunkName: "ManagerCreate" */ "@/views/ManagerCreate");   //新增管理员
const ManagerEdit = () =>
  import(/* webpackChunkName: "ManagerEdit" */ "@/views/ManagerEdit");   //编辑管理员
const Payment = () =>
  import(/* webpackChunkName: "Payment" */ "@/views/Payment");   //消费记录
const PaymentCreate = () =>
  import(/* webpackChunkName: "PaymentCreate" */ "@/views/PaymentCreate");   //新增消费记录
const User = () =>
  import(/* webpackChunkName: "User" */ "@/views/User");   // 用户
const UserCreate = () =>
  import(/* webpackChunkName: "UserCreate" */ "@/views/UserCreate");   // 创建用户
const UserEdit = () =>
  import(/* webpackChunkName: "UserEdit" */ "@/views/UserEdit");   // 修改用户
const UserSingle = () =>
  import(/* webpackChunkName: "UserSingle" */ "@/views/UserSingle");   // 用户详情
const Course = () =>
  import(/* webpackChunkName: "Course" */ "@/views/Course");   //  课程
const CourseCreate = () =>
  import(/* webpackChunkName: "CourseCreate" */ "@/views/CourseCreate");   //  课程创建
const CourseSingle = () =>
  import(/* webpackChunkName: "CourseSingle" */ "@/views/CourseSingle");   //  课程详情
const CourseEdit= () =>
  import(/* webpackChunkName: "CourseEdit" */ "@/views/CourseEdit");   //  课程编辑
const Class= () =>
  import(/* webpackChunkName: "Class" */ "@/views/Class");   //   班级
const ClassEdit= () =>
  import(/* webpackChunkName: "ClassEdit" */ "@/views/ClassEdit");   //   班级修改
const ClassSingle= () =>
  import(/* webpackChunkName: "ClassSingle" */ "@/views/ClassSingle");   //   班级详情
const ClassCreate= () =>
  import(/* webpackChunkName: "ClassCreate" */ "@/views/ClassCreate");   //   班级添加
const ClassUserSign = ()=>
  import(/* webpackChunkName: "ClassUserSign" */ "@/views/ClassUserSign");   //  用户报班
const Click = ()=>
  import(/* webpackChunkName: "Click" */ "@/views/Click");   //  上课点名
const ClickSingle = ()=>
  import(/* webpackChunkName: "ClickSingle" */ "@/views/ClickSingle");   //  班级详情
const ClickUser = ()=>
  import(/* webpackChunkName: "ClickUser" */ "@/views/ClickUser");   //  上课点名
const Leave = ()=>
  import(/* webpackChunkName: "Leave" */ "@/views/Leave");   //  请假管理
// const Error404 = () =>
//   import(/* webpackChunkName: "errorp" */ "@/views/Error404");   //报错

import BasicLayout from "@/components/BasicLayout";

export default[
  {
    path: "/",
    component:Home,
    name: "Home",
  },
  {
    path:'/login',
    component:AccountLogin,
    name:'login'
  },
  {
    path:'/admin',
    component: BasicLayout,
    name:'admin',
    children:[
      {
        path:'/admin',
        name:'Dashboard',
        component:Dashboard,
        meta:{
          nav:{
            icon:'el-icon-pie-chart',
            title:'概况'
          },
          breadcrumb:{
            title:'概况',
            replace:false
          }
        },
      },
      {
        path:'/admin/manager',
        name:'ManagerRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Manager" },
        meta:{
          nav:{
            icon:'el-icon-s-custom',
            title:'管理员'
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children:[
          {
            path:'/admin/manager',
            name:'Manager',
            component:Manager,
            meta:{
              nav:{
                icon:'el-icon-menu',
                title:'菜单'
              },
              breadcrumb: {
                title: "菜单"
              }
            }
          },
          {
            path:'/admin/manager/create',
            name:'ManagerCreate',
            component:ManagerCreate,
            meta:{
              nav:{
                icon:'el-icon-circle-plus-outline',
                title:'创建'
              },
              breadcrumb: {
                title: "创建"
              }
            },
          },
          {
            path:'/admin/manager/:id/edit',
            name:'ManagerEdit',
            component:ManagerEdit,
            meta:{
              breadcrumb: {
                title: "修改"
              }
            },
          }
        ]
      },
      {
        path:'/admin/payment',
        name:'PaymentRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Payment" },
        meta:{
          nav:{
            icon:'el-icon-bank-card',
            title:'收支'
          },
          breadcrumb: {
            title: "收支"
          }
        },
        children:[
          {
            path:'/admin/payment',
            name:'Payment',
            component:Payment,
            meta:{
              nav:{
                icon:'el-icon-notebook-1',
                title:'消费记录'
              },
              breadcrumb: {
                title: "消费记录"
              }
            }
          },
          {
            path:'/admin/payment/create',
            name:'PaymentCreate',
            component:PaymentCreate,
            meta:{
              nav:{
                icon:'el-icon-edit-outline',
                title:'新增记录'
              },
              breadcrumb: {
                title: "新增记录"
              }
            }
          },
        ]
      },
      {
        path:'/admin/user',
        name:'UserRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "User" },
        meta:{
          nav:{
            icon:'el-icon-user',
            title:'用户'
          },
          breadcrumb: {
            title: "用户"
          }
        },
        children:[
          {
            path:'/admin/user',
            name:'User',
            component:User,
            meta:{
              nav:{
                icon:'el-icon-menu',
                title:'菜单'
              },
              breadcrumb: {
                title: "菜单"
              }
            }
          },
          {
            path:'/admin/user/create',
            name:'UserCreate',
            component:UserCreate,
            meta:{
              nav:{
                icon:'el-icon-circle-plus-outline',
                title:'创建'
              },
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path:'/admin/user/:id/edit',
            name:'UserEdit',
            component:UserEdit,
            meta:{
              breadcrumb: {
                title: "修改"
              }
            }
          },
          {
            path:'/admin/user/:id/single',
            name:'UserSingle',
            component:UserSingle,
            meta:{
              breadcrumb: {
                title: "详情"
              }
            }
          },
        ]
      },
      {
        path:'/admin/course',
        name:'CourseRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Course" },
        meta:{
          nav:{
            icon:'el-icon-collection',
            title:'课程'
          },
          breadcrumb: {
            title: "课程"
          }
        },
        children:[
          {
            path:'/admin/course',
            name:'Course',
            component:Course,
            meta:{
              nav:{
                icon:'el-icon-menu',
                title:'菜单'
              },
              breadcrumb: {
                title: "菜单"
              }
            }
          },
          {
            path:'/admin/course/create',
            name:'CourseCreate',
            component:CourseCreate,
            meta:{
              nav:{
                icon:'el-icon-circle-plus-outline',
                title:'创建'
              },
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path:'/admin/course/:id/edit',
            name:'CourseEdit',
            component:CourseEdit,
            meta:{
              breadcrumb: {
                title: "修改"
              }
            }
          },
          {
            path:'/admin/course/:id/single',
            name:'CourseSingle',
            component:CourseSingle,
            meta:{
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path:'/admin/class',
        name:'ClassRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Class" },
        meta:{
          nav:{
            icon:'el-icon-s-grid',
            title:'班级'
          },
          breadcrumb: {
            title: "班级"
          }
        },
        children:[
          {
            path:'/admin/class',
            name:'Class',
            component:Class,
            meta:{
              nav:{
                icon:'el-icon-menu',
                title:'菜单'
              },
              breadcrumb: {
                title: "菜单"
              }
            }
          },
          {
            path:'/admin/class/create',
            name:'ClassCreate',
            component:ClassCreate,
            meta:{
              nav:{
                icon:'el-icon-circle-plus-outline',
                title:'创建'
              },
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path:'/admin/class/:id/edit',
            name:'ClassEdit',
            component:ClassEdit,
            meta:{
              breadcrumb: {
                title: "修改"
              }
            }
          },
          {
            path:'/admin/class/:id/single',
            name:'ClassSingle',
            component:ClassSingle,
            meta:{
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path:'/admin/class/:id/userSign',
            name:'ClassUserSign',
            component:ClassUserSign,
            meta:{
              breadcrumb: {
                title: "报班"
              }
            }
          }
        ]
      },
      {
        path:'/admin/click',
        name:'clickRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Click" },
        meta:{
          nav:{
            icon:'el-icon-bell',
            title:'上课'
          },
          breadcrumb: {
            title: "查找班级"
          }
        },
        children:[
          {
            path:'/admin/click',
            name:'Click',
            component:Click,
          },
          {
            path:'/admin/click/:id/single',
            name:'ClickSingle',
            component:ClickSingle,
            meta:{
              breadcrumb: {
                title: "班级详情"
              }
            }
          },
          {
            path:'/admin/click/:id/user',
            name:'ClickUser',
            component:ClickUser,
            meta:{
              breadcrumb: {
                title: "上课点名"
              }
            }
          }
        ]
      },
      {
        path:'/admin/leave',
        name:'leaveRoot',
        component:{ render: h => h('router-view')},
        redirect: { name: "Leave" },
        meta:{
          nav:{
            icon:'el-icon-mouse',
            title:'请假管理'
          },
          breadcrumb: {
            title: "请假管理"
          }
        },
        children:[
          {
            path:'/admin/leave',
            name:'Leave',
            component:Leave,
            meta:{
              nav:{
                icon:'el-icon-menu',
                title:'菜单'
              },
              breadcrumb: {
                title: "菜单"
              }
            }
          }
        ]
      }
    ]
  },
]