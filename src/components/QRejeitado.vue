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
          label: 'Não gostou da proposta',
          value: 'Não gostou da proposta'
        },
        {
          label: 'Achou os custos altos',
          value: 'Achou os custos altos'
        },
        {
          label: 'Não conhece a intituição',
          value: 'Não conhece a intituição'
        },
        {
          label: 'Tem proposta melhor do concorrente',
          value: 'Tem proposta melhor do concorrente'
        },
        {
          label: 'Não conhece o escritório',
          value: 'Não conhece o escritório'
        },
        {
          label: 'Experiência negativa anterior',
          value: 'Experiência negativa anterior'
        },
        {
          label: 'Não houve empatia',
          value: 'Não houve empatia'
        },
        {
          label: 'Gostaria de mais informações',
          value: 'Gostaria de mais informações'
        },
        {
          label: 'Pediu tempo para avaliar',
          value: 'Pediu tempo para avaliar'
        },
        {
          label: 'Peseou ser outra coisa',
          value: 'Peseou ser outra coisa'
        },
        {
          label: 'Vai ouvir opinião de familiar',
          value: 'Vai ouvir opinião de familiar'
        },
        {
          label: 'vai ouvir ipinião de colaborador, assessor ou consultor',
          value: 'vai ouvir ipinião de colaborador, assessor ou consultor'
        },
        {
          label: 'Já possui mesmo tipo de relacionamento com a XP',
          value: 'Já possui mesmo tipo de relacionamento com a XP'
        },
        {
          label: 'Já possui mesmo tipo de relacionamento em outra instituição',
          value: 'Já possui mesmo tipo de relacionamento em outra instituição'
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
      axios.put('http://104.248.7.221:5555/' + 'schedule/' + this.leadProps[0].id, newAgenda)
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
