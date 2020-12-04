<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="Password"
            name="password"
            tabindex="2"

            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div style="position:relative">

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>

        <el-button class="signup-button" style="" type="primary" @click="signup=true">
          Sign up
        </el-button>

      </div>
    </el-form>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>

    <el-dialog title="Sign up" :visible.sync="signup">

      <ApolloMutation
        :mutation="require('@/graphql/AddUser.gql')"
        :variables="{
          firstname,
          lastname,
          username2,
          email,
          password2,
          confirmpassword
        }"
      >
        <template v-slot="{ mutate }">
          <div class="login-container1">
            <el-form class="login-form" @submit.prevent="mutate()">
              <div class="title-container">
                <h3 class="title">Sign up Form</h3>
              </div>

              <el-form-item prop="first name">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  id="firstname"
                  v-model="firstname"
                  placeholder="First name"
                  type="text"
                />
              </el-form-item>

              <el-form-item prop="Last name">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  id="lastname"
                  v-model="lastname"
                  placeholder="Last name"
                  type="text"
                />
              </el-form-item>

              <el-form-item prop="User name">
                <span class="svg-container">
                  <svg-icon icon-class="user" />
                </span>
                <el-input
                  id="username2"
                  v-model="username2"
                  placeholder="User name"
                  type="text"
                />
              </el-form-item>

              <el-form-item prop="Email">
                <span class="svg-container">
                  <svg-icon icon-class="email" />
                </span>
                <el-input
                  id="email"
                  v-model="email"
                  placeholder="Email"
                  type="email"
                />
              </el-form-item>
              <el-form-item prop="Password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  id="password2"
                  v-model="password2"
                  placeholder="Password"
                  :type="passwordType"
                />
              </el-form-item>

              <el-form-item prop="Confirm password">
                <span class="svg-container">
                  <svg-icon icon-class="password" />
                </span>
                <el-input
                  id="confirmpassword"
                  v-model="confirmpassword"
                  placeholder="Confirm password"
                  :type="passwordType"
                />
              </el-form-item>

            </el-form>
          </div>

          <div style="text-align:right;">
            <el-button type="danger" class="cancel-button" @click="signup=false">Cancel</el-button>
            <el-button :disabled="loading" class="confirm-button" type="primary" @click="mutate()">Confirm</el-button>

          </div>
        </template>
      </ApolloMutation>

    </el-dialog>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import gql from 'graphql-tag'

export default {
  name: 'Login',
  components: { SocialSign },

  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111'
      },

      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },

      firstname: '',
      lastname: '',
      username2: '',
      email: '',
      password2: '',
      confirmpassword: '',
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      signup: false,
      redirect: undefined,
      otherQuery: {}

    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    login() {
    // Call to the graphql mutation
      this.$apollo.mutate({
      // Query
        mutation: gql`mutation ($username: String, $password: String) {
        login(username: $username, password: $password) {
          token
        }
      }`,
        // Parameters
        variables: {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
      })
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#ced5e0;
$light_gray:#324157;
$cursor: #324157;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input .login-container1{
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.login-container1{

 .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #324157;
      opacity: 1; /* Firefox */
      }
  }
}
</style>

<style lang="scss" scoped>
$bg:#fff;
$dark_gray:#889aa4;
$light_gray:#324157;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #324157;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .signin-button {
    position: right ;
    right: 0;
    bottom: 6px;
  }
  .cancel-button{
    background-color: #fff;
    color: black;
    border-color: black;
    border-style: solid;
    border-width: 2px;
  }
  .confirm-button{
    border-color: black;
    border-style: solid;
    border-width: 2px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
    .signin-button{
      display: none;
    }
  }
}

.login-container1 {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 5px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #324157;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  .signin-button {
    position: right ;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
    .signin-button{
      display: none;
    }
  }
}
</style>
