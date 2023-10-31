import React, { useState } from "react";
import { Box, Button, LinearProgress, Alert, TextField, Typography } from "@mui/material";
import { useRegisterMutation } from "../api/fetchUserApi";
import { useAppDispatch, useTypedSelector } from "../hooks/store";
import { auth } from "../hooks/actions";

interface RegistrationProps {
  onRegistrationSuccess: () => void;
}

const Registration: React.FC<RegistrationProps> = ({ onRegistrationSuccess }) => {
  const [nric, setNric] = useState<string>("");
  const { active = "" } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [register, { data, isLoading, error, isSuccess }] = useRegisterMutation();
  const handleRegistration = async () => {
    try {
      const response = await register({ nric, walletAddress: active });
      if (isSuccess) {
        dispatch(auth({ walletAddress: active, nric }));
        onRegistrationSuccess();
      }
    } catch (error) {
      console.log("Error while registering user", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 2, textAlign: "center" }}>
      {isLoading && <LinearProgress sx={{ width: "100%" }} />}
      <Typography> Enter your NRIC in the box.</Typography>
      <TextField
        autoFocus
        margin="dense"
        id="nric"
        value={nric}
        placeholder="NRIC Number"
        fullWidth
        variant="outlined"
        onChange={(event) => setNric(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleRegistration}
        sx={{ marginTop: 2 }}
      >
        Register
      </Button>
      <Alert
        severity={isSuccess ? "success" : "error"}
        sx={{ marginTop: 2, borderRadius: 2, textAlign: "center" }}
      >
        {isSuccess ? data?.message : error?.data.error}
      </Alert>
    </Box>
  );
};

export default Registration;
