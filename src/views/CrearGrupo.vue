<template v-if="$store.state.user.isAuthenticated">
  <div>
    <h1>Agregar Grupo</h1>
    <div class="container">
      <form @submit.prevent="crearGrupo"><br><br>
        <div>
          <label  for="nombre_grupo">Nombre:</label>
          <input type="text" class="form-control" id="nombre_grupo" v-model="nombre_grupo">
        </div><br>
        <div>
          <button type="submit" class="btn btn-outline-primary">Agregar Grupo</button><br><br>
          <button class="btn btn-outline-success" v-on:click="verGrupos">Ver Grupos</button><br><br>
          <button  class="btn btn-outline-danger" v-on:click="cancelar" > Cancelar </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      grupo: {
        nombre_grupo:'',
        integrates:'',
        proyecto:''

      },
      inscritos:[],
      proyecto:[]
    //   descripcion: ''
    };
  },
  created(){
    this.obtenerInscritos();
    this.obtenerProyecto();
  },

  methods: {
    async obtenerInscritos(){
      const respuesta = await axios.get('http://127.0.0.1:8000/api/inscrito/');
      this.inscritos = respuesta.data;
      
    },
    async obtenerProyecto(){
      const respuesta = await axios.get('http://127.0.0.1:8000/api/proyecto/');
      this.proyecto = respuesta.data;
    },
    crearGrupo() {
      axios.post('http://localhost:8000/api/grupo/', {
        nombre_grupo: this.nombre_grupo,
        // descripcion: this.descripcion
      })
      .then(response => {
        console.log(response.data);
        this.$router.push('/lista-grupos');
      })
      .catch(error => {
        console.log(error.response.data);
      })   
    },
    verGrupos(){
        this.$router.push('/lista-grupos')
    },
    cancelar(){
        this.$router.push('/inicio')
    }
  },
//   async verGrupos(){
//     this.$router.push('/ListaGrupos')
//   }
};
</script>
