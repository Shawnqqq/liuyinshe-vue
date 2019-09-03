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
        <h3>班级添加</h3>
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
        <el-form-item label="学课节数" prop="lesson_count" style="width:460px;">
          <el-input v-model="formData.lesson_count" placeholder="请输入节数" />
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
        <el-form-item label="学课总价" style="width:460px;" prop="price">
          <el-input v-model="formData.price" placeholder="请输入价格" />
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
          <el-button type="primary" @click="handleCreate('formData')">添加</el-button>
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
        lesson_count: [{ required: true, message: "请输入节数", trigger: "blur" }],
        start_at: [{ required: true, message: "请选择日期", trigger: "change" }],
        end_at: [{ required: true, message: "请选择日期", trigger: "change" }],
        price: [{ required: true, message: "请输入金额", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      formData:{
        name:'',
        course:'',
        lesson_count:'',
        start_at:'',
        end_at:'',
        price:'',
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
            price : this.formData.price,
            lesson_count : this.formData.lesson_count,
            status : this.formData.status,
            start_at : this.formData.start_at,
            end_at : this.formData.end_at,
            description : this.formData.description
          };
          classService
            .insert(params)
            .then( res =>{
              this.$message({
              message: res.massage,
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