import React from 'react'
import WhyChooseCard from './WhyChooseCard'
import TestimonialComponent from './Testimonial'
import OverviewImageCard from './Overview'
import { Box, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import Introduction from './Introduction'
import CardLeftCurve from '../ui/CardLeftCurve'
import CardRightCurve from '../ui/CardRightCurve'
import FeaturesLine from './FeaturesLine'
import HomePageParallax from './Parallax'

export default function HomePage() {
  return (
    <Box>
      <Introduction />
      <FeaturesLine />
      <CardLeftCurve
        width="100%"
        backgroundColor="background.cardYellow"
        padding="40px 0"
        margin="20px 0"
        sx={{
          overflowX: 'hidden', // Prevent horizontal scroll from child components
        }}
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{ maxWidth: '1200px', margin: '0 auto' }}
        >
          <Grid xs="auto" sm={6} md={4}>
            <WhyChooseCard />
          </Grid>

          <Grid xs={12} sm={6} md={4}>
            <OverviewImageCard />
          </Grid>
        </Grid>
      </CardLeftCurve>
      <HomePageParallax />
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        color="text.primary"
        sx={{
          textAlign: 'center',
        }}
      >
        Testimonials
      </Typography>
      <CardRightCurve
        width="100%"
        sx={{
          overflowX: 'hidden', // Prevent horizontal scroll from child components
        }}
      >
        <TestimonialComponent />
      </CardRightCurve>
    </Box>
  )
}
