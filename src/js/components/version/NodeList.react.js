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
         _subjectList:AdminStore.getSubjectList(),
         _gradeList:AdminStore.getGradeList(),
         node_list:[],
      }  
    },

   componentWillMount:function(){
        AdminStore.addChangeListener(EventTypes.RECEIVED_VERSIONNODELIST,  this._onChange);
        AdminStore.addChangeListener(EventTypes.RECEIVED_SUBJECTLIST,  this._onChange);
        AdminStore.addChangeListener(EventTypes.RECEIVED_GRADELIST,  this._onChange);
    },
    componentDidMount:function(){
        ServerActionCreators.getVersionNodeList({"version_id":this.props.version_id});
        if(this.state._subjectList.length > 0){
        }else{
            ServerActionCreators.getSubjectList();
        };
        if(this.state._gradeList.length > 0){
        }else{
            ServerActionCreators.getGradeList();
        }
    },
    componentWillUnmount:function(){
        AdminStore.removeChangeListener(EventTypes.RECEIVED_VERSIONNODELIST,this._onChange);
        AdminStore.removeChangeListener(EventTypes.RECEIVED_SUBJECTLIST,this._onChange);
        AdminStore.removeChangeListener(EventTypes.RECEIVED_GRADELIST,this._onChange);
    },
    _onChange:function(){
        this.setState({
            node_list:AdminStore.getNodeList(),
            _subjectList:AdminStore.getSubjectList(),
            _gradeList:AdminStore.getGradeList()
        });
    },
    getObjectById:function(id){
        var node = this.state.node_list.filter(function(ele,pos){
            return id == ele.version_id;
        })  
        return node.length>0?node[0]:null;
    },
    getTableColumns:function(){
        var editFormDialog = this.editFormDialog;
        var forbidRole = this.forbidRole;
        var deleteSchool = this.deleteSchool;
        var handleEdit = function(e){ e = e || event; var target = e.target || e.srcElement; editFormDialog(target.value);}
        var handleDelete = function(e){ e = e || event; var target = e.target || e.srcElement; deleteSchool(target.value);}
        
        var table_columns = [
            {"title":"序号","name":"index"},
            {"title":"科目名称","name":"subject_name"},
            {"title":"出版社名称","name":"subject_name"},
            {"title":"章","name":"chapter"},
            {"title":"回","name":"section"},
            {"title":"节","name":"points"},
            {"title":"操作","name":"version_id",type:"buttons",buttons:[
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
        var version = AdminStore.getVersionNameByID(this.props.version_id);
        var _self = this;
        var _subjectList = this.state._subjectList;
        var _gradeList = this.state._gradeList;
        var form_options = {
            fields:[
                { name:"version_name", type:"TextInput" , header:"版本名称",  prompt:"版本名称不能为空", prompter:this.formDialogPrompter,placeholder:"请输入版本名称" ,disabled:"disabled"},
                { name:"grade_id", type:"SelectGroup" , header:"年级名称",  prompt:"年级名称不能为空", prompter:this.formDialogPrompter, placeholder:"请选择年级名称",data:_gradeList,value:"grade_id",text:"grade_name"},
                { name:"subject_id", type:"SelectGroup" , header:"科目名称",  prompt:"科目名称不能为空", prompter:this.formDialogPrompter, placeholder:"请选择科目名称",data:_subjectList,value:"subject_id",text:"subject_name"},
                { name:"chapter_num", type:"TextInput" , header:"第几章",  prompt:"第几章不能为空", prompter:this.formDialogPrompter, placeholder:"请输入章名称" },
                { name:"chapter", type:"TextInput" , header:"章名称",  prompt:"章名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入章名称" },
                { name:"section_num", type:"TextInput" , header:"第几回",  prompt:"第几回不能为空", prompter:this.formDialogPrompter, placeholder:"请输入回名称" },
                { name:"section", type:"TextInput" , header:"回名称",  prompt:"回名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入回名称" },
                { name:"points_num", type:"TextInput" , header:"第几节",  prompt:"第几节不能为空", prompter:this.formDialogPrompter, placeholder:"请输入节名称" },
                { name:"points", type:"TextInput" , header:"节名称",  prompt:"节名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入节名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                        var version = AdminStore.getVersionNameByID(_self.props.version_id);
                        var grade = AdminStore.getGradeByID(formData.grade_id);
                        var subject = AdminStore.getSubjectByID(formData.subject_id);
                        var copy_obj = {
                            "version_id":_self.props.version_id,
                            "version_name":version.version_name,
                            "grade_id": formData.grade_id,
                            "grade_num": grade.grade_num,
                            "grade": grade.grade,
                            "grade_sub":grade.grade_sub,
                            "grade_name": grade.grade_name,
                            "subject_id":formData.subject_id,
                            "subject_name": subject.subject_name,
                            "chapter":formData.chapter,
                            "chapter_num": formData.chapter_num,
                            "points": formData.points,
                            "points_num": formData.points_num,
                            "section": formData.section,
                            "section_num": formData.section_num,
                            "node_name":formData.points
                        };
                        ServerActionCreators.postVersionNodeForm(copy_obj);
                }
                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){}
                }
            ],
            data:{version_id:version.version_id,version_name:version.version_name},
            title: "新增学校"
        }
        this.refs.form.open(form_options);
    },
    editFormDialog:function(version_id){
        var data = this.getObjectById(version_id);
        var _subjectList = this.state._subjectList;
        var _gradeList = this.state._gradeList;
        var form_options = {
            fields:[
                { name:"version_name", type:"TextInput" , header:"版本名称",  prompt:"版本名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入版本名称" },
                { name:"grade_id", type:"SelectGroup" , header:"年级名称",  prompt:"年级名称不能为空", prompter:this.formDialogPrompter, placeholder:"请选择年级名称",data:_gradeList,value:"grade_id",text:"grade_name"},
                { name:"subject_id", type:"SelectGroup" , header:"科目名称",  prompt:"科目名称不能为空", prompter:this.formDialogPrompter, placeholder:"请选择科目名称",data:_subjectList,value:"subject_id",text:"subject_name"},
                { name:"chapter_num", type:"TextInput" , header:"第几章",  prompt:"第几章不能为空", prompter:this.formDialogPrompter, placeholder:"请输入章名称" },
                { name:"chapter", type:"TextInput" , header:"章名称",  prompt:"章名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入章名称" },
                { name:"section_num", type:"TextInput" , header:"第几回",  prompt:"第几回不能为空", prompter:this.formDialogPrompter, placeholder:"请输入回名称" },
                { name:"section", type:"TextInput" , header:"回名称",  prompt:"回名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入回名称" },
                { name:"points_num", type:"TextInput" , header:"第几节",  prompt:"第几节不能为空", prompter:this.formDialogPrompter, placeholder:"请输入节名称" },
                { name:"points", type:"TextInput" , header:"节名称",  prompt:"节名称不能为空", prompter:this.formDialogPrompter, placeholder:"请输入节名称" },
            ],
            buttons:[
                { "content":"保存",name:"btn-ok",validate:true,handler:function(isValidate,formData){
                    var copy_obj = {
                            "version_id": formData.version_id,
                            "version_name": formData.version_name,
                            "subject_id": formData.subject_id,
                            "grade_id":formData.grade_id,
                            "chapter_num": formData.chapter_num,
                            "chapter": formData.chapter,
                            "section_num": formData.section_num,
                            "section": formData.section,
                            "points_num": formData.points_num,
                            "points": formData.points,
                            "node_id":formData.node_id
                        
                    }
                    ServerActionCreators.putVersionNodeForm(copy_obj);

                }

                },
                { "content":"关闭",name:"btn-cancel",handler:function(isValidate,formData){
                    }
                }
            ],
            data:data,
            title: "修改知识点"
        }
        this.refs.form.open(form_options);
    },
    deleteNode:function(node_id){
        this.refs.confirm.open("确定要删除知识点吗？",function(e){
            ServerActionCreators.deletePublishForm(node_id);
        })
    },
    render:function(){
        var table_columns = this.getTableColumns();
        var openFormDialog = this.openFormDialog;
        
        return (<div className="node-list">
                <div className="row search-row">
                    <div className="col-xs-3">
                        <a role="button" className="btn btn-super-primary" onClick={ openFormDialog }>新增知识点</a>
                    </div>
                    <div className="col-xs-9">
                        <div className="input-group" style={{ "maxWidth":"300px","float":"right"}}>
                              <input type="text" className="form-control"  placeholder="请输入知识点" />
                              <a  className="input-group-addon btn btn-default">搜索</a>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <Table data={this.state.node_list} columns={table_columns}/>
                    </div>
                </div>
                <FormDialog ref="form"  style={{width:"530px"}} ></FormDialog>
                <ConfirmDialog ref="confirm" style={{width:"250px"}}></ConfirmDialog>
                <AlertDialog ref="alert" style={{width:"250px"}}></AlertDialog>
            </div>)
    }
})