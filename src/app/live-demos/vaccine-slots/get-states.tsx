"use client";

import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { fetchDistricts } from "@/api";

import PropTypes from "prop-types";
import CollapsibleTable from './table';

const useStyles = makeStyles((theme: any) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));



GetState.propTypes = {
    stateList: PropTypes.array,
};
GetState.defaultProps = {
    stateList: [],
};

GetDistrict.PropTypes = {
    distList: PropTypes.array || [],
    id: PropTypes.number,
};
GetDistrict.defaultProps = {
    distList: [],
    id: '',
};

export default function GetState(props: any) {
    const classes = useStyles();
    const [state, setState] = React.useState("");
    const { stateList } = props;
    const handleChangeState = (event: any) => {
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
                        stateList.map((item: any, index: number) => (
                            <MenuItem value={item.state_id} key={index}>{item.state_name}</MenuItem>

                        ))}
                </Select>
            </FormControl>
            {state && <GetDistrict state={state} />}
        </>
    );
}


function GetDistrict(props: any) {
    const classes = useStyles();
    const [district, setDistrict] = React.useState();
    const [distList, setDistList] = React.useState([]);
    const { state } = props;

    useEffect(() => {
        fetchDistricts(state).then((districts) => setDistList(districts));
    }, [state]);

    const handleChangeDistrict = (event: any) => {
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
                        distList.map((item: any, index: number) => (
                            <MenuItem value={item.district_id} key={index}>{item.district_name}</MenuItem>
                        ))}
                </Select>
            </FormControl>
            {district && <CollapsibleTable district={district} />}

        </>
    );
}
