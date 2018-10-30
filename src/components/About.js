import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
};
function About(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Plural Sight
      </Typography>
      <Typography variant="h4" gutterBottom>
        From Wikipedia, the free encyclopedia
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pluralsight is a publicly held online education company that offers a variety of video training courses for
        software developers, IT administrators, and creative professionals through its website.[1] Founded in 2004
        by Aaron Skonnard (current CEO), Keith Brown, Fritz Onion, and Bill Williams,[2] the company has its headquarters
        in Farmington, Utah. As of November 2017, it uses more than 1,500 subject-matter experts as authors,[3] and
        offers more than 6,000 courses in its catalog.[4][5] Since first moving its courses online in 2007,
        the company has expanded, developing a full enterprise platform, and adding skills assessment modules
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        History
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pluralsight was founded in 2004 as a classroom training company that involved sending an instructor to a business
        or training event. By 2007, the company shifted its emphasis to online video training.
        Since 2011, the company has seen rapid growth. It has been named to the Inc. 5000 list of fastest growing private
        companies, ranking as the #9 Top Education company and the #19 Top Utah company.[7] In October 2017, Pluralsight
        was named #29 on MountainWest Capital Network's Utah 100 list.[8] In 2017, it was named a 2017 Best Workplaces
        in the medium-sized company category by Great Place to Work.[9] The same year, it ranked #20 on the Forbes Cloud
        100 list
      </Typography>
    </div>
  );
}
About.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(About);