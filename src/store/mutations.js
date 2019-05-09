const mutations = {
    UPDATE_LANG(state, value) {
        state.currentLang = value
        localStorage.setItem('UserLang', state.currentLang)
    }
}