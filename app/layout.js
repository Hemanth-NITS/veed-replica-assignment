import '../styles/globals.css';
import { MantineProvider, createTheme } from '@mantine/core';

export const metadata = {
  title: 'Veed Replica',
  description: 'A replica using Next.js 13 App Router',
};

const customTheme = createTheme({
  /** Customize your theme here */
  fontFamily: 'Inter, sans-serif',
  colors: {
    brand: ['#F0F8FF', '#D1E9FF', '#A4CAFF', '#78ABFF', '#4C8CFF', '#216DFF', '#1859CC', '#104699', '#082D66', '#001933'],
  },
  primaryColor: 'brand',
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}