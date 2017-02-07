import styles from './ConcertInfo.scss';
import React from 'react';
import moment from 'moment';

const ConcertInfo = ({artist, show, venue}) => {
  return (
    <div className={styles.concertInfo}>
      <span>{artist.name}</span>
      <br/>
      <span>{moment(show.showTime).format('h:mm a')} @ {venue.name}</span>
    </div>
  );
}

export default ConcertInfo;
