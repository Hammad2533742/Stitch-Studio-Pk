import { createContext, useContext } from 'react';
const AuthContext = createContext({ isLoadingAuth: false, isLoadingPublicSettings: false, authError: null, navigateToLogin: () => {} });
export function AuthProvider({ children }) { return <AuthContext.Provider value={{ isLoadingAuth: false, isLoadingPublicSettings: false, authError: null, navigateToLogin: () => {} }}>{children}</AuthContext.Provider>; }
export const useAuth = () => useContext(AuthContext);
