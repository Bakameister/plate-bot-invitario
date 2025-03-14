
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BadgeCardProps {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
}

const rarityConfig = {
  common: {
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    label: 'Común'
  },
  rare: {
    color: 'bg-blue-100 text-blue-600 border-blue-200',
    label: 'Raro'
  },
  epic: {
    color: 'bg-purple-100 text-purple-600 border-purple-200',
    label: 'Épico'
  },
  legendary: {
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    label: 'Legendario'
  }
};

const BadgeCard: React.FC<BadgeCardProps> = ({ 
  id, 
  name, 
  description, 
  rarity, 
  imageUrl 
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const rarityData = rarityConfig[rarity];

  return (
    <Card className="overflow-hidden glass hover:shadow-elevation transition-all duration-300 transform hover:-translate-y-1 h-full">
      <div className="relative">
        <div className={cn(
          "w-full h-48 bg-gradient-to-b from-bot-light to-bot-silver/30 flex items-center justify-center overflow-hidden",
          !isImageLoaded && "animate-pulse"
        )}>
          <img
            src={imageUrl}
            alt={name}
            className={cn(
              "w-32 h-32 object-contain transition-all duration-500",
              isImageLoaded ? "image-loaded" : "image-loading"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        <Badge className={cn(
          "absolute top-3 right-3 border",
          rarityData.color
        )}>
          {rarityData.label}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-medium text-bot-dark mb-1">{name}</h3>
        <p className="text-sm text-bot-text/80">{description}</p>
      </CardContent>
    </Card>
  );
};

export default BadgeCard;
