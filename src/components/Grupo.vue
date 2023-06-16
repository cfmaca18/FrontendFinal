<template>
  <div class="p-3 text-center">
    <h1>Integrantes del Grupo {{ id }}</h1>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Ficha</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(inscrito, index) in integrantes" :key="index">
            <td>{{ inscrito.perfil.usuario.username }}</td>
            <td>{{ inscrito.ficha.codigo }}</td>
            <td>
              <button @click="eliminarIntegrante(inscrito.id)" class="btn btn-outline-danger">x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="btn btn-outline-success" @click="agregarMiembro">Agregar Integrante</button>
    <button class="btn btn-outline-danger" @click="cancelar">Cancelar</button>
    <h3><button class="btn btn-outline-primary" @click="atras">Atras</button></h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      id: null,
      integrantes: [],
    };
  },
  created() {
    this.obtenerIdDelGrupo();
    this.getIntegrantes();
  },
  methods: {
    obtenerIdDelGrupo() {
      const rutaActual = this.$route.path;
      this.id = rutaActual.substring(rutaActual.lastIndexOf('/') + 1);
    },
    eliminarIntegrante(id) {
      axios.patch(`http://127.0.0.1:8000/api/inscrito/${id}/`, { nombre_grupo: null })
        .then(() => {
          // Eliminar el integrante de la lista
          this.integrantes = this.integrantes.filter(inscrito => inscrito.id !== id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getIntegrantes() {
      let id = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/integrantes/${id}/`)
        .then(response => {
          this.integrantes = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    agregarMiembro() {
      this.$router.push('/agregar-integrante/' + this.id + "/");
    },
    cancelar() {
      this.$router.push('/crear-grupo');
    },
    atras() {
      this.$router.push('/lista-grupos');
    }
  }
};
</script>
