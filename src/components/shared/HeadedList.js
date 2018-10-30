import React from 'react';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
const HeadedList = (props) => {
    const { title, data } = props;
    return (
      <div>
        <Typography variant="h6">
          {title}
        </Typography>
        <div>
          <List>
            {data.map((item,index) => {
              return (<ListItem key={index}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  secondary={null}
                />
              </ListItem>);
            })}
          </List>
        </div>
      </div>
    );
  }
  export default HeadedList;