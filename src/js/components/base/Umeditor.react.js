var React = require('react');
var ReactDOM = require('react-dom');

/**
* @id:必须项,编辑器的id
* @style: 可选项,编辑器大小等
* @value: 可选项,初始化编辑器的值
**/  

/**
* 对外公布方法:
* Functions: [insertHtml, insertLatex, isFocus, blurEditor,
* getAllHtml, hasContent, getContent, getPlainTxt,
* getContentTxt, appendContent, setContent, setDisabled,
* setEnabled ]
**/

/**
* 调用方式：
* 页面:
    <link href="/static/umeditor/themes/default/_css/umeditor.css" type="text/css" rel="stylesheet">
    <script type="text/javascript" src="/static/jquery/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" charset="utf-8" src="/static/js/teacher/umeditor.config.js"></script>
    <script type="text/javascript" charset="utf-8" src="/static/js/teacher/umeditor.js"></script>
    <script type="text/javascript" src="/static/umeditor/lang/zh-cn/zh-cn.js"></script>
**/

var Umeditor = React.createClass({
    componentDidUpdate:function(){
		var um = UM.getEditor(this.props.id,{
			fullscreen:false
		});
        if(this.props.value){
            um.setContent(this.props.value,false);
        }
		um.addListener('blur',this.handleBlur);
		um.addListener('focus',this.handleFocus);
	},
	componentWillUnmount:function(){
		UM.getEditor(this.props.id).destroy();
	},
	handleBlur:function(e){
		if(this.props.onBlur){
			this.props.onBlur(e,UM.getEditor(this.props.id));
		}
	},
	handleFocus:function(e){
		if(this.props.onFocus){
			this.props.onFocus(e,UM.getEditor(this.props.id));
		}
	},
	insertHtml:function(html){
		UM.getEditor(this.props.id).execCommand('insertHtml', value)
	},
	insertLatex:function(latex){
		UM.getEditor(this.props.id).execCommand('formula', latex ); // latex: 'x_{ }'
	},
	isFocus:function(){
		UM.getEditor(this.props.id).isFocus();
	},
	blurEditor:function(){
		UM.getEditor(this.props.id).blur();
	},
    focusEditor:function(){
        UM.getEditor(this.props.id).focus();  
    },
	getAllHtml:function () {
		return UM.getEditor(this.props.id).getAllHtml();
	},
	hasContent:function(){
		return UM.getEditor(this.props.id).hasContents();
	},
	getContent:function () {
		return UM.getEditor(this.props.id).getContent(); // 内容
	},
	getPlainTxt:function () {
		return UM.getEditor(this.props.id).getPlainTxt(); // 带格式纯文本
	},
	getContentTxt:function(){
		return UM.getEditor(this.props.id).getContentTxt();// 不带格式纯文本
	},
	appendContent:function(content){
		UM.getEditor(this.props.id).setContent(content,true);
	},
	setContent:function(content){
		UM.getEditor(this.props.id).setContent(content,false);
	},
	setDisabled:function(){
		UM.getEditor(this.props.id).setDisabled('fullscreen');
	},
	setEnabled:function(){
		UM.getEditor(this.props.id).setEnabled();
	},
	render:function(){
		return (<div  id={this.props.id+"_container"} className="umeditor" ref="root">
						<div id={this.props.id} style={this.props.style}></div>
				</div>)
	}
})
		
module.exports = Umeditor;