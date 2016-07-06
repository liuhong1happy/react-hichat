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
        AdminStore.addChangeListener(EventTypes.RECEIVED_GRADELIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getGradeList();
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_GRADELIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            object_list:AdminStore.getGradeList(),
            origin_object_list:AdminStore.getGradeList()
        });
    },
    getObjectById:function(id){
        var list = this.state.object_list.filter(function(ele,pos){
            return id == ele.grade_id;
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
            {"title":"年级","name":"grade"},
            {"title":"年级名称","name":"grade_name"},
            {"title":"年级代号","name":"grade_num"},
            {"title":"学期","name":"grade_sub"},
            {"title":"添加日期","name":"date",formatter:function(ele){
            		return new Date(ele.date*1000).Format("yyyy-MM-dd");
            }},
            {"title":"操作","name":"grade_id",type:"buttons",buttons:[
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
                { name:"grade", type:"TextInput", header:"年级",  prompt:"年级不能为空", prompter:this.formDialogPrompter, placeholder:"请输入年级 , 如:七年级" },
                { name:"grade_name",header:"年级名称", type:"TextInput", prompt:"年级名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入名称 , 如:七年级上"},
                { name:"grade_num",header:"年级代号", type:"TextInput", prompt:"年级代号不能为空", prompter:this.formDialogPrompter, placeholder:"请输入代号 , 如:701"},
                { name:"grade_sub",header:"年级学期", type:"TextInput", prompt:"年级学期不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学期 , 如:上"}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                            ServerActionCreators.postGradeForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{},
            title: "新增年级"
        }
        this.refs.form.open(form_options);
    },
    editItem:function(id){
        var data = this.getObjectById(id);
        var form_options = {
            fields:[
                { name:"grade", type:"TextInput", header:"年级",  prompt:"年级不能为空", prompter:this.formDialogPrompter, placeholder:"请输入年级 , 如:七年级" },
                { name:"grade_name",header:"年级名称", type:"TextInput", prompt:"年级名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入名称 , 如:七年级上"},
                { name:"grade_num",header:"年级代号", type:"TextInput", prompt:"年级代号不能为空", prompter:this.formDialogPrompter, placeholder:"请输入代号 , 如:701"},
                { name:"grade_sub",header:"年级学期", type:"TextInput", prompt:"年级学期不能为空", prompter:this.formDialogPrompter, placeholder:"请输入学期 , 如:上"}
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
		var obj = {
			"grade_id": id,
			"grade": formData.grade,
			"grade_name": formData.grade_name,
			"grade_num":formData.grade_num,
			"grade_sub": formData.grade_sub
		};
                            ServerActionCreators.putGradeForm(formData);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:data,
            title: "修改年级"
        };        
        this.refs.form.open(form_options);
    },
    forbidRole:function(school_id){
        this.refs.confirm.open("确定要禁用学校吗？",function(e){
            ServerActionCreators.putSchoolForm({is_killed:0,school_id:school_id});
        })
    },
    deleteItem:function(id){
        this.refs.confirm.open("确定要删除年级吗？",function(e){
            ServerActionCreators.deleteGradeForm(id);
        })
    },
    _search:function(e){
    	var list = [];
    	if(e.target.value){
		list = this.state.origin_object_list.filter(function(ele,pos){
			return  ele.grade_name && ele.grade_name.indexOf(e.target.value) != -1;	
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
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增年级</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control" onChange={serach}  placeholder="请输入年级名称" />
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