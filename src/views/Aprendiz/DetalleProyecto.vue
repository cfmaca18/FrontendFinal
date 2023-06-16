<template>
    <div>
      <body>
        <Proyecto></Proyecto>
        <Entrega></Entrega> 
        <CalificarProyecto></CalificarProyecto>
       </body>

    </div>
  </template>
  <script>
    import Entrega from '@/components/ListaDeEntregas.vue'
    import Proyecto from '@/components/DetalleProyecto.vue'
    import CalificarProyecto from '@/components/CalificarProyecto.vue'

   
  
  
    export default {
  
      components: {
    Proyecto,
    Entrega,
    CalificarProyecto
}
  
    }
  </script>