var React = require('react');
var BootstrapDialog = require('../base/BootstrapDialog.react');
var form = require('../base/ReactForm.react');
var Form = form.Form;

var FormDialog = React.createClass({
    getInitialState:function(){
      return {
          fields:[],
          data:{},
          buttons:[],
          title:""
      }  
    },
	close:function(){
		this.refs.modal.close();
	},
	open:function(options){
        this.setState({
            fields: options.fields,
            data: options.data,
            buttons: options.buttons,
            title: options.title
        })
		this.refs.modal.open();
	},
    getButtons:function(){
        var buttons = this.state.buttons;
        var getButtonByName = function(name){
            var results = buttons.filter(function(ele,pos){return ele.name == name;})
            return results.length>0 ? results[0] : "";
        }
        var _self = this;
        for(var i=0;i<buttons.length;i++){
            var button = buttons[i];
            button.show = true;
            button.onClick = function(e){
                e = e || event;
                var target = e.target || e.srcElement;
                var name = $(target).attr("data-name");
                var _button = getButtonByName(name); 
                var isValidate = true;
                if(_button.validate){
                    isValidate = _self.refs.form.Validate();
                }
                _button.handler(isValidate, _self.refs.form.getFormData());
                if(isValidate){
                    _self.close();
                }
            }
        }
        return buttons;
    },
	render:function(){
		var buttons = this.getButtons();
        var fields = this.state.fields;
        var title = this.state.title;
        var data = this.state.data;
        
		return (<BootstrapDialog ref="modal" onClose={this.close} title={ title?title:"表单"} buttons={buttons} style={this.props.style}>
				        <Form ref="form" fields={fields} data={data} />
				</BootstrapDialog>)
	}
})
		
module.exports = FormDialog;