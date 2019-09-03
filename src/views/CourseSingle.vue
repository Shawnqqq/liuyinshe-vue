<template>
  <div class="container">
    <div class="container-single">
      <h3>课程详情</h3>
      <el-table
        :data="tableData"
        border>
        <el-table-column
          label="课程ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="name"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label='课程描述'>
        </el-table-column>
        <el-table-column
          prop="teacher"
          label="授课老师">
        </el-table-column>
        <el-table-column
          prop="teacher_phone"
          label="授课老师电话">
        </el-table-column>
      </el-table>
    </div>
    <div class="container-class">
      <h3>班级总览</h3>
      <el-table
        height="250"
        :data="classData"
        border>
        <el-table-column
          label="班级ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="class_name"
          label="班级名称">
        </el-table-column>
        <el-table-column
          prop="course_name"
          label="班级课程">
        </el-table-column>
        <el-table-column
          prop="lesson_count"
          label='学课数'>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="start_at"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="end_at"
          label="结束时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import courseService from "@/global/service/course";
import classService from "@/global/service/class";

export default {
  data(){
    return{
      tableData:[],
      classData:[]
    }
  },
  created(){
    let id = this.$route.params.id;
    courseService
    .single(id)
    .then(res =>{
      this.tableData = res.data
      
      let params = {
        course_id:res.data[0].id
      }
      classService
        .list(params)
        .then(res =>{
          res.data.datas.forEach(data =>{
            switch (data.status){
            case 0:
              data.status = '未开始'
              break
            case 1:
              data.status = '进行中'
              break
            case 2:
              data.status = '已完成'
              break
            }
          })
          this.classData = res.data.datas
        })
    })
  }
}
</script>

<style scoped>
  .container{
    padding: 30px;
    background: #ffffff;
  }
  .container-single{
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(236, 233, 233);
  }
</style>