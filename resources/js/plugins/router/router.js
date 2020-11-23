import AppAdmin from '../../components/AppAdmin'

import { Agenda, AgendaDetail, Employee, Gallery, Home, Login, NotFound, Prestation, Public, Search, Study } from '../../views'
import {
    Aaudit, Aemployees, Aagenda,
    Agallery, Ahomepage, Akeyword,
    Ameta, Aprestation, Aprofile,
    Apublic, Arole, Astudy,
    AstudyEdit, Ausers, AagendaEdit,
    AcreateRole,
} from '../../views/admin'

export default [
    {
        path: '*',
        redirect: '/404'
    }, {
        path: '/404',
        component: NotFound
    }, {
        path: '/',
        name: 'welcome',
        component: Home
    }, {
        path: '/profile/:id',
        name: 'profile',
        component: Public
    }, {
        path: '/profile',
        redirect: '/profile/public'
    }, {
        path: '/study-program/:slug',
        name: 'study',
        component: Study
    }, {
        path: '/study-program',
    }, {
        path: '/information-media',
        redirect: '/information-media/agenda',
    }, {
        path: '/information-media/agenda',
        name: 'media-agenda',
        component: Agenda
    }, {
        path: '/information-media/agenda/:slug',
        name: 'media-agenda-detail',
        component: AgendaDetail
    }, {
        path: '/information-media/prestations',
        name: 'media-prestations',
        component: Prestation
    }, {
        path: '/information-media/galleries',
        name: 'media-galleries',
        component: Gallery
    }, {
        path: '/employees',
        name: 'employees',
        component: Employee
    }, {
        path: '/search',
        name: 'search',
        component: Search
    }, {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { auth: false }
    }, {
        path: '/admin',
        name: 'admin',
        component: AppAdmin,
        redirect: '/admin/homepage',
        meta: { auth: true },
        children: [
            { path: 'homepage', name: 'admin-homepage', component: Ahomepage, meta: { auth: true } },
            { path: 'profile', name: 'admin-profile', redirect: '/admin/profile/public-profile', meta: { auth: true } },
            { path: 'profile/:id', name: 'admin-profilee', component: Apublic, meta: { auth: true } },
            { path: 'study-program', name: 'admin-study', component: Astudy, meta: { auth: true } },
            { path: 'study-program/:slug', name: 'admin-study-edit', component: AstudyEdit, meta: { auth: true } },
            { path: 'information-media', name: 'admin-media', redirect: '/admin/information-media/agenda', meta: { auth: true } },
            { path: 'information-media/agenda', name: 'admin-media-agenda', component: Aagenda, meta: { auth: true } },
            { path: 'information-media/agenda/:slug', name: 'admin-media-agenda-detail', component: AagendaEdit, meta: { auth: true } },
            { path: 'information-media/prestation', name: 'admin-media-prestation', component: Aprestation, meta: { auth: true } },
            { path: 'information-media/gallery', name: 'admin-media-gallery', component: Agallery, meta: { auth: true } },
            { path: 'employees', name: 'admin-employees', component: Aemployees, meta: { auth: true } },
            { path: 'user-management', name: 'admin-user', redirect: '/admin/user-management/users', meta: { auth: true } },
            { path: 'user-management/users', name: 'admin-user-users', component: Ausers, meta: { auth: true } },
            { path: 'user-management/role', name: 'admin-user-role', component: Arole, meta: { auth: true } },
            { path: 'user-management/role/create', component: AcreateRole, meta: { auth: true } },
            { path: 'user-management/role/create/:id', component: AcreateRole, meta: { auth: true } },
            { path: 'keywords', name: 'admin-keywords', component: Akeyword, meta: { auth: true } },
            { path: 'meta-tags', name: 'admin-meta', component: Ameta, meta: { auth: true } },
            { path: 'audits', name: 'admin-audit', component: Aaudit, meta: { auth: true } },
            { path: 'my-profile', name: 'admin-my-profile', component: Aprofile, meta: { auth: true } },
        ]
    }
]
