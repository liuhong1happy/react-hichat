var React = require('react');

var DropdownDialog = React.createClass({
    render:function(){
        var toggle = this.props.toggle?true:false;
        var position = this.props.position?this.props.position:{left:0,top:0};
        return (
            <div className={"dropdown-dialog" +(this.props.className?" "+ this.props.className:"") } style={ {display:toggle?"block":"none","left":position.left,"top":position.top} }>
                    {this.props.children}
            </div>
        )
    }
})
module.exports = DropdownDialog;