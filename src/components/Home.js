import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HeadedList from './shared/HeadedList';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: {
    flexGrow: 1,
    marginLeft: 60,
    marginTop: 40,
    ...theme.typography.button,
  },
  demo: {
    backgroundColor: theme.palette.background.Avatar,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});
class Home extends React.Component {

  render() {
    const { classes } = this.props;
    return (

      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <HeadedList title='Frontend & Mobile' data={['React', 'Angular', 'Ember', 'Svelte']} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HeadedList title='Backend Technologies' data={['Laravel', 'Django', 'Entity Framework', 'Spring Boot']} />
          </Grid>
        </Grid>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <HeadedList title='Databases' data={['CouchDB', 'MongoDB', 'Neo4j', 'DynamoDB']} />

          </Grid>
          <Grid item xs={12} md={6}>
            <HeadedList title='Data Analytics' data={['Apache Spark', 'Hadoop', 'Kafka', 'R']} />

          </Grid>
        </Grid>
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);