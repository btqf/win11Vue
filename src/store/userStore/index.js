import { defineStore } from 'pinia'
import { getSrcSettingTheme } from '@/utils/getSrc';

const useUserStore = defineStore('useStore', {
    state: () => ({
        username: '',
        themeSrc: localStorage.getItem('theme') || 'default',
    }),
    getters: {
        getTheme: (state) => state.themeSrc || localStorage.getItem('theme'),
        getUsername: (state) => state.username || 'btqf',
    },
    actions: {
        setUsername(newName) {
            this.username = newName
        },
        toggleTheme(src) {
            this.themeSrc = src;
            localStorage.setItem('theme', src);
            document.querySelector('.desktop').style.backgroundImage = `url(${getSrcSettingTheme(`${src}.jpg`)})`
        }
    }
})

export default useUserStore