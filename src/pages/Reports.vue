<template>
  <div>
    <DashboardMenu/>
    <div class="q-pa-md filter">
      <q-input outlined bg-color="grey-1" v-model="createdpost" label="Valor post criado" />
      <q-input outlined bg-color="grey-1" v-model="correctedpost" label="Valor post corrigido" />
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="initialdate" :options="getApiResponseDate" label="Data inicial"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="enddate" :options="getApiResponseDate" label="Data final"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="actarea" :options="getApiResponseTheme" label="Setor"/>
      <q-btn color="primary" icon="mdi-filter-outline" label="Filtrar" @click="filter(initialdate,enddate,actarea)"/>
    </div>
    <div class="q-pa-md">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-center">Usuário</th>
            <th class="text-center">Período</th>
            <th class="text-center">Área de criação</th>
            <th class="text-center">Criados</th>
            <th class="text-center">Corrigidos</th>
            <th class="text-center">Valor a pagar</th>
          </tr>
        </thead>
        <tbody v-bind:key="data" v-for="data in ApiResponse">
          <tr>
            <td class="text-center">{{data.user}}</td>
            <td class="text-center">01/08/20 - 30/08/20</td>
            <td class="text-center">{{data.sector}}</td>
            <td class="text-center">{{data.created}}</td>
            <td class="text-center">{{data.corrected}}</td>
            <td class="text-center">R$ 1.200</td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-btn class="btn-export" color="primary" icon="mdi-export-variant" label="Exportar relatório"/>

    </div>
  </div>
</template>

<script>
  import DashboardMenu from "components/DashboardMenu.vue";
  import Api from '../api/mock.json'

  export default {
    components:{
      DashboardMenu
    },
    data(){
      return{
        ApiResponse: Api.reports.results,
        initialdate: null,
        enddate: null,
        actarea: "Todas",
        subarea: "Todas",
        createdpost: null,
        correctedpost: null
      }
    },
    computed:{
      getApiResponseTheme(){
        let response = Api.reports.results.map((result)=>{ // Cria um array apenas com as datas
          return result.sector
        })
        response.push("Todas")
        response = [...new Set(response)]; //Cria um novo array só com elementos únicos
        return response.sort()
      }
    },
    methods:{
      filter: function(initialdate,enddate,actarea,subarea){
        let ActArea
        if (actarea !== "Todas"){ // Caso a área não seja "Todas" e diferente de nulo, filtra por área
          ActArea = Api.reports.results.filter((res)=>{
            if (res.theme == actarea) return res
          })
        }else{ ActArea = Api.reports.results }
        this.ApiResponse = ActArea
      }
    }
    
  }
</script>

<style lang="scss" scoped>
tbody:nth-child(odd){
  background: #f2f2f2;
}
.filter{
  display: flex;
  align-items: center;
  justify-content: space-between;
  .q-select{
    width: 20%;
    margin: 1%;
  }
  .q-input{
    width: 20%;
    margin: 1%;
  }
}
.btn-export{
  margin-top: 20px;
  float: right;
}
@media (max-width: 599px){
.filter{
  display: flex;
  flex-direction: column;
  .q-select{
    width: 50%;
    margin: 1%;
  }
  .q-input{
    width: 50%;
    margin: 1%;
  }
}
}
</style>