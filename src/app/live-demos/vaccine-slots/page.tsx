"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Link } from '@material-ui/core';
import GetState from './get-states';

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

export default function VaccineSlots() {
  const [stateList, setStateList] = useState([]);
  useEffect(() => {
    async function fetchStateList() {
      try {
        const urlState = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
        const response = await fetch(urlState, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        const resJSON = await response.json();
        const states = resJSON.states;
        setStateList(states);
      } catch {

      }
    }
    fetchStateList();
  }, []);




  return (
    <Container>
      <Box my={4}>
        <GetState stateList={stateList} />
        <Copyright />
      </Box>
    </Container>
  );
}
