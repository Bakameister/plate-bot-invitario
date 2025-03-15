
export interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  isEquipped: boolean;
}
