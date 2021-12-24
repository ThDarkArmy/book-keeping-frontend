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
} from "@mui/material";
import { ListItemIcon} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { styled, useTheme } from "@mui/material/styles";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "red"
  },
  title: {},
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  marginTop: 50,
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <div style={{ marginLeft: "20%", width: "35%" }}>
            <TextField
              placeholder="Search.."
              sx={{ color: "#fff" }}
              fullWidth
              InputProps={{
                classes: {
                  notchedOutline: {
                    borderWidth: "1px",
                    borderColor: "white",
                  },
                },
              }}
              size="small"
              id="outlined-basic"
              variant="outlined"
            />
          </div>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Paper sx={{ padding: 1 }}>
              <Typography>Myaka Archana</Typography>
            </Paper>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        // component="nav"
        // sx={{ width: { sm: "20%" }, flexShrink: { sm: 0 }, marginTop: 100 }}
        // aria-label="mailbox folders"
      >
        <Drawer
          classes={{ paper: classes.paper }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "20%" },
          }}
          open
        >
          <DrawerHeader sx={{ marginTop: 0, marginLeft: 0 }}>
            <IconButton
              onClick={"handleDrawerClose"}
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon style={{ color: "#181A1B" }} />
            </IconButton>

            {/* <img src={TitleLogo} alt="logo" className={"classes.logo"} /> */}
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              component="div"
              sx={{ marginLeft: -2, marginRight: 0 }}
              style={{ color: "#181A1B" }}
            >
              BookKeeping
            </Typography>
          </DrawerHeader>
          <Toolbar>
            <Divider />
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                )
              )}
            </List>
          </Toolbar>
        </Drawer>
      </Box>
    </Box>
  );
}
