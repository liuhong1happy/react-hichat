var React = require('react');
module.exports = React.createClass({
  displayName: 'Line',
  propTypes: {
    fill:React.PropTypes.string,
    data: React.PropTypes.array
  },
  getDefaultProps:function() {
    return {
        fill: "#cccccc",
        data: []
    };
  },
  render:function() {
    var props = this.props;
    var data = props.data;
    var pathData = ["M"+data[0].x+","+data[0].y];
    for(var i=1;i<data.length;i++){
        pathData.push("L"+data[i].x+","+data[i].y);
    }
    return (
        <path d={pathData.join("")} stroke={props.fill} strokeWidth="2" fill="none"></path>
    );
  }
});
