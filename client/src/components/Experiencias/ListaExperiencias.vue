<template>
  <b-table :fields="fields" :items="items" hover>
    <template slot="empresa" slot-scope="data">
      <a :href="`#${data.item.idEmpresa}`">
        {{data.value}}
      </a>
    </template>
  </b-table>
</template>

<script>
export default {
  data () {
    return {
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
            return 'R$'+value.toFixed(2);
          },
        },
      ],
      items: [
        { cargo: 'Desenvolvedor Full-Stack', empresa: 'Liv Up', tipo: 'Quadrimestral', salario: 2000.00, idEmpresa: 1 },
        { cargo: 'Consultor', empresa: 'Visagio Tecnologia', tipo: 'Estágio de férias', salario: 2200, idEmpresa: 5 },
        { cargo: 'Técnico em informática', empresa: 'Dom Bosco', tipo: 'Semestral', salario: 1030.0, idEmpresa: 21 },
        { cargo: 'Cientista de dados', empresa: 'Nubank', tipo: 'Outro', salario: 3000.001, idEmpresa: 43 },
      ]
    }
  },
}
</script>