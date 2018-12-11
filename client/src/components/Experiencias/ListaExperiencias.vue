<template>
  <div>
    <b-table :fields="fields" :items="items" hover :currentPage="currentPage" :per-page="perPage">
      <template slot="empresa" slot-scope="data">
        <a :href="`#${data.item.idEmpresa}`">
          {{data.value}}
        </a>
      </template>
      <template slot="detalhes" slot-scope="data">
        <a :href="`/experiencia/detalhar/${data.item.idExp}`">
          Detalhes
        </a>
      </template>
    </b-table>
    <b-pagination size="md" align="center" v-model="currentPage" :total-rows="items.length" currentPage="currentPage" :per-page="perPage" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentPage: 1,
      perPage: 20,
      fields: [
        {
          key: 'cargo',
          label: 'Cargo',
          sortable: true,
        },{
          key: 'empresa',
          label: 'Empresa',
          sortable: true,
        },{
          key: 'tipo',
          label: 'Tipo de estágio',
          sortable: true,
        },{
          key: 'salario',
          label: 'Salário',
          sortable: true,
          formatter: (value) => {
            if (value){
              return 'R$'+value.toFixed(2);
            } else {
              return '-';
            }
          },
        },{
          key: 'periodoContratado',
          label: 'Período contratado',
          sortable: true,
        },{
          key: 'detalhes',
          label: 'Ver mais',
        }
      ],
    }
  },
  props: {
      items: {
        type: Array,
        required: true,
      }
  },
}
</script>