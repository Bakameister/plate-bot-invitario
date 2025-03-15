
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface RankAvatarProps {
  className?: string;
}

// Definición de los rangos y sus imágenes
const rankImages = [
  { id: "rank1", image: "/ranks/rank1.png" },
  { id: "rank2", image: "/ranks/rank2.png" },
  { id: "rank3", image: "/ranks/rank3.png" },
  { id: "rank4", image: "/ranks/rank4.png" },
  { id: "rank5", image: "/ranks/rank5.png" },
  { id: "rank6", image: "/ranks/rank6.png" },
  { id: "rank7", image: "/ranks/rank7.png" },
];

const RankAvatar: React.FC<RankAvatarProps> = ({ className = "" }) => {
  const { user } = useAuth();
  
  // Encontrar la imagen correspondiente al rango del usuario o usar imagen por defecto
  const rankImage = user?.rankId 
    ? rankImages.find(rank => rank.id === user.rankId)?.image || "/ranks/rank1.png"
    : "/ranks/rank1.png";
  
  return (
    <div className={`relative ${className}`}>
      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#f5f0dc]/30 shadow-md">
        <img 
          src={rankImage} 
          alt={`Rango de ${user?.username || 'Usuario'}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/ranks/rank1.png";
          }}
        />
      </div>
      {user?.username && (
        <span className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-[#3a3325]"></span>
      )}
    </div>
  );
};

export default RankAvatar;
