import React from 'react';
import styles from './OrderForm.scss';
import axios from 'axios';
import {Link} from 'react-router';
import {Button, Form, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: '',
      fullName: '',
      address: '',
      email: '',
      level: 'default'}

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getSeatingLocations(levels) {
    return levels.sort((a, b) => a.price > b.price).map(level => {
      return <option value={level.id} key={level.id}>{level.name} - ${level.price}</option>;
    });
  }

  handleInputChange(e) {
    const value = e.target.value;
    switch(e.target.id) {
      case 'ticketQuantity':
        this.setState({quantity: parseInt(value)}, () => this.props.getTotal(this.state.quantity, this.state.level));
        break;
      case 'userEmail':
        this.setState({email: value});
        break;
      case 'seatingLevel':
        this.setState({level: value}, () => this.props.getTotal(this.state.quantity, this.state.level));
        break;
      case 'userName':
       this.setState({fullName: value});
       break;
      case 'userAddress':
        this.setState({address: value});
        break;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const name = this.state.fullName.split(' ');
    const orderInfo = {
      email: this.state.email,
      levelId: this.state.level,
      numSeats: this.state.quantity,
      address: this.state.address,
      firstName: name[0],
      lastName: name[1]
    }

    this.props.submitOrder(orderInfo);
  }

  render() {
    let levelOptions;
    if (this.props.venue.levels) {
      levelOptions = this.getSeatingLocations(this.props.venue.levels);
    }
    return (
      <div className={styles.orderForm}>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="ticketQuantity">
            <ControlLabel>Quantity</ControlLabel>
            <FormControl type="number" required
                min="1" max="10"
                placeholder="How many tickets?"
                value={this.state.quantity}
                onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup controlId="seatingLevel">
            <ControlLabel>Choose Seating</ControlLabel>
            <FormControl  componentClass="select" required
                value={this.state.level}
                onChange={this.handleInputChange}>
                <option value="default" disabled>Select Level</option>
                {levelOptions}
            </FormControl>
          </FormGroup>
          <FormGroup controlId="userName">
            <ControlLabel>Full Name</ControlLabel>
            <FormControl type="text" required
                placeholder="Please enter your name"
                value={this.state.fullName}
                onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup controlId="userAddress">
            <ControlLabel>Address</ControlLabel>
            <FormControl type="text" required
                placeholder="Please enter your address"
                value={this.state.address}
                onChange={this.handleInputChange}/>
          </FormGroup>
          <FormGroup controlId="userEmail">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="email" required
                placeholder="Please enter your email address"
                value={this.state.email}
                onChange={this.handleInputChange}/>
          </FormGroup>
          <Button type="submit">Buy</Button>
        </form>
      </div>
    );
  }
}

export default Order
