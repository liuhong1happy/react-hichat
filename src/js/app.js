var AdminApp = require('./components/AdminApp.react');
var AdminWebAPIUtils = require('./utils/AdminWebAPIUtils');

var DateTimeAPIUtils = require('./utils/DateTimeAPIUtils');
var SocketIOUtils = require('./utils/SocketIOUtils');
var React = require('react');
var ReactDOM = require('react-dom');

window.React = React;

DateTimeAPIUtils.init();
SocketIOUtils.init();

ReactDOM.render(<AdminApp/>,document.getElementById("react-container"));