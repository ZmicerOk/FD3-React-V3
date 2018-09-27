var VotesBlock = React.createClass({

  displayName: 'VotesBlock',

  propTypes: {
    workMode: React.PropTypes.number.isRequired,
    question: React.PropTypes.string.isRequired,
    answers:React.PropTypes.arrayOf(
      React.PropTypes.shape({
        code: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        text: React.PropTypes.string.isRequired,
        freeanswer: React.PropTypes.bool,
      })
    ),
    deffreeanswertext: React.PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return { 
      freeanswertext:this.props.deffreeanswertext,
      //1. В state eсть cnt=0
      cnt: 0,
    };
  },

  freeAnswerTextChanged: function(fat) { 
    console.log('VotesBlock: текст свободного ответа изменён - '+fat); 
    this.setState( {freeanswertext:fat} );
  },

  cntPlus3: function() {
//4. к старому cnt добавил 1 и через setState установил 
    this.setState({cnt:this.state.cnt+1});
    //5. если повторить эту строчку 3 раза
    this.setState({cnt:this.state.cnt+1});
    this.setState({cnt:this.state.cnt+1});
//6. всё равно на 1
//7. тк setState сразу не отрабатывается
  },

  render: function() {

    var answersCode=this.props.answers.map( v =>
      React.createElement(VotesAnswer, {key:v.code,
        text:v.text, count:v.count, code:v.code, 
        freeanswer:v.freeanswer, freeanswertext:this.state.freeanswertext, cbFreeAnswerTextChanged:this.freeAnswerTextChanged,
        workMode:this.props.workMode,
      })
    );
    return React.DOM.div( {className:'VotesBlock'}, 
      React.createElement(VotesQuestion, {question:this.props.question} ),
      React.DOM.div( {className:'Answers'}, answersCode ),
      //2. он рнендериться тут
      React.DOM.div( null, this.state.freeanswertext+" "+this.state.cnt ),
//3. есть кнопочка баттон +=3 вызывает функцию cntPlus3
      React.DOM.input( {type:'button',value:'+=3',onClick:this.cntPlus3} ),
    );
  },

});