
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, X, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
}

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  isEquipped: boolean;
}

interface BadgeManagerProps {
  onBadgeCreated: (badge: Badge) => void;
  onItemCreated: (item: InventoryItem) => void;
}

const BadgeManager: React.FC<BadgeManagerProps> = ({ onBadgeCreated, onItemCreated }) => {
  const [isCreatingBadge, setIsCreatingBadge] = useState(false);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  
  // Badge form state
  const [badgeName, setBadgeName] = useState('');
  const [badgeDescription, setBadgeDescription] = useState('');
  const [badgeRarity, setBadgeRarity] = useState<'common' | 'rare' | 'epic' | 'legendary'>('common');
  const [badgeImage, setBadgeImage] = useState('/src/assets/badge-placeholder.png');
  
  // Item form state
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemImage, setItemImage] = useState('/src/assets/badge-placeholder.png');

  const resetBadgeForm = () => {
    setBadgeName('');
    setBadgeDescription('');
    setBadgeRarity('common');
    setBadgeImage('/src/assets/badge-placeholder.png');
    setIsCreatingBadge(false);
  };

  const resetItemForm = () => {
    setItemName('');
    setItemDescription('');
    setItemQuantity(1);
    setItemImage('/src/assets/badge-placeholder.png');
    setIsCreatingItem(false);
  };

  const handleCreateBadge = () => {
    if (!badgeName) {
      toast.error('El nombre de la placa es requerido');
      return;
    }

    const newBadge: Badge = {
      id: Date.now().toString(),
      name: badgeName,
      description: badgeDescription,
      rarity: badgeRarity,
      imageUrl: badgeImage
    };

    onBadgeCreated(newBadge);
    toast.success('Placa creada correctamente');
    resetBadgeForm();
  };

  const handleCreateItem = () => {
    if (!itemName) {
      toast.error('El nombre del objeto es requerido');
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: itemName,
      description: itemDescription,
      quantity: itemQuantity,
      imageUrl: itemImage,
      isEquipped: false
    };

    onItemCreated(newItem);
    toast.success('Objeto creado correctamente');
    resetItemForm();
  };

  return (
    <div className="glass rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium text-bot-dark mb-4">Gestión de Contenido</h3>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={() => setIsCreatingBadge(!isCreatingBadge)} 
          variant={isCreatingBadge ? "secondary" : "outline"}
          className="gap-2"
        >
          {isCreatingBadge ? <X size={16} /> : <PlusCircle size={16} />}
          <span>{isCreatingBadge ? 'Cancelar' : 'Crear Placa'}</span>
        </Button>
        
        <Button 
          onClick={() => setIsCreatingItem(!isCreatingItem)}
          variant={isCreatingItem ? "secondary" : "outline"}
          className="gap-2"
        >
          {isCreatingItem ? <X size={16} /> : <PlusCircle size={16} />}
          <span>{isCreatingItem ? 'Cancelar' : 'Crear Objeto'}</span>
        </Button>
      </div>
      
      {/* Badge Creation Form */}
      {isCreatingBadge && (
        <div className="mt-4 p-4 border rounded-lg bg-white/50">
          <h4 className="font-medium mb-3">Nueva Placa</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="badgeName">Nombre</Label>
              <Input 
                id="badgeName" 
                value={badgeName} 
                onChange={(e) => setBadgeName(e.target.value)}
                placeholder="Nombre de la placa"
              />
            </div>
            
            <div>
              <Label htmlFor="badgeDescription">Descripción</Label>
              <Textarea 
                id="badgeDescription" 
                value={badgeDescription} 
                onChange={(e) => setBadgeDescription(e.target.value)}
                placeholder="Descripción de la placa"
                className="resize-none h-20"
              />
            </div>
            
            <div>
              <Label htmlFor="badgeRarity">Rareza</Label>
              <Select
                value={badgeRarity}
                onValueChange={(value: 'common' | 'rare' | 'epic' | 'legendary') => setBadgeRarity(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la rareza" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="common">Común</SelectItem>
                  <SelectItem value="rare">Raro</SelectItem>
                  <SelectItem value="epic">Épico</SelectItem>
                  <SelectItem value="legendary">Legendario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="badgeImage">Imagen (URL)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="badgeImage" 
                  value={badgeImage} 
                  onChange={(e) => setBadgeImage(e.target.value)}
                  placeholder="URL de la imagen"
                />
                <div className="flex-shrink-0 w-12 h-12 border rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={badgeImage} 
                    alt="Vista previa" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/badge-placeholder.png';
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-bot-text/60 mt-1">
                Se recomienda imagen PNG de 200x200 píxeles
              </p>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleCreateBadge}
                className="bg-bot-blue hover:bg-bot-accent"
              >
                Crear Placa
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Item Creation Form */}
      {isCreatingItem && (
        <div className="mt-4 p-4 border rounded-lg bg-white/50">
          <h4 className="font-medium mb-3">Nuevo Objeto</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="itemName">Nombre</Label>
              <Input 
                id="itemName" 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Nombre del objeto"
              />
            </div>
            
            <div>
              <Label htmlFor="itemDescription">Descripción</Label>
              <Textarea 
                id="itemDescription" 
                value={itemDescription} 
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Descripción del objeto"
                className="resize-none h-20"
              />
            </div>
            
            <div>
              <Label htmlFor="itemQuantity">Cantidad</Label>
              <Input 
                id="itemQuantity" 
                type="number" 
                min="1"
                value={itemQuantity.toString()} 
                onChange={(e) => setItemQuantity(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <div>
              <Label htmlFor="itemImage">Imagen (URL)</Label>
              <div className="flex items-center gap-2">
                <Input 
                  id="itemImage" 
                  value={itemImage} 
                  onChange={(e) => setItemImage(e.target.value)}
                  placeholder="URL de la imagen"
                />
                <div className="flex-shrink-0 w-12 h-12 border rounded-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={itemImage} 
                    alt="Vista previa" 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/badge-placeholder.png';
                    }}
                  />
                </div>
              </div>
              <p className="text-xs text-bot-text/60 mt-1">
                Se recomienda imagen PNG de 200x200 píxeles
              </p>
            </div>
            
            <div className="flex justify-end pt-2">
              <Button 
                onClick={handleCreateItem}
                className="bg-bot-blue hover:bg-bot-accent"
              >
                Crear Objeto
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgeManager;
