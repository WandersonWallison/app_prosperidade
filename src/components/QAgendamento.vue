<template>
   <q-table
              :data="tableData"
              :columns="columns"
              selection="single"
              :selected.sync="selected"
              row-key="name"
              color="secondary"
              title="Selecione um Item"
          >
            <template slot="top-selection" slot-scope="props">
                <q-btn color="secondary" flat label="Sim" class="q-mr-sm" />
                <q-btn color="secondary" flat label="Não" />
                <div class="col" />
               <q-btn color="negative" flat round icon="delete" @click="deleteRow" />
           </template>
      </q-table>
</template>

<script>
import { openURL } from 'quasar'
import axios from 'axios'
export default {
  name: 'Agendamento',
  data () {
    return {
      tableData: null,
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
      filter: '',
      visibleColumns: ['desc', 'data', 'hora', 'tempo_ligacao', 'sodium', 'calcium', 'obs'],
      separator: 'horizontal',
      selection: 'multiple',
      selected: [
        // initial selection
        { name: 'Ice cream sandwich' }
      ],
      pagination: {
        page: 2
      },
      paginationControl: { rowsPerPage: 3, page: 1 },
      loading: false,
      dark: true,
      selectedSecond: [
        { name: 'Eclair' }
      ]
    }
  },
  watch: {
    'paginationControl.page' (page) {
      this.$q.notify({
        color: 'secondary',
        message: `Navigated to page ${page}`,
        actions: page < 4
          ? [{
            label: 'Go to last page',
            handler: () => {
              this.paginationControl.page = 4
            }
          }]
          : null
      })
    }
  },
  computed: {
    tableClass () {
      if (this.dark) {
        return 'bg-black'
      }
    }
  },
  mounted () {
    axios.get('http://165.227.188.44:5555/schedule')
      .then(response => {
        this.tableData = response.data
      })
  },
  methods: {
    openURL,
    deleteRow () {
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
    }
  }
}
</script>

<style>
</style>
