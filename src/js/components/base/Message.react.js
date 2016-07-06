var React = require("react");
var AdminStore = require("../../stores/AdminStore");
var AdminConstants = require('../../constants/AdminConstants');
var EventTypes = AdminConstants.EventTypes;

var ErrorMessage = React.createClass({
    getInitialState: function() {
        return {
            mount:'OFF',
            message:AdminStore.getMessage()
        }
    },
    _onChange: function(){
        this.setState({mount:'ON',message:AdminStore.getMessage()});
        $("#message-section").animate({"margin-top":"0px"},1000);
        var _self = this;
        setTimeout(function(){
             $("#message-section").animate({"margin-top":"-50px"},1000);
        },3000)
    }, 
    componentDidMount:function(){
          AdminStore.addChangeListener(EventTypes.RECEIVED_MESSAGE,this._onChange);
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_MESSAGE,this._onChange);
    },
    _handleClick:function(e){
        this.setState({mount:"OFF"});  
    },
    render: function(){
        var status = this.state.message.status;
        var content = this.state.message.content;
        
        statusStyle = this.getStatusStyle(status);
        if(this.state.mount=="ON"){
            return (
                    <div id="message-section" style={{ "marginTop":"-50px" }}>
                        <div className={statusStyle}>
                            <a role="button" className="message-close" onClick={this._handleClick}> x </a>
                            <span>{content}</span>
                        </div>
                    </div>
                    )
        }else{return (<div id="message-section"></div>)}
    },
    getStatusStyle: function(status){
        if(status == "SUCCESS"){
            var statusStyle = "message-box message-success";
        }else if(status=="WARNING"){
            var statusStyle = "message-box message-warning";
        }else{
            var statusStyle = "message-box message-error";
        }
        return statusStyle
    }
})

module.exports = ErrorMessage;