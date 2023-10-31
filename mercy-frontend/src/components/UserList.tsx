import React, { useEffect, useState } from "react";
import { Box, Grid, LinearProgress } from "@mui/material";
import { useTypedSelector } from "../hooks/store";
import { getTokens } from "./Util";
import Card from "./Card";

function LoadingIndicator() {
  return <LinearProgress />;
}

function UserListCard({ nft }) {
  return <Card {...nft.metadata} />;
}

function UserList() {
  const [nfts, setNFTs] = useState<any>([]);
  const { isAuth, active = "" } = useTypedSelector((state) => state.user);

  useEffect(() => {
    async function fetchUserNFTs() {
      if (active && isAuth) {
        const ownedTokens = await getTokens(active);
        setNFTs(ownedTokens);
      }
    }

    fetchUserNFTs();
  }, [active, isAuth]);

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        m: "auto",
        paddingTop: "15px",
        width: "fit-content",
      }}
    >
      <Grid container>
        {nfts.length === 0 && <LoadingIndicator />}
        {nfts.map((nft: any, index: number) => (
          <Grid key={index}>
            <UserListCard nft={nft} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UserList;
