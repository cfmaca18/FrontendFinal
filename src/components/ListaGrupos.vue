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
              <button @click="confirmarEliminar(grupo.id)" class="btn btn-outline-danger">x</button>
            </td>
          </tr>
          <b-alert v-if="showAlert" show variant="danger">{{ alertMessage }}</b-alert>
          <b-alert v-if="showSuccessAlert" show variant="success">{{ successMessage }}</b-alert>
        </tbody>
      </table>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="atras">Atrás</button>
      </div>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      grupos: [],
      showAlert: false,
      alertMessage:"",
      showSuccessAlert: false,
      successMessage: ""
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
      this.$router.push('/agregar-integrante/' + id);
    },

    confirmarEliminar(id) {
      if (confirm("¿Estás seguro de eliminar este grupo? Esta acción no se puede deshacer.")) {
        this.eliminar(id);
      }
    },

    eliminar(id) {
      axios.delete("http://127.0.0.1:8000/api/grupo/" + id + "/")
        .then(() => {
          // Eliminar el grupo de la lista
          this.grupos = this.grupos.filter(grupo => grupo.id !== id);
          this.showSuccessAlert = true;
          this.successMessage = "El grupo se eliminó correctamente.";
        })
        .catch(error => {
          if (error.response && error.response.status === 500) {
            this.showAlert = true;
            this.alertMessage = "El grupo tiene integrantes. Elimine los integrantes para poder eliminar el grupo.";
          } else {
            this.showAlert = true;
            this.alertMessage = "No se pudo eliminar el grupo debido a un error desconocido.";
          }
        });
    },

    atras() {
      this.$router.push('/crear-grupo');
    }
  }
};
</script>
