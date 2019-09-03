<template>
  <div class="container">
    <el-table
      :data="tableData"
      class="lesson"
      border>
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="开始时间">
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
    </el-table>
    <el-table
      :data="userData"
      class="user">
      <el-table-column
        prop="status"
        label="点名情况">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.status === '已点'|| 
              scope.row.status === '请假' ? true : false"
            :type="scope.row.status === '已点'|| 
            scope.row.status === '请假' ? 'info' : 'success'"
            @click="handleClick(scope.$index, scope.row)">{{scope.row.status}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="finish_at"
        label="点名时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="sms_phone"
        label="紧急联系电话">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import lessonService from "@/global/service/lesson"

export default{
  data(){
    return{
      tableData:[],
      userData:[],
    }
  },
  created(){
    this.show();
  },
  methods:{
    show(){
      let id = this.$route.params.id;
      lessonService
      .single(id)
      .then(res =>{
        switch (res.data.lesson.status){
          case null:
            res.data.lesson.status = '待完成'
            break
          case 0:
            res.data.lesson.status = '待完成'
            break
          case 1 :
            res.data.lesson.status = '完成'
            break
        }
        if(res.data.lesson.date== null){
          res.data.lesson.date = '-'
        }
        if(res.data.lesson.start_time== null){
          res.data.lesson.start_time = '-'
        }
        if(res.data.lesson.end_time == null){
          res.data.lesson.end_time = '-'
        }
        res.data.user.forEach(data =>{
          if(data.status===2){
            data.status = '已点'
          }
          if(data.status===null){
            data.status = '点名'
          }
          if(data.status===1){
            data.status = '请假'
          }
        })
        this.userData = res.data.user
        this.tableData.splice(0,1,res.data.lesson)
      })
    },
    handleClick(index,row){
      let params={
        status:2
      }
      let id = row.userLesson_id
      lessonService
        .click(id,params)
        .then( res=>{
          if(res.code === 200){
            this.$message({
            message: res.message,
            type: 'success'
            })
            this.show()
          }else{
            this.$message({
            message: res.message,
            type: 'warning'
            });
          }
        })
    }
  }
}
</script>

<style scoped>
  .lesson{
    box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  }
  .user{
    margin-top: 30px;
    padding: 40px;
    box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  }
</style>