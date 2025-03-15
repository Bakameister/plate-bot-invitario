
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from "react-router-dom";
import { Users, Database, Activity, LogOut } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const NavActions: React.FC = () => {
  const { logout } = useAuth();
  
  return (
    <div className="flex space-x-3">
      <Button variant="outline" asChild className="space-x-2 border-[#5d6945] text-[#f5f0dc] hover:bg-[#5d6945]/20">
        <Link to="/users">
          <Users size={16} />
          <span>Ver usuarios</span>
        </Link>
      </Button>
      <Button variant="outline" asChild className="space-x-2 border-[#5d6945] text-[#f5f0dc] hover:bg-[#5d6945]/20">
        <Link to="/connections">
          <Database size={16} />
          <span>Conexiones</span>
        </Link>
      </Button>
      <Button variant="default" className="bg-[#5d6945] hover:bg-[#6b7552] space-x-2 text-[#f5f0dc]">
        <Activity size={16} />
        <span>Estadísticas</span>
      </Button>
      <Button variant="outline" onClick={logout} className="space-x-2 text-red-400 hover:text-red-500 border-[#5d6945] hover:bg-red-500/10">
        <LogOut size={16} />
        <span>Salir</span>
      </Button>
    </div>
  );
};

export default NavActions;
