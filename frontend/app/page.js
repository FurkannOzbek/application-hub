"use client";
import { Box, Typography, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const theme = useTheme();
  return (
  <> 
    <Box component="main">
      <Container>
        <Typography>welcome to the FONA App</Typography>
      </Container>

    </Box>
 
  </>

  );
}