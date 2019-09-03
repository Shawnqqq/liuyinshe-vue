<template>
  <div class="page-container">
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-position="left"
        label-width="160px"
        style="padding-left:40px;"
      >
        <h3>用户添加</h3>
        <el-form-item class="warpper" label="姓名" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item class="warpper" label="手机号" prop="phone" style="width:460px;">
          <el-input v-model="formData.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item class="warpper" label="性别" prop="sex" style="width:460px;">
          <el-radio v-model="formData.sex" label="1">男</el-radio>
          <el-radio v-model="formData.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item class="warpper" label="生日" prop="birthday" style="width:460px;">
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="warpper" label="紧急联系人" prop="sms_name" style="width:460px;">
          <el-input v-model="formData.sms_name" placeholder="请输入紧急联系人" />
        </el-form-item>
        <el-form-item class="warpper" label="紧急联系人电话" prop="sms_phone" style="width:460px;">
          <el-input v-model="formData.sms_phone" placeholder="请输入紧急联系人电话" />
        </el-form-item>
        <el-form-item class="warpper">
          <el-button type="primary" @click="handleCreateUser('formData')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userService from "@/global/service/user";

export default {
  data() {
    return{
      loading:false,
      rules:{
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        sms_phone: [
          { required: true, message: "请输入紧急联系人手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sms_name: [{ required: true, message: "请输入紧急联系人姓名", trigger: "blur" }],
        birthday:[{ required: true, message: "请选择生日日期",trigger: "blur" }]
      },
      formData:{
        name:'',
        phone:'',
        birthday:'',
        sms_name:'',
        sms_phone:'',
        sex:'1'
      }
    };
  },
  methods:{
    handleCreateUser(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let params = {
            name : this.formData.name,
            phone : this.formData.phone,
            birthday : this.formData.birthday,
            sms_name : this.formData.sms_name,
            sms_phone : this.formData.sms_phone,
            sex : this.formData.sex
          };
          userService
            .insert(params)
            .then(()=>{
              this.$message({
              message: '添加成功',
              type: 'success'
              })
            this.$router.push({name:'User'})
            })
        }else{
          this.$message({
          message: '缺少参数',
          type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<style scoped>
</style>