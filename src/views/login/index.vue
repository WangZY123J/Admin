<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <lang-select class="lang-select"></lang-select>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user"></SvgIcon>
        </span>
        <el-input
          :placeholder="$t('msg.login.usernamePlaceholder')"
          name="username"
          type="text"
          v-model="loginForm.username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password"></SvgIcon>
        </span>
        <el-input
          :placeholder="$t('msg.login.passwordPlaceholder')"
          name="password"
          v-model="loginForm.password"
          :type="passwordType"
        />
        <span class="show-pwd" @click="onChangePwdType">
          <SvgIcon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></SvgIcon>
        </span>
      </el-form-item>

      <el-button
        type="primary"
        class=".btn"
        @click="handleLogin"
        :loading="loading"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
    </el-form>
  </div>
  <div class="tips" v-html="$t('msg.login.desc')"></div>
</template>

<script setup>
import LangSelect from '@/components/LangSelect'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { validatePassword } from './rules.js'
import { Edit } from '@element-plus/icons-vue'
import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs'

const i18n = useI18n()

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const passwordType = ref('password')
const loginFormRef = ref(null)
const store = useStore()
let loading = ref(false)

const onChangePwdType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const handleLogin = () => {
  //表单校验
  loginFormRef.value.validate((value) => {
    if (!value) return

    //触发登录动作
    loading.value = true
    store
      .dispatch('user/login', loginForm.value)
      .then(() => {
        loading = false
      })
      .catch((err) => {
        console.log(err)
        loading = false
      })
  })
}
</script>

<style lang="scss" scoped>
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('@/assets/background.jpeg') fixed no-repeat;
  background-size: cover;

  .login-form {
    width: 240px;
    height: 220px;
    display: flex;
    flex-direction: column;
    padding: 40px;
    text-align: center;
    position: relative;
    z-index: 100;
    background: inherit;
    border-radius: 18px;
    overflow: hidden;

    &::before {
      content: '';
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      position: absolute;
      top: -10px;
      left: -10px;
      overflow: hidden;
      background: inherit;
      box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
      filter: blur(5px);
      z-index: -1;
    }

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgb(230, 233, 232);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      font-size: 17px;
      display: inline-block;
      height: 36px;
      width: 85%;
    }

    input {
      margin: 6px 0;
      height: 36px;
      border: none;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 4px;
      padding: 0 14px;
      color: #3d5245;

      &::placeholder {
        color: #3d5245;
      }
    }

    .btn:focus,
    input:focus {
      outline: 0;
    }

    ::v-deep .el-button {
      height: 36px;
      border: none;
      border-radius: 4px;
      padding: 0 14px;
      margin-top: 5px;
      background-color: rgba(209, 179, 9, 0.4);
      color: white;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: 0.4s;

      &::placeholder {
        color: #3d5245;
      }

      &:hover {
        background-color: rgba(209, 179, 9, 0.7);
      }

      &::before,
      &::after {
        content: '';
        display: block;
        width: 80px;
        background: rgba(179, 255, 210, 0.5);
        opacity: 0.5;
        position: absolute;
        top: 0;
        left: 0;
        transform: skewX(-15deg);
        filter: blur(30px);
        overflow: hidden;
        transform: translateX(-100px);
      }

      &:hover {
        &::after {
          width: 40px;
          background: rgba(179, 255, 210, 0.3);
          left: 60px;
          opacity: 0;
          filter: blur(5px);
        }

        &::before {
          transition: 1s;
          transform: translateX(320px);
          opacity: 0.7s;
        }

        &::after {
          transition: 1s;
          transform: translateX(320px);
          opacity: 1;
        }
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 20px;
      margin: -10px auto 30px auto;
      text-align: center;
      font-weight: bold;
      font-weight: 400;
      color: #3d5245;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .lang-select {
    position: absolute;
    top: -10px;
    right: 0;
    background-color: #fff;
    font-size: 22px;
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.tips {
  color: #fff;
  float: left;
  margin-top: -250px;
  margin-left: 20px;
}
</style>
