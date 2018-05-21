/**
 *  加载模块
 */


import UserList from '../components/user/List'
import UserInfo from '../components/user/Info'
import EnterpriseList from '../components/enterprise/List'
import UserEdit from '../components/user/Edit'

const routes = [
    {
        path: '/user',
        component: UserList,
        children: [
            {
                path : 'list',
                component: UserList
            },
            {
                path: 'info/:userId',
                component: UserInfo
            },{
                path: 'edit/:userId',
                component: UserEdit
            }
        ]
    },
    {
        path: '/enterprise',
        component: EnterpriseList,
        children: [
            {
                path : 'list',
                component: EnterpriseList
            },
        ]
    }
];

export  default  routes

