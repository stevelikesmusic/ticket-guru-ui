import React from 'react';
import style from './FilteredConcerts.scss';
import {flatten} from '../util.js';
import ConcertListing from './ConcertListing.jsx';

const FilteredConcerts = ({venue, groups}) => {
  let numberOfConcerts;
  let concertList;
  if (venue.name) {
    concertList = flatten(groups.map(group => {
      return group.performances.sort((a, b) => a.showTime > b.showTime).map(show => {
        return (
          <ConcertListing artist={group} show={show}
            venue={venue} key={show.id.toString()}/>
        );
      });
    }));
    numberOfConcerts = `Found ${flatten(concertList).length} shows`;
  }
  return (
    <div className={style.filteredConcerts}>
      <h5>{numberOfConcerts}</h5>
      <ul>{concertList}</ul>
    </div>
  );
}

export default FilteredConcerts;
