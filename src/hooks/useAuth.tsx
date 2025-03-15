
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  roles: string[];
  avatar?: string;
  rankId?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
  hasRole: (roleId: string) => boolean;
  hasMinimumRank: (rankId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock ranks in ascending order (1 is lowest, 7 is highest)
const RANKS = [
  { id: "rank1", name: "Novato", minRole: "1026983591978221588", image: "/ranks/rank1.png" },
  { id: "rank2", name: "Aprendiz", minRole: "1026983591978221588", image: "/ranks/rank2.png" },
  { id: "rank3", name: "Iniciado", minRole: "1026983591978221588", image: "/ranks/rank3.png" },
  { id: "rank4", name: "Experto", minRole: "1026983591978221588", image: "/ranks/rank4.png" },
  { id: "rank5", name: "Maestro", minRole: "1026983591978221588", image: "/ranks/rank5.png" },
  { id: "rank6", name: "Leyenda", minRole: "1026983591978221588", image: "/ranks/rank6.png" },
  { id: "rank7", name: "Divinidad", minRole: "1026983591978221588", image: "/ranks/rank7.png" },
];

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
      // This would normally call the MongoDB API via Discord bot command
      // For this demo, we're just doing basic validation
      if (username.length <= 2 || password.length <= 2) {
        throw new Error("Credenciales inválidas");
      }

      const expectedRoleId = localStorage.getItem("discord_role_id");
      if (!expectedRoleId) {
        throw new Error("No role ID configured for verification");
      }

      // Determine user's rank - simulate rank assignment
      // In a real app, this would come from MongoDB
      const userRank = RANKS[Math.min(Math.floor(Math.random() * RANKS.length), RANKS.length - 1)];
      
      // Mock user object with the expected role and rank
      const user = {
        id: "1026983591978221588",
        username,
        roles: [expectedRoleId],
        avatar: "/placeholder-avatar.png",
        rankId: userRank.id
      };

      localStorage.setItem("discord_user", JSON.stringify(user));
      setUser(user);
      
      // No realizamos la navegación aquí para permitir que el componente Login la maneje
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

  const hasMinimumRank = (rankId: string) => {
    if (!user || !user.rankId) return false;
    
    const userRankIndex = RANKS.findIndex(rank => rank.id === user.rankId);
    const requiredRankIndex = RANKS.findIndex(rank => rank.id === rankId);
    
    if (userRankIndex === -1 || requiredRankIndex === -1) return false;
    
    return userRankIndex >= requiredRankIndex;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
        hasMinimumRank
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
