<template>
    <ScoreBoard :computador="this.jogador" :jogador="this.computador" />
  <div>
    <template v-if="this.pergunta">

      <h1 v-html="this.pergunta"></h1>

      <template v-for="(resposta, index) in this.respostas" :key="index">
        <input 
          :disabled="this.respostaEnviada"
          type="radio" 
          name="options" 
          :value="resposta" 
          v-model="this.respostaEscolhida" 
        >
        <label v-html="resposta"></label>
        <br>
      </template>

      <button v-if="!this.respostaEnviada" @click="this.enviarResposta()" class="send" type="button">Enviar</button>

      <section class="resultado" v-if="this.respostaEnviada">
        <h4 v-if="this.respostaEscolhida == this.respostaCorreta"> Parabéns você acertou </h4>
        <h4 v-else v-html="'você errou a resposta correta era: ' + this.respostaCorreta"></h4>
        <button @click="this.novaPergunta()" class="send" type="button">Próxima Pergunta</button>
      </section>

    </template>
    
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard.vue'

export default{
  name: 'App',

  components:{
    ScoreBoard
  },

  data(){
    return{
      pergunta: undefined,
      respostaIncorreta: undefined,
      respostaCorreta: undefined,
      respostaEscolhida: undefined,
      respostaEnviada: false,
      jogador: 0,
      computador: 0
    }
  },

  computed:{
    respostas(){
      let respostas = JSON.parse(JSON.stringify(this.respostaIncorreta));
      respostas.splice(Math.round(Math.random() * respostas.legth), 0, this.respostaCorreta);
      return respostas
    }
  },
  created(){
      this.novaPergunta();
      },
  methods:{
    enviarResposta(){
      if(!this.respostaEscolhida){
        alert("Escolha uma das opções")
      }else{
        this.respostaEnviada = true;
        if(this.respostaEscolhida == this.respostaCorreta){
          this.computador++;
        }else{
          this.jogador++;
        }
      }
    },
    novaPergunta(){
      this.respostaEnviada = false;
      this.respostaEscolhida = undefined;
      this.pergunta = undefined;

      this.axios
      .get('https://opentdb.com/api.php?amount=1&category=18')
      .then((response) => {
        this.pergunta = response.data.results[0].question;
        this.respostaIncorreta = response.data.results[0].incorrect_answers;
        this.respostaCorreta = response.data.results[0].correct_answer;
      })
    }
  }
}

</script>

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px auto;
  max-width: 960px;

  & input[type=radio]{
    margin: 12px 4px;
  }

  & button.send{
    margin-top: 12px;
    height: 40px;
    min-width: 120px;
    padding: 0 16px;
    color: #fff;
    background-color: #1867c0;
    border: 1px solid #1867c0;
    cursor: pointer;
  }
}

</style>