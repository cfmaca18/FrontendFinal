import Vue from 'vue'
import VueRouter from 'vue-router'
import RegistrarView from '@/views/Registrar.vue'
import LoginView from '@/views/Login.vue'
import InicioView from '@/views/Inicio.vue'

import ListaProyectoView from '@/views/ListaProyecto.vue'
import VerProyectoView from '@/views/VerProyecto.vue'
import CrearProyectoView from '@/views/CrearProyecto.vue'
import MisProyectoView from '@/views/MisProyectos.vue'
import DetalleProyectoView from '@/views/Aprendiz/DetalleProyecto.vue'
import EditarProyectoView from '@/views/EditarProyecto.vue'

import CrearEntregaView from '@/views/CrearEntrega.vue'
import ListaEntrega from '@/views/ListaEntregas.vue'
import DetalleEntrega from '@/views/DetalleEntrega.vue'
import ActualizarEntregaView from '@/views/actualizarEntrega.vue'

import Desarrolladores from '../views/Desarrolladores.vue' 
import PoliticasyPrivacidad from '@/views/PoliticasyPrivacidad.vue'
import terminosycondicionesVue from '@/views/terminosycondiciones.vue'

import CrearGrupo from '@/views/CrearGrupo.vue'
import ListaMiembrosGrupo from '@/components/ListaMiembrosGrupo'
import ListaGrupos from '@/components/ListaGrupos'
import AgregarMiembros from '@/components/AgregarMiembros'
import grupo from '@/components/Grupo'
Vue.use(VueRouter)

const routes = [
  {
    path: '/registrar',
    name: 'registrar',
    component: RegistrarView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Inicio',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/lista-proyecto',
    name: 'lista-proyecto',
    component: ListaProyectoView
  },
  {
    path: '/mis-proyectos',
    name: 'mis-proyectos',
    component: MisProyectoView
  },
  {
    path:'/ver-proyecto/:id',
    name: 'ver-proyecto',
    component: VerProyectoView
  },
  {
    path:'/editar-proyecto/:id',
    name: 'editar-proyecto',
    component: EditarProyectoView
  },
  {
    path:'/detalle-proyecto/:id',
    name: 'detalle-proyecto',
    component:DetalleProyectoView
  },
  {
    path:'/detalle-entrega/:id',
    name: 'detalle-entrega',
    component:DetalleEntrega
  },
  {
    path:'/crear-proyecto',
    name: 'crear-proyecto',
    component: CrearProyectoView
  },
  {
    path:'/crear-entrega/:id',
    name: 'crearentrega',
    component: CrearEntregaView
  },
  {
    path:'/actualizar-entrega/:id',
    name: 'actualizar-entrega',
    component: ActualizarEntregaView
  },
  {
    path:'/lista-entrega',
    name: 'lista-entrega',
    component: ListaEntrega
  },
  {
    path:'/Desarrolladores',
    name: 'Desarrolladores',
    component: Desarrolladores
  },
  {
    path:'/PoliticasyPrivacidad',
    name: 'PoliticasyPrivacidad',
    component:PoliticasyPrivacidad
  },
  {
    path:'/terminosycondiciones',
    name: 'terminosycndiciones',
    component:terminosycondicionesVue
  },
  {
    path:'/agregar-integrante/:id',
    name: 'AgregarMiembros',
    component: AgregarMiembros
  },
  {
    path:'/grupo/:id',
    name: 'grupo',
    component: grupo
  },
  {
    path:'/crear-grupo',
    name: 'CrearGrupo',
    component: CrearGrupo
  },
  {
    path:'/ListaMiembrosGrupo',
    name: 'ListaMiembrosGrupo',
    component: ListaMiembrosGrupo
  },
  {
    path:'/lista-grupos',
    name: 'ListaGrupos',
    component: ListaGrupos
  }
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
