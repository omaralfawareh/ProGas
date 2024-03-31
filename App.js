import { AuthContextProvider } from "./store/auth-context";
import Index from "./screens/index";
export default function App() {
  return (
    <AuthContextProvider>
      <Index />
    </AuthContextProvider>
  );
}
