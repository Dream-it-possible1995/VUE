<template>
  <div class="layout">
    <Layout>
      <el-row>
        <el-col><div class="header bg-purple-light">定额库检索</div></el-col>
      </el-row>
      <el-row :gutter="5">

        <el-col :span="7">
          <div class="left bg-purple">
            <el-row>
              <div class="select bg-purple">
                <el-select v-model="normDBs.id" @change="getSections(normDBs.id)" style="margin: 1px; width: 100%;" placeholder="请选择定额库">
                  <el-option
                    v-for="item in normDBs"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-row>
            <el-row>
               <div class="section bg-purple" style="height: 680px">
                 <el-tree :data="sections"
                          :props="defaultProps"
                          node-key="id"
                          ref="tree"
                          highlight-current
                          @node-click="getTreeNodeId">
                 </el-tree>
               </div>
            </el-row>
          </div>
        </el-col>

        <el-col :span="17">
          <div class="right bg-purple">
            <el-table
              :data="normItems.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              stripe
              @row-click="rowHandle"
              height="700"
              border
              style="width: 100%">
              <el-table-column prop="id" label="id" width="40"></el-table-column>
              <el-table-column prop="code" label="编码" width="80"></el-table-column>
              <el-table-column prop="name" label="名称" width="280"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="priceNotTax" label="不含税单价"></el-table-column>
              <el-table-column prop="priceLabor" label="人工单价"></el-table-column>
              <el-table-column prop="pntmaterial" label="不含税材料单价"></el-table-column>
              <el-table-column prop="pntmachine" label="不含税机械单价"></el-table-column>
            </el-table>

            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="normItems.length">
            </el-pagination>
          </div>
        </el-col>

      </el-row>
      <el-row>
        <el-col><div class="footer bg-purple-light">&copy; Author：Glodon</div></el-col>
      </el-row>
    </Layout>
  </div>
</template>

<script>
    export default {
      name: "NCS",
      data() {
        return {
          normDBs: [],
          sections: [],
          total: 0,
          currentPage: 1,
          pageSize: 10,
          normItems: [],
          defaultProps: {
            children: 'childList',
            label: 'name'
          }
        }
      },
      methods:{
        getNormDBs:function() {
          this.$axios.get('/api/v1/normDBs')
            .then(res => {
              console.log(res.data)
              this.normDBs = res.data
            })
        },
        getSections:function(normdbId) {
          this.$axios.get('/api/v1/sections?normdbId='+normdbId)
            .then(res => {
              console.log(res.data)
              this.sections = res.data
            })
        },
        getTreeNodeId: function () {
          var sectionId = this.$refs.tree.getCurrentKey();
          this.getNormItems(sectionId);
          console.log(sectionId);
        },
        getNormItems:function(sectionId) {
          this.$axios.get('/api/v1/normitems?sectionId='+sectionId)
            .then(res => {
              console.log(res.data)
              this.normItems = res.data
              this.total = res.data.length
            })
        },
        handleSizeChange: function(pageSize) { //每页条数切换
          this.pageSize = pageSize
          this.handleCurrentChange(this.currentPage);
        },
        handleCurrentChange: function(currentPage) {//页码切换
          this.currentPage = currentPage
        },
        rowHandle:function(row, event, column) {
          console.log(row, event, column)
        },

      },
      mounted() {
        this.getNormDBs();
      }

    }
</script>

<style scoped>
  .layout {
    border-style: double;
  }
  .bg-purple {
    background: rgba(147, 188, 255, 0);
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .header {
    border-radius: 0px;
    min-height: 20px;
    padding: 1px;
  }
  .select {
    border-radius: 0px;
    min-height: 28px;
    border-style: double;
  }
  .section {
    border-radius: 0px;
    min-height: 100%;
    padding: 1px;
  }
  .left {
    border-radius: 4px;
    min-height: 700px;
    border-style: double;
  }
  .right {
    border-radius: 4px;
    min-height: 700px;
    border-style: double;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
