import { createContext, useState, useEffect } from "react";
import { loginWithGoogle, logout, loginWithEmail } from "../auth-util";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(auth?.currentUser);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userData, setUserData] = useState(null);
  const googleLogin = loginWithGoogle;
  const signOut = logout;
  const login = loginWithEmail;
  const anonymous = { isAnonymous, setIsAnonymous };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        googleLogin,
        signOut,
        login,
        anonymous,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
