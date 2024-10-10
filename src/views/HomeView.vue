<script lang="ts">
    export default {
        data() {
            return {
                items: [
                    // {
                    //     name: 'Clima',
                    //     describe: 'Oferece dados meteorológicos em tempo real e previsões.',
                    //     url: '/temperature',
                    //     icon: 'temperature-low'
                    // },
                    {
                        name: 'Tradutor',
                        describe: 'Oferece tradução entre vários idiomas.',
                        url: '/translate',
                        icon: 'globe'
                    },
                    // {
                    //     name: 'Mapas',
                    //     describe: 'Oferece recursos de mapas interativos e personalizáveis.',
                    //     url: '/map',
                    //     icon: 'map-location-dot'
                    // },
                    {
                        name: 'CEP',
                        describe: 'Oferece dados de endereço ao consultar cep.',
                        url: '/cep',
                        icon: 'location-dot'
                    }
                ]
            }
        },

        methods: {

        }
    }
</script>

<template>
    <div class="container">
        <h1>Selecione um módulo para começar</h1>

        <div class="div-nav-home">
            <div v-for="item in items">
                <font-awesome-icon :icon="item.icon" class="icon-nav" />
                <h1>{{ item.name }}</h1>
                <p>{{ item.describe }}</p>

                <RouterLink :to="item.url">
                    <button class="btn-nav-home">
                        acessar
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .div-nav-home {
        width: 90%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 50px 30px;
    }

    .div-nav-home div {
        background-color: var(--container-color);
        border-radius: 15px;
        text-align: center;
        padding: 20px;
        position: relative;
    }

    .div-nav-home div h1 {
        padding: 0;
        font-size: 25px;
        color: var(--text-color);
    }

    .div-nav-home div p {
        color: var(--text-color);
        text-align: justify;
        padding: 30px 0px;
    }

    .icon-nav {
        font-size: 50px;
        color: var(--text-color);
        position: absolute;
        top: 0;
        left: 0;
        margin-top: -20px;
        margin-left: 20px;
        background-color: var(--container-color);
        padding: 10px;
        border-radius: 18px;
    }

    .btn-nav-home {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: -10px;
        border: none;
        padding: 5px 50px;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;
        background-color: var(--container-color);
        color: var(--text-color);
    }

    .btn-nav-home:hover {
        background-color: var(--text-color);
        color: var(--container-color);
    }
</style>