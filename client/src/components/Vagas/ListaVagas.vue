<template>
  <div>
    <b-table :fields="fields" :items="items" hover :currentPage="currentPage" :per-page="perPage">
      <template slot="empresa" slot-scope="data">
        <a :href="`#${data.item.idEmpresa}`">
          {{data.value}}
        </a>
      </template>
      <template slot="detalhes" slot-scope="row">
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-2">
         Ver {{ row.detailsShowing ? 'menos' : 'mais'}}
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
      <b-card>
        <h5>Sobre a vaga</h5>
        <b-row class="mb-2">
          <b-col sm="3"><b>Descrição:</b></b-col>
          <b-col>{{ row.item.descricao }}</b-col>
        </b-row>
        <hr />
        <h5 v-if="row.item.salario || (row.item.beneficios && (row.item.beneficios.VRVA || row.item.beneficios.VT))">Benefícios</h5>
        <b-row class="mb-2" v-if="row.item.salario">
          <b-col><b>Salário:</b></b-col>
          <b-col>{{ row.item.salario }}</b-col>
        </b-row>
        <b-row class="mb-2" v-if="row.item.beneficios && row.item.beneficios.VRVA">
          <b-col><b>Vale alimentação/refeição:</b></b-col>
          <b-col>{{ row.item.beneficios.VRVA }}</b-col>
        </b-row>
        <b-row class="mb-2" v-if="row.item.beneficios && row.item.beneficios.VT">
          <b-col><b>Vale transporte:</b></b-col>
          <b-col>{{ row.item.beneficios.VT }}</b-col>
        </b-row>
        <b-row align-h="end">
          <b-button @click="showModal" variant="danger" align-h="end" class="apaga-vaga">Apagar</b-button>
        </b-row>
        <b-modal ref="myModalRef" hide-footer title="Apagar">
          <div class="d-block text-center">
            <h4>Tem certeza que deseja apagar a vaga?</h4>
          </div>
          <b-btn class="mt-3" variant="outline-danger" block @click="apagar(row.item)">Apagar</b-btn>
        </b-modal>
      </b-card>
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
          key: 'dataLimite',
          label: 'Limite de inscrição',
          sortable: true,
        },{
          key: 'detalhes',
          label: 'Detalhes',
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
      const result = await fetch(API_URL+'/vagas', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const resultJSON = await result.json();
      this.items = resultJSON;
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    async apagar(vaga) {
      const result = await fetch(API_URL + '/vagas/apagar', {
        method: 'DELETE',
        body: JSON.stringify({
          "_id": vaga._id
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const index = this.items.findIndex(item => item._id === vaga._id);
      if (index > -1)
        this.items.splice(index, 1);
    }
  }
}
</script>

<style>
.apaga-vaga {
  margin-right: 5px;
}
</style>
