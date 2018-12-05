<template>
<q-page padding class="docs-input row justify-center">
   <div style="width: 500px; max-width: 90vw;">
     Agendar Visita
     <q-input v-model="lead.nome" stack-label="Nome" />
     <q-input v-model="lead.email" type="email" stack-label="Email" suffix="@gmail.com" />
     <div class="divLateral">
       <q-input v-model="lead.telefone" class="campo1" type="number" stack-label="Telefone" />
       <q-input v-model="lead.celular" type="number"  stack-label="Celular" />
     </div>
     <div>
     <q-datetime class="campo1" v-model="lead.data" type="date" stack-label="Date" />
     <q-datetime v-model="lead.hora" type="time" stack-label="Hora"/>
     </div>
     <q-input v-model="lead.rua" stack-label="Rua" />
     <q-input v-model="lead.numero" type="number" stack-label="Número" />
     <div>
     <q-input class="campo1" v-model="lead.cep" stack-label="Cep" />
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
     <div class="actions2">
        <q-btn class="q-btn" color="primary" @click="saveAgenda" label="Agendar"/>
     </div>
   </div>
</q-page>
</template>

<script>
import axios from 'axios'
// import moment from 'moment'
export default {
  name: 'AgendarVisita',
  data () {
    return {
      lead: {
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        data: '',
        hora: '',
        rua: '',
        numero: '',
        cep: '',
        estado: '',
        cidade: '',
        bairro: ''
      },
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
      results: null
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
        // data_criacao: moment(Date.now()).format(),
        id_user_criador: this.userAtual
      }
      axios.post('http://165.227.188.44:5555/' + 'leads', newLead)
        .then(response => {
          this.userSaved = true
          this.sending = false
          alert('Contato cadastado com sucesso')
          this.clearForm()
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
  }
  .actions2 {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      margin-top: 10%
  }
</style>
