<template>
  <div class="container">
    <div class="container-hd">
      <el-pagination
        layout="prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync='pagination.nowPage'
        @current-change='getData'
        style="padding:20px">
      </el-pagination>
    </div>
    <el-table
      :data="tableData.filter(data => !search || 
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.phone.toLowerCase().includes(search.toLowerCase())
        )"
      style="width: 100%">
      <el-table-column
        label="用户ID"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="180">
      </el-table-column>
      <el-table-column
        label="性别"
        width="120">
        <template slot-scope="scope">
          <el-tag 
            size="medium"
            :type="scope.row.sex === '男' ? 'primary' : 'success'">
            {{ scope.row.sex }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="birthday"
        label="生日"
        width="180"
        >
      </el-table-column>
      <el-table-column
        label="账户余额"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left:10px">{{ scope.row.balance }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
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
        </template>
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            :key="scope.row"
            placeholder="输入名字手机号搜索"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import userService from "@/global/service/user";

export default {
  data(){
    return{
      tableData:[],
      pagination:{
        total:0,
        nowPage:1,
        pageSize:20
      },
      search:''
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      let params = {
        now_page : this.pagination.nowPage,
        page_size : this.pagination.pageSize,
      }
      userService
      .list(params)
      .then(res =>{
        res.data.datas.forEach(data => {
          switch (data.sex){
            case 1:
              data.sex = '男'
              break
            case 2:
              data.sex = '女'
              break
          }
        });
        this.tableData = res.data.datas;
        this.pagination.pageSize = Number(res.data.pagination.page_size);
        this.pagination.nowPage = Number(res.data.pagination.now_page);
        this.pagination.total = Number(res.data.pagination.total);
      })
    },
    handleSingle(index,row){
      let id = row.id
      this.$router.push({name:'UserSingle',params:{id}})
    },
    handleEdit(index,row){
      let id = row.id
      this.$router.push({name:'UserEdit',params:{id}})
    },
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
</style>