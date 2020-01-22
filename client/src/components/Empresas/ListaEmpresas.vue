<template>
  <div>
    <b-table :fields="fields" :items="items" hover :currentPage="currentPage" :per-page="perPage">
      <template slot="site" slot-scope="data">
        <a :href="`${data.value}`">
          {{data.value}}
        </a>
      </template>
      <template slot="detalhes" slot-scope="data">
        <a :href="`/empresas/detalhar/${data.item._id}`">
          Detalhes
        </a>
      </template>
    </b-table>
    <b-pagination size="md" align="center" v-model="currentPage" :total-rows="items.length" currentPage="currentPage" :per-page="perPage" />
  </div>
</template>

<script>
const API_URL = process.env.API_URL || 'http://localhost:3000';

export default {
  data () {
    return {
      currentPage: 1,
      perPage: 20,
      fields: [
        {
          key: 'nome',
          label: 'Nome',
          sortable: true,
        },{
          key: 'areaDeAtuacao',
          label: 'Área de atuação',
          sortable: true,
        },{
          key: 'site',
          label: 'Site',
          sortable: true,
        },{
          key: 'detalhes',
          label: 'Ver mais',
        }
      ],
      items: [],

    }
  },
  created: function () {
    this.onStart();
  },
  methods:{
    async onStart() {
      /*evt.preventDefault();*/
      const result = await fetch(API_URL+'/empresas', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      this.items = resultJSON;
    }
  }
}
</script>