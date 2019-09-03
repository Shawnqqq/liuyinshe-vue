<template>
  <div class="container">
    <div class="container-hd">
      <el-pagination
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync='pagination.nowPage'
        @current-change='getData()'
        style="padding:20px 0">
      </el-pagination>
      <div class="block">
        <el-date-picker
          v-model="value1"
          type="daterange"
          align="center"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change='getData'
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </div>
    <el-table
      :data="tableData.filter(data => !search || 
        data.class_name.toLowerCase().includes(search.toLowerCase()) ||
        data.status.toLowerCase().includes(search.toLowerCase())
        )"
      style="width: 100%">
      <el-table-column
        label="班级ID"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="class_name"
        label="班级名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="course_name"
        label="所属课程"
        width="150">
      </el-table-column>
      <el-table-column
        label="状态"
        width="120">
        <template slot-scope="scope">
          <el-tag 
            size="medium"
            :type="scope.row.status === '进行中' ? 'primary' : 'info'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="开始日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.start_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束日期"
        width="150">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.end_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleSingle(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleUser(scope.$index, scope.row)">报班</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
       >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            :key="scope.row"
            placeholder="输入班级名称或状态"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import classService from "@/global/service/class"

export default{
  data(){
    return{
      tableData:[],
      search:'',
      pagination:{
        total:0,
        nowPage:1,
        pageSize:10,
      },
      value1:'',
      pickerOptions:{
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let dates = this.value1;
      let date = dates==='' ? date = null : date = dates
      let params = {
        now_page : this.pagination.nowPage,
        page_size : this.pagination.pageSize,
        start_at : date === null ? null : date[0],
        end_at : date === null ? null : date[1]
      }
      classService
      .list(params)
      .then(res =>{
        res.data.datas.forEach(data => {
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
        this.tableData = res.data.datas;
        this.pagination.pageSize = Number(res.data.pagination.page_size);
        this.pagination.nowPage = Number(res.data.pagination.now_page);
        this.pagination.total = Number(res.data.pagination.total);
      })
    },
    handleSingle(index,row){
      let id = row.id
      this.$router.push({name:'ClassSingle',params:{id}})
    },
    handleEdit(index,row){
      let id = row.id
      this.$router.push({name:'ClassEdit',params:{id}})
    },
    handleUser(index,row){
      let id= row.id
      this.$router.push({name:'ClassUserSign',params:{id}})
    }
  }
}
</script>

<style scoped>
  .container{
    background-color: #ffffff;
    padding:20px
  }
  .block{
    margin: 15px 0 0 100px ;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    color: #999;
    line-height: 25px;
  }
  .container-hd{
    display: flex;
  }
  .content-title{
    margin: 50px 0px 5px 20px;
    color: #888;
    font-size: 20px
  }
</style>