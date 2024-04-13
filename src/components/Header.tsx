import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link as MuiLink,
} from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#424141", color: "#bfbcb8" }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color="inherit" component={MuiLink} href="/about-us">
          About Us
        </Button>
        <Button color="inherit" component={MuiLink} href="/contact">
          Contact
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
