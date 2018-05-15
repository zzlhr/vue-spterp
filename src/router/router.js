/**
 *  加载模块
 */


import UserList from '../components/user/List'
import EnterpriseList from '../components/enterprise/List'

const routes = [
    {
        path: '/user',
        component: UserList,
        children: [
            {
                path : 'list',
                component: UserList
            },
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

