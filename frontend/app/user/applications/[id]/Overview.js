'use client'

import {
  Box,
  Typography,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material'

const Overview = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        backgroundColor: 'dashboard.main',
        padding: isMobile ? 1 : 2,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          color: 'primary.main',
          textAlign: isMobile ? 'center' : 'left',
          fontWeight: 600,
        }}
      >
        Overview
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'paperCommon.main',
          boxShadow: '0px 2px 6px primary.main33',
          overflowX: 'auto',
        }}
      >
        <Table>
          <TableBody>
            {[
              {
                title: 'Job description',
                content:
                  'An internship position for a frontend developer with a focus on learning and development. An internship position for a frontend developer with a focus on learning and development.An internship position for a frontend developer with a focus on learning and development.An internship position for a frontend developer with a focus on learning and development.An internship position for a frontend developer with a focus on learning and development.',
              },
              {
                title: 'Job link',
                content: (
                  <Link
                    href="https://www.lego.com/careers/intern-frontend"
                    target="_blank"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      wordBreak: 'break-word',
                    }}
                  >
                    https://www.lego.com/careers/intern-frontend
                  </Link>
                ),
              },
              {
                title: 'The expected salary',
                content: 'Unpaid',
              },
              {
                title: 'Applied date',
                content: '01.11.2024',
              },
              {
                title: 'Deadline for applying',
                content: '01.12.2024',
              },
              {
                title: 'Website company',
                content: (
                  <Link
                    href="https://www.lego.com"
                    target="_blank"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      wordBreak: 'break-word',
                    }}
                  >
                    https://www.lego.com
                  </Link>
                ),
              },
              {
                title: 'Location company',
                content: 'Billund, Denmark',
              },
              {
                title: 'Contact name',
                content: 'Ole Kirk Christiansen',
              },
              {
                title: 'Contact details',
                content: (
                  <>
                    <Typography>Phone: +45 79 50 60 70</Typography>
                    <Typography>Email: contact@lego.com</Typography>
                  </>
                ),
              },
            ].map(({ title, content }) => (
              <TableRow
                key={title}
                sx={{
                  display: isMobile ? 'block' : 'table-row',
                  padding: isMobile ? '8px 0' : 0,
                  borderBottom: isMobile ? '1px solid dashboard.main' : 'none',
                }}
              >
                <TableCell
                  sx={{
                    width: isMobile ? '100%' : '240px',
                    fontWeight: 600,
                    color: 'secondary.main',
                    borderBottom: isMobile
                      ? 'none'
                      : '1px solid dashboard.main',
                    padding: isMobile ? '4px' : '16px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    display: isMobile ? 'block' : 'table-cell',
                  }}
                >
                  {title}
                </TableCell>
                <TableCell
                  sx={{
                    borderBottom: isMobile
                      ? 'none'
                      : '1px solid dashboard.main',
                    padding: isMobile ? '4px' : '16px',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: theme.palette.primary.main,
                    display: isMobile ? 'block' : 'table-cell',
                  }}
                >
                  {content}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Overview
