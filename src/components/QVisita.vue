<template>
  <q-table
  :data="tableData"
  :columns="columns"
  selection="multiple"
  :selected.sync="selected"
  row-key="name"
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
      <q-td key="id" :props="props">{{ props.row.id }}</q-td>
      <q-td key="data" :props="props">{{ props.row.data }}</q-td>
      <q-td key="hora" :props="props">{{ props.row.hora }}</q-td>
      <q-td key="tempo_ligacao" :props="props">{{ props.row.tempo_ligacao }}</q-td>
      <q-td key="sodium" :props="props">{{ props.row.sodium }}</q-td>
      <q-td key="calcium" :props="props">{{ props.row.calcium }}</q-td>
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
  name: 'Visita',
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
    { name: 'tempo_ligacao', label: 'Tempo Ligação', field: 'tempo_logacao' },
    { name: 'sodium', label: 'Sodium (mg)', field: '' },
    { name: 'calcium', label: 'Calcium', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
    { name: 'obs', label: 'Obs', field: 'obs', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
    axios.get('http://165.227.188.44:5555/schedule').then(response => {
      this.tableData = response.data
    })
  }
}
</script>

<style>
</style>
