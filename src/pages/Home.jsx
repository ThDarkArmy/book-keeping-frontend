import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate , Link} from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Card, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField , DialogActions} from "@mui/material";
import axios from 'axios'

const BASE_URL = "http://localhost:5678/api/v1";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Home = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false)
  const [name, setName] = useState()
  const [mobile, setMobile] = useState()
  const [customers, setCustomers] = useState(null)
  const [give, setGive] = useState(0)
  const [get, setGet] = useState(0)

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login-register");
    }
    loadCustomerData()
  }, []);


  const loadCustomerData = async ()=> {
    try{
        const response = await axios({
            method: "get",
            url: BASE_URL + "/debitCreditHolders",
            headers: { "Authorization": localStorage.getItem("token")},
          });

          let customersData = response.data.body
          localStorage.setItem("custNum", customersData.length)
          let getAmt=0
          let giveAmt=0
          for(let i=0;i<customersData.length;i++){
            if(customersData[i].type==='DEBIT'){
              giveAmt = giveAmt + customersData[i].amount
            }else{
              getAmt = getAmt + customersData[i].amount
            }
          }
          setGive(Math.abs(giveAmt))
          setGet(Math.abs(getAmt))

          // console.log(response.data)
          setCustomers(response.data.body)
         
    }catch(err){ 
        console.log(err.response)
    }
  }

  const handleAddCustomer = async ()=> {
        const customerData = {
            name: name,
            mobile: mobile
        }

        console.log(customerData)
        try {
          const response = await axios({
            method: "post",
            url: BASE_URL + "/debitCreditHolders",
            data: JSON.stringify(customerData),
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          });
          console.log(response.data);
        } catch (err) {
          console.log(err.response);
        }

    handleClose()
  }

  const handleClickOpen = ()=> {
      setOpen(true)
  }

  const handleClose = ()=> {
    setOpen(false)
  }

  // handle cell click
  const handleRowClick = (id)=> {
    navigate("/customer/"+id)
  }

  return (
    <div>
      <Header />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle><Typography style={{color: 'red'}}>BookKeeping</Typography></DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a customer
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e)=> setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="mobile"
              label="Mobile Number"
                type="text"
              fullWidth
              variant="standard"
              onChange={(e)=> setMobile(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCustomer}>Add Customer</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div style={{ marginTop: 90, marginLeft: 260, marginRight: 100 }}>
       <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Card sx={{ padding: 5, width: 100 }}>
            <Typography>Net Balance</Typography>
            <Typography>{get-give}</Typography>
          </Card>
          <Card sx={{ padding: 5, width: 100 }}>
            <Typography>You Will Get</Typography>
            <Typography>{get}</Typography>
          </Card>
          <Card sx={{ padding: 5, width: 100 }}>
            <Typography>You will Give</Typography>
            <Typography>{give}</Typography>
          </Card>
        </Box>
      </div>
      <div style={{ marginTop: 50, marginLeft: 260 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Customers List</Typography>
          <Button onClick={handleClickOpen} variant="contained" style={{ backgroundColor: "#340FB8" }}>
            +Add Customer
          </Button>
        </Box>
      </div>
      <div style={{ marginTop: 10, marginLeft: 260 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align="left">Transaction Type</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            {customers && <TableBody>
              {customers.map((customer) => (
            
                <StyledTableRow onClick={()=> handleRowClick(customer._id)}  hover={true} key={customer._id}>
                  <StyledTableCell component="th" scope="row">
                    {customer.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{customer.type}</StyledTableCell>
                  <StyledTableCell align="left">{Math.abs(customer.amount)}</StyledTableCell>
                </StyledTableRow>
                
              ))}
            </TableBody>}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Home;
