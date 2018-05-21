<template>

  <el-card class="box-card" shadow="never">

    <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button style="float: right; padding: 6px 0" type="text" @click="loadData">刷新</el-button>
        <el-button style="float: right; padding: 6px 0" type="text" @click="jumpAdd">添加用户</el-button>
        <el-form :inline="true" :model="param" class="demo-form-inline">
        <el-form-item label="用户名">
            <el-input v-model="param.userName" placeholder="可模糊关键字"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号">
            <el-input v-model="param.userPhone" placeholder="可模糊关键字"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="param.status" value="启用" placeholder="请选择状态">
                <el-option label="启用" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
    </div>
    <el-table
        :data="tableData"
        v-loading="loading"
        border
        style="width: 100%"
        stripe
        max-height="500">
        <el-table-column
                fixed
                prop="userId"
                label="#"
                width="150">
        </el-table-column>
        <el-table-column
        fixed
        prop="userName"
        label="用户名"
        width="150">
        </el-table-column>
        <el-table-column
        prop="userPhone"
        label="手机号"
        width="120">
        </el-table-column>
        <el-table-column
        prop="userEnterpriseName"
        label="所属企业"
        width="300">
        </el-table-column>
        <el-table-column
        prop="createTime"
        label="创建时间"
        width="200">
        </el-table-column>
        <el-table-column
                prop="createUserName"
                label="创建人"
                width="120">
        </el-table-column>

        <el-table-column
        prop="updateTime"
        label="更新时间"
        width="200">
        </el-table-column>
        <el-table-column
                prop="updateUserName"
                label="更新人"
                width="120">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small">查看</el-button>
            <el-button  size="small" @click="jumpEdit(scope.row)">编辑</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="totalPages"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="param.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalElements">
    </el-pagination>
  </el-card>
</template>

<script>
import httpUtil from '../../util/HttpUtil.js';
export default {
    name: "UserList",
    data() {
        return {
            error:{
                msg:'暂无消息',
                type:'info',
                show:'true'
            },
            param:{
                page: 1,
                pageSize: 10,
                userName: '',
                userPhone: '',
                status: 0,
            },
            formInline: {
                user: '',
                region: ''
            },
            totalPages: 1,
            loading: true,
            totalElements: 0,
            tableData: []
        }
    },
    methods: {
        onSubmit() {
            this.loadData();
        },
        handleClick(row) {
            // this.$cookie.set('userInfo', row.userId);
            // this.$router.push('/user/info');
            // this.$router.push('/user/info');
            this.$emit('eleven', '/user/info/' + row.userId);
            console.log(row);
            console.log(this.$cookie.get('userInfo'));

        },
        handleSizeChange(val) {
            this.$set(this.$data.param, 'pageSize', val);
            this.$set(this.$data.param, 'page', 1);
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.$set(this.$data.param, 'page', val);
            this.loadData();
            console.log(`当前页: ${val}`);
        },
        alertClose(e){
          console.log(e);
        },
        loadData(){
            const that = this;
            this.$set(this.$data, 'loading', true);
            httpUtil.post(this, 'user', "userList", this.$data.param, function (resp) {
                // console.log(resp)
                const data = resp.body.data;
                that.$set(that.$data, "tableData", data.content);
                that.$set(that.$data, 'totalPages', data.totalPages);
                that.$set(that.$data, 'totalElements', data.totalElements);
                console.log(data);
                that.$set(that.$data, 'loading', false);
            })
        },
        jumpEdit(row){
            this.$emit('eleven', '/user/edit/' + row.userId);
        },
        jumpAdd(row){
            this.$emit('eleven', '/user/edit/');
        }
    },
    mounted(){
        // load data
        this.loadData();

    },

  }
</script>

<style>
.el-pagination{
    margin-top: 1rem;
}
.clearfix>span{
    text-align: left !important;
}
.el-form-item{
    margin-bottom: 0;
    margin-top: 1rem;
}
.box-card{
    height: 100%;
}
</style>
