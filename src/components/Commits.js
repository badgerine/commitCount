import { Button, TextField } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BarGraph from './widgets/BarGraph';


const useStyles = makeStyles(theme => ({
  borderContainer: {
    maxWidth: '30em',
    alignSelf: 'center',
    outline: '1px solid #bcc3ce',
    marginTop: '2em',
    marginBottom: '2em',
    [theme.breakpoints.up('xs')]: {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      width: '30em'
    }
  },
  form: {
    padding: '2rem',
    [theme.breakpoints.down('xs')]: {
      padding: '1rem'
    }

  },
  table: {
    color: '#3b4351',
    backgroundColor: '#eef0f3'
  },
  input: {
    outline: '1px solid lightgray',
    paddingLeft: '0.5rem',
    marginBottom: '1em',
    width: '100%',
  },
  active: {
    border: '1px solid blue',
    boxShadow: '0 0 2px 0',
  },
  button: {
    outline: '1px solid blue',
    borderRadius: 0,
    color: 'blue',
    marginTop: '1em',
    textTransform: 'none'
  },
  labelItem: {
    marginBottom: '0.5em'
  }
}));

const Commits = (props) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const classes = useStyles();
  const [repoUrlFieldFocused, setRepoTextFieldFocused] = useState(false);
  const [timespanFieldFocused, setTimespanFieldFocused] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const timespanOptions = [
    { id: 1, timeUnit: 'HOUR', timeAmount: 24, displayCaption: 'Last 24 Hours' },
    { id: 2, timeUnit: 'WEEK', timeAmount: 1, displayCaption: 'Last Week' },
    { id: 3, timeUnit: 'MONTH', timeAmount: 1, displayCaption: 'Last Month' },
  ];
  const [selectedTimespan, setSelectedTimespan] = useState(timespanOptions[0].displayCaption);

  const [commitRecords, setCommitRecords] = useState([]);

  const fetchData = () => {

    const timeObject = timespanOptions.filter((item) => item.displayCaption == selectedTimespan)[0];
    console.log('time object to parameterise', timeObject);
    console.log('githubRepoUrl', repoUrl);
    console.log('server url=', apiUrl)

    axios.get(apiUrl, {
      params: {
        githubRepoUrl: repoUrl,
        timeUnit: timeObject.timeUnit,
        timeAmount: timeObject.timeAmount
      }
    })
      .then(res => {
        const results =  res.data;
        console.log('returned results=',results);
        if (results && results.length > 0) {
            setCommitRecords( results);
        } else {
          alert('No records found for this time period.')
        }

      })
      .catch(error => {
        alert('Something went wrong whilst trying to fulfill your request.')
        console.log('something went wrong', error);
      });
  }

  const resultsView = (commitRecords.length > 0) ? (
    <React.Fragment>
      {/* Results container */}
      <Grid item direction='column'>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 700 }}>Username</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Commit Cnt</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.table} >
            {commitRecords.map((row) => (
              <TableRow key={row.username}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell >{row.commits}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      {/*Bar Chart*/}
      <Grid item container direction='column' align='center'>
        <Typography style={{ marginTop: '3em', fontWeight: 700, marginBottom: '1em' }} align='center'>User Commits Chart</Typography>
        <Grid item>
          {(commitRecords.length > 0) ? <BarGraph data={commitRecords} /> : null}
        </Grid>
      </Grid>
    </React.Fragment>) 
    : null
    ;

  return (
    <Grid container direction='column' style={{ width: '100%' }}>
      {/* Main bordered container */}
      <Grid item direction='column' className={classes.borderContainer}>
        {/* Input form container */}
        <Grid item container direction='column' className={classes.form}>
          <Grid item className={classes.labelItem}>
            <Typography >Repo URL</Typography>
          </Grid>
          <Grid item>
            <ClickAwayListener onClickAway={() => setRepoTextFieldFocused()}>
              <TextField
                InputProps={{ disableUnderline: true }}
                value={repoUrl}
                id='repoUrlTxt'
                placeholder='Repository Url (e.g. https://github.com/facebook/react/)'
                onChange={event => setRepoUrl(event.target.value)}
                onFocus={() => setRepoTextFieldFocused(true)}
                className={repoUrlFieldFocused ? [classes.input, classes.active].join(' ') : classes.input}
              />
            </ClickAwayListener>
          </Grid>
          <Grid item className={classes.labelItem}>
            <Typography>Timespan</Typography>
          </Grid>
          <Grid item>
            <ClickAwayListener onClickAway={() => setTimespanFieldFocused(false)}>
              <FormControl InputProps={{ disableUnderline: true }}
                className={timespanFieldFocused ? [classes.input, classes.active].join(' ') : classes.input}>
                <NativeSelect
                  disableUnderline
                  labelId="timespan-label"
                  id="timespan-select"
                  value={selectedTimespan}
                  onChange={event => setSelectedTimespan(event.target.value)}
                  onFocus={() => setTimespanFieldFocused(true)}
                >
                  {timespanOptions.map(option => (
                    <option key={option.id} value={option.displayCaption}>{option.displayCaption}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </ClickAwayListener>
          </Grid>
          <Grid item>
            <Button className={classes.button} onClick={fetchData}>Update Stats</Button>
          </Grid>
        </Grid>
        {resultsView}
      </Grid>
    </Grid>
  )
}

export default Commits;