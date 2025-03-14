
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryItemProps {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  isEquipped?: boolean;
}

const InventoryItem: React.FC<InventoryItemProps> = ({
  id,
  name,
  description,
  quantity,
  imageUrl,
  isEquipped = false
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 transform hover:-translate-y-1 h-full",
      isEquipped ? "glass shadow-elevation" : "bg-white shadow-subtle"
    )}>
      <div className="relative">
        <div className={cn(
          "w-full h-40 bg-gradient-to-b from-bot-light to-white flex items-center justify-center overflow-hidden",
          !isImageLoaded && "animate-pulse"
        )}>
          <img
            src={imageUrl}
            alt={name}
            className={cn(
              "w-24 h-24 object-contain transition-all duration-500",
              isImageLoaded ? "image-loaded" : "image-loading"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
        {isEquipped && (
          <div className="absolute top-3 left-3">
            <Badge variant="default" className="bg-bot-blue text-white px-2 py-0.5 flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span className="text-xs">Equipado</span>
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/70 backdrop-blur-sm">
            x{quantity}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-base font-medium text-bot-dark mb-0.5">{name}</h3>
        <p className="text-xs text-bot-text/80">{description}</p>
      </CardContent>
    </Card>
  );
};

export default InventoryItem;
