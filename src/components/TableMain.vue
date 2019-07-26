<template>
  <div class="layout">
    <Layout>
      <Header>
          <div class="layout-title"><h1 style="margin-bottom:0;">定额库查询</h1></div>
      </Header>
      <div id="container" style="width:100%">
      <div class="layout-menu">
        <div class="dropdown">
          <button class="dropbtn">选择定额库</button>
          <div class="dropdown-content">
            <a href="#">11111</a>
            <a href="#">22222</a>
            <a href="#">33333</a>
          </div>
        </div>
        <div>是</div>
      </div>

      <div class="layout-table">
          <v-table
            is-horizontal-resize
            style="width:100%"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff">
          </v-table>
      </div>

      <Footer class="layout-footer-center"> &copy; 作者：Glodon</Footer>
      </div>
    </Layout>
  </div>
</template>

<script>
  export default {
   // name: "table-main",
    data() {
      return {
        tableData: [],
        columns: [
  //         {field: 'id', title: 'ID', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
 //          {field: 'name', title: '名称', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true}
         {field: 'code', title: '编码', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
         {field: 'name', title: '名称', width: 250, titleAlign: 'center', columnAlign: 'left',isResize:true},
         {field: 'unit', title: '单位', width: 80, titleAlign: 'center', columnAlign: 'center',isResize:true},
         {field: 'priceNotTax', title: '不含税单价', width: 70, titleAlign: 'center', columnAlign: 'center',isResize:true},
         {field: 'priceLabor', title: '人工单价', width: 70, titleAlign: 'center', columnAlign: 'center',isResize:true},
         {field: 'pntmaterial', title: '不含税材料单价', width: 70, titleAlign: 'center', columnAlign: 'center',isResize:true},
         {field: 'pntmachine', title: '不含税机械单价', width: 70, titleAlign: 'center', columnAlign: 'center',isResize:true}
        ]
      };
    },
    created() {
        this.$axios.get('/api/v1/normitems?sectionId=2')
          .then(res => {
            console.log(res.data)
            this.tableData = res.data
          }).catch(function (error) {
          console.log(error)
        })
    }
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-title{
    width: 100%;
    height: 100%;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 0px;
    left: 20px;
    font-weight: bold;
    text-align: center;
    color: #43a25e;
  }
  .layout-menu{
    background-color:#EEEEEE;
    overflow:scroll;
    height: 600px;
    width: 30%;
    float:left;
  }
  .layout-footer-center{
    text-align: center;
  }
  .layout-table{
    background-color:#EEEEEE;
    overflow:scroll;
    height: 600px;
    width: 70%;
    float:left;
  }

  .dropbtn {
    padding: 8px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  /* 容器 <div> - 需要定位下拉内容 */
  .dropdown {
    position: relative;
    display: inline-block;
  }

  /* 下拉内容 (默认隐藏) */
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 96px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  }

  /* 下拉菜单的链接 */
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  /* 鼠标移上去后修改下拉菜单链接颜色 */
  .dropdown-content a:hover {background-color: #f1f1f1}

  /* 在鼠标移上去后显示下拉菜单 */
  .dropdown:hover .dropdown-content {
    display: block;
  }

  /* 当下拉内容显示后修改下拉按钮的背景颜色 */
  .dropdown:hover .dropbtn {
    background-color: #279ca2;
  }
</style>
