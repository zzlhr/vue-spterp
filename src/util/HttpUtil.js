import main from '../main.js'

const httpUtil = {
    getVue(){
        return main.vum
    },
    baseurl(name){
        switch (name){
            case 'user':
                return "http://192.168.31.8:8080/";

            default:
                return 'http://192.168.31.8:8080/'
        }

    },

    get(that, apiPath, url, callback){
        this.getVue().$http(this.baseurl(apiPath) + url, 'get').then(response=>{
                console.log("response => "+response)
                if(response.status !== 200){
                    that.$notify.error({
                        title: '失败',
                        message: '错误代码:' + response.status
                            + '服务器未正常处理请求！',
                    });
                    return;
                }else if(response.body.code !== 0){
                    that.$notify.error({
                        title: '失败',
                        message: '错误代码:' + response.body.code
                            + response.body.msg,
                    });
                    return;
                }
                callback(response)
            },response=>{
                that.$notify.error({
                    title: '失败',
                    message: '错误代码:' + response.status
                        + '与服务器建立连接失败！',
                });
                // callback(response)
            })
    },
    post(that, apiPath, url, param, callback){
        this.getVue().$http.post(this.baseurl(apiPath) + url, param, {emulateJSON:true})
            .then(response=>{
                console.log("response.status => "+response.status )
                if(response.status !== 200){
                    that.$notify.error({
                        title: '失败',
                        message: '错误代码:' + response.status
                            + '服务器未正常处理请求！',
                    });
                    return;
                }else if(response.body.code !== 0){
                    that.$notify.error({
                        title: '失败',
                        message: '错误代码:' + response.body.code
                            + response.body.msg,
                    });
                    return;
                }
                callback(response)
            },response=>{
                that.$notify.error({
                    title: '失败',
                    message: '错误代码:' + response.status
                        + '与服务器建立连接失败！',
                });
                // callback(response)
            })
    }


};

export default httpUtil;