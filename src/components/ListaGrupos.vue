<template>
  <div>
    <h1>Grupos</h1>
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Nombre Grupo</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="grupo in grupos" :key="grupo.id">
            <td>{{ grupo.nombre_grupo }}</td>
            <td>
              <button @click="actualizar(grupo.id)" class="btn btn-outline-success">Ir</button>
              <button @click="eliminar(grupo.id)" class="btn btn-outline-danger">x</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h3><button class="btn btn-outline-primary" @click="atras">Atras</button></h3>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      grupos: []
    };
  },

  created() {
    this.getGrupos();
  },

  methods: {
    getGrupos() {
      axios.get('http://127.0.0.1:8000/api/grupo/')
        .then(response => {
          this.grupos = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    actualizar(id) {
      this.$router.push('/grupo/' + id);
    },

    eliminar(id) {
      axios.delete("http://127.0.0.1:8000/api/grupo/" + id + "/")
        .then(() => {
          // Eliminar el grupo de la lista
          this.grupos = this.grupos.filter(grupo => grupo.id !== id);
        })
        .catch(error => {
          console.log(error);
        });
    },
    atras() {
      this.$router.push('/crear-grupo');
    }
  }
};
</script>
