<template>
  <div class="container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="班级详情" name="class">
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
      </el-tab-pane>
      <el-tab-pane label="班级学员" name="user">
        <el-table
          :data="classData"
          height='500'
          border>
          <el-table-column
            prop="id"
            label="用户ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话">
          </el-table-column>
          <el-table-column
            prop="sms_phone"
            label="紧急联系电话">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="报班时间">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="学课列表" name="payment">
        <el-table
          :data="paymentData"
          height='500'
          style="width:90%;margin:50px"
          border>
          <el-table-column
            prop="index"
            label="节数">
          </el-table-column>
          <el-table-column
            label="日期">
            <template slot-scope="scope" class='template'>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
              <el-popover
                placement="right"
                width="220"
                trigger="click"
                class="btn">
                <el-date-picker
                  v-model="valueDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
                <el-button icon="el-icon-edit" slot="reference"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="上课时间">
            <template slot-scope="scope" class='template'>
              <span style="margin-left: 10px">{{ scope.row.start_time }}</span>
              <el-popover
                placement="right"
                width="220"
                trigger="click"
                class="btn">
                <el-time-select
                  v-model="valueFirst"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间">
                </el-time-select>
                <el-button icon="el-icon-edit" slot="reference"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="end_time"
            label="结束时间">
            <template slot-scope="scope" class='template'>
              <span style="margin-left: 10px">{{ scope.row.end_time }}</span>
              <el-popover
                placement="right"
                width="220"
                trigger="click"
                class="btn">
                <el-time-select
                  v-model="valueLast"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }"
                  value-format="yyyy-MM-dd"
                  placeholder="选择时间">
                </el-time-select>
                <el-button icon="el-icon-edit" slot="reference"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope" class='template'>
              <el-tag
                size="medium"
                :type="scope.row.status === '完成' ? 'primary' : 'info'"
                >{{ scope.row.status }}</el-tag>
              <el-popover
                placement="right"
                width="60"
                trigger="click"
                class="btn">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-edit" slot="reference"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="费用">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type='danger'
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import classService from "@/global/service/class"
import lessonService from "@/global/service/lesson"

export default{
  data(){
    return{
      tableData:[],
      classData:[],
      paymentData:[],
      activeName:'class',
      valueDate:null,
      valueFirst:null,
      valueLast:null,
      options: [{
          value: '0',
          label: '待完成'
        },{
          value: '1',
          label: '已完成'
      }],
      value:null
    }
  },
  created(){
    this.show();
  },
  methods:{
    show(){
      this.valueDate = null;
      this.valueFirst = null ;
      this.valueLast = null ;
      this.value = null;
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
        })
        this.tableData= res.class
        this.classData= res.user
        this.paymentData = res.lesson
      })
    },
    handleEdit(index,row){
      if(this.valueDate===null && 
        this.valueFirst===null && 
        this.valueLast===null && 
        this.value===null){
          this.$message({
            showClose: true,
            message: '错了哦，没有修改该行信息',
            type: 'error'
          });
          return
        }
      if(row.date !== '-' && this.valueDate===null){
        this.valueDate = row.date
      }
      if(row.start_time !== '-' && this.valueFirst===null){
        this.valueFirst = row.start_time
      }
      if(row.end_time !== '-' && this.valueLast===null){
        this.valueLast = row.end_time
      }
      if(row.status !== '-' && this.value===null){
        this.value = row.status
        switch (this.value){
          case '待完成':
            this.value = null
            break
          case '完成' :
            this.value = 1
            break
        }
      }
      let params ={
        date: this.valueDate===null ? undefined : this.valueDate,
        start_time: this.valueFirst===null ? undefined : this.valueFirst,
        end_time: this.valueLast===null ? undefined : this.valueLast,
        status: this.value===null ? undefined : this.value,
      }
      let id = row.id
      lessonService
      .update(id,params)
      .then(res=>{
        this.$message({
        message: res.message,
        type: 'success'
        })
      })
      this.show()
    }
  }
}
</script>

<style scoped>
  .container{
    padding: 30px;
    background: #ffffff;
  }
  .template{
    position: relative;
  }
  .btn{
    position: absolute;
    right: 5px;
    top: 5px;
    transform: scale(0.7);
  }
</style>