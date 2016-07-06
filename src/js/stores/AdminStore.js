var AdminDispatcher = require('../dispatcher/AdminDispatcher');
var AdminConstants = require('../constants/AdminConstants');
var ActionTypes = AdminConstants.ActionTypes;
var EventTypes = AdminConstants.EventTypes;
var  _ = require('underscore');

var TopicApiUtils = require('../utils/TopicAPIUtils');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
// 存储的数据
var server = {
    
}

// 页面间数据共享
var page = {
    system:{
        _message: ""
    }
}
// school list
var _schoolList = [];
var _superAdminList = [];
var _schoolAdminList = [];
var _subjectList = [];
var _gradeList = [];
//publish
var _publish_list = [];

//version
var _version_list = [];

//nodes
var _node_list = [];


var AdminStore = assign({}, EventEmitter.prototype, {
  emitChange: function(type) {
    this.emit(type);
  },
  addChangeListener: function(type,callback) {
    this.on(type, callback);
  },
  removeChangeListener: function(type,callback) {
    this.removeListener(type, callback);
  },
  getMessage:function(){
      return page.system._message;
  },
  getSchoolList:function(){
     return _schoolList;
  },
  getSchoolById:function(id){
      var schools = _schoolList.filter(function(ele,pos){ return ele.school_id == id });
      return schools.length>0?schools[0]:null;
  },
  getSuperAdminList:function(){
    return _superAdminList;
  },
  getSchoolAdminList:function(){
      return _schoolAdminList;
  },
  getSubjectList:function(){
    return _subjectList;
  },
  getSubjectByID:function(subject_id){
      var subject =  _.filter(_subjectList,function(ele,pos){
          return ele.subject_id == subject_id;
      });
      return subject.length>0?subject[0]:null;
  },
  getGradeList:function(){
    return _gradeList;
  },
  getGradeByID:function(grade_id){
      var grade = _.filter(_gradeList,function(ele,pos){
          return ele.grade_id == grade_id;
      });
      return grade.length>0?grade[0]:null;
  },
  getPublishList:function(){
      return _publish_list;
  },
 getVersionList:function(){
     return _version_list;
 },
 getVersionNameByID:function(version_id){
     var version = _.filter(_version_list,function(ele,pos){
         return ele.version_id == version_id;
     });
     return version.length>0?version[0]:null;
 },
 getNodeList:function(){
     return _node_list;
 }
});
AdminStore.dispatchToken = AdminDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.RECEIVED_MESSAGE:
        page.system._message = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_MESSAGE);
        break;
    case ActionTypes.RECEIVED_SCHOOLLIST:
        _schoolList = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_SCHOOLLIST);
        break;
    case ActionTypes.POSTED_SCHOOLFORM:
        AdminStore.emitChange(EventTypes.POSTED_SCHOOLFORM);
        break;
    case ActionTypes.DELETED_SCHOOLFORM:
        AdminStore.emitChange(EventTypes.DELETED_SCHOOLFORM);
        break;
    case ActionTypes.PUTED_SCHOOLFORM:
        AdminStore.emitChange(EventTypes.PUTED_SCHOOLFORM);
        break;
    case ActionTypes.RECEIVED_SCHOOLADMINLIST:
        _schoolAdminList = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_SCHOOLADMINLIST);
        break;
    case ActionTypes.POSTED_SCHOOLADMINFORM:
        AdminStore.emitChange(EventTypes.POSTED_SCHOOLADMINFORM);
        break;
    case ActionTypes.DELETED_SCHOOLADMINUSER:
        AdminStore.emitChange(EventTypes.DELETED_SCHOOLADMINUSER);
        break;
    case ActionTypes.PUTED_SCHOOLADMINUSER:
        AdminStore.emitChange(EventTypes.PUTED_SCHOOLADMINUSER);
        break;
    case ActionTypes.RECEIVED_SUPERADMINLIST:
        _superAdminList = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_SUPERADMINLIST);
        break;
    case ActionTypes.POSTED_SUPERADMINFORM:
        AdminStore.emitChange(EventTypes.POSTED_SUPERADMINFORM);
        break;
    case ActionTypes.DELETED_SUPERADMINUSER:
        AdminStore.emitChange(EventTypes.DELETED_SUPERADMINUSER);
        break;
    case ActionTypes.PUTED_SUPERADMINUSER:
        AdminStore.emitChange(EventTypes.PUTED_SUPERADMINUSER);
        break;
    case ActionTypes.RECEIVED_SUBJECTLIST:
        _subjectList = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_SUBJECTLIST);
        break;
    case ActionTypes.POSTED_SUBJECTFORM:
        AdminStore.emitChange(EventTypes.POSTED_SUBJECTFORM);
        break;
    case ActionTypes.DELETED_SUBJECTFORM:
        AdminStore.emitChange(EventTypes.DELETED_SUBJECTFORM);
        break;
    case ActionTypes.PUTED_SUBJECTFORM:
        AdminStore.emitChange(EventTypes.PUTED_SUBJECTFORM);
        break;
    case ActionTypes.RECEIVED_GRADELIST:
        _gradeList = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_GRADELIST);
        break;
    case ActionTypes.POSTED_GRADEFORM:
        AdminStore.emitChange(EventTypes.POSTED_GRADEFORM);
        break;
    case ActionTypes.DELETED_GRADEFORM:
        AdminStore.emitChange(EventTypes.DELETED_GRADEFORM);
        break;
    case ActionTypes.PUTED_GRADEFORM:
        AdminStore.emitChange(EventTypes.PUTED_GRADEFORM);
        break;
    case ActionTypes.RECEIVED_PUBLISHLIST:
        _publish_list = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_PUBLISHLIST);
        break;
    case ActionTypes.POSTED_PUBLISHFORM:
        AdminStore.emitChange(EventTypes.POSTED_PUBLISHFORM);
        break;
    case ActionTypes.DELETED_PUBLISHFORM:
        AdminStore.emitChange(EventTypes.DELETED_PUBLISHFORM);
        break;
    case ActionTypes.PUTED_PUBLISHFORM:
        AdminStore.emitChange(EventTypes.PUTED_PUBLISHFORM);
        break;
    case ActionTypes.RECEIVED_VERSIONLIST:
        _version_list = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_VERSIONLIST);
        break;
    case ActionTypes.POSTED_VERSIONFORM:
        AdminStore.emitChange(EventTypes.POSTED_VERSIONFORM);
        break;
    case ActionTypes.DELETED_VERSIONFORM:
        AdminStore.emitChange(EventTypes.DELETED_VERSIONFORM);
        break;
    case ActionTypes.PUTED_VERSIONFORM:
        AdminStore.emitChange(EventTypes.PUTED_VERSIONFORM);
        break;
          
    case ActionTypes.RECEIVED_VERSIONNODELIST:
        _node_list = action.data;
        AdminStore.emitChange(EventTypes.RECEIVED_VERSIONNODELIST);
        break;
    case ActionTypes.POSTED_VERSIONNODEFORM:
        AdminStore.emitChange(EventTypes.POSTED_VERSIONNODEFORM);
        break;
    case ActionTypes.DELETED_VERSIONNODEFORM:
        AdminStore.emitChange(EventTypes.DELETED_VERSIONNODEFORM);
        break;
    case ActionTypes.PUTED_VERSIONNODEFORM:
        AdminStore.emitChange(EventTypes.PUTED_VERSIONNODEFORM);
        break;
    default:
      // do nothing
  }
});
module.exports = AdminStore;