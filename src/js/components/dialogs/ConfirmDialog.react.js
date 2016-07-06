var React = require('react');
var BootstrapDialog = require('../base/BootstrapDialog.react');

var ConfirmDialog = React.createClass({
	getInitialState:function(){
		return {
			content:"",
			okContent:"确定",
			cancelContent:"取消",
			title:"提示",
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
	_onBtnCancelClick:function(e){
		this._onCloseModal();
		if(this.state.cancel){
			this.state.cancel(e);
		}
	},
	open:function(content,handle,cancel){
		this.setState({
			content:content.content?content.content:content,
			handle:handle,
			cancel:cancel,
			okContent:content.ok?content.ok:"确定",
			cancelContent:content.cancel?content.cancel:"取消",
			title:content.title?content.title:"提示",
		})
		this.refs.modal.open();
	},
	render:function(){
		var buttons = [
			{
				show:true,
				name:"btn-super-primary content-left btn-expend",
				content:this.state.okContent,
				onClick:this._onBtnOkClick
			},{
				show:true,
				name:"btn-super-default content-right btn-expend",
				content:this.state.cancelContent,
				onClick:this._onBtnCancelClick
			}
		]
		var onCloseModal = this._onCloseModal;
		var content = this.state.content?this.state.content:"";
		return (<BootstrapDialog ref="modal" onClose={onCloseModal} title={this.state.title} buttons={buttons} style={this.props.style}>
							<div  dangerouslySetInnerHTML={{__html:content}} ></div>
				</BootstrapDialog>)
	}
})
		
module.exports = ConfirmDialog;