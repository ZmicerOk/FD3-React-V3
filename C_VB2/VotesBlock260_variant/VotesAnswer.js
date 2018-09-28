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
    //2, получает соотв ещё один callback (cbSelected) через который он будет сообщать, что какой-то вариант ответа выбран
    cbSelected: React.PropTypes.func.isRequired,
  },

  answerClicked: function(EO) {
    //4. он вызывает cbSelected - сообщить своему родителю - "я выбран" 
    //5 и передаёт в кач-ве аргумента собств. код ответв -  - а у каждого ответа уникальный код
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
        //3. при каждои изменении-клике по кнопке радио 
          React.DOM.input({type:'radio',value:this.props.code,name:'voteanswer',onClick:this.answerClicked}),
          React.DOM.span(null,this.props.text),
          //свободный ответ
          this.props.freeanswer
            ?React.DOM.input({type:'text',name:'votefreeanswer',className:'FreeAnswer',
              defaultValue:this.props.freeanswertext,onChange:this.freeAnswerTextChanged})
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