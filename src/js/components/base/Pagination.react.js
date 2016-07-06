var React = require('react');

var Pagination = React.createClass({
	handleClick:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var cur_page = parseInt($(target).attr("data-target"));
		if(this.props.onClick){
			this.props.onClick(e,cur_page);
		}
	},
	getButtons:function(){
		var count = this.props.count;
		var cur_page = this.props.cur_page;
		var buttons = [];
		if(count>0) buttons.push({ type:"first", text:"首页",value:1});
		var first = 1,last = count;
		if(count>5){
			if(cur_page<3){
				last = 5;
			}else if(count-cur_page<3){
				first = count-4;
			}else{
				first = cur_page-2;
				last = cur_page+2;
			}
		}
		if(first!=1){
			buttons.push({ type:"etc", text:"...",value:0});
		}
		for(var i=first;i<=last;i++){
			buttons.push({ type:"btn", text:i.toString(),value:i});
		}
		if(last!=count){
			buttons.push({ type:"etc", text:"...",value:0});
		}
		if(count>0) buttons.push({ type:"last", text:"末页",value:count});
		return buttons;
	},
	render:function(){
		var buttons = this.getButtons();
		var handleClick = this.handleClick;
		var cur_page = this.props.cur_page;
		return (<div className="pagination">
				{
					buttons.map(function(ele,pos){
						if(ele.type=="etc"){
							return (<span className="btn-pagination">{ele.text}</span>)
						}else{
							var activeClass = (ele.value == cur_page && ele.type=="btn" )?" active":"";
							return (<a className={"btn btn-link btn-pagination"+activeClass} data-target={ele.value} onClick={handleClick}>{ele.text}</a>)
						}
					})
				}
				</div>)
	}
})
	
module.exports = Pagination;