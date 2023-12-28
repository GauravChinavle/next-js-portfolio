"use client";

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { moment } from '@/utils';

interface Session {
  date: string;
  min_age_limit: string;
  available_capacity_dose1: number;
  available_capacity_dose2: number;
  available_capacity: number;
  vaccine: string;
}

interface Center {
  block_name: string;
  name: string;
  from: string;
  to: string;
  fee_type: string;
  total_capacity: number;
  sessions: Session[];
}

interface RowProps {
  row: Center;
}


const useRowStyles = makeStyles((theme: Theme) =>
  createStyles({
    background: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    lightBulb: {
      verticalAlign: 'middle',
    },
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
      width: '100%',
      overflowX: 'auto',
    },
  })
);

function Row({ row }: RowProps) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.block_name}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.from}</TableCell>
        <TableCell align="right">{row.to}</TableCell>
        <TableCell align="center">
          <span
            style={{
              backgroundColor:
                row.fee_type === 'Free' ? '#9fcf9f' : '#f68f8f',
              padding: '2.5% 10%',
            }}
          >
            {row.fee_type}
          </span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Slots
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Min Age Limit</TableCell>
                    <TableCell align="right">Dose 1</TableCell>
                    <TableCell align="right">Dose 2</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                    <TableCell align="right">Vaccine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessions.map((sessionsRow) => (
                    !!sessionsRow.available_capacity && (
                      <TableRow key={sessionsRow.date}>
                        <TableCell component="th" scope="row">
                          {sessionsRow.date}
                        </TableCell>
                        <TableCell align="right">
                          {sessionsRow.min_age_limit}
                        </TableCell>
                        <TableCell align="right">
                          {sessionsRow.available_capacity_dose1}
                        </TableCell>
                        <TableCell align="right">
                          {sessionsRow.available_capacity_dose2}
                        </TableCell>
                        <TableCell align="right">
                          {sessionsRow.available_capacity}
                        </TableCell>
                        <TableCell align="right">
                          {sessionsRow.vaccine}
                        </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    block_name: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    fee_type: PropTypes.string.isRequired,
    total_capacity: PropTypes.number.isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        min_age_limit: PropTypes.string.isRequired,
        available_capacity_dose1: PropTypes.number.isRequired,
        available_capacity_dose2: PropTypes.number.isRequired,
        available_capacity: PropTypes.number.isRequired,
        vaccine: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

interface CollapsibleTableProps {
  district: string;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = (props) => {
  const classes = useRowStyles();
  const [centerList, setCenterList] = React.useState<Center[]>([]);
  const [errText, setErrText] = React.useState('');
  const { district } = props;

  const [isAvailable, setIsAvailable] = React.useState('');



  useEffect(() => {
    const getTable = async () => {
      try {
        const date = moment().utc().utcOffset('+05:30').format('DD-MM-YYYY');
        const urlCenter = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`;
        const response = await fetch(urlCenter, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resJSON = await response.json();
        const centers = resJSON.centers;
        const filteredData = centers.filter((item: any) =>
          item.sessions.some((sess: any) => sess.available_capacity !== 0)
        );
  
        setErrText(
          `Last updated: ${date} ${moment().utc().utcOffset('+05:30').format('h:mm:ss a')}`
        );
  
        if (filteredData.length === 0) {
          setIsAvailable('No data available.');
          setCenterList([]);
        } else {
          setCenterList(filteredData);
          setIsAvailable('');
        }
      } catch (e) {
        setErrText('ERROR: Try again after some time');
      }
    };
    const intervalID = setInterval(getTable, 10000);
    return () => clearInterval(intervalID);
  }, [district]);

  return (
    <>
      <Typography className={classes.root} color="textSecondary">
        <h5>
          {errText} <br /> Auto refresh every 10 seconds{' '}
        </h5>
      </Typography>

      <TableContainer>
        <Paper style={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Block Name</TableCell>
                <TableCell>Center Name</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="center">Fee Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {centerList.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
            <caption>{isAvailable}</caption>
          </Table>
        </Paper>
      </TableContainer>
    </>
  );
};

export default CollapsibleTable;