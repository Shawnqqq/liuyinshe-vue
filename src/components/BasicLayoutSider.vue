<template>
  <div class="sider-section">
    <div class="sider-title">留音社</div>
    <Menu />
  </div>
</template>

<script>
import Menu from "./BasicLayoutSiderMenu"

export default{
  data(){
    return{};
  },
  components:{
    Menu
  }
};

</script>

<style lang="less" scoped>
  .sider-section{
    position: relative;
    background-color: #ffffff;
    width: 240px;
    box-shadow: 2px 0 2px 0 rgba(29, 35, 41, 0.1);
    transform: all 0.2s ease;
    .sider-title{
      height: 64px;
      font-family: cursive;
      font-size: 50px;
      color: rgb(105, 97, 97);
      line-height: 64px;
      text-align: center;
      box-shadow: 0 0 2px rgba(90, 88, 88, 0.212);
      text-shadow: 0 0 6px rgba(51, 50, 50, 0.116);
      margin-bottom: 20px;
    }
  }

</style>