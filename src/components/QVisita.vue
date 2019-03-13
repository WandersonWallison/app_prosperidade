<template>
<q-page>
  <q-table
  :data="tableData"
  :columns="columns"
  selection="single"
  :selected.sync="selected"
  title="Selecione um agendamento"
>
      <template slot="top-selection" slot-scope="props">
        <q-btn label="Editar" color="primary" icon="edit" @click="noMessage" />
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
        {{ props.row.name }}
      </q-td>
      <q-td key="nome" :props="props">{{ props.row.id_lead.nome }}</q-td>
      <q-td key="data" :props="props">{{ props.row.data | maskData }}</q-td>
      <q-td key="hora" :props="props">{{ props.row.hora | maskHora }}</q-td>
      <q-td key="telefone" :props="props">{{ props.row.id_lead.telefone }}</q-td>
      <q-td key="celular" :props="props">{{ props.row.id_lead.celular }}</q-td>
    </q-tr>
    <q-tr v-show="props.expand" :props="props">
      <q-td colspan="100%">
       <div class="text-left">Endereço: {{ props.row.endereco[0].cep }},
          {{ props.row.endereco[0].logradouro }},
          {{ props.row.endereco[0].numero }},
          {{ props.row.endereco[0].bairro }} -
          {{ props.row.endereco[0].cidade }}-
          {{ props.row.endereco[0].uf.toUpperCase() }}</div>
      </q-td>
    </q-tr>
  </template>
</q-table>
<div v-if="selected.length !== 0">
  <div>
    <h5> Análise da Visita</h5>
    <q-toggle v-model="visible" label="Cliente Efetivado?" />
      <div v-if="visible">
      <q-agendado :leadProps="selected" />
      </div>
  <div v-else>
      <q-rejeitado :leadProps="selected" />
  </div>
    </div>
</div>
</q-page>
</template>

<script>
import QAgendado from '../components/QAgendado'
import QRejeitado from '../components/QRejeitado'
import axios from 'axios'
import { date } from 'quasar'
export default {
  components: {
    QAgendado,
    QRejeitado
  },
  name: 'Visita',
  data: () => ({
    visible: true,
    props: ['selected'],
    tableData: [],
    columns: [{
      name: 'desc',
      required: true,
      label: 'Itens',
      align: 'left',
      field: 'name',
      sortable: true
    },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'data', label: 'Data', field: 'data', sortable: true },
    { name: 'hora', label: 'Hora', field: 'hora', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'telefone', label: 'Telefone', field: 'telefone', sortable: true },
    { name: 'celular', label: 'Celular', field: 'celular', sortable: true }
    ],
    loading: false,
    dark: true,
    selection: 'multiple',
    selected: [
      // initial selection; notice we specify the
      // row-key prop of the selected row
      // { name: 'Ice cream sandwich' }
    ]
  }),
  filters: {
    maskData: function (v) {
      v = date.formatDate(v, 'DD/MM/YYYY')
      return v
    },
    maskHora: function (v) {
      switch (v) {
        case 1:
          v = '08:00'
          break
        case 2:
          v = '09:00'
          break
        case 3:
          v = '10:00'
          break
        case 4:
          v = '11:00'
          break
        case 5:
          v = '12:00'
          break
        case 6:
          v = '13:00'
          break
        case 7:
          v = '14:00'
          break
        case 8:
          v = '15:00'
          break
        case 9:
          v = '16:00'
          break
        case 10:
          v = '17:00'
          break
        case 11:
          v = '18:00'
          break
        case 12:
          v = '19:00'
          break
        case 13:
          v = '20:00'
          break
        case 14:
          v = '21:00'
          break
        case 15:
          v = '22:00'
          break
      }
      return v
    }
  },
  mounted () {
    const userLogado = window.localStorage.getItem('Usuario')
    const user = JSON.parse(userLogado)
    this.id_usuario = user.id
    axios.get('http://165.227.188.44:5555/schedule?where={"agentes":' + this.id_usuario + ',"status":1}')
      .then(response => {
        this.tableData = response.data
      })
  },
  methods: {
    show (options) {
      this.$q.loading.show(options)
      setTimeout(() => {
        this.$q.loading.hide()
      }, 3000)
    },
    noMessage () {
      this.show()
      this.editar()
    },
    editar () {
      window.localStorage.setItem('Agendamento', JSON.stringify(this.selected))
      setTimeout(() => {
        this.$router.push('/Home/reagendamento')
      }, 3000)
    }
  }
}
</script>

<style>
.q-btn{
      margin-top: 3%;
      width: 100%;
      height: 5px;
  }
</style>
