import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate, useRoutes } from "react-router-dom";
import Layout from '@/layouts'
const routes = [
    {
        path: '/',
        // element:<Layout></Layout>,
        // element:<Navigate to='/home'></Navigate>,
        redirect: <Navigate to='/home'></Navigate>
    },
    {
        component: Layout,
        element: <Layout></Layout>,
        children: [
            {
                path: '/home',
                // component:Home,
                component: lazy(() => import('@/views/Home')),
                // element:<Home></Home>

            },
        ]
    }
]

const generateRoutes = (routes: any) => {
    const routesRes = routes.map((item: any) => {
        console.log('😄item:', item)
        if (item.children && item.children.length > 0) {
            generateRoutes(item.children)
        }
        item.redirect ? item.element = item.redirect :
            item.element = <item.component></item.component>
        return item;
    })

    return routesRes;
}


const routesRes = generateRoutes(routes);
console.log('😃routesRes:', routesRes)

export default function Router() {
    return useRoutes(routesRes)
}

