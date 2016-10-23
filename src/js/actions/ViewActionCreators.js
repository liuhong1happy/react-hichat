var AppDispatcher = require('../dispatcher/AppDispatcher');
var WebAPIUtils = require('../utils/WebAPIUtils');

module.exports = {
    postUserLogin:function(formData){
        WebAPIUtils.postUserLogin(formData);
    }      
};