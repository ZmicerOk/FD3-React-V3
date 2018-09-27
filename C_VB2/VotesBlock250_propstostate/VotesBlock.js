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
    //3.VotesBlock получил этот пропс сюда
    deffreeanswertext: React.PropTypes.string.isRequired,
    //6. и в его названии def говорит что это "начальное значение. умолчательное"
  },
//7. В пропсе начальное значение, а в getInitialState мы можем терперь его использовать
//8. Правильно сначала прописывать PropTypes а уже потом getInitialState, то мы уже сможем обращаться к пропсам и знать каковы же они и их типы

  getInitialState: function() {
    //4. state of freeanswertext изначально равен вот этому пропсу  (deffreeanswertext)
    return { freeanswertext:this.props.deffreeanswertext };
    //5. понятно, что у нас freeanswertext внутри компонента всё время меняется, он лежит в state. но его начальное значение передано снаружи в "пропс"
  },

  freeAnswerTextChanged: function(fat) { 
    console.log('VotesBlock: текст свободного ответа изменён - '+fat); 
    this.setState( {freeanswertext:fat} );
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
      React.DOM.div( null, this.state.freeanswertext ),
    );
  },

});