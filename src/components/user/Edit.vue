<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>{{title}}</span>
            <!--<el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>-->
        </div>

        <el-form ref="form" :model="user" label-width="80px" >
            <el-form-item label="用户名">
                <el-input v-model="user.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="user.userPassword" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="user.confirmPassword" type="password" placeholder="请输入确认密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="user.userPhone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="所属企业">
                <el-select v-model="user.enterpriseId" placeholder="请选择企业">
                    <el-option v-for="enterprise in enterpriseList" :label="enterprise.name" :value="enterprise.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="user.userStatus" placeholder="请选择状态">
                    <el-option label="启用" value="0"></el-option>
                    <el-option label="禁用" value="1"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="float: right; margin-bottom: 20px;">
                <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
        </el-form>


    </el-card>
</template>

<script>
    import httpUtil from "~/util/HttpUtil";

    export default {
        name: "UserEdit",
        data(){
            return{
                loading:true,
                title: '',
                param:{
                    id:0,
                },
                user: {
                    userId: '',
                    userName:'',
                    userPassword:'',
                    confirmPassword:'',
                    userPhone:'',
                    userEnterprise:{
                        enterpriseId: ''
                    },
                    enterpriseId:'',
                    userStatus: '',
                },
                enterpriseList:[],
            }
        },
        mounted(){
            // console.log();
            this.$set(this.$data.user, 'userId', this.$route.params.userId);

            if (this.$route.params.userId === undefined){
                this.$set(this.$data, 'title', '添加用户');
                this.loadEnterprise();
            } else{
                this.$set(this.$data, 'title', '编辑用户');
                this.$set(this.$data.param, 'id', this.$route.params.userId);
                this.loadData();
            }

        },
        methods:{
            loadData(){
                const that = this;
                this.$set(this.$data, 'loading', true);
                httpUtil.post(this, 'user', "user", this.$data.param, function (resp) {
                    console.log(resp);
                    const data = resp.body.data;
                    that.$set(that.$data, "user", data);
                    that.$set(that.$data.user, "confirmPassword", data.userPassword);
                    that.$set(that.$data, 'loading', false);
                    that.$set(that.$data, "enterpriseId", data.userEnterprise.enterpriseId);

                });
                this.loadEnterprise();

            },
            loadEnterprise(){
                const that = this;
                httpUtil.post(this, 'enterpriseList', "enterpriseList",
                    this.$data.param, function (resp) {
                    const data = resp.body.data;
                    that.$set(that.$data, "enterpriseList", data);
                    // that.$set(that.$data, 'loading', false);

                })
            },
            onSubmit(){
                const that = this;
                if (this.$data.user.userId === undefined){
                    this.$set(this.$data.user, 'userId', null)
                }
                httpUtil.post(this, 'user', "regist", this.$data.user, function (resp) {
                    that.$notify({
                        title: '成功',
                        message: '编辑用户成功',
                        type: 'success'
                    });
                    console.log(resp);
                    const data = resp.body.data;
                    that.$set(that.$data, "user", data);
                    that.$set(that.$data, 'loading', false);

                })
            }

        }
    }
</script>

<style scoped>
.spterp_info_item{
    margin: 20px;
}
</style>