import React from "react";
import { Box } from "@mui/material";
import Home from "./home";
import AppRoute from "./routes/route";

const App = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <AppRoute />
    </Box>
  );
};

export default App;
