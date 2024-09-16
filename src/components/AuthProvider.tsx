"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string) => void;
  logout: () => void;
  logingRequiredRedirect: () => void;
  username: string | null;
}

const LOCAL_STORAGE_KEY = "is_logged_in";
const LOGOUT_REDIRECT_URL = "/login";
const LOGGING_REDIRECT_URL = "/";
const LOGGING_REQUIRED_URL = "/login";
const LOCAL_STORAGE__USERNAME_KEY = "username";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>("");

  useEffect(() => {
    const loginStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
    const username = localStorage.getItem(LOCAL_STORAGE__USERNAME_KEY);

    if (loginStatus) {
      const loginKeyValue = parseInt(loginStatus);
      setIsAuthenticated(loginKeyValue === 1);
      setUsername(username);
    }
  }, []);

  const login = (username: string) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
    localStorage.setItem(LOCAL_STORAGE__USERNAME_KEY, `${username}`);

    const nextUrl = searchParams.get("next");

    const invalidNextUrl = ["/login", "/logout"];
    const nextUrlValid =
      nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);

    if (nextUrlValid) {
      router.replace(nextUrl);
      window.location.href = nextUrl;
      return;
    } else {
      router.replace(LOGGING_REDIRECT_URL);
      return;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const logingRequiredRedirect = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");
    let loginWithNextUrl = `${LOGGING_REQUIRED_URL}?next=${pathname}`;

    if (LOGGING_REQUIRED_URL === pathname) {
      loginWithNextUrl = `${LOGGING_REQUIRED_URL}`;
    }
    router.replace(loginWithNextUrl);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        logingRequiredRedirect,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
