<template>
    <section class="score">
        Jogador <span>{{this.jogador}}</span> x <span>{{this.computador}}</span> Computador
    </section>
</template>

<script>
export default{
    props:[
        'jogador', 
        'computador'
    ]
}
</script>

<style lang="scss" scoped>
    section.score{
        border-bottom: 1px solid black;
        padding: 24px;
        font-size: 18px;

        & span{
            padding: 8px;
            font-weight: bold;
            border: 1px solid black;
        }
    }
</style>