var React = require('react');
module.exports = React.createClass({
    render:function(){
        return (<div className="school-page">{this.props.children}</div>)
    }
})