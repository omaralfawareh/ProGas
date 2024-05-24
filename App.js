import { AuthContextProvider } from "./store/auth-context";
import { ThemeProvider } from "./store/theme-context";

import Index from "./screens/index";
export default function App() {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <Index />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
