<template>
     <q-tabs class="tabs" animated swipeable inverted color="faded" align="justify">
        <q-tab default name="agenda" slot="title" icon="mail"/>
        <q-tab name="alarms" slot="title" icon="alarm"  />
        <q-tab name="movies" slot="title" icon="movie"  />
        <q-tab-pane name="agenda"><q-agendamento/></q-tab-pane>
        <q-tab-pane name="alarms"><q-agendar-visita/></q-tab-pane>
        <q-tab-pane name="movies"><q-visita/></q-tab-pane>
      </q-tabs>
</template>

<script>
import QAgendamento from '../components/QAgendamento'
import QVisita from '../components/QVisita'
import QAgendarVisita from '../components/QAgendarVisita'
export default {
  name: 'Listas',
  components: {
    QAgendamento,
    QVisita,
    QAgendarVisita
  },
  data () {
    return {}
  }
}
</script>

<style>
.tabs{
  margin-top: 1px;
}
</style>
