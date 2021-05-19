import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';


const fetch = require('node-fetch');

const useRowStyles = makeStyles({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
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
  table: {
    width: '100%',
  },
  tablecell: {
    fontSize: '40pt',
}

});



function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.from}</TableCell>
        <TableCell align="right">{row.to}</TableCell>
        <TableCell style={ {color : row.fee_type === 'Free' ? 'green':'red',} } align="right">{row.fee_type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Slots
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead >
                  <TableRow>
                    <TableCell >Date</TableCell>
                    <TableCell align="right">Min Age Limit</TableCell>
                    <TableCell align="right">Capacity</TableCell>
                    <TableCell align="right">Vaccine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.sessions.map((sessionsRow) => (
                    !!sessionsRow.available_capacity && <TableRow key={sessionsRow.date}>
                      <TableCell component="th" scope="row">
                        {sessionsRow.date}
                      </TableCell>
                      <TableCell align="right">{sessionsRow.min_age_limit}</TableCell>
                      <TableCell align="right">{sessionsRow.available_capacity}</TableCell>
                      <TableCell align="right">{sessionsRow.vaccine}</TableCell>
                    </TableRow>
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
    name: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    fee_type: PropTypes.string.isRequired,
    total_capacity: PropTypes.number.isRequired,
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        min_age_limit: PropTypes.string.isRequired,
        available_capacity: PropTypes.number.isRequired,
        vaccine: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable(props) {
  const classes = useRowStyles();
  const [centerList,setCenterList]= React.useState([]);
  const [errText, setErrText]=React.useState('');
  const {district} = props;
  let filteredData= [];
  const [isAvailable, setIsAvailable]=React.useState('');
  useEffect( () =>{
    setErrText("Please wait...")
    const intervalId = setInterval(async() => { 
      try{
        filteredData=[];
        const date = moment().utc().utcOffset("+05:30").format('DD-MM-YYYY');
        const urlCenter = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district}&date=${date}`;
        const response = await fetch(urlCenter,{
          mode: 'cors',
          headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36"
      }});
        const resJSON = await response.json();
        const centers = await resJSON.centers;
        var isCapacity = true;
        centers.map(
          function(item){
              item.sessions.map((sess)=>{
                if(sess.available_capacity!=0){
                  isCapacity=false;
                }
              })
             if(!isCapacity){
                filteredData.push(item)
                isCapacity=true;
             }
          }
      ) 
      setErrText("Last updated : "+date+ " " + moment().utc().utcOffset("+05:30").format("h:mm:ss a"));
      if(filteredData.length === 0){
        setIsAvailable("No data available.");
      }else{
      setCenterList(filteredData);
      setIsAvailable("");
    }
         
    
      } catch(e) {
        setErrText("ERROR : Try again after sometime");
    }
  },5000)
  return () => clearInterval(intervalId);
},[district]);


  return (
    <>
  <Typography className={classes.root} color="textSecondary">
      <LightBulbIcon className={classes.lightBulb} />
      {errText} 
    </Typography>
    <TableContainer>
<Paper style={{ overflowX: "auto" }}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Center Name</TableCell>
            <TableCell align="right">From</TableCell>
            <TableCell align="right">To</TableCell>
            <TableCell align="right">Fee Type</TableCell>
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
}


