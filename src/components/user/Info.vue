<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户详情</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="jumpEdit">编辑</el-button>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">用户名:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.userName}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">手机号:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.userPhone}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">所属企业:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.userEnterpriseName}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">状态:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.status}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">创建人:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.createUserName}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">创建时间:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.createTime}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">更新人:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.updateUserName}}</span>
        </div>
        <div class="spterp_info_item">
            <label class="spterp_info_label">更新时间:&nbsp;&nbsp;</label>
            <span class="spterp_info_value">{{user.updateTime}}</span>
        </div>
    </el-card>
</template>

<script>
    import httpUtil from "~/util/HttpUtil";

    export default {
        name: "UserInfo",
        data(){
            return{
                param:{
                    id:0,
                },
                user: {

                },
                loading:true
            }
        },
        mounted(){
            // console.log();
            this.loadData()
        },
        methods:{
            loadData(){
                const that = this;
                this.$set(this.$data, 'loading', true);
                httpUtil.post(this, 'user', "userInfo", {id:this.$route.params.userId}, function (resp) {
                    console.log(resp);
                    const data = resp.body.data;
                    that.$set(that.$data, "user", data);
                    that.$set(that.$data, 'loading', false);

                })
            },
            jumpEdit(){
                this.$emit('eleven', '/user/edit/' + this.$route.params.userId);
            }
        }
    }
</script>

<style scoped>
.spterp_info_item{
    margin: 20px;
}
</style>