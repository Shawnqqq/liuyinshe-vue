<template>
  <el-container class="page-wrapper">
    <sider class="page-sider" />
    <el-main class="page-mainer">
      <el-header style="padding:0px">
        <Header class="page-header" />
      </el-header>
      <div class="page-body">
        <router-view></router-view>
      </div>
      <Footer class="page-footer" />
    </el-main>
  </el-container>
</template>

<script>
import Header from "./BasicLayoutHeader";
import Footer from "./BasicLayoutFootert";
import Sider from "./BasicLayoutSider";

export default{
  data(){
    return{
      collapse: false
    };
  },
  components:{
    Header,
    Footer,
    Sider
  }
};
</script>

<style lang='less'>
.page-wrapper{
  height:100vh;
  display: flex;
  box-sizing: border-box;
  .page-header {
    background-color: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    height: 64px;
  }
  .page-sider{
    position: relative;
    background-color: #fff;
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  }
  .page-mainer{
    display: flex;
    flex-direction: column;
    background-color: #faf8f8;
    width: 100%;
    padding:0px;
    .page-header{
      height: 64px !important;
    }
    .page-body{
      flex: 1;
      padding: 20px;
      // width: 100%;
      box-sizing: border-box;
    }
  }
}
</style>