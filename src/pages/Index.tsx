
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { toast } from "sonner";
import useAuth from '@/hooks/useAuth';
import { Badge, InventoryItem } from '@/types/common';

// Initial mock data for badges
const initialBadges = [
  {
    id: '1',
    name: 'Veterano',
    description: 'Miembro del servidor por más de un año',
    rarity: 'rare' as const,
    imageUrl: '/src/assets/badge-placeholder.png'
  },
  {
    id: '2',
    name: 'Colaborador',
    description: 'Ha contribuido significativamente al servidor',
    rarity: 'epic' as const,
    imageUrl: '/src/assets/badge-placeholder.png'
  },
  {
    id: '3',
    name: 'Leyenda',
    description: 'Reconocido por su excepcional contribución',
    rarity: 'legendary' as const,
    imageUrl: '/src/assets/badge-placeholder.png'
  },
  {
    id: '4',
    name: 'Recién llegado',
    description: 'Nuevo miembro del servidor',
    rarity: 'common' as const,
    imageUrl: '/src/assets/badge-placeholder.png'
  }
];

// Initial mock data for inventory items
const initialInventoryItems = [
  {
    id: '1',
    name: 'Poción de XP',
    description: 'Aumenta la experiencia ganada por 1 hora',
    quantity: 3,
    imageUrl: '/src/assets/badge-placeholder.png',
    isEquipped: false
  },
  {
    id: '2',
    name: 'Borde personalizado',
    description: 'Un borde especial para tu perfil',
    quantity: 1,
    imageUrl: '/src/assets/badge-placeholder.png',
    isEquipped: true
  },
  {
    id: '3',
    name: 'Token de cambio de nombre',
    description: 'Permite cambiar tu nombre de usuario',
    quantity: 2,
    imageUrl: '/src/assets/badge-placeholder.png',
    isEquipped: false
  }
];

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('badges');
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(initialInventoryItems);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast("¡Bienvenido al Panel de Control de TERMINAL SASD!");
    }, 1000);

    // Load badges and inventory from localStorage if available
    const storedBadges = localStorage.getItem('discord_badges');
    const storedInventory = localStorage.getItem('discord_inventory');
    
    if (storedBadges) {
      try {
        setBadges(JSON.parse(storedBadges));
      } catch (error) {
        console.error('Error loading badges:', error);
      }
    }
    
    if (storedInventory) {
      try {
        setInventoryItems(JSON.parse(storedInventory));
      } catch (error) {
        console.error('Error loading inventory:', error);
      }
    }

    return () => clearTimeout(timer);
  }, []);

  // Save changes to localStorage when badges or inventory change
  useEffect(() => {
    localStorage.setItem('discord_badges', JSON.stringify(badges));
  }, [badges]);
  
  useEffect(() => {
    localStorage.setItem('discord_inventory', JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  const handleAddBadge = (newBadge: Badge) => {
    setBadges(prev => [...prev, newBadge]);
  };

  const handleAddInventoryItem = (newItem: InventoryItem) => {
    setInventoryItems(prev => [...prev, newItem]);
  };

  // Add smooth mount animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#2a2a20] via-[#3a3325] to-[#2a2a20] p-6 pb-20 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <Dashboard 
          isLoading={isLoading}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          badges={badges}
          inventoryItems={inventoryItems}
          handleAddBadge={handleAddBadge}
          handleAddInventoryItem={handleAddInventoryItem}
        />
      </div>
    </div>
  );
};

export default Index;
