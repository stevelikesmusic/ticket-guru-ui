import React from 'react';
import styles from './Order.scss';
import axios from 'axios';
import {Link} from 'react-router';
import OrderForm from '../components/OrderForm.jsx';
import Receipt from '../components/Receipt.jsx';
import Total from '../components/Total.jsx';

class Order extends React.Component {
  constructor(props) {
    super(props);
    const {artistId, venueId, showId} = props.params;
    this.state = {
      artistId, venueId, showId,
      venue: {},
      artist: {},
      show: {},
      submitted: false,
      total: 0,
      recepit: {}
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.getLevel = this.getLevel.bind(this);
    this.createOrder = this.createOrder.bind(this);
  }

  componentDidMount() {
    const {artistId, showId} = this.props.params;
    const self = this;
    axios.get(`${API_BASE}/venues/${this.state.venueId}`).then(venue => {
      const artist = venue.data.shows.filter(artist => artist.id === parseInt(artistId))[0];
      const show = artist.performances.filter(show => show.id === parseInt(showId))[0];
      this.setState({
        venue: venue.data,
        artist: artist,
        show: show
      });
    });
  }

  calculateTotal(tickets, levelId) {
    if (tickets && levelId !== 'default') {
      const level = this.getLevel(levelId);
      const total = tickets * level.price;
      this.setState({total: total});
    }
  }

  submitOrder(orderInfo) {
    const order = this.createOrder(orderInfo);
    const level = this.getLevel(orderInfo.levelId);
    const uri = `${API_BASE}/venues/${this.state.venueId}/shows/${this.state.showId}/performances/${this.state.artistId}/reservations`;
    axios.post(uri, {
      customer:{
        firstName: orderInfo.firstName,
        lastName: orderInfo.lastName,
        address: orderInfo.address,
        email:orderInfo.email
      },
      seatRequests:[
        {
          level:{
            name:"Orchestra"
          },
          numSeats:5
        }
      ]
    }).then(response => {
      this.setState({receipt: response.data, submitted: true});
    });
  }

  createOrder(orderInfo) {
    const level = this.getLevel(orderInfo.levelId);
    return {
      customer: {
        email: orderInfo.email
      },
      seatRequests: [
        {
          level: {
            name: level.name
          },
          numSeats: orderInfo.numSeats
        }
      ]
    }
  }

  getLevel(levelId) {
    return this.state.venue.levels.filter(level => level.id === parseInt(levelId))[0];
  }

  render() {
    let view;
    if (!this.state.submitted) {
      view = (
        <div className={styles.order}>
          <OrderForm submitOrder={this.submitOrder} venue={this.state.venue} getTotal={this.calculateTotal}/>
          <Total total={this.state.total}></Total>
        </div>
      );
    } else {
      view = <Receipt customer={this.state.receipt.customer.firstName} artist={this.state.artist.name} venue={this.state.venue}/>
    }
    return (
      <div className={styles.orderWrapper}>
        <div className={styles.info}>
          <h2 className="lead">{this.state.artist.name} <small>{this.state.artist.description}</small></h2>
          <a href={this.state.artist.url}>{this.state.artist.url}</a>
        </div>
        {view}
      </div>
    );
  }
}

export default Order
