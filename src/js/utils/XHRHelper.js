var XHRHelper = function(){}

XHRHelper.prototype.post = function(options){
        options.data = options.data || {};
        options.success = options.success || function(){};
        options.error = options.error || function(){};
        options.progress = options.progress || function(){};
        options.type = options.type || "post";
        
        var postData = new FormData();
        for(var key in options.data){
            postData.append(key,options.data[key]);
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                if(xhr.status == 200 || xhr.status == 304){
                    var responseText = xhr.responseText;
                    var res = JSON.parse(responseText);
                    if(res.status=="success"){
                        options.success({
                            status: res.status,
                            msg: res.msg,
                            data: res.data
                        })
                    }
                    else{
                        options.success({
                            status: res.status,
                            msg: res.msg,
                            data: res.data
                        })
                    }
                }else{
                    // 服务器错误或者无法找到资源
                    options.error({
                        status: "error",
                        msg: "服务器错误或者无法找到资源",
                        data: xhr.status
                    })
                }
            }
        };
        xhr.onprogress = function(e){
             options.progress({
                 total: e.total,
                 loaded: e.loaded,
                 percent: e.loaded / e.total
             })
        }
        
        xhr.open(options.type,options.url,true);
        xhr.send(postData);
}
XHRHelper.prototype.get = function(options){
        options.data = options.data || {};
        options.success = options.success || function(){};
        options.error = options.error || function(){};
        options.type = options.type || "get";
        
        var params = "?";
        for(var key in options.data){
            params += key+"="+encodeURI(data[key]);
        }

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState==4){
                if(xhr.status == 200 || xhr.status == 304){
                    var responseText = xhr.responseText;
                    var res = JSON.parse(responseText);
                    if(res.status=="success"){
                        options.success({
                            status: res.status,
                            msg: res.msg,
                            data: res.data
                        })
                    }
                    else{
                        options.success({
                            status: res.status,
                            msg: res.msg,
                            data: res.data
                        })
                    }
                }else{
                    // 服务器错误或者无法找到资源
                    options.error({
                        status: "error",
                        msg: "服务器错误或者无法找到资源",
                        data: xhr.status
                    })
                }
            }
          };
        xhr.open(options.type,options.url+params,true);
        xhr.send();
}

XHRHelper.prototype.put = function(options){
    options.type = "put";
    XHRHelper.post(options);
}
XHRHelper.prototype.delete = function(options){
    options.type = "delete";
    XHRHelper.get(options);
}
XHRHelper.prototype.postFile = function(options){
    options.data = {
        "file": options.file
    } 
    XHRHelper.post(options);
}
XHRHelper.prototype.postFiles = function(options){
    var files = options.files;
    var total = 0,loaded = 0;
    for(var i=0;i< files.length;i++){
        total += files[i].size;
        XHRHelper.postFile({
            file: files[i],
            progress: function(e){
                loaded += e.loaded;
                options.progress({
                    loaded: loaded,
                    total: total
                })
                if(loaded == total){
                    options.success({
                        status: "success",
                        msg: "文件上传成功",
                        data: {}
                    })
                }
            }
        })
    }
}

export default XHRHelper;