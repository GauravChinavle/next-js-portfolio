"use client";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Link } from '@material-ui/core';
import GetState from './get-states';
import { fetchStates } from "@/api";

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
    fetchStates().then((states) => setStateList(states));
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
