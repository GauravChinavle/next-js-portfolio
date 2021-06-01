import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
const fetch = require('node-fetch');
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



BasicTextFields.PropTypes = {
  pin: PropTypes.number,
  mobile: PropTypes.number,
};
BasicTextFields.defaultProps = {
  pin: '',
  mobile: '',
};
async function sendApi(pin,mobile){
  let data = {
    pin:pin,
    mobile:mobile
  }
  const resp = await fetch('http://localhost:3006/subscribe',{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
  });
  const resJSON = await resp.json();
  alert(JSON.stringify(resJSON));

}
export default function BasicTextFields() {
  const classes = useStyles();
  const [pin, setPin] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [err, setErr] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleChangePin = (event) => {
    setPin(event.target.value);
  };

  const handleChangeMobile = (event) => {
    setMobile(event.target.value);
  };

  const handleFormSubmit = () => {
      sendApi(pin,mobile);
      //alert("Registred Successfully");
  };

  return (
    <Container>
      <p>How to Subscribe : 
        <br/>
        1. Send "join-herself" To +14155238886 on WhatsApp;<br/>
        2. You will get SMS whenever there is Slot available.
      </p>
    <ValidatorForm
      useRef="form"
      onSubmit={handleFormSubmit}
      onError={errors => console.log(errors)}
    >
      <TextValidator
        label="Pin Code"
        onChange={handleChangePin}
        name="pin"
        value={pin}
        validators={['required', 'isNumber', 'maxStringLength:6', 'minStringLength:0', 'isPositive']}
        errorMessages={['this field is required', 'Pincode is not valid']}
      />
      <TextValidator
        label="Mobile Number"
        onChange={handleChangeMobile}
        name="mobile"
        value={mobile}
        validators={['required', 'isNumber', 'maxStringLength:10', 'minStringLength:0', 'isPositive']}
        errorMessages={['this field is required', 'Mobile number is not valid']}
      />
      <div>
        <br></br>
      <Button type="submit" variant="contained" color="primary">
        Submit{err}
      </Button>
      </div>
      <h6>{err}</h6>
    </ValidatorForm>
    </Container>
  );
}