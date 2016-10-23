var LocalStorageHandler = {
    setObject: function(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    getObject: function(key){
        var obj = localStorage.getItem(key);
        if(obj){
            return JSON.parse(obj);
        }else{
            return {}
        }
    },
    setString: function(key,value){
        localStorage.setItem(key,value);
    },
    getString: function(key){
        var obj = localStorage.getItem(key);
        return obj || "";
    }
}

var LocalStorageUtils = {
    user: {
        loginSystem: function(userId,userInfo){
            userInfo.loginTime = new Date().valueOf();
            LocalStorageHandler.setString("logged-in-user", "user-"+userId);
            LocalStorageHandler.setObject("user-"+userId,userInfo);
        },
        logoutSystem: function(){
            var userId = LocalStorageHandler.getString("logged-in-user");
            LocalStorageHandler.setObject("user-"+userId, {});
        },
        getUserInfo: function(){
            var userId = LocalStorageHandler.getString("logged-in-user");
            return LocalStorageHandler.getObject("user-"+userId);
        },
        isLoggedIn: function(){
            var userId = LocalStorageHandler.getString("logged-in-user");
            return !!userId;
        }
    }
}

export default LocalStorageUtils;