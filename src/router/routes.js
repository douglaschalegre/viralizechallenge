
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/General.vue') },
      { path: 'general', component: () => import('pages/General.vue') },
      { path: 'reports', component: () => import('pages/Reports.vue') },
      { path: 'corrections', component: () => import('pages/Corrections.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
