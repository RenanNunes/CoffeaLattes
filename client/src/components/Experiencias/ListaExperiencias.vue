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
      items: [
        /*{ cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, periodoContratado: '3º módulo de estágio', idEmpresa: 1 , idExp: 12 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, periodoContratado: '5º semestre', idEmpresa: 5 , idExp: 52 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, periodoContratado: '2º semestre', idEmpresa: 21, idExp: 221 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, periodoContratado: '4º módulo de estágio', idEmpresa: 43, idExp: 423 },*/
      ],

    }
  },
  created: function () {
    this.onStart();
  },
  methods:{
    async onStart() {
      /*evt.preventDefault();*/
      const result = await fetch(API_URL+'/experiencia/buscar', {
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