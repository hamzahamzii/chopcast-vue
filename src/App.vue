<template>
  <v-app>
    <v-main>
      <PageView />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    PageView: () => import("./views/PageView.vue"),
  },
};
</script>
