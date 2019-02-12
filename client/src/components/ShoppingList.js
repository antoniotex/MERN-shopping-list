import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Form, FormGroup } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem, editItem, toggleEdit } from './../actions/itemActions';
import PropTypes from 'prop-types'

class ShoppingList extends Component {
    state = {
        name: '',
        id: ''
    }

    componentDidMount(){
        this.props.getItems()
    }

    onSubmit = async (id, e) => {
        e.preventDefault();

        const editedItem = {
            id: id,
            newName: this.state.name
        }
        this.props.editItem(editedItem);
        await this.toggleEdit(id, e)
    }

    toggleEdit = async (id, e) => {
        this.props.toggleEdit(id)
    }

    onChange = (e) => {
        this.setState({
            name: e.target.value
        })        
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id)
    }

    render(){
        const { items } = this.props.item
        return (
            <Container>
                <ListGroup>
                  <TransitionGroup className="shopping-list">
                    { items && items.map(({ _id, name, edit }, index) => (
                        <CSSTransition key={ index } timeout={ 500 } classNames="fade">
                          <ListGroupItem>
                          { !edit && <div>
                            <Button
                                className="edit-btn"
                                color="info"
                                size="sm"
                                onClick={this.toggleEdit.bind(this, _id)}
                                >
                                EDIT
                                </Button>
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}
                                >
                                DELETE
                                </Button>
                                {name}
                            </div> }
                            { edit && <Form onSubmit={this.onSubmit.bind(this, _id)}>
                                <FormGroup>
                                    <input
                                     type="text" 
                                     name="name" 
                                     id="itemEdit"
                                     defaultValue={name}
                                     onChange={this.onChange}
                                    />
                                    <Button
                                     className="success-btn"
                                     color="success"
                                     size="sm"
                                     type="submit"
                                     disabled={ this.state.name === '' }
                                    >OK</Button>
                                    <Button
                                     color="danger"
                                     size="sm"
                                     onClick={this.toggleEdit.bind(this, _id)}
                                    >Cancel</Button>
                                </FormGroup>
                            </Form> }
                          </ListGroupItem>
                        </CSSTransition>
                    ))}
                  </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    editItem: PropTypes.func.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem, editItem, toggleEdit })(ShoppingList)