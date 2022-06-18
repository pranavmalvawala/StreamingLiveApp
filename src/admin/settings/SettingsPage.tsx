import { Box, Grid, Icon } from "@mui/material";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { Services, Links, Tabs, External, Pages } from "./components"

export const SettingsPage: React.FC = () => (
  <Box sx={{ display: "flex", backgroundColor: "#EEE" }}>
    <Wrapper>
      <h1><Icon>live_tv</Icon> Admin Settings</h1>
      <Grid container spacing={3}>
        <Grid item md={8} xs={12}>
          <Services />
          <Pages />
        </Grid>
        <Grid item md={4} xs={12}>
          <Links />
          <Tabs />
          <External />
        </Grid>
      </Grid>
    </Wrapper>
  </Box>
)
