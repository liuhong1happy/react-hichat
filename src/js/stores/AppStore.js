import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes,EventTypes} from '../constants/AppConstants';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import assign from 'object-assign';
import {EventEmitter} from 'events';

var server = {
    userInfo: null
}

var AppStore = assign({}, EventEmitter.prototype, {
  emitChange: function(type) {
    this.emit(type);
  },
  addChangeListener: function(type,callback) {
    this.on(type, callback);
  },
  removeChangeListener: function(type,callback) {
    this.removeListener(type, callback);
  },
  getUserInfo: function(){
      return server.userInfo || LocalStorageUtils.user.getUserInfo()
  }
});
AppStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.POSTED_USER_LOGIN:
        var res = action.data;
        server.userInfo = res.data;
        LocalStorageUtils.user.loginSystem(server.userInfo.userId,server.userInfo);
        AppStore.emitChange(EventTypes.POSTED_USER_LOGIN);
        break;
    default:
      // do nothing
  }
});
module.exports = AppStore;