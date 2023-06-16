<template>
    <div>
        <div class="container">
            <b-card class="m-1 p-3">
                <Proyecto></Proyecto>
                <div class="row">
                    <b-form>
                        <b-form-group
                          label="Calificar:"
                          label-cols-sm="3"
                          label-align-sm="right"
                          class="mb-0"
                          v-slot="{ ariaDescribedby }"
                        >                 
                          <b-form-radio-group
                            class="pt-2"
                            v-model="proyecto.estado"
                            :aria-describedby="ariaDescribedby"
                          >
                            <b-form-radio 
                              v-for="option in options"
                              :key="option.value"
                              :value="option.value"
                              :id="option.id"
                              :name="option.name"
                              class="form-check-inline m-1"
                            >
                            <span class="m-1">

                                {{ option}}
                            </span>
                            </b-form-radio>
                          </b-form-radio-group>
                        </b-form-group>
                    </b-form>


                </div>

                <div class="row">
                    <div class="text-end mt-3" v-if="this.proyecto.estado = 'en revision'">
                        <b-button variant="success" @click="editarProyecto(id)">Calificar</b-button>
                    </div>
                    <div class="text-end mt-3" v-else-if="this.proyecto.estado = 'desarrollo'">
                        <b-button variant="success" @click="calificarProyecto(id)">Editar Calificacion</b-button>
                    </div>
                    <div class="text-end mt-3" v-else>
                        <b-button variant="success" @click="calificarProyecto(id)">Calificado</b-button>
                    </div>
                </div>
                
            </b-card>
        </div>
    </div>
</template>

<script>
import Proyecto from   '@/components/proyecto.vue'
import axios from 'axios'

export default{
    name:'Lista',
    components:{
        Proyecto

    },
    data(){
        return{
            options: ['en revision','desarrollo', 'terminado'],
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
        async editarProyecto(id){
            await axios.put("http://127.0.0.1:8000/api/proyecto/"+id+"/",this.proyecto)
           
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