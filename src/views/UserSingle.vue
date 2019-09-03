<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户详情" name="user">
        <el-table
          :data="tableData"
          border>
          <el-table-column
            label="用户ID">
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
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label='手机号'>
          </el-table-column>
          <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="birthday"
            label="出生年月">
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账户余额">
          </el-table-column>
        </el-table>
        <el-table
          :data="tableData"
          border>
          <el-table-column
            prop="sms_name"
            label="紧急联系人">
          </el-table-column>
          <el-table-column
            prop="sms_phone"
            label="紧急联系人电话">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="创建日期">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="报班详情" name="class">
        <el-table
          :data="classData"
          border>
          <el-table-column
            prop="class_id"
            label="班级ID">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="报班日期">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="消费详情" name="payment">
        <el-table
          :data="paymentData"
          height='500'
          style="width:90%;margin:50px"
          border>
          <el-table-column
            prop="status"
            label="消费方式">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                :type="scope.row.status === '消费' ? 'primary' : 'success'"
                >{{ scope.row.status }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="消费金额">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="发生时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userService from "@/global/service/user";

export default {
  data(){
    return{
      tableData:[],
      classData:[],
      paymentData:[],
      activeName:'user',
    }
  },
  created(){
    this.show();
  },
  methods:{
    show(){
      let id = this.$route.params.id;
      userService
      .single(id)
      .then(res =>{
        switch (res.data.sex){
          case 1:
            res.data.sex = '男'
            break
          case 2:
            res.data.sex = '女'
            break
        }
        res.paymeny.forEach( data =>{
          switch (data.status){
          case 1:
            data.status = '充值'
            break
          case 2:
            data.status = '消费'
            break
          case 3:
            data.status = '赠送'
            break
          }
        })
        this.tableData.push(res.data);
        this.classData=res.user_class;
        this.paymentData=res.paymeny;
      })
    },
  }
}
</script>

<style scoped>
  .container{
    padding: 30px;
    background: #ffffff;
  }
  .el-menu-demo{
    display: flex;
  }
</style>