import styles from './ConcertDate.scss';
import React from 'react';
import moment from 'moment';

const ConcertDate = ({show}) => {
  return (
    <div className={styles.concertDate}>
      <p className="day">{moment(show.showTime).format('ddd').toUpperCase()}</p>
      <span className="date">{moment(show.showTime).format('MMM Do')}</span>
    </div>
  );
}

export default ConcertDate;
