<template>
  <div>
    <el-table v-loading="loading" :data="bloglist" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="nickName" label="发布人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, del } from "@/api/blog";
import scroll from "@/utils/scroll";
export default {
  name: "",
  data() {
    return {
      bloglist: [],
      count: 50,
      delDialogVisible: false,
      info: {},
    };
  },
  created() {
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      this.loading = true;
      fetchList({
        start: this.bloglist.length,
        count: this.count,
      }).then((res) => {
        this.loading = false;
        this.bloglist = this.bloglist.concat(res.data);
        if (res.data.length < this.count) {
          scroll.end();
        }
        this.loading = false;
      });
    },
    onDel(row) {
      this.info.id = row._id;
      this.delDialogVisible = true;
    },
    doDel() {
      this.delDialogVisible = false;
      del({
        id: this.info.id,
      }).then((res) => {
        if (res.data.deleted > 0) {
          this.bloglist = [];
          this.getBlogList();
          this.$message({
            message: "删除成功",
            type: "success",
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
  },
};
</script>
<style scoped>
</style>
