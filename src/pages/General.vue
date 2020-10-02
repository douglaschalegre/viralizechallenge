<template>
  <div class="container">
    <DashboardMenu/>
    <div class="q-pa-md filter">
      <p>Filtrar por:</p>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="initialdate" :options="getApiResponseDate" label="Data inicial"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="enddate" :options="getApiResponseDate" label="Data final"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="actarea" :options="getApiResponseTheme" label="Área de atuação"/>
      <q-select outlined bg-color="grey-1" label-color="blue-grey-5" v-model="subarea" :options="sub" label="Subárea"/>
      <q-btn color="primary" icon="mdi-filter-outline" label="Filtrar" @click="filter(initialdate,enddate,actarea,subarea)"/>
    </div>
    <div class="q-pa-md">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-center">Usuário</th>
            <th class="text-center">Área</th>
            <th class="text-center">Posts Criados</th>
            <th class="text-center">Posts Corrigidos</th>
            <th>
              <q-btn-dropdown color="primary"
                              dropdown-icon="mdi-dots-vertical"
                              flat
              >
                <q-list>
                  <q-item>
                    <q-item-section>
                      <q-item-label class="text-grey-5">Mostrar resultado do:</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section >
                      <q-item-label><q-icon name="mdi-menu-down-outline" left/>Maior para o menor</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup >
                    <q-item-section>
                      <q-item-label><q-icon name="mdi-menu-up-outline" left/>Menor para o maior</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </th>
          </tr>
        </thead>
        <tbody v-bind:key="data" v-for="data in ApiResponse">
          <tr>
            <td class="text-center">Lucas</td>
            <td class="text-center">{{data.theme}}</td>
            <td class="text-center">{{data.created}}</td>
            <td class="text-center">{{data.corrected}}</td>
            <td class="text-center"></td>
          </tr>
        </tbody>
      </q-markup-table>
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
        ApiResponse: Api.general.results,
        initialdate: null,
        enddate: null,
        actarea: "Todas",
        subarea: "Todas",
      }
    },
    computed:{
      getApiResponseDate(){
        let response = Api.general.results.map((result)=>{ // Cria um array apenas com as datas
          return result.date
        })
        response = [...new Set(response)]; //Cria um novo array só com elementos únicos
        return response.sort()
      },
      getApiResponseTheme(){
        let response = Api.general.results.map((result)=>{ // Cria um array apenas com as datas
          return result.theme
        })
        response.push("Todas")
        response = [...new Set(response)]; //Cria um novo array só com elementos únicos
        return response.sort()
      }
    },
    methods:{
      filter: function(initialdate,enddate,actarea,subarea){
        let InitialDateFilter, EndDateFilter, ActArea

        if(initialdate !== null){
          InitialDateFilter = Api.general.results.filter((res)=>{ //Filtra por data inicial
            if (res.date >= initialdate) return res
          })
        }else{ InitialDateFilter = Api.general.results }

        if(initialdate !== null){
          EndDateFilter = InitialDateFilter.filter((res)=>{ //Filtra por data final
          if (res.date <= enddate) return res
        })
        }else{ EndDateFilter = InitialDateFilter }
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
  .q-select{
    width: 25%;
    margin: 1%;
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