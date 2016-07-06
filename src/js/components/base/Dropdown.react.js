var React = require('react');
var Dropdown = React.createClass({
    getInitialState: function() {
        return { 
            icon:this.props.icon?this.props.icon:"glyphicon glyphicon-th",
            toggle:!!this.props.toggle
        };
    },
    _onClick:function(e){
        var toggle = !this.props.toggle;
        if(this.props.togglePanel){
            this.props.togglePanel(toggle);
        }
        this.setState({toggle:toggle});
        e.stopPropagation();
    },
    render:function(){
        var icon = this.state.icon;
        var toggle = this.state.toggle;
        return (
            <div className="dropdown"  onClick={this._onClick}>
                <span className="dropdown-text">
                    { this.props.children }
                </span>
                <span className={ icon+" dropdown-icon" }></span>
            </div>
        )
    }
})
module.exports = Dropdown;