import React from 'react';
import { calculateRatingDistribution, calculateAverageRating, renderStars } from '@/utils/reviewUtils';

const RatingSummary = ({ reviews }) => {
  const { ratingPercents, total } = calculateRatingDistribution(reviews);
  const avgRating = calculateAverageRating(reviews);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-6">
          <span className="text-4xl font-bold text-[#222] mr-2">{avgRating}</span>
          <div className="flex">
            {renderStars(5, 'lg')}
          </div>
        </div>
        <div className="text-[#888]">{total}개 리뷰</div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating, idx) => (
          <div key={rating} className="flex items-center">
            <span className="w-8 text-sm text-[#888]">{rating}★</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2 relative">
                             <div
                 className="h-2 rounded-full relative"
                 style={{ 
                   width: `${ratingPercents[idx]}%`,
                   backgroundColor: '#d97706'
                 }}
               />
            </div>
            <span className="w-12 text-sm text-[#888] text-right">
              {ratingPercents[idx]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary; 