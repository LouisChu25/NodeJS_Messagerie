<template>
    <div class="chat">
        <h1>Global chat</h1>
        <div class="msg-container">
            <button @click="scrollMessages" class="scroll-btn">↓</button>
            <div class="message" v-for="(msg, index) in messages" :key="index">
                  <p><span class="msg-email">{{ msg.user.email }}: <br></span><span class="msg-text">{{ msg.msg }}</span></p>
            </div>
            <br>
            <div id="msg-bottom"></div>
        </div>
        
        <form @submit.prevent="sendMessage">
            <input type="text" placeholder="Message" v-model="msg">
            <input type="submit">
        </form>
    </div>
</template>

<script>
import io from 'socket.io-client';
import VueJwtDecode from 'vue-jwt-decode';
import axios from 'axios';

export default {
    name: 'ChatView',
    data(){
        return {
            msg: '',
            messages: [],
            socket: io('localhost:3000'),
            user: {}
        }
    },
    methods: {
        scrollMessages()
        {
            const bottomEl = document.getElementById("msg-bottom");
            bottomEl.scrollIntoView();
        },

        getMessages()
        {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
            };
            axios.get('http://localhost:3000/chatapp/message', config)
                .then(data => {
                    for(let i = 0; i < data.data.length; i++)
                    {
                        this.messages.push(data.data[i]);
                    }
                });
        },
        sendMessage()
        {   
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("user")}` }
            };

            this.socket.emit('SEND_MESSAGE', {
                user: this.user,
                msg: this.msg
            });
            axios.post('http://localhost:3000/chatapp/message', {
                user: this.user,
                msg: this.msg
            }, config)
                .then(() => console.log("Message sent !"))
                .catch(err => console.log(err));
            this.msg = '';
            

        },
        checkAuth() {
            // get token from localstorage
            let token = localStorage.getItem("user");
            try {
                //decode token here and attach to the user object
                let decoded = VueJwtDecode.decode(token);
                this.user = decoded;
                console.log(decoded.exp);
                let currentTime = Date.now().valueOf() / 1000;
                console.log(currentTime);
                if(decoded.exp < currentTime)
                {
                    localStorage.removeItem("user");
                    throw 'Token expired.'
                }
                this.$store.state.loggedIn = true;
            } catch (error) {
                // return error in production env
                this.$store.state.loggedIn = false;
                this.$router.push("/");
            }
        }
    },
    beforeMount()
    {

    },
    created()
    {
        this.checkAuth();

    },
    mounted() {
        this.getMessages();
        this.socket.on('MESSAGE', (data) => {
            this.messages = [...this.messages, data];
            // you can also do this.messages.push(data)
        });
    }
}

</script>

<style>
    .msg-container
    {
        background-color: #2c3e50;
        width: 400px;
        height: 300px;
        border-radius: 5px;
        overflow: hidden;
        overflow-y: scroll;
        margin: auto;
    }

    .msg-email
    {
        color: #42b983;
        font-weight: bold;
    }

    .msg-text
    {
        color: white;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }

    .scroll-btn
    {
        position: fixed;
        border-radius: 50%;
        color: white;
        background-color: #42b983;
        border: none;
        width: 50px;
        height: 50px;
        font-size: 25px;
        margin-left: -25px;
    }
</style>