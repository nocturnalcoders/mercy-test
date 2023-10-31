import { useState } from "react";
import { Header } from "./components/Header";
import Image from "./components/Image";
import UserList from "./components/UserList";
import Installer from "./components/Installer";
import Registration from "./components/Registration";
import { Alert, AlertTitle, Box, Grid } from "@mui/material";
import { useUserQuery } from "./api/fetchUserApi";
import { useAppDispatch, useTypedSelector } from "./hooks/store";
export const contractAddress = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;


const customStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50hv",
    padding: "16px",
  },
  connectWalletBox: {
    backgroundColor: "#fff",
    padding: "16px",
    textAlign: "center",
  },
  alertBox: {
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
  },
};


export const Home = () => {
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const {
    isAuth,
    active,
    userNftList = [],
  } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useUserQuery(active, {
    skip: !active,
  });



  if (!window.ethereum) {
    return <Installer />;
  }
  const displayNftListComponent =
    isAuth && active && userNftList.length > 0;
  return (
    <Box sx={customStyles.container}>
      <Header />
      {isAuth && userNftList.length === 0 && <NftMindBox />}
      {displayNftListComponent && registrationSubmitted && <UserList />}
      <Box hidden={!!active}>
        <Box sx={customStyles.alertBox}>
          <Alert
            severity={isAuth ? "success" : "error"}
            sx={{
              backgroundColor: isAuth ? "#4caf50" : "#f44336",
              color: "#fff",
              borderRadius: "4px",
              padding: "12px",
              textAlign: "center",
            }}
          >
            <AlertTitle>
              {isAuth
                ? "Successfully Connected!"
                : "Need to Register for Minting!"}
            </AlertTitle>
          </Alert>
        </Box>
      </Box>
    </Box>
  );
};

const NftMindBox = () => {
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const handleRegistrationSubmit = () => {
    setRegistrationSubmitted(true);
  };
  return (
    <Box>
      <Grid item>
        <Registration
          onSubmit={handleRegistrationSubmit} // Pass onSubmit function
        />
      </Grid>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          bgcolor: "background.paper",
        }}
      >

        <Grid container justifyContent="center">
          <Image />
        </Grid>
      </Box>
    </Box>
  );
};