<template>
  <div>
    <q-input v-model="agenda.valor" type="number" prefix="R$" stack-label="Valor de Abertura" />
      <q-datetime v-model="agenda.data" type="date" stack-label="Data"/>
        <!-- <h5> Upload de Imagens</h5>
        <div class="campo1">
        <q-btn color="primary" label="RG" @click="captureImage" />
        <img :src="imageSrc">
        </div>
        <div class="campo1">
        <q-btn color="primary" label="CPF" @click="captureImage1" />
        <img :src="imageSrc1">
        </div>
        <div class="campo1">
        <q-btn color="primary" label="Comprovante de Residência 1" @click="captureImage2" />
        <img :src="imageSrc2">
        </div>
        <div class="campo1">
        <q-btn color="primary" label="Comprovante de Residência 2" @click="captureImage3" />
        <img :src="imageSrc3">
        </div> -->
        <h5>Bancos</h5>
        <q-checkbox v-model="selection" val="Bradesco" label="Bradesco" />
        <q-checkbox v-model="selection" val="Itaú" label="Itaú" />
        <q-checkbox v-model="selection" val="Santander" label="Santander" />
        <br><br>
        <q-checkbox v-model="selection" val="Safra" label="Safra" />
        <q-checkbox v-model="selection" val="Banco do Brasil" label="Banco do Brasil" />
        <br><br>
        <q-checkbox v-model="check" val="Outos" label="Outos" />
        <div v-if="check">
        <q-input v-model="conta.outros" type="text" stack-label="Nome" />
        </div>
        <h5>Investimentos</h5>
        <q-checkbox v-model="check1" label="Previdencia " />
        <div v-if="check1">
        <q-input v-model="conta.valor1" type="number" prefix="R$" stack-label="Valor de Abertura" />
        </div>
        <br><br>
        <q-checkbox v-model="check2" label="COE" />
        <div v-if="check2">
        <q-input v-model="conta.valor2" type="number" prefix="R$" stack-label="Valor de Abertura" />
        </div>
        <br><br>
        <q-checkbox v-model="check3" label="Renda Variável" />
        <div v-if="check3">
        <q-input v-model="conta.valor3" type="number" prefix="R$" stack-label="Valor de Abertura" />
        </div>
      <q-btn class="q-btn" @click="updateAgenda" color="primary" label="Salvar" v-bind:disabled="!isValid"/>
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
      },
      conta: {
        outros: '',
        valor1: null,
        valor2: null,
        valor3: null
      },
      selection: [],
      check: false,
      check1: false,
      check2: false,
      check3: false
    }
  },
  computed: {
    isValid: function () {
      return this.agenda.data !== '' &&
      this.agenda.valor !== null
    }
  },
  methods: {
    /*
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        })
    },
    captureImage1 () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc1 = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        })
    },
    captureImage2 () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc2 = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        })
    },
    captureImage3 () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc3 = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        })
    }, */
    updateAgenda () {
      let newLead = {
        tipo: 'Cliente'
      }
      let newAgenda = {
        abertura: date.formatDate(this.agenda.data, 'YYYY-MM-DD'),
        status: 3
      }
      let newConta = {
        nome: 'Prosperidade',
        ag: 1000,
        n_conta: 1000,
        renda: 1000,
        aplicacao: this.agenda.valor,
        nome_bancos: this.selection + ',' + this.conta.outros,
        previdencia: this.conta.valor1,
        coe: this.conta.valor2,
        renda_variavel: this.conta.valor3,
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
.campo1 {
   float:left;
   margin-right: 5%;
  }
</style>
