<template>
<q-page padding class="docs-input row justify-center">
   <div style="width: 500px; max-width: 90vw;">
     Agendar Visita
     <q-input v-model="lead.nome" stack-label="Nome" />
     <q-input v-model="lead.email" type="email" stack-label="Email" />
     <div class="divLateral">
       <q-input v-model="lead.telefone" class="campo1" type="tel" stack-label="Telefone" v-mask = "'(##) ####-####'"/>
       <q-input v-model="lead.celular" type="tel"  stack-label="Celular" v-mask = "'(##) #####-####'" />
     </div>
     <div>
     <q-datetime class="campo1" v-model="lead.data" type="date" stack-label="Data" />
     <q-select
      stack-label="Horário"
      type="number"
      v-model="lead.hora"
      :options="selectHoras"
    />
     </div>
     <div>
     <q-input class="campo1" v-model="lead.logradouro" stack-label="Rua" />
     <q-input v-model="lead.numero" type="number" stack-label="Número" />
     </div>
     <div>
     <q-input class="campo1" v-model="lead.cep" stack-label="Cep" v-mask = "'#####-###'"/>
     <q-select
      stack-label="Estado"
      v-model="lead.estado"
      :options="selectOptions"
    />
     </div>
    <div>
     <q-input class="campo1" v-model="lead.cidade" stack-label="Cidade" />
     <q-input v-model="lead.bairro" stack-label="Bairro" />
    </div>
    <div>
      <br>
      <q-input class="area" stack-label="Observação" v-model="lead.obs" inverted color="grey-7" rows="4" type="textarea" />
      </div>
     <div class="actions2">
        <q-btn class="q-btn" color="primary" @click="saveAgenda" label="Agendar" v-bind:disabled="!isValid"/>
     </div>
   </div>
</q-page>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'
import {mask} from 'vue-the-mask'
// import moment from 'moment'
export default {
  name: 'AgendarVisita',
  directives: {mask},
  data () {
    return {
      errors: [],
      lead: {
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        data: '',
        hora: null,
        logradouro: '',
        numero: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        obs: ''
      },
      formattedString: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      userAtual: null,
      selectOptions: [
        {
          label: 'Acre',
          value: 'ac'
        },
        {
          label: 'Alagoas',
          value: 'al'
        },
        {
          label: 'Amazonas',
          value: 'am'
        },
        {
          label: 'Amapá',
          value: 'ap'
        },
        {
          label: 'Bahia',
          value: 'ba'
        },
        {
          label: 'Ceará',
          value: 'ce'
        },
        {
          label: 'Distrito Federal',
          value: 'df'
        },
        {
          label: 'Espírito Santo',
          value: 'es'
        },
        {
          label: 'Goiás',
          value: 'go'
        },
        {
          label: 'Maranhão',
          value: 'ma'
        },
        {
          label: 'Mato Grosso',
          value: 'mt'
        },
        {
          label: 'Mato Grosso do Sul',
          value: 'ms'
        },
        {
          label: 'Minas Gerais',
          value: 'mg'
        },
        {
          label: 'Pará',
          value: 'pa'
        },
        {
          label: 'Paraíba',
          value: 'pb'
        },
        {
          label: 'Paraná',
          value: 'pr'
        },
        {
          label: 'Pernambuco',
          value: 'pe'
        },
        {
          label: 'Piauí',
          value: 'pi'
        },
        {
          label: 'Rio de Janeiro',
          value: 'rj'
        },
        {
          label: 'Rio Grande do Norte',
          value: 'rn'
        },
        {
          label: 'Rondônia',
          value: 'ro'
        },
        {
          label: 'Rio Grande do Sul',
          value: 'rs'
        },
        {
          label: 'Roraima',
          value: 'rr'
        },
        {
          label: 'Santa Catarina',
          value: 'sc'
        },
        {
          label: 'Sergipe',
          value: 'se'
        },
        {
          label: 'São Paulo',
          value: 'sp'
        },
        {
          label: 'Tocantins',
          value: 'to'
        }
      ],
      selectHoras: [
        {
          label: '08:00',
          value: '1'
        },
        {
          label: '09:00',
          value: '2'
        },
        {
          label: '10:00',
          value: '3'
        },
        {
          label: '11:00',
          value: '4'
        },
        {
          label: '12:00',
          value: '5'
        },
        {
          label: '13:00',
          value: '6'
        },
        {
          label: '14:00',
          value: '7'
        },
        {
          label: '15:00',
          value: '8'
        },
        {
          label: '16:00',
          value: '9'
        },
        {
          label: '17:00',
          value: '10'
        },
        {
          label: '18:00',
          value: '11'
        },
        {
          label: '19:00',
          value: '12'
        },
        {
          label: '20:00',
          value: '13'
        },
        {
          label: '21:00',
          value: '14'
        },
        {
          label: '22:00',
          value: '15'
        }
      ]
    }
  },
  computed: {
    isValid: function () {
      return this.lead.nome !== '' &&
      this.lead.email !== '' &&
      this.lead.telefone !== '' &&
      this.lead.celular !== '' &&
      this.lead.data !== '' &&
      this.lead.hora !== '' &&
      this.lead.logradouro !== '' &&
      this.lead.numero !== '' &&
      this.lead.cep !== '' &&
      this.lead.estado !== '' &&
      this.lead.cidade !== '' &&
      this.lead.bairro !== ''
    }
  },
  mounted () {
    const authUser = window.localStorage.getItem('Usuario')
    const authUser2 = JSON.parse(authUser)
    this.userAtual = authUser2.id
  },
  methods: {
    saveAgenda () {
      let newLead = {
        nome: this.lead.nome,
        email: this.lead.email,
        telefone: this.lead.telefone,
        celular: this.lead.celular,
        data_criacao: this.formattedString,
        id_user_criador: this.userAtual,
        id_user_editor: this.userAtual
      }
      let newAgenda = {
        data: date.formatDate(this.lead.data, 'YYYY-MM-DD'),
        // hora: date.formatDate(this.lead.hora, 'HH:mm'),
        agentes: this.userAtual,
        hora: this.lead.hora,
        obs: this.lead.obs,
        status: 1
      }
      let newEndereco = {
        logradouro: this.lead.logradouro,
        numero: this.lead.numero,
        bairro: this.lead.bairro,
        cidade: this.lead.cidade,
        cep: this.lead.cep,
        uf: this.lead.estado,
        schedule_address: ''
      }
      axios.post(process.env.VUE_APP_ROOT_API + '/leads', newLead)
        .then(response => {
          newAgenda.id_lead = response.data.id
          axios.post(process.env.VUE_APP_ROOT_API + '/schedule', newAgenda)
            .then(response => {
              newEndereco.schedule_address = response.data.id
              axios.post(process.env.VUE_APP_ROOT_API + '/address', newEndereco)
                .then(response => {
                  alert('Agendamento cadastado com sucesso')
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
.divLateral{
  display: relative;
  }
  .q-btn{
      width: 100%;
      height: 5px;
  }
  .campo1 {
   float:left;
   margin-right: 5%;
  }
  .actions2 {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      margin-top: 10%
  }
</style>
