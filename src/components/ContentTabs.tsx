
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Package, Gavel } from 'lucide-react';
import BadgesList from './BadgesList';
import InventoryList from './InventoryList';
import WantedList from './WantedList';

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

interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  badges: Badge[];
  inventoryItems: InventoryItem[];
  isLoading: boolean;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  badges, 
  inventoryItems, 
  isLoading 
}) => {
  return (
    <Tabs defaultValue="badges" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 w-full max-w-md mb-6 bg-[#2a2a20] border border-[#5d6945]">
        <TabsTrigger 
          value="badges" 
          className="flex items-center space-x-2 data-[state=active]:bg-[#5d6945] data-[state=active]:text-[#f5f0dc] text-[#f5f0dc]/70"
        >
          <Award size={16} />
          <span>Placas</span>
        </TabsTrigger>
        <TabsTrigger 
          value="inventory" 
          className="flex items-center space-x-2 data-[state=active]:bg-[#5d6945] data-[state=active]:text-[#f5f0dc] text-[#f5f0dc]/70"
        >
          <Package size={16} />
          <span>Inventario</span>
        </TabsTrigger>
        <TabsTrigger 
          value="wanted" 
          className="flex items-center space-x-2 data-[state=active]:bg-[#5d6945] data-[state=active]:text-[#f5f0dc] text-[#f5f0dc]/70"
        >
          <Gavel size={16} />
          <span>Orden y captura</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="badges" className="animate-fade-in focus-visible:outline-none">
        <BadgesList badges={badges} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="inventory" className="animate-fade-in focus-visible:outline-none">
        <InventoryList items={inventoryItems} isLoading={isLoading} />
      </TabsContent>
      
      <TabsContent value="wanted" className="animate-fade-in focus-visible:outline-none">
        <WantedList />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
