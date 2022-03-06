<template>
    <div class="logout"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LogoutView',
    created()
    {
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
        };
        axios.post('http://localhost:3000/auth/logout', {}, config)
            .then(() => {
                localStorage.removeItem("user");
                this.$store.state.loggedIn = false;
                this.$router.push('/');
            })
            .catch(err => console.log({ err }));
    }
}
</script>
