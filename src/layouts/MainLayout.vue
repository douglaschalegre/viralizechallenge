<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
            <img src="../assets/viralize.svg">
        </q-toolbar-title>

        <div class="userdata">
          5 Créditos
          <img src="../assets/alert.svg">
          <img src="../assets/iniciais.svg">
          Flávia Branco
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Dashbord',
    caption: '',
    icon: 'home',
    link: ''
  },
  {
    title: 'Redação',
    caption: '',
    icon: 'subject',
    link: ''
  },
  {
    title: 'Revisão',
    caption: '',
    icon: 'search',
    link: ''
  },
  {
    title: 'Design',
    caption: '',
    icon: 'brush',
    link: ''
  },
  {
    title: 'Sair',
    caption: '',
    icon: 'exit_to_app',
    link: ''
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: true,
      essentialLinks: linksData
    }
  }
}
</script>

<style lang="scss" scoped>
.userdata{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1em;
  img {
    margin-right: 1em;
    margin-left: 1em;
  }
}
</style>
