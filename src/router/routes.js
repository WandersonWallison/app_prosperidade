
const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/Home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Listas.vue') }
    ]
  }
]
/* routes.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    if (authUser) {
      if (to.meta.permissions === true && authUser2.id_profile === 3) {
        next()
      } else {
        next('/')
        window.localStorage.clear()
      }
    } else {
      next('/')
      this.$router.push('/')
      window.localStorage.clear()
    }
  }
  next()
}) */
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
