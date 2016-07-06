var React = require('react');

var BootstrapDialog = React.createClass({
   closeDialog:function(e){
       if(this.props.onClose){
           this.props.onClose(e);
       }
    },
    componentDidMount: function() {
        $(this.refs.root).modal({backdrop:'static',keyboard: false, show: false});
    },
    componentWillUnmount: function() {
        $('body').css({"padding":"0px","overflow":"auto"});
        $(this.refs.root).modal('hide');
        $(this.refs.root).off('hidden', this.handleHidden);
    },
    close: function() {
        $('body').css({"padding":"0px","overflow":"auto"});
        $(this.refs.root).modal('hide');
    },
    open: function() {
        $('body').css("overflow","hidden");
        $(this.refs.root).modal('show');
    },
   render:function(){
       var props = this.props;
       return (
          <div className="modal fade" ref="root">
            <div className={props.className?"modal-dialog "+props.className:"modal-dialog" } style={props.style}>
              <div className="modal-content">
                <div className="modal-header" style={this.props.headerStyle}>
                  <a role="button" className="close" data-target={props["data-target"]} onClick={this.closeDialog}> &times; </a>
                  <span>{props.title}</span>
                </div>
                <div className="modal-body bodyStyle" style={this.props.bodyStyle}>
                  { props.children }
                </div>
           
                <div className="modal-footer" style={{ "display": props.buttons.length==0?"none":"block" }}>
                   {
                        props.buttons.map(function(button){
                            var style = button.show ? {} : { "background-color":"#CCCCCC" };
                            return (<a role="button" style={style}  data-target={props["data-target"]} data-name={button.name} key={button.name} className={"btn "+button.name+(button.show?"":" disabled")}  onClick={ button.onClick}>{ button.content }</a>)
                         })
                    }
                </div>

              </div>
            </div>
          </div>
       );
   } 
});
module.exports = BootstrapDialog;