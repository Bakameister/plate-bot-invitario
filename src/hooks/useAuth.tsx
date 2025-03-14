
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
  hasRole: (roleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("discord_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("discord_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // This would normally call the Discord API
      // For this demo, we're just doing basic validation
      if (username.length <= 2 || password.length <= 2) {
        throw new Error("Invalid credentials");
      }

      const expectedRoleId = localStorage.getItem("discord_role_id");
      if (!expectedRoleId) {
        throw new Error("No role ID configured for verification");
      }

      // Mock user object with the expected role
      const user = {
        id: "1234567890",
        username,
        roles: [expectedRoleId] // Mock that user has the expected role
      };

      localStorage.setItem("discord_user", JSON.stringify(user));
      setUser(user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("discord_user");
    setUser(null);
    toast.info("Has cerrado sesión");
    navigate("/login");
  };

  const hasRole = (roleId: string) => {
    if (!user) return false;
    return user.roles.includes(roleId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
