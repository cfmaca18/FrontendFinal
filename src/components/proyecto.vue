<!-- <template>
  <div class="d-flex justify-content-center">
    <b-card class="m-5 p-3"  style="width: 75%;">
       Contenido de la tarjeta 
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
          id="descripcion_entrega"
          label="Descripción de la Entrega:"
          label-for="descripcion_entrega"
        >
          <b-form-textarea
            id="descripcion_entrega"
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

        <b-dropdown text="Seleccionar opciones">
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
      <div class="mt-3">Selected: <strong>{{proyecto.categorias}}</strong></div>
    </b-card>
  </div>
</template>



<script>
  export default {
    data() {
      return {
        proyecto: { 
          nombre_proyecto: '',
          descripcion: '',
          foto: null,
          codigo_fuente: '',
          categorias: [],
          autor: null,

    },
    categorias: [],
        show: true,

      }
    },
    methods: {
      async getCategoria(){
            await this.axios('http://127.0.0.1:8000/api/categoria/').then(response=>{
                this.categorias = response.data
            })
        },
      async postProyecto(){
        console.log(this.proyecto)
        await this.axios.post('http://127.0.0.1:8000/api/proyecto/', this.proyecto)
        this.$router.push('/Inicio')
      }
    },
    async mounted(){
        await this.getCategoria()
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
  </style> -->



  <template>
    <div>
        <div class="container m-1">
          
                <div class="row">
                    <div class="col-lg-1 col-md-1">
                        <img class="imagen" src="@/assets/2.jpg" alt="">
                    </div>
                    <div class="col-lg-9">
                        <h3>{{ proyecto.nombre }}</h3>
                        <p><span class="fw-lighter">Estado: </span>{{ proyecto.estado }}</p>
                    </div>
                </div>        
                <div class="row">
                    <p class="fw-lighter">Descripcion:</p>
                    <p>{{ proyecto.descripcion }}</p>
                </div>
                <div class="row">
                    <p class="fw-lighter">Repositorio en GitHub:</p>
                    <b-link :href="proyecto.codigo_fuente">{{ proyecto.codigo_fuente }}</b-link>
                    <a></a>
                </div>


        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name:'Lista',

    data(){
        return{
            tipo:null,
            calificar:false,
            proyecto: {
                id:null,
                nombre:null,
                codigo_fuente:null,
                categoria:null,
                descripcion:null,
                estado: null,
            },
            entregas:null
        }
    },
    methods:{
        editarProyecto(id){
            console.log(id)
            this.$router.push('/editar-proyecto/'+id)
        },

        async verProyecto (){
        let id = this.$route.params.id
        await axios.get("http://127.0.0.1:8000/api/proyecto/"+id+"/").then(response=>{
            this.proyecto.id=response.data.id
            this.proyecto.nombre=response.data.nombre_proyecto
            this.proyecto.descripcion=response.data.descripcion
            this.proyecto.estado=response.data.estado
            this.proyecto.codigo_fuente=response.data.codigo_fuente

            });
        }   
    },
    async mounted(){
        await this.verProyecto()
        
    }
}
</script>
<style>
.imagen{
    width: 100%;
}

</style>
