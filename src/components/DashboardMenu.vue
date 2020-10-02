<template>
  <q-tabs 
          active-color="primary"
          align="left"
          class="text-grey-5 q-pa-md"
  >
    <q-route-tab
      label="Visão Geral"
      to="general"
      exact
    />
    <q-route-tab
      label="Correções"
      to="corrections"
      exact
    />
    <q-route-tab
      label="Relatórios"
      to="reports"
      exact
    />
  </q-tabs>
</template>

<script>
export default {
  
}
</script>

<style scoped>
  div .q-tabs_content a{
    color: #8A9EB5;
  }
</style>