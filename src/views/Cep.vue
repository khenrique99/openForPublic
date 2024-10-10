<template>
    <div class="container ">
        <ToBack title="CEP" />
        <h1 class="mt--5">Digite o CEP e acesse informações de endereços de todo território nacional</h1>
        <div class="container-search">
            <InputNumber name="CEP" :maxlength="2" :clearInput="true" v-model="cep" />
            <ButtonConfirm name="Consultar" @click="verifyCEP" />
        </div>

        <div v-if="status" class="container-cep">
            <div>
                <label>CEP pesquisado</label>
                <p>{{ callBack.cep.cep }}</p>
            </div>
            <div>
                <label>Siafi</label>
                <p>{{ callBack.cep.siafi }}</p>
            </div>
            <div>
                <label>Gia</label>
                <p>{{ callBack.cep.gia }}</p>
            </div>
            <div>
                <label>IBGE</label>
                <p>{{ callBack.cep.ibge }}</p>
            </div>
            <div class="division-grid"></div>
            <div>
                <label>Logradouro</label>
                <p>{{ callBack.cep.logradouro }}</p>
            </div>
            <div>
                <label>Bairro</label>
                <p>{{ callBack.cep.bairro }}</p>
            </div>
            <div>
                <label>Localidade</label>
                <p>{{ callBack.cep.localidade }}</p>
            </div>
            <div>
                <label>Estado</label>
                <p>{{ callBack.cep.estado }}</p>
            </div>
            <div>
                <label>UF</label>
                <p>{{ callBack.cep.uf }}</p>
            </div>
            <div>
                <label>Região</label>
                <p>{{ callBack.cep.regiao }}</p>
            </div>
            <div>
                <label>DDD</label>
                <p>{{ callBack.cep.ddd }}</p>
            </div>
            <div>
                <label>Complemento</label>
                <p>{{ callBack.cep.complemento ? '' : 'Não mencionado' }}</p>
            </div>
        </div>

        <Message type="error" :messageText="error.cep.describe" v-if="error.cep.type" @close-message="clearMessageCEP" />
        <Message type="success" messageText="CEP encontrado com sucesso!" v-if="statusMessage" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { sendAxios } from '@/assets/axios'

    export default defineComponent({
        data() {
            return {
                cep: '',
                error: {
                    cep: {
                        type: false,
                        describe: '',
                        code: 0
                    }
                },
                callBack: {
                    cep: {}
                },
                status: false,
                statusMessage: false
            }
        },

        methods: {
            verifyCEP() {
                this.callBack = { cep: {} }
                this.status = false
                this.statusMessage = false

                if (this.cep === '') {
                    this.error.cep.describe = 'Preencha um CEP para fazer a busca!'
                    this.error.cep.code = 0
                    this.error.cep.type = true
                } else {
                    this.getCEP()
                }
            },

            clearMessageCEP() {
                this.error.cep = {
                    type: false,
                    describe: '',
                    code: 0
                }
            },

            getCEP() {
                const settings = {
                    url: `https://viacep.com.br/ws/${this.cep}/json/`,
                    metodo: 'GET',
                    envio: ''
                };

                sendAxios(settings, this.getCEPCallBack, null);
            },

            getCEPCallBack(status: any, response: any) {
                if (status === 200) {
                    if (response.data.erro) {
                        this.setErrorCEP(1)
                    } else {
                        this.setErrorCEP(0)
                        this.status = true
                        this.statusMessage = true
                        this.callBack.cep = response.data
                    }
                } else if (status === 500) {
                    this.setErrorCEP(2)
                } else {
                    this.setErrorCEP(3)
                }
            },

            setErrorCEP(type: number) {
                this.error.cep.code = 2
                this.error.cep.type = true

                if (type === 1) {
                    this.error.cep.describe = 'CEP não encontrado!'
                } else if (type === 2) {
                    this.error.cep.describe = 'CEP inválido, preencha corretamente!'
                } else if (type === 2) {
                    this.error.cep.describe = 'Erro não previsto no sistema!'
                } else {
                    this.error.cep.type = false
                    this.error.cep.describe = ''
                }
            }
        },

        watch: {
            statusMessage(newValue) {
                if (newValue) {
                    setTimeout(() => {
                        this.statusMessage = false;
                    }, 3000);
                }
            }
        }
    })
</script>

<style scoped>
    .container-search {
        width: 50%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 85% 15%;
        grid-gap: 0px 30px;
    }

    .container-cep {
        background-color: var(--container-color);
        border-radius: 15px;
        padding: 20px;
        width: 75%;
        margin: 0 auto;
        margin-top: 25px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 0px 20px;
    }

    .container-cep p {
        background-color: var(--body-color);
        color: var(--text-color);
        padding: 17px 13px 13px 13px;
        border-radius: 7px;
        font-size: 15px;
        margin-top: -9px;
    }

    .container-cep label {
        color: var(--body-color);
        background-color: var(--text-color);
        display: inline-block;
        margin-bottom: 0px;
        padding: 4px 6px;
        z-index: 1;
        border-radius: 7px 7px 7px 0px;
    }

    .division-grid {
        grid-column-start: 1;
        grid-column-end: 5;
        height: 5px;
        border-bottom: 1px dotted var(--body-color);
        margin-bottom: 20px;
    }

</style>