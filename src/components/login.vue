<template>
    <div>
        <div class="row">
            <div class="box box-height transparent">
                <div class="iconbox full-height width inline-block vertical-align">
                    <svg viewBox="0 0 200 200" class="icon">
                        <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#username"></use>
                    </svg>
                </div>
                <userInput v-model.trim="username" class="inputbox transparent inline-block vertical-align"></userInput>
            </div>
        </div>
        <div class="row">
            <div class="box box-height transparent">
                <div class="iconbox full-height width inline-block vertical-align">
                    <svg viewBox="0 0 200 200" class="icon">
                            <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#password"></use>
                    </svg>
                </div>
                <input v-model.trim="passwordInput" type="password" class="inputbox transparent inline-block vertical-align" placeholder="密码" v-show="!showPass" @focus="isFocus" @blur="isBlur">
                <input v-model.trim="passwordInput" type="text" class="inputbox transparent inline-block vertical-align" placeholder="密码" v-show="showPass" @focus="isFocus" @blur="isBlur">
                <div class="iconbox full-height eye inline-block vertical-align" v-on:click="showPass = !showPass">
                    <svg viewBox="0 0 200 200" class="icon">
                            <use xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#eye"></use>
                        </svg>
                </div>
            </div>
            <svg viewBox="0 0 200 200" class="secret inline-block">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#secret"></use>
                </svg>
            <div v-on:click="link" class="forget inline-block tip-color min-font">忘记密码？</div>
            <div v-if="this.failed" class="check inline-block fail tip-color min-font">邮箱或密码不正确</div>
        </div>
        <button v-on:click="submit" class="change box-height full-width login-margin" :style="{'background-color': this.submitFlag ? '#d2d2d2' : '#fd860e'}">登录</button>
    </div>
</template>

<script>
    import userInput from './userInput.vue'
    import {
        email,
        required,
        isUnique
    } from 'vuelidate/lib/validators'
    import getCookie from '../getCookie'
    import Service from "../service"
    export default {
        data() {
            return {
                username: '',
                passwordInput: '',
                showPass: false,
                submitFlag: false,
                failed: false
            }
        },
        components: {
            "userInput": userInput
        },
        validations: {
            passwordInput: {
                required
            }
        },
        created() {
            this.$parent.footer_display = false
        },
        methods: {
            isFocus() {
                this.$parent.footer_display = true
                this.submitFlag = false
            },
            isBlur() {
                this.$parent.footer_display = false
            },
            link() {
                var location = window.location.pathname
                window.location.pathname += 'newpsd';
            },
            submit() {
                if (this.submitFlag) return
                this.submitFlag = true
                if (this.$v.passwordInput.required) {
                   Service.Login(this.username, this.passwordInput).then(res => {
                        if (res !== null && res!== undefined) {
                            let landing = localStorage.getItem('landing')
                            if (landing) {
                                window.location.href = 'http://'+ landing + '?username=' + this.username +'&token=' + res.token
                            }
                        } else {
                            this.failed = true
                        }
                    })
                }
            }
        }
    }
</script>

<style lang="scss">
.secret {
    width: 14px;
    height: 12px;
}

.forget {
    margin-top: 5px;
    cursor: pointer;
}

.fail {
    float: right;
}

.login-margin {
    margin-top: 20px;
}
</style>
