var React = require('react');
var Table = require('../base/Table.react');
var ConfirmDialog = require('../dialogs/ConfirmDialog.react');
var AlertDialog = require('../dialogs/AlertDialog.react');
var FormDialog = require('../dialogs/FormDialog.react');
var AdminStore = require('../../stores/AdminStore');
var ServerActionCreators = require('../../actions/ServerActionCreators');
var AdminConstants = require('../../constants/AdminConstants');
var EventTypes = AdminConstants.EventTypes;
module.exports = React.createClass({
    getInitialState:function(){
      return {
         object_list:[],
         origin_object_list:[]
      }  
    },

   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_SUBJECTLIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getSubjectList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_SUBJECTLIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            object_list:AdminStore.getSubjectList(),
            origin_object_list:AdminStore.getSubjectList()
        });
    },
    getObjectById:function(id){
        var list = this.state.object_list.filter(function(ele,pos){
            return id == ele.subject_id;
        })  
        return list.length>0?list[0]:null;

    },
    getTableColumns:function(){
        var editItem= this.editItem;
        var forbidRole = this.forbidRole;
        var deleteItem = this.deleteItem;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editItem(target.value);}
        var handleForbid = function(e){ e = e || event; var target = e.target || e.srcElement; forbidRole(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteItem(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"科目名称","name":"subject_name"},
            {"title":"科目键值","name":"subject_key"},
            {"title":"添加日期","name":"date",formatter:function(ele){
            		return new Date(ele.date*1000).Format("yyyy-MM-dd");
            }},
            {"title":"操作","name":"subject_id",type:"buttons",buttons:[
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-edit"  onClick={handleEdit} title="修改"></span>) }},
                { formatter:function(obj){ return (<span value={obj}  className="icon icon-delete"  onClick={handleDelete} title="删除"></span>)}}
            ]}
        ];
        return table_columns;
    },
    formDialogPrompter:function(value,formData,options){
        this.refs.alert.open(options.prompt);
    },
    openFormDialog:function(){
        var form_options = {
            fields:[
                { name:"subject_name", type:"TextInput", header:"科目名称",  prompt:"科目名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入名称 , 如:数学" },
                { name:"subject_key",header:"科目键值", type:"TextInput", prompt:"科目键值不能为空", prompter:this.formDialogPrompter, placeholder:"请输入键值 , 如:math"}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            ServerActionCreators.postSubjectForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增科目"
        }
        this.refs.form.open(form_options);
    },
    editItem:function(id){
        var data = this.getObjectById(id);
        var form_options = {
            fields:[
                { name:"subject_name", type:"TextInput", header:"科目名称",  prompt:"科目名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入名称 , 如:数学" },
                { name:"subject_key",header:"科目键值", type:"TextInput", prompt:"科目键值不能为空", prompter:this.formDialogPrompter, placeholder:"请输入键值 , 如:math"}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
		var obj = {
			"subject_id": id,
			"subject_name": formData.subject_name,
			"subject_key":formData.subject_key
		};
                            ServerActionCreators.putSubjectForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:data,
            title: "修改科目"
        };        
        this.refs.form.open(form_options);
    },
    forbidRole:function(school_id){
        this.refs.confirm.open("确定要禁用学校吗？",function(e){
            ServerActionCreators.putSchoolForm({is_killed:0,school_id:school_id});
        })
    },
    deleteItem:function(id){
        this.refs.confirm.open("确定要删除科目吗？",function(e){
            ServerActionCreators.deleteSubjectForm(id);
        })
    },
    _search:function(e){
    	var list = [];
    	if(e.target.value){
		list = this.state.origin_object_list.filter(function(ele,pos){
			return  ele.subject_name && ele.subject_name.indexOf(e.target.value) != -1;	
		});
    	}else{
		list = this.state.origin_object_list;
    	}
	this.setState({
		object_list:list
	});
    },
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        var serach = this._search;
        return (<div className="school-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增科目</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control" onChange={serach}  placeholder="请输入科目名称" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.object_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})