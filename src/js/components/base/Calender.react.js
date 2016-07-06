var React = require('react');

var WeekList = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"]
var Calender = React.createClass({
    getInitialState: function() {
        return { 
            date:this.props.date?this.props.date:new Date()
        };
    },
    render:function(){
        var day = WeekList[this.state.date.getDay()];
        var date = this.state.date.getDate();
        return (
            <div className="calender">
                <div className="day">{day}</div>
                <div className="date">{date}</div>
            </div>
        )
    }
})
module.exports = Calender;