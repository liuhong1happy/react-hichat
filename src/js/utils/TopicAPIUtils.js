var ObjectAPIUtils = require('./ObjectAPIUtils');
var parseImg = function(strImg,imgs){
        var reg = /<img\b[^<]*(?:(?!<\/img>)<[^<]*)*<\/img>/gm;
        var i=0,r;
        var images = [];
        while(r=reg.exec(strImg)){
            var res = r[0];
            images[i] = res;
            i++;
        }
        for(var i=0;i<images.length;i++){
            strImg =  strImg.replace(images[i],'<img src="'+imgs[i]+'" ></img>');
        }
        return strImg;
}

module.exports = {
    parseTopic:function(topic){
        var parseTopicMain = function(){
            var topic_main = topic.topic_main? (topic.topic_main.raw ? parseImg(topic.topic_main.raw,topic.topic_main.images) : topic.topic_main):"";
            return $("<div>"+topic_main.replace(/\n/gm,"<br/>")+"</div>").html();
        }
        var parseTopicAnswer = function(){
            var answer = topic.std_answer ? (topic.std_answer.raw ? parseImg(topic.std_answer.raw,topic.std_answer.images) : topic.std_answer) : "";
            return $("<div>"+answer.replace(/\n/gm,"<br/>")+"</div>").html();
        }
        
        var parseTopicAnswers = function(){
            var optoins = topic.topic_options || topic.answers || [];
            var _options = [];
            for(var i=0;i<optoins.length;i++){
                var option = optoins[i];
                var _opt = option.raw ? parseImg(option.raw,option.images) : option;
                _options.push($("<div>"+_opt.replace(/\n/gm,"<br/>")+"</div>").html());
            }
            return _options;
        }
        
        var _topic = ObjectAPIUtils.cloneAttrs(topic,
                   ["topic_detail_id","answer_sheet_id","no","topic_id","label","sub",
                    "topic_type","grade","subject","version","nodes",
                    "nandu","width","height","table_position","page_num"]
          );           
        _topic.id = topic.topic_id;
        _topic.type = topic.topic_type;
        _topic.content = parseTopicMain();
        _topic.answer = parseTopicAnswer();
        _topic.answers = parseTopicAnswers();
        _topic.source = topic._type;
        _topic.date = new Date(topic.date*1000);
		if(topic.nodes){
			_topic.chapter = topic.nodes[0],
			_topic.section = topic.nodes[1];
			_topic.knowledge = topic.nodes[2];
		}
        return _topic;
    },
    parseTopics:function(topics){
        var _topics = [];
        for(var i=0;i<topics.length;i++){
            _topics.push(this.parseTopic(topics[i]));
        }
        return _topics;
    }
}