<template>
  <div>
    <DashboardMenu/>
    <div class="q-pa-md filter">
      <p>Filtrar por:</p>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="initialdate" :options="getApiResponseDate" label="Data inicial"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="enddate" :options="getApiResponseDate" label="Data final"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="actarea" :options="getApiResponseTheme" label="Área de atuação"/>
      <q-btn color="primary" icon="mdi-filter-outline" label="Filtrar" @click="filter(initialdate,enddate,actarea)"/>
    </div>
    <div class="q-pa-md">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-center">Período</th>
            <th class="text-center">Título</th>
            <th class="text-center">Motivo</th>
            <th class="text-center">Área</th>
            <th class="text-center">Subárea</th>
            <th class="text-center">Ação</th>
          </tr>
        </thead>
        <tbody v-bind:key="data.post" v-for="data in ApiResponse">
          <tr>
            <td class="text-center">{{data.created_at}}</td>
            <td class="text-center">{{data.post_title}}</td>
            <td class="text-center">{{data.description}}</td>
            <td class="text-center">{{data.theme}}</td>
            <td class="text-center">{{data.tag}}</td>
            <td class="text-center"><q-btn outline color="primary" label="Visualizar"/></td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import DashboardMenu from '../components/DashboardMenu.vue'
import Api from '../api/mock.json'
  export default {
    components:{
      DashboardMenu
    },
    data(){
      return{
        ApiResponse: Api.corrections.results,
        initialdate: null,
        enddate: null,
        actarea: "Todas",
      }
    },
    computed:{
      getApiResponseDate(){
        let response = Api.corrections.results.map((result)=>{ // Cria um array apenas com as datas
          return result.created_at
        })
        response = [...new Set(response)]; //Cria um novo array só com elementos únicos
        return response.sort()
      },
      getApiResponseTheme(){
        let response = Api.corrections.results.map((result)=>{ // Cria um array apenas com as datas
          return result.theme
        })
        response.push("Todas")
        response = [...new Set(response)]; //Cria um novo array só com elementos únicos
        return response.sort()
      }
    },
    methods:{
      filter: function(initialdate,enddate,actarea){
        const InitialDateFilter = Api.corrections.results.filter((res)=>{ //Filtra por data inicial
          if (res.created_at >= initialdate) return res
        })
        const EndDateFilter = InitialDateFilter.filter((res)=>{ //Filtra por data final
          if (res.created_at <= enddate) return res
        })
        let ActArea
        if (actarea !== "Todas"){ // Caso a área não seja "Todas" e diferente de nulo, filtra por área
          ActArea = EndDateFilter.filter((res)=>{
            if (res.theme == actarea) return res
          })
        }else{
          ActArea = EndDateFilter
        }
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
    width: 25%;
    margin: 1.1%;
  }
}
@media (max-width: 599px){
.filter{
  display: flex;
  flex-direction: column;
  .q-select{
    width: 50%;
    margin: 1%;
  }
}
}
</style>