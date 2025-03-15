
import React from 'react';
import DashboardHeader from './DashboardHeader';
import BadgeManager from './BadgeManager';
import ContentTabs from './ContentTabs';
import CommandPanel from './CommandPanel';

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

interface DashboardProps {
  isLoading: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  badges: Badge[];
  inventoryItems: InventoryItem[];
  handleAddBadge: (badge: Badge) => void;
  handleAddInventoryItem: (item: InventoryItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  isLoading,
  activeTab,
  setActiveTab,
  badges,
  inventoryItems,
  handleAddBadge,
  handleAddInventoryItem
}) => {
  return (
    <>
      <div className="rounded-xl p-6 mb-8 animate-slide-up backdrop-blur-md bg-gradient-to-r from-[#3a3325]/80 to-[#4a5741]/80 border-2 border-[#5d6945]/50 shadow-md" style={{ animationDelay: '100ms' }}>
        <DashboardHeader />
        
        <BadgeManager 
          onBadgeCreated={handleAddBadge}
          onItemCreated={handleAddInventoryItem}
        />
        
        <ContentTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          badges={badges}
          inventoryItems={inventoryItems}
          isLoading={isLoading}
        />
      </div>
      
      <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        <CommandPanel />
      </div>
    </>
  );
};

export default Dashboard;
