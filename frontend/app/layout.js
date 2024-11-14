import ThemeApp from '@/components/styles/ThemeApp'
import NavBar from '@/components/ui/NavBar'
import Footer from '@/components/ui/Footer'
import { Box } from '@mui/material'

export const metadata = {
  title: 'ApplicationHub App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <ThemeApp>
            <NavBar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              {children}
            </Box>
            <Footer />
          </ThemeApp>
        </Box>
      </body>
    </html>
  )
}
