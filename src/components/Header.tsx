
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings } from 'lucide-react';
import BotStatus from './BotStatus';
import RankAvatar from './RankAvatar';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="w-full px-8 py-6 flex items-center justify-between glass rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-10 h-10 bg-bot-blue rounded-lg flex items-center justify-center shadow-subtle">
            <span className="text-white font-semibold text-lg">T</span>
          </div>
          <BotStatus status="online" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-bot-dark tracking-tight">TIBI4 Bot</h1>
          <div className="flex items-center space-x-2 mt-0.5">
            <Badge variant="outline" className="bg-white/50 text-xs font-normal">
              v1.0.0
            </Badge>
            <span className="text-xs text-bot-text/70">Sistema de placas e inventarios</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-bot-text hover:bg-black/5 transition-colors">
          <Bell size={18} />
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-bot-text hover:bg-black/5 transition-colors">
          <Settings size={18} />
        </button>
        <RankAvatar className="w-9 h-9" />
      </div>
    </header>
  );
};

export default Header;
