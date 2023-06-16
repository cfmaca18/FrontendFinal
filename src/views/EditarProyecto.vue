<template>
    <div class="d-flex justify-content-center">
      <b-card class="m-5 p-3"  style="width: 75%;">
        {{ proyecto }}
        <!-- Contenido de la tarjeta -->
        <b-form>
          <b-form-group 
            id="input-group-1"
            label="Nombre del proyecto:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="proyecto.nombre_proyecto"
              type="text"
              required
            >    
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="descripcion"
            label="Descripción del proyecto:"
            label-for="descripcion"
          >
            <b-form-textarea
              id="descripcion"
              v-model="proyecto.descripcion"
              :rows="5"
              required
            ></b-form-textarea>
          </b-form-group>
          
          <b-form-group
            id="foto"
            label="Logo de la App:"
            label-for="foto"
          >
            <b-form-file
              id="foto"
              v-model="proyecto.foto"
              accept="image/*"
            ></b-form-file>
          </b-form-group>
          <b-form-group
            id="codigo_fuente"
            label="Código fuente del proyecto:"
            label-for="codigo_fuente"
          >
            <b-form-input
              id="codigo_fuente"
              v-model="proyecto.codigo_fuente"
              type="url"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="categorias:"
          >
          <b-dropdown text="Seleccionar categorria">
            <b-form-checkbox-group v-model="proyecto.categorias" v-for="item in categorias" :key="item.id" >
              <b-form-checkbox  :value="item.url">
                {{ item.nombre }}
              </b-form-checkbox>
            </b-form-checkbox-group>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item >Seleccionar</b-dropdown-item>
          </b-dropdown>
          </b-form-group>
        
          <b-button class="m-1" type="reset" variant="danger">Cancelar</b-button>
          <b-button class="m-1 enviar" @click="editarProyecto(proyecto.id)" >Enviar</b-button>
        </b-form>
        <div class="mt-3">Selected: <strong>{{this.grupoSelecionado}}</strong></div>
      </b-card>
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
          perfil: this.$store.state.perfil.id,
          grupoSelecionado:null,
          grupo:{
            id:null,
            nombre_grupo:null,
            integrantes:null,
            proyecto:null
          },
          grupos:null,
          proyecto: { 
            nombre_proyecto: '',
            descripcion: '',
            foto: null,
            codigo_fuente: '',
            categorias: [],
          },

          categorias: [],
          show: true,
  
        }
      },
      methods: {
        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("http://127.0.0.1:8000/api/proyecto/"+id+"/").then(response=>{
            this.proyecto.id=response.data.id
            this.proyecto.nombre_proyecto=response.data.nombre_proyecto
            this.proyecto.descripcion=response.data.descripcion
            this.proyecto.codigo_fuente=response.data.codigo_fuente

            });
        } ,
        async getCategoria(){
              await this.axios('http://127.0.0.1:8000/api/categoria/').then(response=>{
                  this.categorias = response.data
                  
              })
        },


        async editarProyecto(id){
          await this.axios.put('http://127.0.0.1:8000/api/proyecto/'+id+'/', this.proyecto)
          this.$router.push('/mis-proyectos')
  
  
        },
      },
      async mounted(){
          await this.getCategoria()
          await this.verProyecto()
          
      }
    }
  </script>
  
   <style>
   .enviar{
    background-color: #d81e84;
   }
        /* Estilos CSS para el contenedor */
    .contenedor {
          background-color: rgba(255, 218, 185, 0.2);
        }
    </style>