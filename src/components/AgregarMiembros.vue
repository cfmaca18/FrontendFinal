<template>
  <div>
    <h2 class="p-3 text-center">Lista Inscritos</h2>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inscrito, index) in inscritos" :key="index">
            <th>{{ inscrito.perfil.usuario.username }}</th>
            <button @click="agregarMiembro(inscrito.id)" class="btn btn-outline-success">Agregar</button>
          </tr>
        </tbody>
      </table>
    </div>
    <h3><button class="btn btn-outline-primary" @click="cancelar">Atras</button></h3>
  </div>
</template>
  
<script>
import axios from 'axios';
  
export default {
  name: 'crear',
  data() {
    return {
      perfil: this.$store.state.perfil.id,
      errors: [],
      inscritos: [],
    }
  },
  created() {
    this.obtenerInscritos(this.perfil);
  },
    
  methods: {
    async obtenerInscritos(id) {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/agregar-integrantes/${id}/`);
      this.inscritos = respuesta.data;
      console.log('integrantes')
      console.log(this.inscritos)
      console.log(id)
    },
    async agregarMiembro(id) {
      const inscritoSeleccionado = this.inscritos.find(item => item.id === id);
      const grupoId = this.$route.params.id; // Obtener el ID del grupo desde la URL
      
      // Obtener solo el ID del perfil y la ficha
      const datosInscrito = {
        perfil: inscritoSeleccionado.perfil.id,
        ficha: inscritoSeleccionado.ficha.id,
        estado: inscritoSeleccionado.estado
      };
      
      datosInscrito.nombre_grupo = grupoId;
      
      await axios.put(`http://127.0.0.1:8000/api/inscrito/${id}/`, datosInscrito);
      this.$router.push('/grupo/' + grupoId);
    },
    cancelar() {
      this.$router.push('/lista-grupos');
    }
  }
} 
</script>
