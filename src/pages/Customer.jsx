import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "http://localhost:5678/api/v1";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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

const Customer = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState();
  const [transactionType, setTransactionType] = useState();
  const [customerTransactions, setCustomerTransactions] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [netAmt, setNetAmt] = useState(0)
  const [getGive, setGetGive] = useState("give")

  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      navigate("/login-register");
    }
    loadCustomerTransaction(params.custId);
  }, []);

  const loadCustomerTransaction = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: BASE_URL + "/transactions/" + id,
        headers: { Authorization: localStorage.getItem("token") },
      });

      let tData = response.data.body.transactions
      let totalNetAmt = 0
      for(let i=0;i<tData.length;i++){
          if(tData[i].type==='DEBIT'){
              totalNetAmt = totalNetAmt - tData[i].amount
          }else{
            totalNetAmt = totalNetAmt + tData[i].amount
          }
      }
      console.log("Total amt", totalNetAmt)
      if(totalNetAmt>0){
          setGetGive("get")
      }else{
        setGetGive("give")
      }

      setNetAmt(Math.abs(totalNetAmt))


      setCustomerTransactions(response.data.body);
      setTransactionData(response.data.body.transactions);
      
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleAddTransaction = async () => {
    const transactionData = {
      amount: amount,
      type: transactionType,
      id: params.custId,
    };

    console.log(transactionData);

    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/transactions",
        data: JSON.stringify(transactionData),
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      let t = transactionData;
      t.push(response.data.body);
      setTransactionData(t);
      console.log(response.data);
    } catch (err) {
      console.log(err.response);
    }

    handleClose();
  };

  const handleSelectChange = (event) => {
    setTransactionType(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Header />
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography style={{ color: "red" }}>BookKeeping</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Add a transaction</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setAmount(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Transaction Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={transactionType}
                label="Age"
                onChange={handleSelectChange}
              >
                <MenuItem value={"DEBIT"}>DEBIT</MenuItem>
                <MenuItem value={"CREDIT"}>CREDIT</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddTransaction}>Add Transaction</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
      {customerTransactions && (
        <div style={{ marginTop: 90, marginLeft: 260, marginRight: 100 }}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Card sx={{ padding: 5, maxWidth: 200 }}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar
                  src="R"
                  alt={customerTransactions.name}
                  color="#fff"
                  style={{ backgroundColor: "red" }}
                />
                <Typography style={{ marginLeft: 15 }}>
                  {customerTransactions.name}
                </Typography>
              </Box>
            </Card>
            <Card sx={{ padding: 5, width: 100 }}>
              <Typography>You will {getGive}</Typography>
              <Typography>{netAmt}</Typography>
            </Card>
          </Box>
        </div>
      )}
      <div style={{ marginTop: 50, marginLeft: 260 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Transactions List</Typography>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            style={{ backgroundColor: "#340FB8" }}
          >
            +Add Transaction
          </Button>
        </Box>
      </div>
      <div style={{ marginTop: 10, marginLeft: 260 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell align="left">Transaction Type</StyledTableCell>
                <StyledTableCell align="left">Amount</StyledTableCell>
              </TableRow>
            </TableHead>
            {transactionData && (
              <TableBody>
                {transactionData.map((transaction) => (
                  <StyledTableRow key={transaction._id}>
                    <StyledTableCell component="th" scope="row">
                      {new Date(transaction.createdAt).getDate() +
                        " " +
                        monthNames[new Date(transaction.createdAt).getMonth()] +
                        ", " +
                        new Date(transaction.createdAt).getFullYear()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {transaction.type}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {transaction.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Customer;
