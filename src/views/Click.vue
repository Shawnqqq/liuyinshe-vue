<template>
  <div class="container">
    <div class="container-click">
      <h3>选择你的班级</h3>
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="className"
        :fetch-suggestions="querySearch"
        placeholder="请输入班级名称"
        @select="handleSelect">
        <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
          <span class="course">班级描述:&nbsp;{{ item.description }}</span>
        </template>
      </el-autocomplete>
    </div>
    <div class="container-class">
      <el-table
        :data="classData"
        border>
        <el-table-column
          label="班级ID">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="班级名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="班级描述">
        </el-table-column>
        <el-table-column
          prop="lesson_count"
          label="班级课时">
        </el-table-column>
        <el-table-column
          prop="status"
          label="班级状态">
        </el-table-column>
      </el-table>
      <el-button type="success" class="btn" @click="sign">
        查看班级
        <i class="el-icon-circle-check el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import classService from "@/global/service/class"

export default {
  data(){
    return{
      restaurants:[],
      className:'',
      classData:[],
      signId:''
    }
  },
  created(){
    this.all()
  },
  methods:{
    all(){
      classService.all().then(res =>{
        this.restaurants = res.data
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
    handleSelect(item){
      switch (item.status){
        case 0 :
          item.status = '未开始'
          break
        case 1 :
          item.status = '进行中'
          break
        case 2 :
          item.status = '已结束'
          break
      }
      this.classData.splice(0,1,item)
      this.signId = item.id
    },
    sign(){
      if(this.signId===''){
        this.$message.error('没有选择班级喔');
        return
      }
      let id = this.signId
      this.$router.push({name:'ClickSingle',params:{id}})
    }
  }
}
</script>

<style scoped>
  .container-click{
    margin: 20px;
  }
  .course{
    color: #999;
  }
  .container-class{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn{
    margin-top: 20px;
    width: 150px;
  }
</style>