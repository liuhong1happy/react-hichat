var React = require('react');
var BootstrapDialog = require('../base/BootstrapDialog.react');

var AlertDialog = React.createClass({
	getInitialState:function(){
		return {
			content:""
		}
	},
	_onCloseModal:function(){
		this.refs.modal.close();
		// alert & confirm
		var $fadeIn = $(".modal.fade.in");
		if($fadeIn.length>0){
			$("body").css({ overflow: "hidden" });
			$fadeIn.css({"overflow-y":"auto"});
		}
	},
	_onBtnOkClick:function(e){
		this._onCloseModal();
		if(this.state.handle){
			this.state.handle(e);
		}
	},
	open:function(content,handle){
		this.setState({
			content:content,
			handle:handle
		})
		this.refs.modal.open();
	},
	render:function(){
		var buttons = [
			{
				show:true,
				name:"btn-super-primary btn-expend",
				content:"确定",
				onClick:this._onBtnOkClick
			}
		]
		var onCloseModal = this._onCloseModal;
		var content = this.state.content?this.state.content:"";
		return (<BootstrapDialog ref="modal" onClose={onCloseModal} title="提示" buttons={buttons} style={this.props.style}>
							<div  dangerouslySetInnerHTML={{__html:content}} ></div>
				</BootstrapDialog>)
	}
})
		
module.exports = AlertDialog;