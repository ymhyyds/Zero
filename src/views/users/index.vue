<template>
  <div class="page-container">
    <el-card>
      <div class="toolbar">
        <el-input v-model="query.keyword" clearable placeholder="搜索姓名/邮箱" style="width: 240px" @keyup.enter.native="fetchList" />
        <el-button type="primary" icon="el-icon-plus" @click="openDialog()">新增用户</el-button>
      </div>
      <el-table v-loading="loading" :data="list" border>
        <el-table-column prop="id" label="ID" width="90" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" width="120" />
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope"><el-tag :type="scope.row.status === '启用' ? 'success' : 'info'">{{ scope.row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="openDialog(scope.row)">编辑</el-button>
            <el-button type="text" class="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="total, sizes, prev, pager, next" :current-page.sync="query.page" :page-size.sync="query.pageSize" :total="total" @size-change="fetchList" @current-change="fetchList" />
    </el-card>

    <el-dialog :title="form.id ? '编辑用户' : '新增用户'" :visible.sync="dialogVisible" width="520px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name"><el-input v-model="form.name" /></el-form-item>
        <el-form-item label="邮箱" prop="email"><el-input v-model="form.email" /></el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" style="width: 100%"><el-option label="管理员" value="admin" /><el-option label="编辑" value="editor" /></el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status"><el-radio-group v-model="form.status"><el-radio label="启用" /><el-radio label="禁用" /></el-radio-group></el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchUsers, createUser, updateUser, deleteUser } from '@/api/user'

const defaultForm = () => ({ id: '', name: '', email: '', role: 'editor', status: '启用' })

export default {
  name: 'Users',
  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      query: { page: 1, pageSize: 10, keyword: '' },
      dialogVisible: false,
      form: defaultForm(),
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    }
  },
  created() { this.fetchList() },
  methods: {
    async fetchList() {
      this.loading = true
      try {
        const data = await fetchUsers(this.query)
        this.list = data.list
        this.total = data.total
      } finally {
        this.loading = false
      }
    },
    openDialog(row) {
      this.form = row ? { ...row } : defaultForm()
      this.dialogVisible = true
      this.$nextTick(() => this.$refs.form && this.$refs.form.clearValidate())
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        if (this.form.id) await updateUser(this.form.id, this.form)
        else await createUser(this.form)
        this.$message.success('保存成功')
        this.dialogVisible = false
        this.fetchList()
      })
    },
    async handleDelete(row) {
      await this.$confirm(`确定删除用户「${row.name}」吗？`, '提示', { type: 'warning' })
      await deleteUser(row.id)
      this.$message.success('删除成功')
      this.fetchList()
    }
  }
}
</script>

<style scoped>
.pagination { margin-top: 16px; text-align: right; }
.danger { color: #f56c6c; }
</style>
