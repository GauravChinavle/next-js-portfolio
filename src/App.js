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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
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
        const response = await fetch(urlState,{
          mode: 'cors',
          headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Mobile Safari/537.36"
      }});
        const resJSON = await response.json();
        const states = await resJSON.states;
        console.log("hello");
        setStateList(states);
      } catch {

    }
  }
  fetchStateList();
},[]);




  return (
    <Router>
    <div>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
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
