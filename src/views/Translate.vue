<template>
    <div class="container">
        <ToBack title="Tradutor" />
        <h1 class="mt--5">Traduza textos de vários idiomas</h1>

        <div class="container-traslate">
            <div class="options-translate">
                <InputSelect class="component" name="Traduzir do" :options="languages" :default="translationOf" @update:selected="(value: string) => handleSelectChange(value, true)" />
                <font-awesome-icon class="component icon-translate" icon="fa-solid fa-right-long" />
                <InputSelect class="component" name="para o" :options="languages" :default="translationFor" @update:selected="(value: string) => handleSelectChange(value, false)" />
            </div>
            <InputTextarea class="textarea" name="Digite o texto abaixo" :text="text" @update:text="updateText" />
            <div class="div-btn-translate">
                <div class="btn-translate">
                    <ButtonComponent name="Limpar" type="neutral" @click="clearTextarea" />
                    <ButtonComponent name="Traduzir" type="success" @click="verifyTranslation" class="spacing-left" />
                </div>
            </div>
        </div>

        <div class="division-grid-spacing" v-if="status"></div>

        <div v-if="status" class="container-traslate-after">
            <div>
                <label>Nivel do acerto</label>
                <p style="width: 57px;" :class="{
                    'color-green': translate.match == '1',
                    'color-neutral': translate.match >= '0.9' && translate.match < '1',
                    'color-red': translate.match < '0.9'
                }">
                    <font-awesome-icon icon="fa-solid fa-heart" v-if="translate.match == '1'" />
                    <font-awesome-icon icon="fa-solid fa-face-grin-hearts" v-if="translate.match >= '0.9' && translate.match < '1'" />
                    <font-awesome-icon icon="fa-solid fa-face-meh" v-if="translate.match < '0.9'" />
                    {{ (Number(translate.match) * 100).toFixed(0) }}%
                </p>
            </div>
            <div class="full-translate">
                <label>Texto traduzido</label>
                <p>
                    {{ translate.text }}
                </p>
            </div>
            <div class="full-translate">
                <label class="pointer" @click="toggleOptionsTranslate">
                    Outras opções encontradas
                    <span>{{ translate.options.length.toString().padStart(2, '0') }}</span>
                </label>
                <p v-for="(item, index) in translate.options" :key="index" v-if="showOptions">
                    {{ item.translation }}
                </p>
            </div>
        </div>

        <Message type="error" :messageText="error.translate.describe" v-if="error.translate.type" @close-message="clearMessageTranslate" />
        <Message type="success" messageText="Tradução feita com sucesso!" v-if="statusMessage" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { sendAxios } from '@/assets/axios'

    export default defineComponent({
        data() {
            return {
                status: false,
                showOptions: false,
                statusMessage: false,
                error: {
                    translate: {
                        type: false,
                        describe: '',
                        code: 0
                    }
                },
                translationOf: 'PT',
                translationFor: 'EN',
                text: '',
                translate: {
                    text: '',
                    match: '',
                    options: [{
                        translation: ''
                    }]
                },
                languages: [
                    {
                        name: 'Árabe',
                        acronym: 'AR'
                    },
                    {
                        name: 'Alemão',
                        acronym: 'DE'
                    },
                    {
                        name: 'Chinês',
                        acronym: 'ZH'
                    },
                    {
                        name: 'Espanhol',
                        acronym: 'ES'
                    },
                    {
                        name: 'Francês',
                        acronym: 'FR'
                    },
                    {
                        name: 'Inglês',
                        acronym: 'EN'
                    },
                    {
                        name: 'Italiano',
                        acronym: 'IT'
                    },
                    {
                        name: 'Japonês',
                        acronym: 'JA'
                    },
                    {
                        name: 'Português',
                        acronym: 'PT'
                    },
                    {
                        name: 'Russo',
                        acronym: 'RU'
                    },
                ]
            }
        },

        methods: {
            verifyTranslation() {
                if (this.text === "") {
                    this.error.translate.describe = 'Digite um texto para traduzir!'
                    this.error.translate.code = 0
                    this.error.translate.type = true
                } else {
                    this.translation()
                }
            },

            translation() {
                const settings = {
                        url: `https://api.mymemory.translated.net/get?q=${this.text}&langpair=${this.translationOf}|${this.translationFor}`,
                        metodo: 'POST',
                        envio: ''
                    }
    
                    sendAxios(settings, this.translationCallBack, null)
            },

            translationCallBack(status: any, response: any) {
                if (status === 200) {
                    this.status = true
                    this.statusMessage = true
                    this.error.translate.type = false
                    this.error.translate.describe = ''
                    this.translate.text = response.data.responseData.translatedText
                    this.translate.match = response.data.responseData.match
                    this.translate.options = response.data.matches
                } else {
                    this.status = false
                    this.statusMessage = false
                    this.error.translate.code = 2
                    this.error.translate.type = true
                    this.error.translate.describe = 'Erro não previsto no sistema!'
                }
            },

            handleSelectChange(value: string, type: boolean) {
                if (type) {
                    this.translationOf = value
                } else {
                    this.translationFor = value
                }
            },

            clearTextarea() {
                this.translationOf = 'PT'
                this.translationFor = 'EN'
                this.text = ''
                this.status = false
                this.statusMessage = false
            },

            updateText(newText: string) {
                this.text = newText
            },

            clearMessageTranslate() {
                this.error.translate = {
                    type: false,
                    describe: '',
                    code: 0
                }
            },

            toggleOptionsTranslate() {
                this.showOptions = !this.showOptions
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
    .container-traslate {
        width: 55%;
        margin: 0 auto;
    }

    .options-translate {
        display: flex;
        align-items: center;
    }

    .component {
        width: 100%;
    }

    .icon-translate {
        color: var(--text-color);
    }

    .textarea {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .div-btn-translate {
        display: flex;
        justify-content: flex-end;
    }

    .btn-translate {
        display: flex;
        width: 60%;
    }

    .spacing-left {
        margin-left: 30px;
    }

    .container-traslate-after {
        background-color: var(--container-color);
        border-radius: 15px;
        padding: 20px;
        width: 75%;
        margin: 0 auto;
        margin-top: 25px;
    }

    .container-traslate-after p {
        background-color: var(--body-color);
        color: var(--text-color);
        padding: 17px 13px 13px 13px;
        border-radius: 7px;
        font-size: 15px;
        margin-top: -9px;
    }

    .container-traslate-after label {
        color: var(--body-color);
        background-color: var(--text-color);
        display: inline-block;
        margin-bottom: 0px;
        padding: 4px 6px;
        z-index: 1;
        border-radius: 7px 7px 7px 0px;
    }

    .container-traslate-after label span {
        background-color: var(--container-color);
        border: 1px solid var(--text-color);
        color: var(--text-color);
        border-radius: 50%;
        padding: 5px;
    }

    .full-translate p {
        height: 100px;
        overflow-y: scroll;
    }

    .pointer {
        cursor: pointer!important;
    }
</style>