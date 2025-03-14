
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'online' | 'idle' | 'offline';

interface BotStatusProps {
  status: StatusType;
}

const statusConfig = {
  online: {
    color: 'bg-green-500',
    pulse: true,
    label: 'Online'
  },
  idle: {
    color: 'bg-yellow-500',
    pulse: false,
    label: 'Idle'
  },
  offline: {
    color: 'bg-gray-400',
    pulse: false,
    label: 'Offline'
  }
};

const BotStatus: React.FC<BotStatusProps> = ({ status }) => {
  const config = statusConfig[status];
  
  return (
    <div className="absolute -bottom-1 -right-1 flex items-center justify-center">
      <div className={cn(
        "w-3 h-3 rounded-full border border-white", 
        config.color,
        config.pulse && "after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-full after:bg-green-500/30 after:animate-pulse-subtle"
      )}
      data-tooltip-id="status-tooltip"
      data-tooltip-content={config.label}
      />
    </div>
  );
};

export default BotStatus;
