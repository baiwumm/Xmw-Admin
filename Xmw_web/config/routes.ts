import type { IRoute } from 'umi'

import system from './router/system'

const routes: IRoute[] = [
    {
        path: '/',
        component: '@/layouts/index',
        routes: [
            system
        ]
    }
]

export default routes