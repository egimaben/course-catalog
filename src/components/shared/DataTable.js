import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import axios from 'axios';
import TableHead from '@material-ui/core/TableHead';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import DetailsIcon from '@material-ui/icons/Details';
import TableSortLabel from '@material-ui/core/TableSortLabel';
const tableStyles = theme => ({
  toolbarRoot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
  },
  title: {
    flex: '0 0 auto',
  },
  tableRoot: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    height: 700,
    overflowY: 'scroll',
    overflowX: 'scroll',
    maxHeight: 700,
  },
  rowActions: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  tableWrapper: {
    overflowX: 'auto',
    overflowY: 'scroll',
  },
});
function desc(a, b, orderBy) {
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
}
const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  const sorted = stabilizedThis.map(el => el[0]);
  return sorted;
}
const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
/**  start
 * Action Buttons for table
 * @param {} props 
 */
const DetailsButton = (props) => {
  function handleClick() {
    const { loadDetails, data } = props;
    loadDetails(data);
  }
  return (<IconButton onClick={handleClick}>
    <DetailsIcon color="secondary" />
  </IconButton>
  );
}
const DeleteButton = (props) => {
  function handleClick() {
    const { doDelete, idField, data } = props;
    doDelete(data[idField].value)
  }
  return (<IconButton onClick={handleClick}>
    <DeleteIcon color="secondary" />
  </IconButton>
  );
}
const EditButton = (props) => {
  function handleClick() {
    const { launchEdit, data } = props;
    launchEdit(data);
  }
  return (
    <IconButton onClick={handleClick}>
      <EditIcon color="primary" />
    </IconButton>
  );
}
const CreateButton = (props) => {
  function handleClick() {
    const { launchCreate, data } = props;
    launchCreate(data);
  }
  return (
    <Tooltip title="Create new record">
      <IconButton aria-label="Add" onClick={handleClick}>
        <AddIcon color="primary" />
      </IconButton>
    </Tooltip>);
}
const RefreshButton = (props) => {
  function handleClick() {
    props.refresh();
  }
  return (
    <Tooltip title="Refresh records">
      <IconButton aria-label="Add" onClick={handleClick}>
        <RefreshIcon color="primary" />
      </IconButton>
    </Tooltip>);
}
/*
 * Action Buttons for table
 *     END
 **/

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'asc',
      orderBy: 'id',
      page: 0,
      rowsPerPage: 7,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { deleteId, confirmedDelete, newRecord, creating, editing, editedRecord } = nextProps;
    if (confirmedDelete)
      this.doDelete(deleteId);
    if (creating && newRecord)
      this.saveNew(newRecord);
    if (editing && editedRecord)
      this.saveEdits(editedRecord);
  }
  componentDidMount() {
    const { createRecord, baseUrl, onFetchError, onLoad } = this.props;
    axios.get(baseUrl)
      .then(response => {
        const data = response.data.map((row) => {
          return createRecord(row);
        });
        onLoad(data);
      })
      .catch(error => {
        onFetchError(error);
      });
  }
  refresh = () => {
    const { onLoad, baseUrl, onFetchError, createRecord } = this.props;
    axios.get(baseUrl)
      .then(response => {
        const data = response.data.map((row) => {
          return createRecord(row);
        });
        onLoad(data);
      })
      .catch(error => {
        onFetchError(error);

      });
  }
  doDelete = (id) => {
    const { onDeleteError, confirmedDelete, confirmDelete, baseUrl, onDeleteCompleted, data } = this.props;
    if (!confirmedDelete) {
      confirmDelete(id);
    }
    else {
      axios.delete(baseUrl + '/' + id)
        .then(response => {
          onDeleteCompleted(data.filter(dataRow => dataRow.id.value !== id));
        })
        .catch(error => {
          onDeleteError(error);
        });
    }
  }
  saveNew = (newRecord) => {
    const { baseUrl, createRecord, data, onSave, onSaveError } = this.props;
    axios.post(baseUrl,
      newRecord
    )
      .then(response => {
        const newData = data.concat(createRecord(response.data));
        onSave(newData);
      })
      .catch(error => {
        onSaveError(error);
      });
  }
  saveEdits = (editedRecord) => {
    const { baseUrl, idField, onSave, data, onSaveError, createRecord } = this.props;
    const id = editedRecord[idField];
    axios.put(baseUrl + '/' + id,
      editedRecord
    )
      .then(response => {
        onSave(data.map(row => {
          if (row.id.value === id) return createRecord(response.data);
          return row;
        }));
      })
      .catch(error => {
        onSaveError(error);
      });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };
  render() {
    const { data, classes, idField, tableTitle, tableSchema, launchCreate, launchEdit, launchDetailView } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    const keys = Object.keys(tableSchema).filter(key => tableSchema[key].hidden !== true);
    return (
      <Paper className={classes.tableRoot}>
        <Toolbar className={classes.toolbarRoot}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              {tableTitle + ' data'}
            </Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <RefreshButton refresh={this.refresh} />
            <CreateButton data={tableSchema} launchCreate={launchCreate} />
          </div>
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                {
                  keys.map((key, index) => {
                    const row = tableSchema[key];
                    const numeric = row.type === 'number';
                    return (
                      <TableCell
                        key={index + idField}
                        numeric={numeric}
                        padding={numeric ? 'default' : 'none'}
                        sortDirection={orderBy === key ? order : false}
                      >
                        <Tooltip
                          title="Sort"
                          placement={numeric ? 'bottom-end' : 'bottom-start'}
                          enterDelay={300}
                        >
                          <TableSortLabel
                            active={orderBy === key}
                            direction={order}
                            onClick={this.createSortHandler(key)}
                          >
                            {row.label}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    );
                  }, this)
                }
                <TableCell
                  key='actionButtons'>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n, rowIndex) => {
                  return (
                    <TableRow
                      hover
                      key={rowIndex}>
                      {Object.keys(n).filter((key => n[key].hidden !== true)).map((key, index) => {
                        let valueObj = n[key];
                        switch (valueObj.type) {
                          case 'number': return (
                            <TableCell key={index} numeric padding='default'>{valueObj.value}</TableCell>
                          );
                          case 'boolean': return (<TableCell key={index} component="th" scope="row" padding="none">
                            {valueObj.value ? "YES" : "NO"}
                          </TableCell>);
                          case 'text':
                          default: return (<TableCell key={index} component="th" scope="row" padding="none">
                            {valueObj.value}
                          </TableCell>);
                        }
                      })}
                      <TableCell component="th" scope="row" padding="none">
                        <div className={classes.rowActions}>
                          <DeleteButton idField={idField} data={n} doDelete={this.doDelete} />
                          <EditButton data={n} launchEdit={launchEdit} />
                          <DetailsButton data={n} loadDetails={launchDetailView} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(tableStyles)(DataTable);