<template>
    <div class="container ">
      <b-card class="m-3">
        <b-form>
          <b-form-group
            id="descripcion_entrega"
            label="Descripción de la Entrega:"
            label-for="descripcion_entrega"
          >
            <b-form-textarea
              id="descripcion_entrega"
              v-model="entrega.descripcion_entrega"
              :rows="5"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            id="documento"
            label="Documento :"
            label-for="documento"
          >
            <b-form-file
              id="documento"
              v-model="documento.documento"
              multiple
              accept=".pdf,.doc,.docx"
            ></b-form-file>
          </b-form-group>
          <b-form-group id="tipo_revision" label="Tipo Revison">
            <div>
              <b-form-select v-model="entrega.tipo_revision">
                <b-form-select-option v-for="option in tipo_de_revicion" :key="option.id" :value="option.id" >
                  {{ option.nombre }}
                </b-form-select-option>
              </b-form-select>
            </div>
          </b-form-group>
        </b-form>
        <div class=" position-absolute bottom-0 end-0">
          <b-button class="m-1" type="reset" variant="danger">Cancelar</b-button>
          <b-button  @click="crearEntrega()" class="m-1">Enviar</b-button>
        </div>
        {{ entrega }}
      </b-card>
    </div>
  </template>
  
  
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
          documento: {
            documento:null,
            entrega:null
          },
          id : this.$route.params.id,
          perfil: this.$store.state.perfil.id,
          grupos:null,
          entrega:{
            calificacion: null,
            descripcion_entrega: null,
            respuesta_instructor: null,
            instructor: null,
            proyecto: null,
            tipo_revision: null,
            autor: null
  
          },
          proyecto:null,
          tipo_de_revicion:[]
        }
      },
      methods: {
  
        async getProyecto(id){
              await this.axios('http://127.0.0.1:8000/api/proyecto/'+id+'/').then(response=>{
                  this.proyecto = response.data.nombre
  
              })
          },
        async getTipoDeRevision(){
              await this.axios('http://127.0.0.1:8000/api/tipo_revision/').then(response=>{
                  this.tipo_de_revicion = response.data
  
              })
          },
  
        async crearEntrega(id){
          this.entrega.proyecto=this.id
          this.entrega.autor= this.perfil
          await this.axios.put('http://127.0.0.1:8000/api/entrega/'+id+'/', this.entrega)
          await this.crearDocumento()
  
        },
  
        async crearDocumento(){
          await this.axios.post('http://127.0.0.1:8000/api/documento/', this.documento)
  
        },
        async getEntrega(){
            let id = this.$route.params.id
            await axios.get('http://127.0.0.1:8000/api/entrega/'+id+'/').then(response=>{
                this.entrega.id = response.data.id,
                this.entrega.calificacion= response.data.calificacion,
                this.entrega.descripcion_entrega= response.data.descripcion_entrega,
                this.entrega.respuesta_instructor= response.data.respuesta_instructor,
                this.entrega.instructor= response.data.instructor,
                this.entrega.proyecto= response.data.proyecto,
                this.entrega.tipo_revision= response.data.tipo_revision,
                this.entrega.autor= response.data.autor
            })
        },
  
        async verProyecto(id){
          this.$router.push('/detalle-prosyecto/'+id)
        },
        
      },
      async mounted(){
        await this.getTipoDeRevision()
  
          
      }
    }
  </script>