import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import GetState from './GetList';
import SignInForm from './Subscribe';
import MediaControlCard from './Home';
import SplitWise from './SplitWise';
import './App.scss'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
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
        const response =  await fetch(urlState,{
          headers: {
          "Content-Type": "application/json",
          }});
         const resJSON = await response.json();
         const states = resJSON.states;
         setStateList(states);
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
        <Route path="/subscribe">
                <SignInForm />
                <Copyright />
            
        </Route>
        <Route path="/splitwise">
                <SplitWise />            
        </Route>
        <Route path="/">
            <MediaControlCard />
        </Route>
        
      </Switch>
    </div>
  </Router>
  );
}
