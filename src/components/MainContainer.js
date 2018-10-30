import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info'
import SchoolIcon from '@material-ui/icons/School';
import PersonIcon from '@material-ui/icons/Person';
import { Route, Switch, withRouter } from 'react-router-dom';
import NoMatch from './shared/NoMatch';
import Home from './Home';
import { getKeyByValue } from './utils/Utils';
import { AppBar } from '@material-ui/core';
import About from './About';
import CourseTableContainer from './CourseTableContainer';
import AuthorTableContainer from './AuthorTableContainer';
const styles = {
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
};
const tabIndexToPathMapping = {
  0: '/',
  1: '/authors',
  2: '/courses',
  3: '/about'
}
class MainContainer extends React.Component {
  handleChange = (event, value) => {
    this.props.history.push(tabIndexToPathMapping[value]);
  };
  render() {
    const { location } = this.props;
    const val = parseInt(getKeyByValue(tabIndexToPathMapping, location.pathname));
    return (
      <div>
        <AppBar position='static'>
          <Tabs
            value={val}
            onChange={this.handleChange}
            fullWidth
            indicatorColor="secondary"
            textColor="secondary">
            <Tab icon={<HomeIcon />} label="Home" />
            <Tab icon={<PersonIcon />} label="Authors" />
            <Tab icon={<SchoolIcon />} label="Courses" />
            <Tab icon={<InfoIcon />} label="About" />
          </Tabs>
        </AppBar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/authors' component={AuthorTableContainer} />
          <Route exact path='/courses' component={CourseTableContainer} />
          <Route exact path='/about' component={About} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}
MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withRouter(withStyles(styles)(MainContainer));