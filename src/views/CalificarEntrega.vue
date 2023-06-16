<template>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group id="calificacion" label="Calificación">
        <b-form-radio-group v-model="entrega.calificacion" :options="calificacionOptions"></b-form-radio-group>
      </b-form-group>
      <b-form-group id="descripcion_entrega" label="Descripción">
        <b-form-textarea v-model="entrega.descripcion_entrega"></b-form-textarea>
      </b-form-group>
      <b-form-group id="tipo_revision" label="Tipo de revisión">
        <b-form-select v-model="entrega.tipo_revision" :options="tipoRevisionOptions"></b-form-select>
      </b-form-group>
      <b-form-group id="documento" label="Documento">
        <b-form-file v-model="documento" accept=".pdf"></b-form-file>
      </b-form-group>
      <b-button type="submit" variant="primary">Guardar</b-button>
    </b-form>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        entrega: {
          calificacion: '',
          descripcion_entrega: '',
          tipo_revision: '',
          documento: null,
        },
        documento: null,
        calificacionOptions: [
          { text: 'Aprobado', value: 'aprobado' },
          { text: 'Reprobado', value: 'reprobado' },
        ],
        tipoRevisionOptions: [
          { text: 'Primera revisión', value: 'primera_revisión' },
          { text: 'Segunda revisión', value: 'segunda_revisión' },
        ],
      };
    },
    methods: {
      handleSubmit() {
        const formData = new FormData();
        formData.append('calificacion', this.entrega.calificacion);
        formData.append('descripcion_entrega', this.entrega.descripcion_entrega);
        formData.append('tipo_revision', this.entrega.tipo_revision);
        formData.append('documento', this.documento);
        axios.post('/api/entregas/', formData)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
  };
  </script>