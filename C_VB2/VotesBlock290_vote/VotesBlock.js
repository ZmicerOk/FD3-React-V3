var VotesBlock = React.createClass({

  displayName: 'VotesBlock',

  propTypes: {
    startWorkMode: React.PropTypes.number.isRequired,
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
      selectedAnswerCode: null,
      freeanswertext:this.props.deffreeanswertext,
      workMode:this.props.startWorkMode,
    };
  },

  answerSelected: function(code) {
    console.log('выбран ответ с кодом '+code);
    this.setState( {selectedAnswerCode:code} );
  },

  vote: function() {
    console.log('голосование завершено, выбран ответ с кодом '+this.state.selectedAnswerCode);
//4. Меняем пропсы - это плохо
//5. перебираються (forEach) все варианты ответов
    this.props.answers.forEach( answer => {
      //6. стрел.функц - если вариант ответа  тот который сейчас выбран
      if ( answer.code==this.state.selectedAnswerCode )
      //7. то в нем кол-во голосов увел. на 1
        answer.count++;
    } );
//8. workMode меняем на 2 - условно - ВАЖНО - пропсы меняются  - но стэйт переводиться потом в др сост
    this.setState( {workMode:2} );
  },

  freeAnswerTextChanged: function(fat) { 
    console.log('VotesBlock: текст свободного ответа изменён - '+fat); 
    this.setState( {freeanswertext:fat} );
  },

  render: function() {

    var answersCode=this.props.answers.map( v =>
      React.createElement(VotesAnswer, {key:v.code,
        text:v.text, count:v.count, code:v.code, 
        freeanswer:v.freeanswer, freeanswertext:this.state.freeanswertext, 
        cbSelected:this.answerSelected,
        cbFreeAnswerTextChanged:this.freeAnswerTextChanged,
        selectedAnswerCode:this.state.selectedAnswerCode,
        workMode:this.state.workMode,
      })
    );

    return React.DOM.div( {className:'VotesBlock'}, 
      React.createElement(VotesQuestion, {question:this.props.question} ),
      React.DOM.div( {className:'Answers'}, answersCode ),
      //2. режим голосования ==1 и вариант ответа труе (!=null)  
      //3. в этом вся "сила реакта" - все чнреоез state
      ((this.state.workMode==1)&&this.state.selectedAnswerCode)
      //1. кнопочка прголосовать. доступна не всегда, а если
        ?React.DOM.input( {type:'button',value:'проголосовать',onClick:this.vote} )
        :null
    );

  },

});