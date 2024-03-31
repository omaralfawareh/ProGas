import { createContext, useState, useEffect, useContext } from "react";
import { loginWithGoogle, logout, loginWithEmail } from "../auth-util";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(auth?.currentUser);
  const googleLogin = loginWithGoogle;
  const signOut = logout;
  const login = loginWithEmail;
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // console.log(user);
    return () => unsubscribe();
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, googleLogin, signOut, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
