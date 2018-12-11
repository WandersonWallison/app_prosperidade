<template>
  <div>
    <q-input v-model="agenda.valor" type="number" prefix="R$" stack-label="Valor de Abertura" />
      <q-datetime v-model="agenda.data" type="date" stack-label="Data"/>
      <q-btn class="q-btn" @click="updateAgenda" color="primary" label="Salvar"/>
  </div>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
export default {
  name: 'Agendado',
  props: ['leadProps'],
  data () {
    return {
      agenda: {
        valor: null,
        data: ''
      }
    }
  },
  methods: {
    updateAgenda () {
      let newLead = {
        tipo: 'Cliente'
      }
      let newAgenda = {
        abertura: date.formatDate(this.agenda.data, 'YYYY-MM-DD'),
        status: 4
      }
      let newConta = {
        nome: 'Prosperidade',
        ag: 1000,
        n_conta: 1000,
        renda: 1000,
        aplicacao: this.agenda.valor,
        leads_bank: this.leadProps[0].id_lead.id
      }
      axios.put('http://165.227.188.44:5555/' + 'leads/' + this.leadProps[0].id_lead.id, newLead)
        .then(response => {
          // newAgenda.id_lead = response.data.id
          axios.put('http://165.227.188.44:5555/' + 'schedule/' + this.leadProps[0].id, newAgenda)
            .then(response => {
              // newEndereco.schedule_address = response.data.id
              axios.post('http://165.227.188.44:5555/' + 'bank', newConta)
                .then(response => {
                  alert('Visita realizada!')
                  window.location.reload()
                })
            })
        })
        .catch(error => {
          if (error.response.data.code === 'E_UNIQUE') {
            alert('Contato já cadastrado, \nPor favor verificar as informações')
          }
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>
</style>
