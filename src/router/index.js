import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Categoria from '../components/categoria.vue'
import Login from '../components/Login.vue'
import nUser from '../components/NuevoUsuario.vue'
import Usuario from '../components/Usuario.vue'
/* import Articulo from '../components/Articulo.vue'
import Cliente from '../components/Cliente.vue'
import Proveedor from '../components/Proveedor.vue'
import Ingreso from '../components/Ingreso.vue'
import Venta from '../components/Venta.vue' */


Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        administrador: true,
        almacenero: true,
        vendedor: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        libre: true
      }
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
      meta: {
        administrador: true,
        almacenero: true
      }
    },
    /* {
      path: '/articulo',
      name: 'articulo',
      component: Articulo,
      meta: {
        administrador: true,
        almacenero: true
      }
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: Ingreso,
      meta: {
        administrador: true,
        almacenero: true
      }
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: Cliente,
      meta: {
        administrador: true,
        vendedor: true
      }
    },
    {
      path: '/venta',
      name: 'venta',
      component: Venta,
      meta: {
        administrador: true,
        vendedor: true
      }
    },
    {
      path: '/proveedor',
      name: 'proveedor',
      component: Proveedor,
      meta: {
        administrador: true,
        almacenero: true
      }
    },*/
    {
      path: '/usuario',
      name: 'usuario',
      component: Usuario,
      meta: {
        administrador: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.libre)){
    next();
  } else if ( store.state.usuario && store.state.usuario.rol == 1){
    if (to.matched.some(record => record.meta.administrador)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 3){
    if (to.matched.some(record => record.meta.vendedor)){
      next();
    }
  } else if ( store.state.usuario && store.state.usuario.rol == 2){
    if (to.matched.some(record => record.meta.almacenero)){
      next();
    }
  } else{
    next({name: 'login'});
  }
})
export default router
