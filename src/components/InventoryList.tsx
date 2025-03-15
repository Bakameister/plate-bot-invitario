
import React from 'react';
import InventoryItem from '@/components/InventoryItem';

interface InventoryItemType {
  id: string;
  name: string;
  description: string;
  quantity: number;
  imageUrl: string;
  isEquipped: boolean;
}

interface InventoryListProps {
  items: InventoryItemType[];
  isLoading: boolean;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-lg shimmer bg-[#2a2a20]/50 border border-[#5d6945]/50"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <InventoryItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          quantity={item.quantity}
          imageUrl={item.imageUrl}
          isEquipped={item.isEquipped}
        />
      ))}
    </div>
  );
};

export default InventoryList;
