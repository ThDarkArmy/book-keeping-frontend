import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  TextField,
  Paper,
  Drawer,
  Toolbar,
  List,
  ListItem,
  Divider,
  ListItemText,
  Avatar,
  Card,
  Button
} from "@mui/material";
import { ListItemIcon} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  paper: {
    backgroundColor: ""
  },
  title: {},
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  marginTop: 50,
  backgroundColor:"#081421",
  paddingBottom: 8,
  paddingTop: 8,
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

export default function PrimarySearchAppBar() {

  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="fixed" style={{ background: "#081421" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            BookKeeping
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Paper sx={{ padding: 1, background: "#162F3C" }}>
              <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
              <Avatar src="R" alt={localStorage.getItem("name")} color="#fff" style={{backgroundColor:"green" }} />
              <Typography style={{color: "#fff", marginLeft: 10}}>{localStorage.getItem("name")}</Typography>
              </Box>
           
            </Paper>
          </Box>}
        </Toolbar>
      </AppBar>
      {isLoggedIn && <Box
      >
        <Drawer
          classes={{ paper: classes.paper }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md:"block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "20%" },
          }}
          open
        >
          <DrawerHeader sx={{ marginTop: 0, marginLeft: 0 }}>
            <IconButton
              
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2}}
              style={{marginLeft: 5}}
            >
              <MenuIcon style={{color: '#fff'}} />
            </IconButton>

            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              component="div"
              style={{color: '#fff', marginLeft: 5}}
            >
              BookKeeping
            </Typography>
          </DrawerHeader>
          <Toolbar>
            <Divider />
            <Box display="flex" flexDirection="column">
            <Card variant="outlined" style={{width: 255, marginLeft: -25}}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-between" style={{padding:30, backgroundColor: "#162F3C"}}>
              <Avatar src="R" alt={localStorage.getItem("name")} color="#fff" style={{backgroundColor:"blue" }} />
              <Typography style={{marginTop: 20, fontWeight:"bold", color: "#fff"}}>{localStorage.getItem('name')}</Typography>
              <Typography style={{marginTop: 10, fontSize:14, color: '#fff'}}>{localStorage.getItem('custNum')} Customers</Typography>
              
              </Box>
              
            </Card>
            <List>
                  <ListItem button onClick={()=> navigate("/")}>
                    <ListItemIcon>
                      <HomeIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Home"} />
                   
                  </ListItem>
                  <Divider/>
                  <ListItem button>
                    <ListItemIcon>
                      <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Settings"} />
                   
                  </ListItem>
                  <Divider/>
                  <ListItem button onClick={()=> navigate('/about')}>
                    <ListItemIcon>
                      <InfoIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"About"} />
                   
                  </ListItem>
                  <Divider/>
                
            </List>
            <Button onClick={()=> {
              localStorage.clear()
              navigate("/login-register")
              }} variant="contained" style={{backgroundColor: "#A62322"}}>Logout</Button>
            </Box>
           
          </Toolbar>
        </Drawer>
      </Box>}
    </Box>
  );
}
