<template>
  <div class="page-container">
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="userForm"
        label-position="left"
        label-width="160px"
      >
        <h3 style="padding-left:20px;">课程修改</h3>
        <el-form-item class="warpper" label="名称" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item class="warpper" label="描述" prop="description" style="width:460px;">
          <el-input v-model="formData.description" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item class="warpper" label="授课老师" prop="teacher" style="width:460px;">
          <el-input v-model="formData.teacher" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item class="warpper" label="授课老师电话" prop="teacher_phone" style="width:460px;">
          <el-input v-model="formData.teacher_phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item class="warpper">
          <el-button type="primary" @click="handleEditCourse">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/service/course";

export default {
  data(){
    return{
      loading: false,
      rules:{
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [{ required: true, message: "请输入描述", trigger: "blur" }],
        teacher: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        teacher_phone: [{ required: true, message: "请输入手机号", trigger: "blur" },
        {
          pattern: /^1[3456789]\d{9}$/,
          message: "目前只支持中国大陆的手机号码",
          trigger: "blur"
        }]
      },
      formData:{
        name:'',
        description:'',
        teacher:'',
        teacher_phone:''
      }
    };
  },
  methods:{
    handleEditCourse(){
      this.$refs.userForm.validate(valid =>{
        if(valid){
          let params = {
            name : this.formData.name,
            description : this.formData.description,
            teacher : this.formData.teacher,
            teacher_phone : this.formData.teacher_phone
          };
          let id = this.$route.params.id
          courseService
            .update(id,params)
            .then(()=>{
              this.$message({
              message: '修改成功',
              type: 'success'
              })
            this.$router.push({name:'Course'})
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
  .warpper{
    padding-left:20px;
  }
</style>