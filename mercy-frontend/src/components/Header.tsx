import React, { useEffect } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import { useAppDispatch, useTypedSelector } from "../hooks/store";
import { walletConnector, getTheContract } from "../connector";
import { auth, wallet } from "../hooks/actions";
import { User, useUserQuery } from "../api/fetchUserApi";

export const Header = () => {
  const { user, active } = useTypedSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // Fetch user data for the connected wallet
  const { data: ownerData = {}, isLoading: ownerDataLoading, isSuccess: ownerDataSuccess } =
    useUserQuery(active, {
      skip: !active,
    });

  // Function to connect to a wallet
  const connectToWallet = async () => {
    const { account, balance } = await walletConnector();
    dispatch(wallet(account));
  };

  const getUserNfts = async () => {
    if (user) {
      const { contract } = await getTheContract();
      const userNfts = await contract.getOwnedTokens(user.walletAddress);
      console.log("User NFTs: ", userNfts);
      dispatch(user(userNfts));
    }
  };

  useEffect(() => {
    if (ownerDataSuccess) {
      const owner = ownerData.data as User;
      dispatch(auth({ ...owner }));
    }
  }, [ownerData, ownerDataSuccess]);

  useEffect(() => {
    if (user) {
      getUserNfts();
    }
  }, [user]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "black",
        }}
      >
        <Toolbar>
          <Button
            variant="contained"
            color="primary"
            onClick={connectToWallet}
            startIcon={<WalletOutlinedIcon />}
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "#333",
              color: "#fff",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            {active ? `${active}` : `Connect Wallet`}
          </Button>
        </Toolbar>
      </AppBar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={ownerDataLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Header;
