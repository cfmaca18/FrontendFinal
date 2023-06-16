<template>
  <div class="container">

    <div class="row">
      <div class="row justify-content-center">
        <h1 class="text-center">Crear un proyecto del grupo {{ grupo.nombre_grupo}} </h1>
      </div>

    </div>
    <div class="row">
      <div class="row justify-content-center">
        <h3 class="text-center">Ficha: {{ ficha.codigo }} </h3>
      </div>

    </div>
    <div class="row">

      <div class="d-flex justify-content-center">
    
        <b-card class="m-5 p-3"  style="width: 75%;">
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
              id="documento"
              label="Documento :"
              label-for="documento"
            >
              <b-form-file
                id="documento"
                v-model="proyecto.documento"
                accept=".pdf,.doc,.docx"
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
           
            <b-button type="reset" variant="danger">Cancelar</b-button>
            <b-button  @click="postProyecto()" class="enviar">Enviar</b-button>
          </b-form>
          <div class="mt-3">Selected: <strong>{{this.inscrito_id}}</strong></div>
        </b-card>
      </div>
    </div>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        perfil: this.$store.state.perfil.id,
        inscrito:null,
        inscrito_id:null,
        grupo_id:null,
        ficha_id:null,
        proyecto: { 
          nombre_proyecto:null,
          descripcion:null,
          foto: null,
          aprendiz:null,
          codigo_fuente:null,
          categorias: [],
          autor: null,
        },
        categorias: [],
        grupo:[],
        ficha:[]
   

      }
    },
    methods: {
      inscritos(inscritos) {
          for (let i = 0; i < inscritos.length; i++) {
            let inscrito= inscritos[i];
            console.log(inscrito.id)
            this.grupo_id=inscrito.nombre_grupo
            this.ficha_id=inscrito.ficha
            console.log(inscrito.nombre_grupo)
            return inscrito.id 
            
            
          }
        },
      async getCategoria(){
            await this.axios('http://127.0.0.1:8000/api/categoria/').then(response=>{
                this.categorias = response.data
                
            })
        },
      async getGrupo(id){
            await this.axios('http://127.0.0.1:8000/api/grupo/'+id+'/').then(response=>{
                this.grupo = response.data
                
            })
        },
      async getFicha(id){
            await this.axios('http://127.0.0.1:8000/api/ficha/'+id+'/').then(response=>{
                this.ficha = response.data
                
            })
        },
        async getGrupos(id) {
          await this.axios('http://127.0.0.1:8000/api/grupos/' + id + '/').then(response => {
            this.inscrito = response.data;
            console.log(this.inscrito);
          });
          this.inscrito_id = this.inscritos(this.inscrito);
          console.log('inscrito_id '+this.inscrito_id)
          this.proyecto.aprendiz = this.inscrito_id; // Asignar el valor a proyecto.aprendiz
          console.log(this.proyecto.aprendiz)
        },

  
      async postProyecto(){
        
        console.log (this.proyecto)
        await this.axios.post('http://127.0.0.1:8000/api/proyecto/', this.proyecto)
        .then(response => {
          // asigna el id del proyecto creado al grupo seleccionado
          let id_proyecto= response.data.id
          this.verProyecto(id_proyecto)
          
        })
        


      },
      async verProyecto(id){
        this.$router.push('/detalle-proyecto/'+id)
      },
    },
    async mounted(){
        await this.getCategoria()
        await this.getGrupos(this.perfil)
        await this.getGrupo(this.grupo_id)
        await this.getFicha(this.ficha_id)
        
        
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