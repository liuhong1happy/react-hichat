import ApiActionCreators from '../actions/ApiActionCreators';
import XHRHelper from './XHRHelper';
var xhr = new XHRHelper();
module.exports = {
    /*登录用户*/
    postUserLogin:function(formData){
        xhr.post({
            url:"/api/login",
            data: formData,
            success:ApiActionCreators.postedUserLogin,
            error: ApiActionCreators.handleError
        })
    }
};
