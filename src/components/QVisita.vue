<template>
   <q-table
    :data="tableData"
    :columns="columns"
    :selection="selection"
    :selected.sync="selected"
    :loading="loading"
    row-key="name"
    color="secondary"
  >
    <q-tr slot="top-row" slot-scope="props">
      <q-td colspan="100%">
        <strong>Extra top row</strong>
      </q-td>
    </q-tr>

    <q-tr slot="bottom-row" slot-scope="props">
      <q-td colspan="100%">
        <strong>Extra bottom row</strong>
      </q-td>
    </q-tr>

    <template slot="top-left" slot-scope="props">
      <q-select
        v-model="selection"
        stack-label="Selection"
        hide-underline
        :options="[
          { label: 'Single', value: 'single' },
          { label: 'Multiple', value: 'multiple' },
          { label: 'None', value: 'none' }
        ]"
        color="secondary"
        style="min-width: 100px"
      />
    </template>
    <div slot="top-right" slot-scope="props" class="column">
      <q-toggle
        v-model="loading"
        label="Loading state"
        color="secondary"
        class="q-mb-sm"
      />
      <q-toggle
        v-model="dark"
        label="On dark background"
        color="secondary"
      />
    </div>
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
