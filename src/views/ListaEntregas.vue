<!-- <template>
    <div>
      <h1>Entregas de {{ proyecto.nombre }}</h1>
      <b-card>
        <b-list-group>
          <b-list-group-item v-for="entrega in entregas" :key="entrega.id" >
            {{entrega.descripcion_entrega }}
            
          </b-list-group-item>
        </b-list-group>
        <b-button v-if="mostrarBoton" @click="cargarMas" block>Ver más</b-button>
      </b-card>
    </div>
  </template> -->
  <template>
    <div>
      <h1>Entregas de {{ proyecto.nombre }}</h1>
      <b-card>
        {{ entregas }}
        <b-list-group>
          <b-list-group-item v-for="entrega in entregas" :key="entrega.id">
            <div class="d-flex justify-content-between align-items-center">
              <div>{{ entrega.descripcion_entrega }}</div>
              <div>
                <b-button @click="verEntrega(entrega)" variant="primary" class="mr-2">Ver</b-button>
                <b-button @click="editarEntrega(entrega)" variant="warning" class="mr-2">Editar</b-button>
                <b-button @click="eliminarEntrega(entrega)" variant="danger">Eliminar</b-button>
              </div>
            </div>
          </b-list-group-item>
        </b-list-group>
        <b-button v-if="mostrarBoton" @click="cargarMas" block>Ver más</b-button>
      </b-card>
    </div>
  </template>

  <script>
  import axios from 'axios'

  export default{
      name:'Lista',
      data(){
          return{
            tipo_revision:null,
            entregas:[],
            searchValue: "",
            proyecto: [],
            proyectos: null
          }
          
      },
      methods:{

        getEntregas(){
            let id = this.route.params.id
              axios.get("http://127.0.0.1:8000/api/entregas/"+id+'/').then(response=>{
              this.entregas= response.data
            })
        },
        getTiposDeRevision(url){
              axios.get(url).then(response=>{
                this.tipo_revision = response.data.nombre
                console.log(this.tipo_revision)
        
            })
          },
          descripcion(descripcion){
            // descripcion corta
            if (descripcion.length > 100) {
              const index = descripcion.slice(100).search(/[.]/);
                if (index !== -1) {
                  return descripcion.slice(0, 100 + index + 1) + '...';
                }
            }
            return descripcion;
          },
      async search() {
        try {
          const response = await axios.get("buscar_Entregass/", {
            params: {
              search: this.searchValue,
            },
          });
          this.Entregas = response.data;
        } catch (error) {
          console.log(error);
        }
        
      },
      async verEntregas(id){
        this.$router.push('/detalle-entrega/'+id)
      },
  
  
      },
      mounted() {  
          this.getEntregas()
         
  
      },
          
  
  }
  </script>