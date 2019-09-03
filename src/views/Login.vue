<template>
  <div class="wrapper">
    <div class="login-logo">
      <img class="login-logo-image" src="~@/assets/logo.png">
      <span class="logon-logo-info">Login</span>
    </div>
    <el-form class="login-from" :model="passwordFrom" status-icon :rules="passwordRules" ref="passwordFrom" label-width="70px">
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" prefix-icon="el-icon-mobile-phone" v-model="passwordFrom.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" prefix-icon="el-icon-lock" v-model="passwordFrom.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitForm('passwordFrom')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import loginService from "@/global/service/login";

export default {
  data() {
    return {
      passwordFrom: {
        password: '',
        phone:''
      },
      passwordRules:{
        phone:[{
          required: true,
          message:'请输入手机号',
          trigger:'blur'
        },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "目前只支持中国大陆的手机号码",
          trigger: "blur"
        }],
        password:[{
          required: true,
          message: "请输入密码", 
          trigger: "blur"
        }]
      }

    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          
          this.$router.replace({ name: "Dashboard" });
        }
      });
    }
  }
}
</script>

<style scoped>
  /* el-input::-webkit-outer-spin-button,
  el-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  el-input[type="number"]{
    -moz-appearance: textfield;
  } */
  .wrapper{
    width: 500px;
    display: flex;
    flex-direction: column;
    margin: 100px auto;
  }
  .login-logo{
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: 0px auto 100px auto;
    align-items: center;
    font-size: 25px;
    color: #777;
  }
  .login-from{
    margin-right: 82px;
  }
</style>