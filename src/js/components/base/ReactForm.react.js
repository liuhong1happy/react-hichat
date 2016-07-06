var React = require('react');
var ReactDOM = require('react-dom');
/**
    1. 公共属性:
    value,data-target,style,className,id

    2. onChange事件默认返回格式:
    e,data-target,value

    3. getValue返回value值

    4. TextArea\TextInput\PasswordInput 共用属性
    placeholder
    
    5.RadioGroup\SelectGroup 共用属性
    data
    
**/

var FormUtils = {
    getEventData:function(e){
        e = e || event;
        var target = e.target || e.srcElement;
        value = target.type=="checkbox"?target.checked : target.value;
        dataTarget = $(target).attr("data-target");
        return {
            event:e,
            value:value,
            target:dataTarget
        }
    },
	getRgcEventData:function(e){
        e = e || event;
        var target = e.target || e.srcElement;
        value = $(target).attr("data-value");
        dataTarget = $(target).attr("data-target");
        return {
            event:e,
            value:value,
            target:dataTarget
        }
    },
}

var TextArea = React.createClass({
    _onChange:function(e){
        var data = FormUtils.getEventData(e);

        var max =parseInt(this.props.max?this.props.max:0);
        var value = "";
        if(max>0) value = data.value.substr(0,max)
        else value = data.value;

        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;
    },
    focus:function(){
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render:function(){
        var props = this.props;
        return (
            <textarea ref="root" rows={props.rows} id={props.id} data-target={ props["data-target"] }  disabled={ props.disabled }
                  className={ "textarea"+(props.className?" "+props.className:"")}  placeholder={ props.placeholder } style={ props.style } 
                  onDragOver={props.onDragOver} onDrop={props.onDrop} value={ props.value }  onChange={this._onChange} >
            </textarea>
        )
    }
});

var TextInput = React.createClass({
    _onChange:function(e){
        var data = FormUtils.getEventData(e);
        
        var max =parseInt(this.props.max?this.props.max:0);
        var value = "";
        if(max>0) value = data.value.substr(0,max)
        else value = data.value;

        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;
    },
    focus:function(){
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render:function(){
        var props = this.props;
        return (
            <input ref="root" type="text"  className={ "text-input"+(props.className?" "+props.className:"")}  disabled={ props.disabled }
                   data-target={props["data-target"]} id={props.id} placeholder={ props.placeholder } onClick={props.onClick}
                   style={ props.style }  value={props.value}  onChange={this._onChange}  />
        )
    }
});

var PasswordInput = React.createClass({
    _onChange:function(e){
        var data = FormUtils.getEventData(e);
        
        var max =parseInt(this.props.max?this.props.max:0);
        var value = "";
        if(max>0) value = data.value.substr(0,max)
        else value = data.value;
        
        data.value = data.value.replace(/\s/gm,"");

        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    _onKeyDown:function(e){
        e = e || event;
        var keyCode = e.keyCode || e.which;
        if(keyCode==13){
            if(this.props.onEnterKeyDown){
                this.props.onEnterKeyDown(e);
            }
            return false;
        }
    },
    val:function(){
        return this.props.value;
    },
    focus:function(){
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render:function(){
        var props = this.props;
        return (
            <input ref="root" type="password"  className={ "password-input"+(props.className?" "+props.className:"")}  
                   data-target={props["data-target"]} id={props.id} placeholder={ props.placeholder } disabled={ props.disabled } onKeyDown={this._onKeyDown} onKeyUp={this._onKeyUp}
                   style={ props.style }  value={ props.value }  onChange={this._onChange}  />
        )
    }
});

var SelectGroup = React.createClass({
    _handleChange:function(e){
        var data = FormUtils.getEventData(e);
        
        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;
    },
    focus:function(){
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render:function(){
        var props = this.props;
        var handleChange = this._handleChange;
        return (<select ref="root" id={ props.id } data-target={props["data-target"]}  
                value={ props.value}  style={props.style} onChange={ handleChange }
                className={ "select-group" +(props.className?" "+props.className:"")} >
                        <option value="">--请选择--</option>
                        {
                            props.data.map(function(ele,pos){
                                return (<option key={ele.value} value={ ele.value }>{ ele.text }</option>)
                            })
                        }
                </select>)
    }
});

var RadioGroup = React.createClass({
    _handleClick:function(e){
        var data = FormUtils.getEventData(e);
        
        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;  
    },
    render:function(){
        var props = this.props;
        var handleClick = this._handleClick;
        return (<div className="radio-group" id={ props.id }>
                {
                    props.data.map(function(ele,pos){
                        var checked = props.value==ele.value;
                        return (<div key={ ele.value } className="select-option">
                                            <input key={ele.value} data-target={ props["data-target"] } type="radio" name={props.name} checked={checked} 
                                                    value={ele.value} style={props.style} onChange={handleClick}/>
                                            <span dangerouslySetInnerHTML={{__html: ele.text }}></span>
                                    </div>)
                    })
                }
                </div>)
    }
});
var RadioGroupClick = React.createClass({
    _handleClick:function(e){
        var data = FormUtils.getRgcEventData(e);
        
        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;  
    },
    render:function(){
        var props = this.props;
        var handleClick = this._handleClick;
        return (<div className="radio-group" id={ props.id }>
                {
                    props.data.map(function(ele,pos){
                        var _className = props.value==ele.value?" active":"";
                        return (<div key={ ele.value } className="select-option">
                                            <div key={ele.value} data-target={ props["data-target"] }  name={props.name} 
                                                    data-value={ele.value} style={props.style} className={"check-radio"+_className} onClick={handleClick}  dangerouslySetInnerHTML={{__html: ele.text }}></div>
                                    </div>)
                    })
                }
                </div>)
    }
});

var FormGroup = React.createClass({
    render:function(){
        var props = this.props;
        return (<div className="form-group">
                <label htmlFor={ props.htmlFor } style={props.style} className="col-xs-2 control-label">{ props.title }</label>
                <div className="col-xs-10">
                     { props.children }
                </div>
              </div>)
    }
})
        
var CheckBox = React.createClass({
    _onChange:function(e){
        var data = FormUtils.getEventData(e);
        data.value = data.value==true || data.value == "true";
        if(this.props.onChange){
            this.props.onChange(data.event,data.target,data.value);
        }
    },
    val:function(){
        return this.props.value;
    },
    focus:function(){
        var $root = ReactDOM.findDOMNode(this.refs["root"]);
        return $($root).focus();
    },
    render:function(){
        var props = this.props;
        var checked = props.value==true || props.value=="true";
        return (
            <div className={"checkbox"+(props.className?" "+props.className:"")}>
                <input ref="root" type="checkbox"  className="checkbox-input"
                       data-target={props["data-target"]} id={props.id} disabled={ props.disabled }
                       style={ props.style }  checked={ checked } value={checked} onChange={this._onChange}  />
                <span dangerouslySetInnerHTML={{__html: props.text }}></span>
            </div>
        )
    }
});

var Form = React.createClass({
    getInitialState:function(){
       return {
           data:this.props.data?this.props.data:{}
       } 
    },
	componentWillReceiveProps:function(nextProps){
		// update value
		if(this.props.data!=nextProps.data){
			this.setState({
                data:nextProps.data?nextProps.data:{}
            })
		}
	},
    getFormFields:function(){
        var fields = this.props.fields;
        var form_fileds = [];
        for(var i=0;i<fields.length;i++){
            var default_field = {
                "validator":function(value,formData,options){ return !!value; },
                "type": "TextInput",
                "placeholder": "请输入名称"
            };
            var field = $.extend(true,{},default_field, fields[i]);
            
            if(fields[i].type=="SelectGroup"){
                var data = fields[i].data;
                var sData = [];
                if(data && data.length>0){
                    for(var j=0;j<data.length;j++){
                        sData.push({
                            value:data[j][fields[i].value],
                            text:data[j][fields[i].text]
                        })
                    }
                }
            }
            field.sData = sData;
            form_fileds.push(field);
        }
        return form_fileds;
    },
    Validate:function(){
        var fields = this.getFormFields();
        var data = this.state.data;
        var isValidate = true;
        for(var i=0;i<fields.length;i++){
            var field = fields[i];
            var name = field.name;
            isValidate = field.validator(data[name],data,field)
            if(!isValidate){
                field.prompter(data[name],data,field);
                break;
            }
        }
        return isValidate;
    },
    getFormData:function(){
        return this.state.data;
    },
    handleFormChange:function(e,target,value){
        var data = this.state.data;
        data[target] = value;
        this.setState({
            data:data
        })
    },
    getFormControlByType:function(type){
        var controls = {
            "TextInput":TextInput,
            "TextArea": TextArea,
            "PasswordInput": PasswordInput,
            "SelectGroup": SelectGroup,
            "RadioGroup": RadioGroup,
            "CheckBox": CheckBox
        }
        return controls[type];
    },
    render:function(){
        var data = this.state.data;
        var fields = this.getFormFields();
        var handleFormChange = this.handleFormChange;
        var getFormControlByType = this.getFormControlByType;
        return (<form className="form-horizontal">
            {
                fields.map(function(ele,pos){
                    return (<FormGroup htmlFor={ele.name} title={ele.header}>
                            { React.createElement( getFormControlByType(ele.type),{"id":ele.name,placeholder:ele.placeholder,data:ele.sData,"field": ele,"value":data[ele.name],disabled:ele.disabled,defaultValue:ele.defaultValue,className:"form-control", "onChange":handleFormChange,"data-target":ele.name},null)}
                        </FormGroup>)
                })
            }
        </form>)
    }
})

module.exports = {
    TextArea:TextArea,
    TextInput:TextInput,
    SelectGroup:SelectGroup,
    RadioGroup:RadioGroup,
    PasswordInput:PasswordInput,
    FormGroup:FormGroup,
    CheckBox:CheckBox,
    RadioGroupClick:RadioGroupClick,
    Form:Form
}