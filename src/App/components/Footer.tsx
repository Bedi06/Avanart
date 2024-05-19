import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        bgcolor: "black",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Typography variant="body2" color="#424141">
        © 2024 Avanart. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
