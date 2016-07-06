var React = require('react');
module.exports = React.createClass({
    render:function(){
        return (<div className="user-page">{this.props.children}</div>)
    }
})