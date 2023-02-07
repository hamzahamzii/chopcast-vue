<template>
  <div>
    <v-form id="login-form" ref="form" lazy-validation autocomplete="off">
      <!-- First Name Input Field -->
      <label for="First Name">{{ $t(`firstName`) }}*</label>
      <v-text-field
        v-model="firstName"
        color="blue darken-2"
        outlined
        :rules="firstNameValidation"
      ></v-text-field>
      <!-- Last Name Input Field -->
      <label for="Last NName">{{ $t(`lastName`) }} *</label>
      <v-text-field
        v-model="lastName"
        color="blue darken-2"
        outlined
        :rules="lastNameValidation"
      ></v-text-field>
      <label for="Email">{{ $t(`email`) }} *</label>
      <v-text-field
        v-model="email"
        color="blue darken-2"
        outlined
        :rules="emailValidation"
      ></v-text-field>
    </v-form>
  </div>
</template>
<script>
import {
  emailRules,
  firstNameRules,
  lastNameRules,
  eValidation,
} from "../validations/validation";
export default {
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      emailValidation: emailRules,
      firstNameValidation: firstNameRules,
      lastNameValidation: lastNameRules,
    };
  },
  watch: {
    firstName(value) {
      this.$emit("firstName", value);
    },
    lastName(value) {
      this.$emit("lastName", value);
    },
    email(value) {
      if (eValidation(value)) this.$emit("emailAddress", value);
      else this.$emit("emailAddress", false);
    },
  },
};
</script>
