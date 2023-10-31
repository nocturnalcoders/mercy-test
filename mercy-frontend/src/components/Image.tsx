import { useRef, useState } from "react";
import { ethers } from "ethers";
import { File as NFTFile, NFTStorage } from "nft.storage";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useTypedSelector } from "../hooks/store";
import { address, getTheContract } from "../connector";

export const StorageAPI = import.meta.env.VITE_NFT_STORAGE_API_KEY;

export const Image = () => {
  const [isMinted, setIsMinted] = useState(false);
  const [metaURI, setMetaURI] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Fixed typo in state variable name
  const [uploadImage, setUploadImage] = useState<any>(null);
  const [ipfsImage, setIpfsImage] = useState<any>(null);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const { user, active } = useTypedSelector((state) => state.user);
  const [minting, setMinting] = useState(false);

  const uploadImageStorage = async () => {
    const onlineStorage = new NFTStorage({
      token: StorageAPI,
    });
    const { ipnft } = await onlineStorage.store({
      image: new NFTFile([ipfsImage], "image.png", { type: "image/png" }),
      name: name,
      description: description,
    });
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    console.log(url);
    setMetaURI(url);
    return url;
  };

  const uploadImageFromBrowser = async (e: any) => {
    setIpfsImage(e);
    setUploadImage(URL.createObjectURL(e));
  };

  const mintToken = async () => {
    if (!description && !name) {
      setDescriptionError("Description is required!");
      setNameError("Name is required!");
      return;
    }
    if (!description) {
      setDescriptionError("Description is required!");
      return;
    }
    if (!name) {
      setNameError("Name is required!");
      return;
    }

    setMinting(true);
    const ipfsURI = await uploadImageStorage();
    const { contract } = await getTheContract();
    const result = await contract.payToMint(active, ipfsURI, {
      value: ethers.utils.parseEther("0.05"),
      gasLimit: 300000,
    });
    await result.wait();
    console.log(ipfsURI + ": ipfsURI");
    const owned = await contract.isContentOwned(ipfsURI);
    const balance = await contract.balanceOf("0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc", 1);
    console.log(owned + ": owned");
    console.log(balance + ": balance");
    setIsMinted(result);
    setMinting(false);
  };

  return (
    <Box
      component="form"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Backdrop
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={minting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <img
        style={{ maxWidth: "100%", height: "auto" }}
        src={uploadImage ?? "./image/placeholder.png"}
        alt="NFT"
      />
      <Typography variant="body2">{metaURI}</Typography> {/* Display the ipfsURI */}
      <FileUploadButton
        variant="contained"
        color="primary"
        sx={{ marginTop: "30px" }}
        onFileSelect={uploadImageFromBrowser}
      />
      <TextField
        name="name"
        variant="outlined"
        error={Boolean(nameError)}
        label="Name"
        helperText={nameError}
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setNameError("");
        }}
        sx={{ width: "100%", marginTop: "16px" }}
      />
      <TextField
        name="description"
        error={Boolean(descriptionError)}
        label="Description"
        variant="outlined"
        multiline
        rows={3}
        helperText={descriptionError}
        value={description}
        onChange={(event) => {
          setDescription(event.target.value); // Fixed typo in function name
          setDescriptionError("");
        }}
        sx={{ width: "100%", marginTop: "16px" }}
      />
      {!isMinted && (
        <Button
          variant="contained"
          color="primary"
          onClick={mintToken}
          disabled={!uploadImage || !name || !description}
          sx={{ marginTop: "16px" }}
        >
          Mint!
        </Button>
      )}
      {
          metaURI ? (
            <Grid>
              <div>
              <h1>Minted NFT</h1>
              <div>
                <img  style={{ height: "400px", width: "500px" }}
              src={metaURI}
              alt={`NFT #`}/>
              </div>
              </div>
              </Grid>
          ) : (<Grid></Grid>)
        }
    </Box>
  );
};

export default Image;
const FileUploadButton = ({ onFileSelect }: any) => {
  const fileInputRef = useRef<any>(null);
  const [previewImage, setPreviewImage] = useState<any>(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event: any) => {
    const file = event.target.files[0];
    onFileSelect(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
        accept="image/*"
      />
      <Button
        variant="outlined"
        color="inherit"
        component="label"
        onClick={handleButtonClick}
      >
        <Typography>Upload the Image</Typography>
      </Button>
    </>
  );
};