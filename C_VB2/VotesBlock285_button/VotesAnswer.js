var VotesAnswer = React.createClass({

  displayName: 'VotesAnswer',

  propTypes: {
    code: React.PropTypes.number.isRequired,
    count: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    workMode: React.PropTypes.number.isRequired,
    freeanswer: React.PropTypes.bool,
    freeanswertext: React.PropTypes.string.isRequired,
    cbFreeAnswerTextChanged: React.PropTypes.func.isRequired,
    cbSelected: React.PropTypes.func.isRequired,
    selectedAnswerCode: React.PropTypes.number, // может быть null, пока ни один ответ не выбран
  },

  answerClicked: function(EO) {
    this.props.cbSelected(this.props.code);
  },

  freeAnswerTextChanged: function(EO) { 
    console.log('VotesAnswer: текст свободного ответа изменён - '+EO.target.value); 
    this.props.cbFreeAnswerTextChanged(EO.target.value);
  },

  render: function() {

    if ( this.props.workMode==1 ) {
      return React.DOM.div(null,
        React.DOM.label({className:'VotesBlockAnswer'},
        //1. когда редериться инпут-радио
          React.DOM.input({type:'radio',value:this.props.code,name:'voteanswer',
          //2. в кач-ве checked - если  это тот вариант ответа который сейчас выбран=> нарисовать её чекнутую.
            checked:(this.props.selectedAnswerCode==this.props.code),
           // 3. если убрать onClick - радио-инпут станет ReadOnly/ поэтому надо парой checked & onClick
            onClick:this.answerClicked
          }),
          React.DOM.span(null,this.props.text),
          this.props.freeanswer
            ?React.DOM.input({type:'text',name:'votefreeanswer',className:'FreeAnswer',
              defaultValue:this.props.freeanswertext,onChange:this.freeAnswerTextChanged,
              disabled:(this.props.selectedAnswerCode!=this.props.code)
            })
            :null
        ),
      );
    }
    else {
      return React.DOM.div( {className:'VotesBlockAnswer'},
        React.DOM.span({className:'Count'},this.props.count),
        React.DOM.span({className:'Text'},this.props.text)
      );
    }

  },

});