<template>
  <div class="container">
    <div class="container-class">
      <el-table
        :data="tableData"
        border>
        <el-table-column
          label="班级ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.class_id }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
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
          prop="price"
          label="费用">
        </el-table-column>
        <el-table-column
          prop="lesson_count"
          label="学课节数">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="description"
          label="班级描述">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创班日期">
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
    </div>
    <div class="container-sign">
      <h3>选择用户</h3>
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="user"
        :fetch-suggestions="querySearch"
        placeholder="请输入用户名"
        @select="handleSelect">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
          <span class="phone">手机号:&nbsp;{{ item.phone }}</span>
        </template>
      </el-autocomplete>
    </div>
    <div class="container-user">
      <el-table
        :data="userData"
        border>
        <el-table-column
          label="用户ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="用户电话">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="balance"
          label="余额">
        </el-table-column>
      </el-table>
      <el-button type="success" class="btn" @click="sign">
        确认报班
        <i class="el-icon-circle-check el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import classService from "@/global/service/class"
import userService from "@/global/service/user";

export default {
  data(){
    return{
      tableData:[],
      restaurants:[],
      user:'',
      userData:[],
      signId:''
    };
  },
  created(){
    this.show();
    this.all()
  },
  methods:{
    all(){
      userService
      .all()
      .then(res =>{
        this.restaurants = res.data
      })
    },
    show(){
      let id = this.$route.params.id;
      classService
      .single(id)
      .then(res =>{
        res.class.forEach( data =>{
          switch (data.status){
            case 0:
              data.status = '未开始'
              break
            case 1 :
              data.status = '进行中'
              break
            case 2 :
              data.status = '已完成'
              break
          }
          this.tableData = res.class
        })
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.userData.splice(0,1,item)
      this.signId = item.id
    },
    sign(){
      if(this.signId===''){
        this.$message.error('没有选择用户喔');
        return
      }else{
        let id = this.$route.params.id;
        let params ={
          user_id : this.signId
        }
        classService
        .sign(id,params)
        .then(res =>{
          this.$message({
          message: res.message,
          type: 'success'
          })
        this.$router.push({name:'Class'})
        })
      }
    }
  }
}
</script>

<style scoped>
  .container-sign{
    margin:30px 0 30px 0;
  }
  .phone{
    color: #999;
  }
  .container-user{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn{
    margin-top: 20px;
    width: 150px;
  }
</style>