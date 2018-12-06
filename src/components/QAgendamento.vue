<template>
<q-table
  :data="tableData"
  :columns="columns"
  selection="single"
  :selected.sync="selected"
  title="Selecione um agendamento"
>
<template slot="top-selection" slot-scope="props">
  <q-btn-group push>
  <q-btn label="Sim" @click="aceito" color="primary"/>
  <q-btn label="Não" @click="notAceito" color="negative"/>
</q-btn-group>
  </template>
  <q-tr slot="header" slot-scope="props">
    <q-th auto-width>
      <q-checkbox
        v-if="props.multipleSelect"
        v-model="props.selected"
        indeterminate-value="some"
      />
    </q-th>
    <q-th v-for="col in props.cols" :key="col.name" :props="props">
      {{ col.label }}
    </q-th>
  </q-tr>

  <template slot="body" slot-scope="props">
    <q-tr :props="props">
      <q-td auto-width>
        <q-checkbox color="primary" v-model="props.selected" />
      </q-td>
      <q-td key="desc" :props="props">
        <q-checkbox color="primary" v-model="props.expand" checked-icon="remove" unchecked-icon="add" class="q-mr-md" />
        {{ props.row.id }}
      </q-td>
      <q-td key="id" :props="props">{{ props.row.id }}</q-td>
      <q-td key="data" :props="props">{{ props.row.data }}</q-td>
      <q-td key="hora" :props="props">{{ props.row.hora }}</q-td>
      <q-td key="nome" :props="props">{{ props.row.tempo_ligacao }}</q-td>
      <q-td key="bairro" :props="props">{{ props.row.endereco[0].bairro }}</q-td>
      <q-td key="numero" :props="props">{{ props.row.endereco[0].numero }}</q-td>
      <q-td key="logradouro" :props="props">{{ props.row.endereco[0].logradouro }}</q-td>
      <q-td key="obs" :props="props">{{ props.row.obs }}</q-td>
    </q-tr>
    <q-tr v-show="props.expand" :props="props">
      <q-td colspan="100%">
        <div class="text-left">Detalhes: {{ props.row.id }}.</div>
      </q-td>
    </q-tr>
  </template>
</q-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Agendamento',
  data: () => ({
    tableData: [],
    results: [],
    id_usuario: null,
    id_lead: null,
    columns: [{
      name: 'desc',
      required: true,
      label: 'Itens',
      align: 'left',
      field: 'name',
      sortable: true
    },
    { name: 'id', label: 'Id', field: 'id', sortable: true },
    { name: 'data', label: 'Data', field: 'data', sortable: true },
    { name: 'hora', label: 'Hora', field: 'hora' },
    { name: 'nome', label: 'Nome', field: 'nome' },
    { name: 'bairro', label: 'Bairro', field: 'bairro' },
    { name: 'numero', label: 'Número', field: 'numero' },
    { name: 'logradouro', label: 'Logradouro', field: 'logradouro', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'obs', label: 'Obs', field: 'obs', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
    ],
    loading: false,
    dark: true,
    selection: 'multiple',
    selected: []
  }),
  computed: {
    tableClass () {
      if (this.dark) {
        return 'bg-black'
      }
    }
  },
  mounted () {
    const userLogado = window.localStorage.getItem('Usuario')
    const user = JSON.parse(userLogado)
    this.id_usuario = user.id
    axios.get('http://165.227.188.44:5555/schedule?where={"agentes":' + this.id_usuario + ',"status":0}')
      .then(response => {
        this.tableData = response.data
      })
  },
  methods: {
    aceito () {
      let newAgenda = {
        status: 1
      }
      axios.put('http://165.227.188.44:5555/schedule/' + this.selected[0].id, newAgenda)
        .then((response) => {
          this.results = response.data
          alert('confirmou agendamento!')
          this.updateLead(4)
        })
        .catch((error) => {
          alert(error.response.data.code)
        })
    },
    // momento de aceitação pelo agente se retorna ou não p lista de aceitação
    updateLead (id) {
      let newLead = {
        momento_atual: id
      }
      axios.put('http://165.227.188.44:5555/leads/' + this.results.id_lead.id, newLead)
        .then((response) => {
          window.location.reload()
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    notAceito () {
      let newAgenda = {
        status: 2
      }
      axios.put('http://165.227.188.44:5555/schedule/' + this.selected[0].id, newAgenda)
        .then((response) => {
          this.results = response.data
          alert('Não confirmou agendamento!')
          this.updateLead(5)
        })
        .catch((error) => {
          alert(error.response.data.code)
        })
    },
    rowClick (row) {
      this.$q.notify({
        color: 'primary',
        icon: 'local_dining',
        message: `Hmm, are you sure? It has ${row.calories} calories.`,
        actions: [{
          label: 'Yes, eat!',
          handler: () => {
            this.$q.notify({ color: 'positive', icon: 'done', message: 'Yummy. Thanks! Now one more.' })
          }
        }]
      })
    }
  }
}
</script>

<style>
.div{
  width: 100%;
}
</style>
