import * as React from "react";
import Box from "@mui/material/Box";
import { InputLabel, Button } from "@mui/material";
import { debt, split } from "@/services";

export default function FinalContribution(props: any) {
    const {
        members,
        expenses
    } = props;
    const [result, setResult] = React.useState([]);
    React.useEffect(()=>{
        try {
            const splitResult: any =  split(expenses, members);
            const result: any =  debt(splitResult);
            setResult(result);
        } catch (e) {
            console.log(e);
        }
        
    },[members, expenses])
   
    const downloadTxtFile = () => {
        const element = document.createElement("a");
        let log = '';
        expenses.map((e: any)=>{
            log += `Expense Name: ${e.expenseName}` + `\n` +
                    `Amount spent: ${e.amount} rupees` + `\n` +
                    `Paid by: ${e.paidBy}` + `\n` +
                    `Split with: ${e.splitWith.join(", ")}` + `\n` +
                    `________________________________` + `\n\n`
        })
        const file = new Blob([log], {
          type: "text/plain"
        });
        element.href = URL.createObjectURL(file);
        element.download = "expense_report.txt";
        document.body.appendChild(element);
        element.click();
      };
    
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
           {expenses?.length && <div className="row">
                <Button onClick={downloadTxtFile}>Download expense report</Button>
            </div>}
        </Box>
    );
}
