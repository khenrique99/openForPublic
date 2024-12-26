import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: '',
    }),

    actions: {
        setTheme(newTheme: string) {
            this.theme = newTheme
        },
    },
    persist: true,
})