<template>
  <q-table
  :data="tableData"
  :columns="columns"
  selection="single"
  :selected.sync="selected"
>
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
      <q-td key="data" :props="props">{{ props.row.data }}</q-td>
      <q-td key="hora" :props="props">{{ props.row.hora }}</q-td>
      <q-td key="telefone" :props="props">{{ props.row.id_lead.telefone }}</q-td>
      <q-td key="nome" :props="props">{{ props.row.id_lead.nome }}</q-td>
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
</template>

<script>
import axios from 'axios'
export default {
  name: 'Visita',
  data: () => ({
    tableData: [],
    columns: [{
      name: 'desc',
      required: true,
      label: 'Itens',
      align: 'left',
      field: 'name',
      sortable: true
    },
    { name: 'data', label: 'Data', field: 'data', sortable: true },
    { name: 'hora', label: 'Hora', field: 'hora', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'telefone', label: 'Telefone', field: 'telefone', sortable: true },
    { name: 'nome', label: 'Nome', field: 'nome', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
  mounted () {
    const userLogado = window.localStorage.getItem('Usuario')
    const user = JSON.parse(userLogado)
    this.id_usuario = user.id
    axios.get('http://165.227.188.44:5555/schedule?where={"agentes":' + this.id_usuario + ',"status":1}')
      .then(response => {
        this.tableData = response.data
      })
  }
}
</script>

<style>
</style>
