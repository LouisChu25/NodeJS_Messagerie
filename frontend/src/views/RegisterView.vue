<template>
    <div class="register">
        <h1>Sign up</h1>

        <form @submit.prevent="submitForm">
            <input type="text" autocomplete="off" autofocus placeholder="Email" v-model="form.email">
            <br><br>
            <input type="password" placeholder="Password" v-model="form.password">
            <br><br>
            <input type="submit">
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterView',
  data() {
        return{
            form: {
                email: '',
                password: ''
            }
        };
  },
  methods: {
      submitForm()
      {
          axios.post('http://localhost:3000/auth/signup', this.form)
                 .then((res) => {
                    console.log(res);
                    alert("Successfully registered !");
                    this.$router.push("/");
                 })
                 .catch((error) => {
                    console.log(error);
                    alert("Internal Server Error");
                 })

      }
  }
}
</script>