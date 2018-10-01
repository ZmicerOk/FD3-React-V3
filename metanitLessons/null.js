const CreatorTable = React.createClass({

    propTypes: {
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                    id: React.PropTypes.number.isRequired,
                    name: React.PropTypes.string.isRequired,
                    price: React.PropTypes.string.isRequired,
                    img: React.PropTypes.string.isRequired,
                    quantity: React.PropTypes.number.isRequired,
                }
            )
        )
    },
    getInitialState: function () {
        return {
            itemsState: this.props.items,
            editMode: false,
            addingMode: false,
        };
    },

    changeElementState: function (e) {
        this.setState({
            itemsState: this.state.itemsState.map(
                (data) => {
                    // console.log(data);
                    (data.id).toString() === e.currentTarget.parentNode.id ? data.isOpened = !data.isOpened : null;
                    return data
                }
            )
        });
        this.state.editMode ? this.setState({editMode: false}) : null;

    },
    editElement: function (e) {

        if (this.state.itemsState.map((data) => {
                if ((data.id).toString() === e.currentTarget.parentNode.id) {
                    return data.isOpened = true
                }
            })) {
            this.setState({editMode: !this.state.editMode});
        }

    },

    addElement: function (e) {
        this.setState({addingMode: !this.state.addingMode});
    },

    deleteElement: function (e) {
        this.setState({
            itemsState: this.state.itemsState.filter(
                (data) => {
                    if (data.id.toString() !== e.currentTarget.parentNode.id) {
                        return data
                    }
                }
            )
        })
    },

    pushingObject: function (e) {
        let self = this;
        console.log(e.target.parentNode.querySelector('.formEditName'));
        this.setState({
            itemsState: self.state.itemsState.push(
                {
                    id: self.state.itemsState.length + 1,
                    name: e.target.parentNode.querySelector('.formEditName').value,
                    price: e.target.parentNode.querySelector('.formEditPrice').value,
                    img: e.target.parentNode.querySelector('.formEditFile').value,
                    quantity: Number(e.target.parentNode.querySelector('.formEditQuantity').value),
                    isOpened: false,
                }
            )

        });


    },


    render: function () {
        let self = this;


        console.log(this.state.itemsState);

        let elements = self.state.itemsState.map(
            (el) => {
                if (el.isOpened) {
                    return (
                        React.DOM.div({className: 'elementRow opened', key: el.id, id: el.id,},
                            React.DOM.div({

                                    className: 'elementWrapper',
                                    onClick: (e) => {
                                        return this.changeElementState(e);
                                    }
                                }, el.name,



                            ), React.DOM.button({
                                className: 'remove', onClick: (e) => {
                                    return this.deleteElement(e)
                                }
                            }, 'Удалить'),
                            React.DOM.button({
                                className: 'edit', onClick: (e) => {
                                    return this.editElement(e)
                                }
                            }, 'Редактировать'),
                            React.createElement(CreatorElement, {
                                    item: el
                                }
                            )
                        )
                    )

                } else {
                    return (
                        React.DOM.div({className: 'elementRow', key: el.id, id: el.id,},
                            React.DOM.div({
                                    className: 'elementWrapper',

                                    onClick: (e) => {
                                        return this.changeElementState(e);
                                    }
                                }, el.name,
                            ), React.DOM.button({
                                className: 'remove', onClick: (e) => {
                                    return this.deleteElement(e)
                                }
                            }, 'Удалить'),
                            React.DOM.button({
                                className: 'edit', onClick: (e) => {
                                    return this.editElement(e)
                                }
                            }, 'Редактировать'),
                        ))
                }
            }
        );

        return React.DOM.div({className: 'table'},
            React.DOM.div({className: 'elements'}, elements),
            this.state.editMode
                ? React.createElement(CreatorEditedForm, {edited: this.state.editMode})
                : null,
            this.state.addingMode ?
                React.createElement(CreatorEditedForm, {
                    itemsState: this.state.itemsState,
                    pushingObject: this.pushingObject,
                }) : null,
            React.DOM.button({
                className: 'newElement', onClick: (e) => {
                    this.addElement(e)
                }
            }, 'Добавить')
        )
    },

});