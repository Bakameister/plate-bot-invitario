
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings } from 'lucide-react';
import BotStatus from './BotStatus';
import RankAvatar from './RankAvatar';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="w-full px-8 py-6 flex items-center justify-between rounded-lg mb-8 animate-fade-in bg-gradient-to-r from-[#3a3325] to-[#4a5741] border-2 border-[#5d6945]/50 shadow-md">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-10 h-10 bg-[#6b7552] rounded-lg flex items-center justify-center shadow-subtle">
            <span className="text-white font-semibold text-lg">S</span>
          </div>
          <BotStatus status="online" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#f5f0dc] tracking-tight">TERMINAL SASD</h1>
          <div className="flex items-center space-x-2 mt-0.5">
            <Badge variant="outline" className="bg-[#f5f0dc]/20 text-xs font-normal border-[#f5f0dc]/30 text-[#f5f0dc]">
              v1.0.0
            </Badge>
            <span className="text-xs text-[#f5f0dc]/70">Centro de Información y Comunicación Operativa</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#f5f0dc] hover:bg-[#f5f0dc]/10 transition-colors">
          <Bell size={18} />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#f5f0dc] hover:bg-[#f5f0dc]/10 transition-colors">
          <Settings size={18} />
        </button>
        <RankAvatar className="w-14 h-14" />
      </div>
    </header>
  );
};

export default Header;
