var React = require('react');
var Button = React.createClass({
    render:function(){
        return (
            <div className={ "btn "+(this.props.btnName?this.props.btnName:"") } data-target={this.props["data-target"]} onClick={this.props.onClick}>
                { this.props.children }
            </div>
        )
    }
})
module.exports = Button;