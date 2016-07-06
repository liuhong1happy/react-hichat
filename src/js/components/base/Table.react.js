var React = require('react');

var Table = React.createClass({
    getData:function(){
        var data = this.props.data;
        if(data && data.length>0 && !data[0].index){
            for(var i=0;i<data.length;i++){
                data[i].index = i+1;
            }
        }
        return data;
    },
    render:function(){
        var props = this.props;
        var columns = props.columns;
        var data = this.getData();
        return (
                <table className="table table-bordered">
                            <thead>
                                <tr>
                                        {
                                            columns.map(function(ele,pos){
                                                    return (<td key={pos}>{ ele.title }</td>)
                                            })
                                        }
                                </tr>
                            </thead>
                            <tbody id="userListTbody">
                            {
                                data.map(function(ele,pos){
                                        return (
                                            <tr key={pos}>
                                                {
                                                    columns.map(function(c,p){
                                                            var obj = ele[c.name];
                                                            if(c.type=="buttons"){
                                                                    return (
                                                                        <td>
                                                                            {
                                                                                c.buttons.map(function(b,bp){
                                                                                      if(b.formatter){
                                                                                         return (<span key={bp}>{b.formatter(obj)} </span>)
                                                                                     }else{
                                                                                        return (<a key={bp} value={obj}  className={"btn btn-super-primary"+ (b.className?" "+b.className:"")}  onClick={b.onClick}>{b.text}</a>)
                                                                                     }
                                                                                })
                                                                            }
                                                                        </td>
                                                                    )
                                                            }
                                                            else{
                                                                var title = c.formatter?c.formatter(ele):obj;
                                                                return (<td key={p}>{title}</td>)
                                                            }
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                            }
                            </tbody>
                            </table>
        )
    }
})
module.exports = Table;