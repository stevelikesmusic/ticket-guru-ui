require('../styles/app.scss');
import styles from '../styles/app.scss';
import React from 'react';
import {Link, IndexLink} from 'react-router';
import SearchBox from '../components/SearchBox.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={styles.header}>
        <header>
          <IndexLink to="/"><h1>TicketGuru</h1></IndexLink>
          <Link>Login</Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default App
