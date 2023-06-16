<!-- <template>
    <div>
      <div class="container">
        <b-card class="m-1 p-3">
          <div v-if="entrega">
            <div class="row">
              <div class="col-lg-1 col-md-1">
                <img class="imagen" src="../assets/2.jpg" alt="">
              </div>
              <div class="col-lg-9">
                <h3>{{ entrega.proyecto.nombre }}</h3>
                <p><span class="fw-lighter">Calificación: </span>{{ entrega.calificacion }}</p>
              </div>
            </div>
            <div class="row">
              <p class="fw-lighter">Descripción de la entrega:</p>
              <p>{{ entrega.descripcion_entrega }}</p>
            </div>
            <div class="row">
              <p class="fw-lighter">Respuesta del instructor:</p>
              <p>{{ entrega.respuesta_instructor }}</p>
            </div>
            <div class="row">
              <p class="fw-lighter">Instructor:</p>
              <p>{{ entrega.instructor }}</p>
            </div>
            <div class="row">
              <p class="fw-lighter">Autor:</p>
              <p>{{ entrega.autor }}</p>
            </div>
            <div class="row">
              <p class="fw-lighter">Creado:</p>
              <p>{{ entrega.creado }}</p>
            </div>
            <div class="row">
              <p class="fw-lighter">Editado:</p>
              <p>{{ entrega.editado }}</p>
            </div>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </b-card>
      </div>
    </div>
  </template> -->
  
  <template>
    <div class="container" >  
        <b-card>  
            <b-list-group v-for="entrega in entregas" :key="entrega.id">
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <div class="m-1 p-3">

                  {{ entrega.tipo_revision.nombre }}
                                      
                  </div>
                  <div class="d-flex position-absolute bottom-0 end-0 m-1"  >
                      <div class="ml-auto">
                          <b-button @click="detalleEntrega(entrega.id)" variant="primary" class="m-1">
                              <b-icon icon="eye"></b-icon>
                          </b-button>
                          <b-button @click="editarEntrega(entrega)" variant="warning" class="mr-2">
                              <b-icon icon="pencil"></b-icon>
                          </b-button>
                          <b-button @click="eliminarEntrega(entrega.id)" variant="danger">
                              <b-icon icon="trash"></b-icon>
                          </b-button>
                      </div>
                  </div> 
              </b-list-group-item>
          </b-list-group>
            <div class="text-end mt-3">
              <b-button variant="success" @click="crearEntrega(id)">Crear Entrega</b-button>
          </div>

        </b-card>
        <!-- <h3 >Entregas de {{ proyecto.nombre }}</h3>
        <b-card>
        </b-card> -->
    </div>
</template>

<script>
import axios from 'axios'

export default{
    name:'Lista',

    data(){
        return{
          id : this.$route.params.id,
            tipo:null,
            entregas:null
        }
    },
    methods:{
        async eliminarEntrega(id){
            console.log(id)
            await axios.delete("http://127.0.0.1:8000/api/entrega/"+id+'/')
            console.log(id)
            await this.getEntregas()
        },
        getEntregas(){
            let id = this.$route.params.id
              axios.get("http://127.0.0.1:8000/api/entregas/"+id+'/').then(response=>{
              this.entregas= response.data
            })
        },
        crearEntrega(id){
          console.log(id)
            this.$router.push('/crear-entrega/'+id)
        },
        detalleEntrega(id){
          console.log(id)
            this.$router.push('/detalle-entrega/'+id)
        },
        async getTipoRevision(id){
              axios.get("http://127.0.0.1:8000/api/tipo_revision/"+id+'/').then(response=>{
                this.tipo = response.data.nombre
                console.log(this.tipo)
                return this.tipo 
            })
        },   
    },
    async mounted(){

        await this.getEntregas()
    }
}
</script>
<style>
.imagen{
    width: 100%;
}

</style>