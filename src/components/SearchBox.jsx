import React from 'react';
import styles from './SearchBox.scss';
import axios from 'axios';
import _ from 'lodash';
import {flatten} from '../util.js';
import { Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import FilteredConcerts from '../components/FilteredConcerts.jsx';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search: '', concert: [], groups: [], venue: {}}
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({search: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.get(API_BASE + '/venues').then(response => {
      const allVenues = response.data;
      const searched = this.state.search;
      let venueFromSearch = allVenues.filter(venue => venue.name.toLowerCase().indexOf(searched.toLowerCase()) >= 0)[0];
      let concerts = {};
      if (!venueFromSearch) {
        let concerts = allVenues.map(venue => {
          const artistObject = this.findArtist(venue, searched)[0];
          if (!artistObject) return;
          return {
            artist: artistObject,
            venue: venue
          }
        });
        const foundSearch = flatten(concerts)[0];
        const venue = {
          name: foundSearch.venue.name,
          id: foundSearch.venue.id,
          address: foundSearch.venue.address
        }
        this.setState({venue: venue, groups: [foundSearch.artist]})
      } else {
        const venueArtists = venueFromSearch.shows.map(artist => {
          return artist;
        });
        const groups = flatten(venueArtists);
        this.setState({venue: venueFromSearch, groups: groups});
      }
    });
  }

  findArtist(venue, name) {
    return venue.shows.filter(artist => artist.name.toLowerCase().indexOf(name.toLowerCase()) >= 0);
  }

  render() {
    return (
      <div className={styles.searchBox}>
        <Form inline onSubmit={this.handleSubmit}>
          <FormGroup bsSize="large">
            <FormControl
              type="text" required
              value={this.state.search}
              onChange={this.handleInputChange}
              placeholder="Search for artist or venue"/>
            <Button bsSize="large" bsStyle="primary" type="submit">Search</Button>
          </FormGroup>
        </Form>
        <FilteredConcerts venue={this.state.venue} groups={this.state.groups}/>
      </div>
    );
  }
}

export default SearchBox;
