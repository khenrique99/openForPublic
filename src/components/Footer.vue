<template>
    <div class="footer">
        <p class="left">
            Version <span>{{ versionCommit }}</span> at <span>{{ dateCommit }}</span>
        </p>
        <p class="right">
            Designed and developed by <a href="https://www.instagram.com/k.henrique99" target="_blank">Kelvin Henrique</a>
        </p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { sendAxios } from '@/assets/axios'

    export default defineComponent({
        name: 'Footer',

        data() {
            return {
                versionCommit: '',
                dateCommit: '',
                repo: 'open-for-public',
                owner: 'khenrique99'
            }
        },

        mounted() {
            this.getCommitDate()
            this.getCommitVersion()
        },

        methods: {
            getCommitDate() {
                const settings = {
                    url: `https://api.github.com/repos/${this.owner}/${this.repo}/commits`,
                    metodo: 'GET',
                    envio: ''
                }

                sendAxios(settings, this.getCommitDateCallBack, null)
            },
            getCommitDateCallBack(status: any, response: any) {
                if (status === 200) {
                    this.dateCommit = this.conversionDate(response.data[0].commit.committer.date)
                }
            },

            getCommitVersion() {
                const settings = {
                    url: `https://api.github.com/repos/${this.owner}/${this.repo}/tags`,
                    metodo: 'GET',
                    envio: ''
                }

                sendAxios(settings, this.getCommitVersionCallBack, null)
            },
            getCommitVersionCallBack(status: any, response: any) {
                if (status === 200) {
                    this.versionCommit = response.data[0].name
                }
            },

            conversionDate(date: any) {
                const dateObj = new Date(date)
                const day = String(dateObj.getDate()).padStart(2, '0')
                const month = String(dateObj.getMonth() + 1).padStart(2, '0')
                const year = dateObj.getFullYear()
                const hours = String(dateObj.getHours()).padStart(2, '0')
                const minutes = String(dateObj.getMinutes()).padStart(2, '0')
                const seconds = String(dateObj.getSeconds()).padStart(2, '0')

                return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
            }
        },
    })
</script>

<style scoped>
    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        background-color: var(--container-color);
        padding: 10px 0px;
        box-shadow: 0px 1px 30px 1px var(--shadow-color);
    }
    .footer p {
        margin: 0 auto;
        width: 100%;
        color: var(--text-color);
    }
    .footer p a {
        text-decoration: none;
        color: var(--text-color);
        font-weight: bolder;
    }
    .footer p span {
        font-weight: bolder;
    }
    .left {
        padding-left: 25px;
    }
    .right {
        padding-right: 25px;
        text-align: right;
    }
</style>