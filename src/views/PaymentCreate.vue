<template>
  <div class="container">
    <el-form
      :model="formData"
      status-icon
      :rules="rules"
      ref="formData"
      label-position="left"
      label-width="160px"
      style="padding-left:40px;">
      <h3>消费记录新增</h3>
      <el-form-item label="用户ID" prop="user_id" style="width:460px;">
        <el-input v-model.number="formData.user_id" placeholder="请输入用户ID" />
      </el-form-item>
      <el-form-item label="收支类型选择" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option label="充值" value=1></el-option>
          <el-option label="消费" value=2></el-option>
          <el-option label="赠送" value=3></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="金额" prop="total" style="width:460px;">
        <el-input v-model="formData.total" placeholder="请输入金额" />
      </el-form-item>
      <el-form-item label="备注" style="width:460px;" prop="remark">
        <el-input type="textarea" v-model="formData.remark"></el-input>
      </el-form-item>
      <el-form-item class="warpper">
        <el-button type="primary" @click="handleCreate('formData')">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import paymentService from "@/global/service/payment";
// import userService from "@/global/service/user";

export default {
  data(){
    return{
      rules:{
        user_id: [{ required: true, message: "请输入金额", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "change" }],
        total: [{ required: true, message: "请输入金额", trigger: "blur" }],
      },
      formData:{
        user_id:'',
        status:'',
        total:'',
        remark:''
      }
    }
  },
  methods:{
    handleCreate(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let params = {
            status : this.formData.status ,
            user_id : this.formData.user_id ,
            total : this.formData.total,
            remark: this.formData.remark
          }
          paymentService
            .insert(params)
            .then( res =>{
              this.$message({
              message: res.message,
              type: 'success'
              })
              this.$router.push({name:'Payment'})
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