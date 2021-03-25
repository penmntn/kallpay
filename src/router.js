import Vue from 'vue'
import Router from 'vue-router'
import auth from "@/auth/authService";
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [

    {
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta : {
            rule : "Authenticated",
            authRequired:  true
          }
        },
        {
          path: '/CrearEncuesta',
          name: 'crear-encuesta',
          component: () => import('./views/Admin/CrearEncuesta.vue'),
          meta : {
            rule : "Authenticated",
            authRequired: true
          },
        },
        {
          path: '/VerEncuestas',
          name: 'ver-encuesta',
          component: () => import('./views/Admin/VerEncuestas.vue'),
          meta : {
            rule : "Authenticated",
            authRequired: true
          },
        },
        {
          path: '/Empresas',
          name: 'empresas',
          component: () => import('./views/Admin/Empresa.vue'),
          meta : {
            rule : "Authenticated",
            authRequired: true
          },
        },
        {
          path: '/Estudiantes',
          name: 'estudiantes',
          component: () => import('./views/Admin/Estudiantes.vue'),
          meta : {
            rule : "Authenticated",
            authRequired: true
          },
        }
      ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/login/Login.vue'),
          meta : {
            rule : "public"
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/register',
          name: 'register',
          component: () => import('@/views/pages/register/Register.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/ComingSoon',
          name: 'ComingSoon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/Error404',
          name: 'Error404',
          component: () => import('@/views/pages/Error404.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/Error500',
          name: 'Error500',
          component: () => import('@/views/pages/Error500.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/Maintenance',
          name: 'Maintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta : {
            rule : "public",
          }
        },
        {
          path: '/pages/LockScreen',
          name: 'LockScreen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta : {
            rule : "public",
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(() => {

      // get firebase current user
      const firebaseCurrentUser = firebase.auth().currentUser

      // if (
      //     to.path === "/pages/login" ||
      //     to.path === "/pages/forgot-password" ||
      //     to.path === "/pages/error-404" ||
      //     to.path === "/pages/error-500" ||
      //     to.path === "/pages/register" ||
      //     to.path === "/callback" ||
      //     to.path === "/pages/comingsoon" ||
      //     (auth.isAuthenticated() || firebaseCurrentUser)
      // ) {
      //     return next();
      // }

      // If auth required, check login. If login fails redirect to login page
      if(to.meta.authRequired) {
        if (!(auth.isAuthenticated() || firebaseCurrentUser)) {
          router.push({ path: '/pages/login', query: { to: to.path } })
        }
      }
      return next()
  });

});

  export default router
