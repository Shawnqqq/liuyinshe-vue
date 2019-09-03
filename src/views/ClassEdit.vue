<template>
  <div class="container">
    <div class="page-content" v-loading="loading">
      <el-form
        :model="formData"
        :rules="rules"
        ref="formData"
        label-position="left"
        label-width="160px"
        style="padding-left:40px;">
        <h3>班级修改</h3>
        <el-form-item label="班级名称" prop="name" style="width:460px;">
          <el-input v-model="formData.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="课程" prop="course">
          <el-select v-model="formData.course" placeholder="请选择课程">
            <el-option
            v-for="item in courseName"
            :value="item.id"
            :label="item.name"
            :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="start_at" >
          <el-date-picker
            v-model="formData.start_at"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期" prop="end_at">
          <el-date-picker
            v-model="formData.end_at"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="formData.status" placeholder="请选择状态">
            <el-option label="未开始" value=0></el-option>
            <el-option label="进行中" value=1></el-option>
            <el-option label="已完成" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级描述" style="width:460px;" prop="description">
          <el-input type="textarea" v-model="formData.description"></el-input>
        </el-form-item>
        <el-form-item class="warpper">
          <el-button type="primary" @click="handleCreate('formData')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/service/course";
import classService from "@/global/service/class"

export default {
  data(){
    return{
      loading:false,
      rules:{
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        course: [{ required: true, message: "请选择课程", trigger: "change" }],
        start_at: [{ required: true, message: "请选择日期", trigger: "change" }],
        end_at: [{ required: true, message: "请选择日期", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      formData:{
        name:'',
        course:'',
        start_at:'',
        end_at:'',
        status:'',
        description:''
      },
      courseName:[]
    }
  },
  created(){
    courseService.list().then(res=>{
      res.data.datas.forEach( data =>{
        this.courseName.push(data)
      })
    })
  },
  methods:{
    handleCreate(formName){
      this.$refs[formName].validate((valid) => {
        if(valid){
          let params = {
            name : this.formData.name,
            course_id : this.formData.course,
            status : this.formData.status,
            start_at : this.formData.start_at,
            end_at : this.formData.end_at,
            description : this.formData.description
          };
          let id = this.$route.params.id
          classService
            .update(id,params)
            .then( res =>{
              this.$message({
              message: res.message,
              type: 'success'
              })
              this.$router.push({name:'Class'})
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