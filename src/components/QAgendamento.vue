<template>
<q-table
  :data="tableData"
  :columns="columns"
  selection="multiple"
  :selected.sync="selected"
  row-key="name"
  title="Select some rows"
>
<template slot="top-selection" slot-scope="props">
    <q-btn color="secondary" flat label="Sim" class="q-mr-sm" />
    <q-btn color="secondary" flat label="Não" />
    <div class="col" />
    <q-btn color="negative" flat round delete icon="delete"/>
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
        <div class="text-left">This is expand slot for row above: {{ props.row.id }}.</div>
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
    columns: [{
      name: 'desc',
      required: true,
      label: 'Dessert (100g serving)',
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
    axios.get('http://165.227.188.44:5555/schedule').then(response => {
      this.tableData = response.data
    })
  },
  methods: {
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
</style>
