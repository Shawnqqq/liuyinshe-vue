<template>
  <div class='container'>
    <el-table
      :data="tableData"
      class="leave">
      <el-table-column
        prop="user_name"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="请假班级">
      </el-table-column>
      <el-table-column
        prop="date"
        label="请假课程日期">
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
        prop="end_time"
        label="结束时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-button
            size="mini"
            :disabled="scope.row.status === '已补课' ? true : false"
            :type="scope.row.status === '已补课' ? 'info' : 'success'"
            @click="handleClick(scope.$index, scope.row)">{{scope.row.status}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import leaveService from "@/global/service/leave"

export default {
  data(){
    return{
      tableData:[]
    }
  },
  created(){
    this.show()
  },
  methods:{
    show(){
      leaveService
      .index()
      .then(res =>{
        res.data.forEach( data =>{
          switch (data.status){
            case null:
              data.status = '未补课'
              break
            case '1' :
              data.status = '已补课'
              break
          }
        })
        this.tableData = res.data
      })
    },
    handleClick(index,row){
      let id = row.id
      let params={
        status:1,
        user_id:row.user_id,
        lesson_id:row.lesson_id
      }
      leaveService
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
  .leave{
    box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  }
</style>