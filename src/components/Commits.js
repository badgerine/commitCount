import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button, TextField } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
  borderContainer: {

  },
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  table: {

  },
}));

const Commits = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const [repoUrl, setRepoUrl] = useState('');
  const timespanOptions = [
    { id: 1, timeUnit: 'HOUR', timeAmount: 24, displayCaption: 'Last 24 Hours' },
    { id: 2, timeUnit: 'WEEK', timeAmount: 1, displayCaption: 'Last Week' },
    { id: 3, timeUnit: 'MONTH', timeAmount: 1, displayCaption: 'Last Month' },
  ];
  const [selectedTimespan, setSelectedTimespan] = useState(timespanOptions[0].displayCaption);

  {/*test data */ }
  const commitRecords = [
    { "username": "zane", "commits": "5" },
    { "username": "tito", "commits": "3" }
  ];

  return (
    <Grid container direction='column'>
      {/* Main bordered container */}
      <Grid item container direction='column' className={classes.borderContainer}>
        {/* Input form container */}
        <Grid item container direction='column'>
          <Grid item>
            <Typography>Repo URL</Typography>
            <TextField
              variant="outlined"
              value={repoUrl}
              id='repoUrl'
              placeholder='Repository Url (e.g. https://github.com/facebook/react/)'
              onChange={event => setRepoUrl(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>Timespan</Typography>
            <FormControl variant="outlined" className={classes.margin}>
              <Select
                labelId="timespan-label"
                id="timespan-select"
                value={selectedTimespan}
                // defaultValue={timespanOptions[0]}
                onChange={event => setSelectedTimespan(event.target.value)}
              >
                {timespanOptions.map(option => (
                  <option key={option.id} value={option.displayCaption}>{option.displayCaption}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant='outlined'>Update Stats</Button>
          </Grid>

        </Grid>
        {/* Results table container */}
        <Grid item direction='column'>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Commit Cnt</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {commitRecords.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.commits}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Commits;