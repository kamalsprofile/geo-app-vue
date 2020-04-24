import Vue from 'vue'
import Router from 'vue-router'
import GMap from '../components/home/map'
import SignUp from '../components/auth/signup'
import LogIn from '../components/auth/logIn'
import firebase from 'firebase'
import Profile from '../components/profile/viewproile'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GMap',
      component: GMap,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    }
  ]
})



router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requireAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({
        name: 'LogIn'
      })
    }
  }
  else {
    next()
  }
})

export default router