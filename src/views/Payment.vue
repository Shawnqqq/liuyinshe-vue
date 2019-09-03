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
        data.name.toLowerCase().includes(search.toLowerCase())
        )"
      :row-class-name="tableRowClassName">
      <el-table-column
        label="日期"
        width="220"
        >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户ID"
        width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户姓名"
        width="150">
      </el-table-column>
      <el-table-column
        label="方式"
        width="150"
        :filters="[{ text: '消费', value: '消费' }, { text: '充值', value: '充值' },{ text: '赠送', value: '赠送' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end">
        <template slot-scope="scope">
            <el-tag 
              size="medium"
              :type="scope.row.status === '消费' ? 'primary' : 'success'"
              disable-transitions>
              {{ scope.row.status }}
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="total"
        label="金额"
        width="150">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
      >
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            :key="scope.row"
            placeholder="输入用户名搜索"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import paymentService from "@/global/service/payment";

export default {
  data(){
    return{
      tableData:[],
      pagination:{
        total:0,
        nowPage:1,
        pageSize:20
      },
      search:'',
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
      },
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
        srart_at: date===null ? null : date[0],
        end_at: date===null ? null : date[1]
      }
      paymentService
      .list(params)
      .then(res =>{
        res.data.datas.forEach(data => {
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
        });
        this.tableData = res.data.datas;
        this.pagination.pageSize = Number(res.data.pagination.page_size);
        this.pagination.nowPage = Number(res.data.pagination.now_page);
        this.pagination.total = Number(res.data.pagination.total);
      })
    },
    tableRowClassName({row}) {
      if (row.status === '充值' || row.status === '赠送') {
        return 'income';
      } else if (row.status === '消费') {
        return 'pay';
      }
      return '';
    },
    filterTag(value, row) {
        return row.status === value;
    }
  },
}
</script>

<style>
  .container{
    background-color: #ffffff;
    padding:20px
  }
  .container-hd{
    display: flex;
  }
  .block{
    margin: 20px 0 0 100px ;
  }
  .el-table .income {
    background: rgba(172, 255, 47, 0.02);
  }

  .el-table .pay {
    background: rgba(255, 0, 0, 0.02);
  }
</style>