import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import debt from "./services/debt";
import split from "./services/split";


export default function FinalContribution({
    members,
    paidBy,
    setPaidBy,
    expenses,
    setExpenses,
}) {

    const [result, setResult] = React.useState([]);
    React.useEffect(()=>{
        try {
            const splitResult =  split(expenses, members);
            const result =  debt(splitResult);
            setResult(result);
        } catch (e) {
            console.log(e);
        }
        
    },[])
   

    return (
        <Box sx={{ width: "90%", margin: "5%", textAlign: "center" }}>
            {
                result.length == 0 && <>
                <div className="row">
                    <InputLabel id="demo-simple-select-label">
                        {`Please enter data.....`}
                    </InputLabel>
                    
                    
                </div>


                <hr />
            </>
            }
            {result.map((res) => {
                return (
                    <>
                        <div className="row">
                            <InputLabel id="demo-simple-select-label">
                                {`${res}`}
                            </InputLabel>
                            
                            
                        </div>


                        <hr />
                    </>
                );
            })}
        </Box>
    );
}
