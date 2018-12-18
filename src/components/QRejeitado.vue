<template>
  <div>
    <q-select
      stack-label="Motivo para não aceita a visita"
      type="number"
      v-model="agenda.motivo"
      :options="selectHoras"
    />
    <q-datetime v-model="agenda.data" type="date" stack-label="Data"/>
    <q-input class="area" v-model="agenda.obs_motivo" inverted color="grey-7" rows="4" float-label="Observação para não haver visita" type="textarea" />
    <q-btn class="q-btn" @click="updateAgenda" color="primary" label="Salvar" v-bind:disabled="!isValid"/>
  </div>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
export default {
  name: 'Rejeitado',
  props: ['leadProps'],
  data () {
    return {
      agenda: {
        motivo: '',
        data: '',
        obs_motivo: ''
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
  },
  computed: {
    isValid: function () {
      return this.agenda.motivo !== '' &&
      this.agenda.data !== '' &&
      this.agenda.obs_motivo !== ''
    }
  },
  methods: {
    updateAgenda () {
      let newAgenda = {
        fechamento: date.formatDate(this.agenda.data, 'YYYY-MM-DD'),
        status: 4,
        ativo: false,
        obs_motivo: this.agenda.obs_motivo
      }
      axios.put('http://165.227.188.44:5555/' + 'schedule/' + this.leadProps[0].id, newAgenda)
        .then(response => {
          alert('Visita realizada!')
          window.location.reload()
        })
        .catch(error => {
          alert('erro de conexão, \nPor favor verificar as informações')
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>
.area{
  margin-top: 3%;
}
</style>
