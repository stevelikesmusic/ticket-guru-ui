import React from 'react';
import styles from './ConcertListing.scss';
import moment from 'moment';
import ConcertDate from './ConcertDate.jsx';
import ConcertInfo from './ConcertInfo.jsx';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router'

const ConcertListing = ({artist, show, venue}) => {
  const route = `/order/venue/${venue.id}/artist/${artist.id}/show/${show.id}`;
  return (
    <li className={styles.concertListing}>
      <ConcertDate show={show}/>
      <ConcertInfo artist={artist} show={show} venue={venue}/>
      <Link to={route}><Button bsStyle="primary">Get Tickets</Button></Link>
    </li>
  );
}

export default ConcertListing;
