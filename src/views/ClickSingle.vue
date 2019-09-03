<template>
  <div class="container">
    <el-table
      :data="tableData"
      class="class"
      border>
      <el-table-column
        prop="class_name"
        label="班级名称">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label='所属课程'>
      </el-table-column>
      <el-table-column
        prop="lesson_count"
        label="学课节数">
      </el-table-column>
      <el-table-column
        prop="start_at"
        label="开始日期">
      </el-table-column>
      <el-table-column
        prop="end_at"
        label="结束日期">
      </el-table-column>
    </el-table>
    <el-table
      :data="lessonData"
      height='700'
      border
      class="lesson"
      >
      <el-table-column
        label="节数">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.index }}</span>
        </template>
      </el-table-column>
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
        label="开始时间">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope" class='template'>
          <el-tag
            size="medium"
            :type="scope.row.status === '完成' ? 'primary' : 'info'"
            >{{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleClick(scope.$index, scope.row)">去点名</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import classService from "@/global/service/class"

export default {
  data(){
    return{
      tableData:[],
      lessonData:[]
    }
  },
  created(){
    this.show();
  },
  methods:{
    show(){
      let id = this.$route.params.id;
      classService
      .single(id)
      .then(res =>{
        let length = res.lesson.length;
        for(let i=0;i<length;i++){
          res.lesson[i].index = i+1
        }
        res.lesson.forEach( data =>{
          switch (data.status){
            case null:
              data.status = '待完成'
              break
            case 0:
              data.status = '待完成'
              break
            case 1 :
              data.status = '完成'
              break
          }
          if(data.date== null){
            data.date = '-'
          }
          if(data.start_time== null){
            data.start_time = '-'
          }
          if(data.end_time == null){
            data.end_time = '-'
          }
        })
        this.lessonData =res.lesson
        this.tableData = res.class
      })
    },
    handleClick(index,row){
      let id = row.id
      this.$router.push({name:'ClickUser',params:{id}})
    }
  }
}
</script>

<style scoped>
  .class{
    box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  }
  .lesson{
    margin-top: 30px;
    box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.349);
  }
</style>