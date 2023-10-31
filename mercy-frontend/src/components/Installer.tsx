import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Installer = () => {
  const handleInstallMetaMask = () => {
    window.open("https://metamask.io/download.html", "_blank", "noopener,noreferrer");
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
      <Typography variant="h4">To continue, please install MetaMask:</Typography>
      <img src="./metamask-fox.svg" alt="MetaMask Logo" style={{ width: "200px" }} />
      <Button
        variant="contained"
        color="primary" // Change this to the appropriate color
        onClick={handleInstallMetaMask}
      >
        Install MetaMask
      </Button>
    </Box>
  );
};

export default Installer;