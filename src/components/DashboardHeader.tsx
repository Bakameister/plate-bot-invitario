
import React from 'react';
import useAuth from '@/hooks/useAuth';
import NavActions from './NavActions';

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#f5f0dc]">Terminal Sheriff Department</h2>
        <p className="text-[#f5f0dc]/70 mt-1">
          {user && <span className="font-medium">Conectado como {user.username}</span>}
        </p>
      </div>
      <NavActions />
    </div>
  );
};

export default DashboardHeader;
