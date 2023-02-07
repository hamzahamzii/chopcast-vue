<template>
  <div>
    <div class="d-flex justify-end">
      <v-menu offset-y class="px-3 py-2">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="mr-4 my-4">
            Select Language
            <v-icon color="primary" medium dark> mdi-web </v-icon>
          </div>
        </template>
        <v-list>
          <div v-for="(item, index) in items" :key="index">
            <div
              :class="
                getSelectedLanguage.value === item.value ? 'selected' : ''
              "
              class="py-2 px-2 pointer"
              @click="changeLanguage(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </v-list>
      </v-menu>
    </div>
    <div class="d-flex justify-center align-center h-100">
      <v-card width="700px" class="py-2">
        <div class="logo py-4 d-flex justify-center">
          <v-card-title class="text-h4"> {{ $t(`title`) }} </v-card-title>
        </div>
        <v-card-text class="d-flex">
          <div class="w-450">
            <FormComponent
              @firstName="firstName"
              @lastName="lastName"
              @emailAddress="emailAddress"
            />
          </div>
          <div class="ml-2 d-flex justify-center align-center">
            <ImageUpload @imageUpload="imageUpload" />
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-end"
          ><v-btn
            :disabled="!validation"
            width="40%"
            large
            color="blue"
            class="white--text"
            @click="saveChanges()"
          >
            {{ $t(`save`) }}
          </v-btn></v-card-actions
        >
      </v-card>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      fName: null,
      lName: null,
      email: null,
      image: null,
      items: [
        { label: "English", value: "en" },
        { label: "French", value: "fr" },
        { label: "Spanish", value: "sp" },
        { label: "Chinese", value: "ch" },
        { label: "Arabic", value: "ar" },
        { label: "Persian", value: "pr" },
        { label: "Egyptian", value: "eg" },
      ],
    };
  },
  components: {
    FormComponent: () => import("../components/FormComponent.vue"),
    ImageUpload: () => import("../components/ImageUpload.vue"),
  },
  computed: {
    ...mapGetters(["getData", "getSelectedLanguage"]),
    validation() {
      return !!(this.fName && this.lName && this.email && this.image);
    },
  },
  methods: {
    ...mapActions(["saveData"]),
    ...mapMutations(["setSelectedLanguage"]),
    firstName(value) {
      this.fName = value;
    },
    lastName(value) {
      this.lName = value;
    },
    emailAddress(value) {
      this.email = value;
    },
    imageUpload(value) {
      this.image = value;
    },
    saveChanges() {
      let data = {
        firstName: this.fName,
        lastName: this.lName,
        email: this.email,
        image: this.image,
      };
      this.saveData(data);
    },
    changeLanguage(item) {
      this.setSelectedLanguage(item);
      this.$i18n.locale = item.value;
    },
  },
};
</script>
<style scoped>
.h-100 {
  height: calc(100vh - 68px);
}
.w-450 {
  width: 450px;
}
.selected {
  background-color: rgb(195, 238, 253);
}
.pointer {
  cursor: pointer;
}
</style>
