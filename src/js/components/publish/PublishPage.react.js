var React = require('react');
module.exports = React.createClass({
    render:function(){
        return (<div className="publish-page">{this.props.children}</div>)
    }
})