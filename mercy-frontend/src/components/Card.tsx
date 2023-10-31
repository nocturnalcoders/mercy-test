import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Typography,
} from "@mui/material";

interface props {
  name: string;
  description: string;
  image: string;
}

const Cards: React.FC<props> = ({ name, description, image }) => {
  const imageUrl = image.replace("ipfs://", "");

  return (
    <Paper variant="outlined" square>
      <Card>
        <CardActionArea>
          <CardMedia component="img" image={`https://ipfs.io/ipfs/${imageUrl}`} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="inherit">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="inherit">
            View Meta
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default Cards;
