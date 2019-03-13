<template>
  <q-page padding>
   <q-editar-agendamento></q-editar-agendamento>
  </q-page>
</template>

<script>
import QEditarAgendamento from '../components/QEditarAgendamento'
export default {
  name: 'Reagendamento',
  data: () => ({
    visible: true
  }),
  components: {
    QEditarAgendamento
  }
}
</script>

<style>
</style>
