import Vue from 'vue'
import Profile from './components/profile.vue'
import style from './main.scss'

new Vue({
    el: "#profile",
    render: h => h(Profile)
})
