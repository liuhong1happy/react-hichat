import index from '../less/index.less';

import ChatApp from './components/ChatApp.react';

import DateTimeAPIUtils from  './utils/DateTimeAPIUtils';
//import SocketIOUtils from './utils/SocketIOUtils';
import React from  'react';
import ReactDOM from 'react-dom';

DateTimeAPIUtils.init();
 //SocketIOUtils.init();

ReactDOM.render(<ChatApp/>,document.getElementById("react-container"));