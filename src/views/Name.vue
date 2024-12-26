<template>
    <div class="container">
        <ToBack title="Nomes" />

        <div class="container-name">
            <div class="container-name-nav">
                <div class="container-name-div left-radius" :class="{ 'selected': screen === 1 }" @click="changeScreen(1)">
                    <h2>
                        Frequência por nome
                    </h2>
                </div>
                <div class="container-name-div right-radius" :class="{ 'selected': screen === 2 }" @click="changeScreen(2)">
                    <h2>
                        Frequência por ranking
                    </h2>
                </div>
            </div>

            <div v-if="screen === 2">
                <div class="container-locality-ranking">
                    <img src="@/images/brazil.png" v-if="locality == 'BR'" class="flag">
                    <h2 class="locality">
                        Localidade:
                        <span>{{ locality }}</span>
                    </h2>
                </div>

                <div>
                    <div class="filter-chart-container">
                        <InputSelect class="component select-decade" name="Selecionar por decada" :options="decade" :default="decade" @update:selected="(value: string) => handleSelectChange(value, 'decade')" />
                        <InputSelect class="component select-sex" name="Selecionar por sexo " :options="sex" :default="sex" @update:selected="(value: string) => handleSelectChange(value, 'sex')" />
                        <InputSelect class="component select-state" name="Selecionar por estado " :options="state" :default="state" @update:selected="(value: string) => handleSelectChange(value, 'state')" />
                    </div>

                    <ButtonComponent name="Limpar filtros" type="neutral" @click="clearFilters" class="filter-ranking" />
                </div>

                <div>
                    <div class="container-chart-main">
                        <h1 class="title-chart">Nomes mais registrados no Brasil <span>({{ typeChart }})</span></h1>
                        <div class="container-chart">
                            <div id="chart-ranking" class="chart"></div>
                        </div>
    
                        <p class="font-data">fonte de dados: IBGE</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, toRaw } from 'vue'
    import { sendAxios } from '../assets/axios'
    import { useThemeStore } from '../stores/ThemeStores'
    import * as echarts from 'echarts'

    export default defineComponent({
        data() {
            return {
                name: '',
                typeChart: 'geral',
                screen: 1,
                ranking: [],
                locality: '',
                decade: [
                    { name: '1910' },
                    { name: '1920' },
                    { name: '1930' },
                    { name: '1940' },
                    { name: '1950' },
                    { name: '1960' },
                    { name: '1970' },
                    { name: '1980' },
                    { name: '1990' },
                    { name: '2000' },
                    { name: '2010' }
                ],
                decadeBKP: [
                    { name: '1910' },
                    { name: '1920' },
                    { name: '1930' },
                    { name: '1940' },
                    { name: '1950' },
                    { name: '1960' },
                    { name: '1970' },
                    { name: '1980' },
                    { name: '1990' },
                    { name: '2000' },
                    { name: '2010' }
                ],
                sex: [
                    { name: 'Feminino', acronym: 'F' },
                    { name: 'Masculino', acronym: 'M' },
                ],
                sexBKP: [
                    { name: 'Feminino', acronym: 'F' },
                    { name: 'Masculino', acronym: 'M' },
                ],
                state: [
                    { name: 'Acre', acronym: '12' },
                    { name: 'Alagoas', acronym: '27' },
                    { name: 'Amapá', acronym: '16' },
                    { name: 'Amazonas', acronym: '13' },
                    { name: 'Bahia', acronym: '29' },
                    { name: 'Ceará', acronym: '23' },
                    { name: 'Distrito Federal', acronym: '53' },
                    { name: 'Espírito Santo', acronym: '32' },
                    { name: 'Goiás', acronym: '52' },
                    { name: 'Maranhão', acronym: '21' },
                    { name: 'Minas Gerais', acronym: '31' },
                    { name: 'Mato Grosso do Sul', acronym: '50' },
                    { name: 'Mato Grosso', acronym: '51' },
                    { name: 'Pará', acronym: '15' },
                    { name: 'Paraíba', acronym: '25' },
                    { name: 'Pernambuco', acronym: '26' },
                    { name: 'Piauí', acronym: '22' },
                    { name: 'Paraná', acronym: '41' },
                    { name: 'Rio de Janeiro', acronym: '33' },
                    { name: 'Rio Grande do Norte', acronym: '24' },
                    { name: 'Rio Grande do Sul', acronym: '43' },
                    { name: 'Rondônia', acronym: '11' },
                    { name: 'Roraima', acronym: '14' },
                    { name: 'Santa Catarina', acronym: '42' },
                    { name: 'São Paulo', acronym: '35' },
                    { name: 'Sergipe', acronym: '28' },
                    { name: 'Tocantins', acronym: '17' }
                ],
                stateBKP: [
                    { name: 'Acre', acronym: '12' },
                    { name: 'Alagoas', acronym: '27' },
                    { name: 'Amapá', acronym: '16' },
                    { name: 'Amazonas', acronym: '13' },
                    { name: 'Bahia', acronym: '29' },
                    { name: 'Ceará', acronym: '23' },
                    { name: 'Distrito Federal', acronym: '53' },
                    { name: 'Espírito Santo', acronym: '32' },
                    { name: 'Goiás', acronym: '52' },
                    { name: 'Maranhão', acronym: '21' },
                    { name: 'Minas Gerais', acronym: '31' },
                    { name: 'Mato Grosso do Sul', acronym: '50' },
                    { name: 'Mato Grosso', acronym: '51' },
                    { name: 'Pará', acronym: '15' },
                    { name: 'Paraíba', acronym: '25' },
                    { name: 'Pernambuco', acronym: '26' },
                    { name: 'Piauí', acronym: '22' },
                    { name: 'Paraná', acronym: '41' },
                    { name: 'Rio de Janeiro', acronym: '33' },
                    { name: 'Rio Grande do Norte', acronym: '24' },
                    { name: 'Rio Grande do Sul', acronym: '43' },
                    { name: 'Rondônia', acronym: '11' },
                    { name: 'Roraima', acronym: '14' },
                    { name: 'Santa Catarina', acronym: '42' },
                    { name: 'São Paulo', acronym: '35' },
                    { name: 'Sergipe', acronym: '28' },
                    { name: 'Tocantins', acronym: '17' }
                ],
                decadeSelected: '',
                sexSelected: '',
                stateSelected: '',
            }
        },

        computed: {
            themeStore() {
                return useThemeStore()
            },
        },

        methods: {
            clearForm() {
                this.name = ''
            },

            verifyName() {
                if (this.name !== '') {
                    this.getName()
                }
            },

            getNameRanking() {
                const settings = {
                    url: `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking`,
                    metodo: 'GET',
                    envio: ''
                }

                sendAxios(settings, this.getNameRankingCallBack, null)
            },
            getNameRankingCallBack(status: number, response: any) {
                if (status === 200) {
                    this.ranking = response.data[0].res
                    this.locality = response.data[0].localidade

                    this.chartRanking()
                }
            },

            getRankingSelected() {
                const baseUrl = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/'
                const params = []

                if (this.decadeSelected !== '') {
                    params.push(`decada=${this.decadeSelected}`)
                }

                if (this.sexSelected  !== '') {
                    params.push(`sexo=${this.sexSelected}`)
                }

                if (this.stateSelected  !== '') {
                    params.push(`localidade=${this.stateSelected}`)
                }

                const queryString = params.length > 0 ? `?${params.join('&')}` : ''
                const url = `${baseUrl}${queryString}`

                const settings = {
                    url,
                    metodo: 'GET',
                    envio: ''
                }

                sendAxios(settings, this.getRankingSelectedCallBack, null)
            },
            getRankingSelectedCallBack(status: number, response: any) {
                if (status === 200) {
                    this.ranking = response.data[0].res
                    this.locality = response.data[0].localidade

                    const selectedFilters = []

                    if (this.decadeSelected) selectedFilters.push('decada')
                    if (this.sexSelected) selectedFilters.push('sexo')
                    if (this.stateSelected) selectedFilters.push('estado')

                    this.typeChart = selectedFilters.length > 0 ? selectedFilters.join(', ') : 'geral'

                    this.chartRanking()
                }
            },

            chartRanking() {
                const vm = this
                const cssTheme = {
                    color: [ getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() ],
                    textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() },
                    label: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() },
                    tooltip: { textStyle: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim() }, color: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(), backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--body-color').trim() },
                    borderColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim(),
                }

                echarts.registerTheme('cssTheme', cssTheme)
                const myChart = echarts.init(document.getElementById('chart-ranking'), 'cssTheme')

                let option: {
                    yAxis: any,
                    xAxis: any,
                    tooltip: any,
                    series: any,
                    textStyle: any,
                    grid: any
                } = {
                    grid: {
                        top: 10,
                        bottom: 10
                    },
                    yAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    xAxis: {
                        type: 'value',
                        show: false
                    },
                    textStyle: {
                        fontSize: 14,
                    },
                    tooltip: {
                        trigger: 'axis',
                        valueFormatter: function (value: any) {
                            return vm.formatValue(value, false, 'number')
                        },
                    },
                    series: [
                        {
                            data: [],
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(255, 255, 255, 0.02)'
                            },
                            labelLayout: {
                                hideOverlap: true
                            },
                            barGap: 0,
                            barCategoryGap: '25%',
                            label: {
                                show: true,
                                position: 'right',
                                formatter: function (value: any) {
                                    return vm.formatValue(value.data, false, 'number')
                                }
                            },
                            itemStyle: {
                                borderRadius: [0, 10, 10, 0]
                            },
                            cursor: 'auto'
                        }
                    ]
                }

                const rawRanking = toRaw(this.ranking.reverse())

                rawRanking.forEach((data: any) => {
                    option.yAxis.data.push(data.nome)
                    option.series[0].data.push(data.frequencia)
                })

                option && myChart.setOption(option)
            },

            changeScreen(screen: number) {
                this.screen = screen

                if (this.screen === 2) {
                    this.getNameRanking()
                }
            },

            formatValue(value: any, decimal: boolean = false, type: string): string {
                if (isNaN(value)) {
                    return value
                }

                if (type === "number") {
                    return new Intl.NumberFormat('pt-BR', {
                        minimumFractionDigits: decimal ? 2 : 0,
                        maximumFractionDigits: decimal ? 2 : 0,
                    }).format(Number(value))
                }

                if (type === "R$") {
                    const options: Intl.NumberFormatOptions = {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: decimal ? 2 : 0,
                        maximumFractionDigits: decimal ? 2 : 0,
                    }

                    return new Intl.NumberFormat('pt-BR', options).format(Number(value))
                }

                return value.toString()
            },

            handleSelectChange(value: any, type: string) {
                if (value) {
                    if (type === 'decade') this.decadeSelected = value
                    if (type === 'sex') this.sexSelected = value
                    if (type === 'state') this.stateSelected = value

                    this.getRankingSelected()
                } 
            },

            clearFilters() {
                this.decade = this.decadeBKP
                this.sex = this.sexBKP
                this.state = this.stateBKP
                this.typeChart = 'geral'

                this.getNameRanking()
            }
        },

        watch: {
            'themeStore.theme'() {
                console.log(this.themeStore.theme)

                this.chartRanking(true)
            }
        }
    })
</script>

<style scoped>
    .container-name {
        width: 70%;
        margin: 0 auto;
    }
    
    .container-name-nav {
        display: flex;
        flex-direction: row;
    }

    .container-name-div {
        width: 100%;
        text-align: center;
        cursor: pointer;
        background-color: var(--container-color);
    }

    .container-name-div h2 {
        color: var(--text-color);
        padding: 0px;
    }

    .selected {
        background-color: var(--text-color);
        box-shadow: 0px 0px 10px 1px var(--shadow-color);
    }

    .selected h2 {
        color: var(--body-color);
    }

    .left-radius {
        border-radius: 15px 0px 0px 15px;
    }

    .right-radius {
        border-radius: 0px 15px 15px 0px;
    }

    .container-locality-ranking {
        color: var(--text-color);
        display: flex;
        align-items: center;
    }

    .flag {
        width: 50px;
        height: 50px;
        background-color: var(--text-color);
        padding: 2px;
        border-radius: 50%;
    }

    .locality {
        text-align: left;
        color: var(--text-color);
    }

    .locality span {
        font-weight: bolder;
    }

    .container-chart {
        width: 95%;
        height: 450px;
        margin: 0 auto;
        overflow-y: auto;
        overflow-x: none;
        border: 1px solid var(--text-color);
        border-radius: 5px;
        position: relative;
        background-color: rgba(255, 255, 255, 0.05);
    }

    .container-chart-main {
        clear: both;
        background-color: var(--container-color);
        border-radius: 15px;
    }

    .container-chart::-webkit-scrollbar {
        width: 5px;
    }

    .container-chart::-webkit-scrollbar-track {
        background: transparent;
    }

    .container-chart::-webkit-scrollbar-thumb {
        background-color: var(--text-color);
        border-radius: 50px;
    }

    .chart {
        width: 100%;
        height: 900px;
    }

    .title-chart {
        padding: 10px 0px 0px 0px;
        margin: 0 auto;
        text-align: left;
        font-size: 25px;
        margin-left: 32px;
        padding-bottom: 3px;
    }

    .title-chart span {
        font-size: 18px;
    }

    .font-data {
        padding: 5px 10px 10px 0px;
        text-align: right;
        font-weight: bolder;
        color: var(--text-color);
    }

    .select-decade,
    .select-sex,
    .select-state {
        width: 200px;
        margin-right: 10px;
    }

    .select-sex {
        margin-left: 10px!important;
        margin-right: 10px!important;
    }

    .filter-chart-container {
        display: flex;
        width: 100%;
    }

    .filter-chart-container div {
        width: 100%;
        margin: 0 auto;
    }

    .filter-ranking {
        width: 200px!important;
        margin-top: 15px;
        margin-bottom: 15px;
        float: right;
    }
</style>