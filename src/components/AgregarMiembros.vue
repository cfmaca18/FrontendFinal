<template>
  <div class="container">
    <h1>{{ nombreGrupo }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2 class="p-3 text-center">Agrega aprendices...</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Aprendiz</th>
                <th scope="col">Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(inscrito, index) in inscritos" :key="index">
                <td>{{ inscrito.perfil.usuario.username }}</td>
                <td>
                  <button @click="agregarMiembro(inscrito)" class="btn btn-outline-success">Agregar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6">
          <Grupo :integrantes="integrantes" @integranteEliminado="actualizarInscritos" />
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
          <button class="btn btn-outline-primary" @click="cancelar">Atrás</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import Grupo from './Grupo.vue';

export default {
  name: 'AgregarMiembros',
  components: {
    Grupo
  },
  data() {
    return {
      perfil: this.$store.state.perfil.id,
      errors: [],
      inscritos: [],
      integrantes: [],
      grupo_response: {},
      nombreGrupo: ''

    }
  },
  created() {
    this.obtenerInscritos(this.perfil);
    this.getIntegrantes();
    this.obtenerNombreGrupo()
  },

  methods: {
    obtenerNombreGrupo() {
    const grupoId = this.$route.params.id;
    axios.get(`http://127.0.0.1:8000/api/grupo/${grupoId}/`)
      .then(response => {
        this.nombreGrupo = response.data.nombre_grupo; // Asignar el nombre del grupo a la propiedad
        //console.log(this.nombreGrupo)
      })
      .catch(error => {
        console.log(error);
      });
  },
    async obtenerInscritos(id) {
      const respuesta = await axios.get(`http://127.0.0.1:8000/api/agregar-integrantes/${id}/`);
      this.inscritos = respuesta.data;
    },
    async agregarMiembro(inscrito) {
      const grupoId = this.$route.params.id; // Obtener el ID del grupo desde la URL
      // Obtener solo el ID del perfil y la ficha del inscrito
      const datosInscrito = {
        perfil: inscrito.perfil.id,
        ficha: inscrito.ficha.id,
        estado: inscrito.estado
      };
      datosInscrito.nombre_grupo = grupoId;
      await axios.put(`http://127.0.0.1:8000/api/inscrito/${inscrito.id}/`, datosInscrito);
      this.inscritos = this.inscritos.filter(item => item.id !== inscrito.id); // Eliminar el inscrito de la lista de inscritos
      this.getIntegrantes(); // Actualizar la lista de integrantes en el componente Grupo
    },
    cancelar() {
      this.$router.push('/lista-grupos');
    },
    getIntegrantes() {
      const grupoId = this.$route.params.id;
      axios.get(`http://127.0.0.1:8000/api/integrantes/${grupoId}/`)
        .then(response => {
          this.integrantes = response.data;
          //this.nombreGrupo = this.integrantes[0].nombre_grupo.nombre_grupo;
        })
        .catch(error => {
          console.log(error);
        });
    },
    actualizarInscritos() {
      this.obtenerInscritos(this.perfil);
    }
  }
}
</script>
