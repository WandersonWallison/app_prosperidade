<template>
<q-page-container>
  <q-page class="flex flex-center">
<div class="form2">
    <img class="img" alt="Quasar logo" src="~assets/nova_logo_ProsperidadeInvestimentos.png">
    <q-input v-model="login.email" float-label="Email" />
    <q-input v-model="login.password" type="password" float-label="Password" />
    <div class="actions2">
    <q-btn class="q-btn" color="primary" @click="noMessage" label="Entrar"/>
    <div class="input_white">{{menssage}}</div>
    </div>
</div>
  </q-page>
  </q-page-container>
</template>

<style>
.form2 {
    margin-bottom: 60px;
    background-color:white;
    z-index: 1;
    padding: 40px;
    width: 500px;
    max-width: 100%;
    position: absolute;
    height: 500px;
  }
  .img {
    text-align: center;
    margin-bottom: 30px;
    margin-bottom: 16px;
    max-width: 70%;
    width: auto;
    margin-left: 14%;

  }
  .q-btn{
      width: 100%;
      height: 5px;
  }
  .actions2 {
      margin: 0;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
      margin-top: 10%
  }
  .input_white{
    color:black;
    margin-top: 3%;
    margin-left: 28%;
  }
</style>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      check2: true,
      login: {
        email: '',
        password: ''
      },
      results: null,
      inicio: null,
      menssage: null,
      people: []
    }
  },
  methods: {
    show (options) {
      this.$q.loading.show(options)
      setTimeout(() => {
        this.$q.loading.hide()
      }, 3000)
    },
    noMessage () {
      this.show()
      this.auth()
    },
    auth () {
      this.menssage = null
      this.results = null
      if (this.login.email !== '' && this.login.password !== '') {
        // this.loading = true
        axios
          .post('http://165.227.188.44:5555/login', this.login)
          .then(response => {
            if (response.data.user === false) {
              this.$router.push('/')
              if (response.data.message === 'Username not found') {
                this.menssage = 'Usuário não encontrado!'
              } else {
                this.menssage = 'A senha incorreta!'
              }
            } else {
              // this.results = response.data.message
              window.localStorage.setItem('Usuario', JSON.stringify(response.data.user))

              if (response.data.user.id_profile === 1) {
                this.menssage = 'Você não é um Agente'
              } else if (response.data.user.id_profile === 3) {
                this.menssage = 'Você não é um Agente'
              } else {
                this.$router.push('/Home')
                this.loading = false
              }
            }
          })
          .catch(error => {
            if (error.response.data.code === 'E_UNIQUE') {
              this.results = 'Usuario não encontrado. Por favor verirficar os dados digitados'
            }
            this.results = 'Usuario não encontrado. Por favor verirficar os dados digitados'
            this.loading = false
          })
      } else {
        this.$router.push('/')
        if (this.login.email === '') {
          this.menssage = 'Por favor incluir e-mail'
        } else if (this.login.password === '') {
          this.menssage = 'Por favor incluir a senha'
        }
        setInterval(() => {
          this.menssage = ''
          this.inicio = ''
          this.results = ''
        }, 8000)
      }
    }

  }
}
</script>
