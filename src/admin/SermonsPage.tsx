import { Box, Grid, Icon } from "@mui/material";
import React from "react";
import { Sermons } from "./components/Sermons";
import { Playlists } from "./components/Playlists";
import { Wrapper } from "./components/Wrapper";
import { ImageEditor } from "../appBase/components";

export const SermonsPage: React.FC = () => {

  const [photoUrl, setPhotoUrl] = React.useState<string>(null);
  const [photoType, setPhotoType] = React.useState<string>(null);

  const handlePhotoUpdated = (dataUrl: string) => {
    setPhotoUrl(dataUrl);
    setPhotoType(null);
  }

  const imageEditor = (photoType !== null) && (
    <ImageEditor
      aspectRatio={16 / 9}
      photoUrl={photoUrl}
      onCancel={() => setPhotoUrl(null)}
      onUpdate={handlePhotoUpdated}
      outputWidth={640}
      outputHeight={360}
    />
  );

  const showPhotoEditor = (pType: string, url: string) => {
    setPhotoUrl(url);
    setPhotoType(pType);
  }

  return (<Box sx={{ display: "flex", backgroundColor: "#EEE" }}>
    <Wrapper>
      <h1><Icon>live_tv</Icon> Manage Sermons</h1>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Sermons showPhotoEditor={showPhotoEditor} updatedPhoto={(photoType === "sermon" && photoUrl) || null} />
        </Grid>
        <Grid item md={4} xs={12}>
          {imageEditor}
          <Playlists showPhotoEditor={showPhotoEditor} updatedPhoto={(photoType === "playlist" && photoUrl) || null} />
        </Grid>
      </Grid>
    </Wrapper>
  </Box>);
}
