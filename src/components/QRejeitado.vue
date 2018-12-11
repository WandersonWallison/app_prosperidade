<template>
  <div>
    <q-select
      stack-label="Motivo para não aceita a visita"
      type="number"
      v-model="agenda.motivo"
      :options="selectHoras"
    />
  </div>
</template>

<script>
export default {
  name: 'Rejeitado',
  props: ['leadProps'],
  data () {
    return {
      agenda: {
        motivo: null
      },
      selectHoras: [
        {
          label: 'TESTE',
          value: '1'
        },
        {
          label: 'VAI ',
          value: '2'
        }
      ]
    }
  }
}
</script>

<style>
</style>
