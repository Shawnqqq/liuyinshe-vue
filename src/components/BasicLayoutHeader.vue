<template>
  <div class="header-section">
    <v-bread class="header-hd" />
    <div class="header-bd"></div>
    <div class="header-ft">
      <el-dropdown style="height:100%;">
        <div class="bar-info-container">
          <i class="el-icon-user-solid userInof-avatar"></i>
          <span class="userInfo-name">Ytms</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-video-pause">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Bread from "./BasicBreadcrumb"

export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  components:{
    "v-bread" : Bread
  },
  methods: {
    handleCollapse() {
      this.$emit("update:collapse", !this.collapse);
    }
  }
}
</script>

<style lang="less" scoped>
  .header-section{
    border-left: 1px solid rgb(223, 222, 222);
    position: relative;
    padding: 0 20px;
    background-color: #ffffff;
    height: 64px;
    box-shadow: 2px 2px 2px rgba(29, 35, 41, 0.1);
    z-index: 10;
    display: flex;
    .header-bd{
      flex: 1;
    }
    .header-bd,.header-hd,.header-ft{
      display: flex;
      align-items: center;
    }
    .bar-info-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 10px;
      transition: all 0.2s ease;
      cursor: pointer;
      &:hover {
        background-color: #ecf5ff;
      }
      .userInfo-name {
        font-size: 14px;
        vertical-align: middle;
      }
      .userInfo-avatar {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #ccc;
        border-radius: 50%;
        outline: none;
        margin: 0 10px;
      }
    }
  }
</style>