var React = require('react');
var DateTimeAPIUtils = require('../../utils/DateTimeAPIUtils')

var WeekList = ["日","一","二","三","四","五","六"];
var CalenderDialog = React.createClass({
    getInitialState: function() {
        return { 
            title:"日历",
            tip:"<span class='hightlight'></span>有作业数据的日期",
            month_format:"yyyy年MM月",
            date_format:"yyyy/MM/dd",
            date:this.props.date?this.props.date:new Date(),
            data:this.props.data?this.props.data:[]
        };
    },
    _toLastMonth:function(e){
        var date = DateTimeAPIUtils.LastMonth(this.state.date);
        e.stopPropagation();
        this._onMonthChange(date);
        this.setState({date:date});
    },
    _toNextMonth:function(e){
        var date = DateTimeAPIUtils.NextMonth(this.state.date);
        e.stopPropagation();
        this._onMonthChange(date);
        this.setState({date:date});
    },
    _onMonthChange:function(date){
        if(this.props.onMonthChange){
            this.props.onMonthChange(date)
        }
    },
    _onDateClick:function(e){
        e = e || event;
        var target = e.target || e.srcElement;
        var $target = $(target);
        var strDate = $target.attr("data-date");
        e.stopPropagation();
        if(this.props.onDateClick){
            this.props.onDateClick(strDate)
        }
    },
    render:function(){
        var today = new Date();
        var currentDay = this.state.date;
        var date_format = this.state.date_format;
        var month_format = this.state.month_format;
        var monthly = currentDay.Monthly();
        var strLastMonth = "<",strNextMonth = ">";
        var tip = this.state.tip;
        var toNextMonth = this._toNextMonth;
        var toLastMonth = this._toLastMonth;
        
        
        var toggle = this.props.toggle?true:false;
        var position = this.props.position?this.props.position:{left:0,top:0};
        var onDateClick = this._onDateClick;
        var data = this.state.data;
        var i = 0,j=0;
        return (
            <div className="calender-dialog" style={ {display:toggle?"block":"none","left":position.left,"top":position.top} }>
                <div className="calender-header">
                    <div className="month-control">
                        <span className="last" onClick={ toLastMonth }>{strLastMonth}</span>
                        <span>{currentDay.Format(month_format)}</span>
                        <span className="next" onClick={ toNextMonth }>{strNextMonth}</span>
                    </div>
                    <div className="calender-tip" dangerouslySetInnerHTML={{__html: tip}}></div>
                </div>
                <div className="calender-body">
                    <div className="row">
                            {
                                WeekList.map(function(str){
                                    return (<div key={i++} className="calender-text">{str}</div>)
                                })

                            }
                    </div>
                    {
                        monthly.map(function(weeks){
                            return (<div key={j++} className="row">{
                                    
                                    weeks.map(function(day){
                                        var isCurMonth = currentDay.getMonth()==day.getMonth();
                                        var canGreen =isCurMonth ? data.filter(function(ele){
                                            return day.sameDate(ele.date);
                                        }):false;
                                        var _className = "calender-text"+(isCurMonth?"":" calender-gray")+(canGreen.length?" calender-green":"");
                                        return (<div key={day.Format(date_format)} className={ _className} onClick={onDateClick} data-date={day.Format(date_format)} >{ day.getDate() }</div>)
                                    })
                            }</div>)
                        })
                    }
                </div>
            </div>
        )
    }
})
module.exports = CalenderDialog;