import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics'; // Import the hook

const App = ({ Component, pageProps }) => {
  useGoogleAnalytics(); // Use the Google Analytics hook

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;