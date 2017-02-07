import React from 'react';
import styles from './Receipt.scss';
import moment from 'moment';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router'

const Receipt = ({artist, venue, customer}) => {
  return (
    <div className={styles.receipt}>
      <h3>Looks good, {customer}!</h3>
      <p>You're all set for with your tickets to see {artist} at {venue}. We know you're going to love it!</p>
    </div>
  );
}

export default Receipt;
