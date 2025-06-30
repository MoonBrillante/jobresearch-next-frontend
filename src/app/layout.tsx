import { ReactNode } from "react";
import { CssBaseline, AppBar, Toolbar, Typography, Container } from '@mui/material'
import ClientProviders from '@/components/ClientProviders';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProviders >
          <CssBaseline />
          <AppBar position="static" sx={{ bgcolor: 'warning.main' }}>
            <Toolbar>
              <Typography variant="h5">Job Research</Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            {children}
          </Container>
        </ClientProviders>
      </body>
    </html>
  )
}