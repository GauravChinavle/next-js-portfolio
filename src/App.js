import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import GetState from './GetList';
import MediaControlCard from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const fetch = require('node-fetch');
const UserAgent = require('user-agents'); 
   
const userAgent = new UserAgent();
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Developed by © '}
      <Link color="inherit" href="http://www.gauravchinavle.dev">
        gauravchinavle.dev
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const [stateList,setStateList]= useState([]);
  useEffect( () =>{
    async function fetchStateList(){
      try{
        const urlState = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
        await fetch(urlState,{
          headers: {
          "Content-Type": "application/json",
          "user-agent": userAgent.toString(),
      }}).then((res)=>res.json()).then((result)=>result.states).then((st)=>setStateList(st));
        
      } catch {

    }
  }
  fetchStateList();
},[]);




  return (
    <Router>
    <div>
      <Switch>
        <Route path="/slots">
            <Container maxWidth="'lg'
                  | 'md'
                  | 'sm'
                  | 'xl'
                  | 'xs'">
                <Box my={4}>
                  <GetState stateList={stateList}/>
                  <Copyright />
                </Box>
            </Container>
        </Route>
        <Route path="/">
            <MediaControlCard />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}
