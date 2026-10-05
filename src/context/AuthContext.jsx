import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (storedUser) {
        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);
      }
    } catch (error) {
      console.error(
        "Failed to restore user:",
        error
      );

      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (
    email,
    password
  ) => {
    if (
      email === "admin@example.com" &&
      password === "123456"
    ) {
      const userData = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "Administrator",
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setUser(userData);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message:
        "Invalid email or password.",
    };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}