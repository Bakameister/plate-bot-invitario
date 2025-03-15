
import React from 'react';
import BadgeCard from '@/components/BadgeCard';

interface Badge {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageUrl: string;
}

interface BadgesListProps {
  badges: Badge[];
  isLoading: boolean;
}

const BadgesList: React.FC<BadgesListProps> = ({ badges, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-72 rounded-lg shimmer bg-[#2a2a20]/50 border border-[#5d6945]/50"></div>
        ))}
      </div>
    );
  }

  return (
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
  );
};

export default BadgesList;
