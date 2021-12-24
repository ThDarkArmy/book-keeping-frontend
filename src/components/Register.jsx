import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from '@mui/material/Alert';

const BASE_URL = "http://localhost:5678/api/v1";

const theme = createTheme();

export default function Register({ handleHaveAccount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName")
    });

    const data = {
        email: formData.get("email"),
      password: formData.get("password"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName")
    }
    try {
      const response = await axios({
        method: "post",
        url: BASE_URL + "/users/register",
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if(response.data.success){
          setSuccess(true)
      }

      setTimeout(()=> setSuccess(false), 5000)
      console.log("Response Data", response.data);
    } catch (err) {

        setError(true)
        setTimeout(()=> setError(false), 5000)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{marginTop: 70}} component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {error && <Alert severity="error">Error occured, while registering</Alert>}
        {success && <Alert severity="success">Registration successful, please check your email to confirm.</Alert>}
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() => setShowPassword(!showPassword)}
                      value={showPassword}
                      color="primary"
                    />
                  }
                  label="Show Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              // onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => handleHaveAccount(true)}>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
