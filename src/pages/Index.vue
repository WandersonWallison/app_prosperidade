<template>
  <q-page class="flex flex-center">
<div class="form2">
    <img class="img" alt="Quasar logo" src="~assets/nova_logo_ProsperidadeInvestimentos.png">
    <q-input v-model="model" float-label="Email" />
    <q-input v-model="text" type="password" float-label="Password" />
    <div class="actions2">
    <q-btn class="q-btn" color="primary" label="Entrar"/>
    </div>
</div>
  </q-page>
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
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
