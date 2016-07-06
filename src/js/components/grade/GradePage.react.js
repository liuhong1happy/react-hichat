var React = require('react');
module.exports = React.createClass({
    render:function(){
        return (<div className="grade-page">{this.props.children}</div>)
    }
})