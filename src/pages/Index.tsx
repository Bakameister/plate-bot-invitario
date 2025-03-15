
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BadgeCard from '@/components/BadgeCard';
import InventoryItem from '@/components/InventoryItem';
import CommandPanel from '@/components/CommandPanel';
import BadgeManager from '@/components/BadgeManager';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, Package, Users, Activity, Database, LogOut } from 'lucide-react';
import { toast } from "sonner";
import { Link } from "react-router-dom";
import useAuth from '@/hooks/useAuth';

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
  const { user, logout } = useAuth();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast("¡Bienvenido al Panel de Control de TIBI4 Bot!");
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
    <div className={`min-h-screen bg-gradient-to-br from-bot-light via-white to-bot-light p-6 pb-20 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="glass rounded-xl p-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-bot-dark">Panel de Control</h2>
              <p className="text-bot-text/70 mt-1">
                Gestiona tu sistema de placas e inventarios • 
                {user && <span className="font-medium"> Conectado como {user.username}</span>}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" asChild className="space-x-2">
                <Link to="/users">
                  <Users size={16} />
                  <span>Ver usuarios</span>
                </Link>
              </Button>
              <Button variant="outline" asChild className="space-x-2">
                <Link to="/connections">
                  <Database size={16} />
                  <span>Conexiones</span>
                </Link>
              </Button>
              <Button variant="default" className="bg-bot-blue hover:bg-bot-accent space-x-2">
                <Activity size={16} />
                <span>Estadísticas</span>
              </Button>
              <Button variant="outline" onClick={logout} className="space-x-2 text-destructive">
                <LogOut size={16} />
                <span>Salir</span>
              </Button>
            </div>
          </div>
          
          <BadgeManager 
            onBadgeCreated={handleAddBadge}
            onItemCreated={handleAddInventoryItem}
          />
          
          <Tabs defaultValue="badges" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
              <TabsTrigger value="badges" className="flex items-center space-x-2">
                <Award size={16} />
                <span>Placas</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package size={16} />
                <span>Inventario</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="badges" className="animate-fade-in focus-visible:outline-none">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-72 rounded-lg shimmer bg-bot-silver/30"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {badges.map((badge) => (
                    <BadgeCard
                      key={badge.id}
                      id={badge.id}
                      name={badge.name}
                      description={badge.description}
                      rarity={badge.rarity}
                      imageUrl={badge.imageUrl}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inventory" className="animate-fade-in focus-visible:outline-none">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 rounded-lg shimmer bg-bot-silver/30"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {inventoryItems.map((item) => (
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
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CommandPanel />
        </div>
      </div>
    </div>
  );
};

export default Index;
