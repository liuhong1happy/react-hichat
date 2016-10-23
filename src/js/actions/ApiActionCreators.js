import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';

module.exports = {
  	postedUserLogin:function(res){
		AppDispatcher.dispatch({
			type: ActionTypes.POSTED_USER_LOGIN,
			data: res
		});
	},
};