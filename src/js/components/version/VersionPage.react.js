var React = require('react');
module.exports = React.createClass({
    render:function(){
        return (<div className="version-page">{this.props.children}</div>)
    }
})