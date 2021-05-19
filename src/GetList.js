import React, { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import CollapsibleTable from './Table';
import { styled } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));



GetState.PropTypes = {
  stateList: PropTypes.array,
};
GetState.defaultProps = {
  stateList:[],
};

GetDistrict.PropTypes = {
  distList: PropTypes.array,
  id: PropTypes.number,
};
GetDistrict.defaultProps = {
  distList:[],
  id:'',
};

export default function GetState(props) {
  const classes = useStyles();
  const [state, setState] = React.useState("");
  const {stateList} = props;
  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state}
          onChange={handleChangeState}
          label="state"
        >{
            stateList.map(item=>(
                <MenuItem value={item.state_id}>{item.state_name}</MenuItem>
            
            ))}
        </Select>
      </FormControl>
       { state && <GetDistrict state={state}/>}
    </>
  );
}


function GetDistrict(props) {
  const classes = useStyles();
  const [district, setDistrict] = React.useState();
  const [distList,setDistList]= React.useState([]);
  const {state} = props;
  useEffect(()=>{
    async function fetchDistList(){ 
      try{
        const urlDist = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state}`;
        const response = await fetch(urlDist);
        const resJSON = await response.json();
        const districts = await resJSON.districts;
        console.log("hello");
        setDistList(districts);
        }catch(e){
            console.log(e);
      }


  }
  fetchDistList();
},[state]);

const handleChangeDistrict = (event) => {
  setDistrict(event.target.value);
};
  
  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={district}
          onChange={handleChangeDistrict}
          label="District"
        >
          {
            distList.map(item=>(
                <MenuItem value={item.district_id}>{item.district_name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      { district && <CollapsibleTable district={district}/>}

    </>
  );
}

// export default function GetList(props) {
//   const classes = useStyles();
//   const [state, setState] = React.useState("");
//   const [district, setDistrict] = React.useState();

//   var [distList,setDistList]= useState([]);
  
//   const {stateList} = props;
//   const handleChangeState = (event) => {
//     setState(event.target.value);
//     const id = event.target.value;
//     async function fetchDistList(){
//     try{
//       const urlDist = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`;
//       const response = await fetch(urlDist);
//       const resJSON = await response.json();
//       const districts = await resJSON.districts;
//       console.log("hello");
//       setDistList(districts);
//     } catch {

//   }
// }fetchDistList();
// };

// const handleChangeDistrict = (event) => {
//   setDistrict(event.target.value);
 
// };
  
//   return (
//     <>
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
//         <Select
//           labelId="demo-simple-select-outlined-label"
//           id="demo-simple-select-outlined"
//           value={state}
//           onChange={handleChangeState}
//           label="state"
//         >{
//             stateList.map(item=>(
//                 <MenuItem value={item.state_id}>{item.state_name}</MenuItem>
            
//             ))}
//         </Select>
//       </FormControl>
//       <FormControl variant="outlined" className={classes.formControl}>
//         <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
//         <Select
//           labelId="demo-simple-select-outlined-label"
//           id="demo-simple-select-outlined"
//           value={district}
//           onChange={handleChangeDistrict}
//           label="District"
//         >
//           {
//             distList.map(item=>(
//                 <MenuItem value={item.district_id}>{item.district_name}</MenuItem>
//             ))}
//         </Select>
//       </FormControl>

//     </>
//   );
// }