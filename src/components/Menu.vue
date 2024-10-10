<template>
    <header>
        <nav class="nav-container">
            <div class="nav-container-div">
                <RouterLink to="">
                    <font-awesome-icon icon="moon" class="icon-default" v-if="!theme" @click="toggleTheme" />
                    <font-awesome-icon icon="sun" class="icon-default" v-if="theme" @click="toggleTheme" />
                </RouterLink>
            </div>
            <div class="nav-container-div">
                <RouterLink to="/">
                    <font-awesome-icon icon="house" class="icon-default" />
                </RouterLink>
            </div>
        </nav>
    </header>
</template>

<script lang="ts">
    export default {
        name: 'Menu',
        data() {
            return {
                theme: false
            }
        },

        methods: {
            toggleTheme() {
                this.theme = !this.theme

                document.documentElement.setAttribute('data-theme', this.theme ? 'dark' : '' )
            }
        }
    }
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style>
    .nav-container {
        display: flex;
        background-color: var(--container-color);
        padding: 5px 10px;
        justify-content: right;
        box-shadow: 0px 1px 30px 1px var(--shadow-color);
    }
    .nav-container-div {
        padding: 2px;
    }
</style>