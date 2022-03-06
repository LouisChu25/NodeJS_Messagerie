<template>
    <div class="login">
        <h1>Login</h1>
        <form @submit.prevent="login">
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
import setAuthHeader from '../utils/setAuthHeader.js';

export default {
    name: 'LoginView',
    data(){
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },

    methods: {
        login()
        {
            axios.post('http://localhost:3000/auth/login', this.form)
                .then(res => {
                    localStorage.setItem("user", res.data.token);
                    setAuthHeader(res.data.token);
                    this.$router.push("/chat");
                })
                .catch(err => console.log(err));
        }
    }
}

</script>
