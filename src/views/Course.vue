<template>
  <div class="container">
    <div class="container-hd">
      <el-pagination
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync='pagination.nowPage'
        @current-change='getData'
        style="padding:20px;flex:1">
      </el-pagination>
      <div class="input">
        <el-input v-model="input" 
          placeholder="请输入课程名"
          @change='getData'>
        </el-input>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      fit>
      <el-table-column
        prop="name"
        label="课程名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="课程描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacher"
        label="授课老师"
        width="180">
      </el-table-column>
      <el-table-column
        prop="teacher_phone"
        label="授课老师电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSingle(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type='info'
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import courseService from "@/global/service/course";

export default {
  data(){
    return{
      tableData:[],
      pagination:{
        total:0,
        nowPage:1,
        pageSize:10
      },
      input:'',
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let parama= {
        now_page : this.pagination.nowPage,
        page_size : this.pagination.pageSize,
        name: this.input === '' ? this.input = null : this.input
      }
      courseService
      .list(parama)
      .then(res =>{
        this.tableData = res.data.datas;
        this.pagination.pageSize = Number(res.data.pagination.page_size);
        this.pagination.nowPage = Number(res.data.pagination.now_page);
        this.pagination.total = Number(res.data.pagination.total);
      })
    },
    handleSingle(index,row){
      let id = row.id
      this.$router.push({name:'CourseSingle',params:{id}})
    },
    handleEdit(index,row){
      let id = row.id
      this.$router.push({name:'CourseEdit',params:{id}})
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let id=row.id
          courseService.delete(id).then(res =>{
            console.log(res)
            this.$message({
            type: 'success',
            message: res.message
          });
          }).catch(err => {
            console.log(err)
          })
          this.tableData.splice(index,1)
      }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      })
    }
  }
}
</script>

<style scoped>
  .container{
    background-color: #ffffff;
    padding:20px
  }
  .container-hd{
    display: flex;
  }
  .input{
    margin: 15px 30px 0 0;
  }
</style>