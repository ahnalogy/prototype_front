import React, { memo } from 'react';
import PropTypes from 'prop-types';
import tw from "tailwind-styled-components";

const StoreTab = tw.div`flex flex-wrap gap-2 mb-4`;
const StoreButton = tw.button`px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]`;

const ReviewFilters = memo(({
    stores,
    activeStore,
    onStoreChange,
    showRatingDropdown,
    setShowRatingDropdown,
    selectedRating,
    ratingOptions,
    onRatingSelect,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchKeyword,
    onResetFilters,
    filteredReviews
}) => {
    return (
        <div className="bg-white rounded-xl shadow p-6 mb-6">
            {/* Source Tabs */}
            <StoreTab>
                <StoreButton 
                    className={activeStore === "전체" ? "bg-[#e8edf2] text-black" : "bg-white border border-[#E5E7EB] text-[#888]"}
                    onClick={() => onStoreChange("전체")}
                >
                    전체
                </StoreButton>
                {stores.map((store, index) => (
                    <StoreButton 
                        key={store.id || index}
                        className={activeStore === store.name ? "bg-[#e8edf2] text-black" : "bg-white border border-[#E5E7EB] text-[#888]"}
                        onClick={() => onStoreChange(store.name)}
                    >
                        {store.name}
                    </StoreButton>
                ))}
            </StoreTab>

            {/* Search and Filters */}
            <div className="flex flex-wrap items-center gap-4">
                {/* 별점 드롭다운 */}
                <div className="relative">
                    <button 
                        className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg flex items-center gap-2"
                        onClick={() => setShowRatingDropdown(!showRatingDropdown)}
                    >
                        {selectedRating}
                        <span className="text-sm">▼</span>
                    </button>
                    {showRatingDropdown && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 min-w-[120px]">
                            {ratingOptions.map((option) => (
                                <button
                                    key={option}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                    onClick={() => onRatingSelect(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* 기간 선택 */}
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222] cursor-pointer"
                        placeholder="시작일"
                    />
                    <span className="text-[#888]">~</span>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222] cursor-pointer"
                        placeholder="종료일"
                    />
                </div>
                
                <button 
                    className="px-4 py-2 text-white rounded-lg transition-colors"
                    style={{ backgroundColor: '#d97706' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#cc5500'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#d97706'}
                    onClick={onResetFilters}
                >
                    초기화
                </button>
            </div>

            {/* 필터 결과 표시 */}
            {(selectedRating !== "별점 전체" || startDate || endDate || searchKeyword) && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-700">
                        <strong>적용된 필터:</strong>
                        {selectedRating !== "별점 전체" && <span className="ml-2 bg-blue-200 px-2 py-1 rounded">{selectedRating}</span>}
                        {(startDate || endDate) && (
                            <span className="ml-2 bg-blue-200 px-2 py-1 rounded">
                                {startDate} ~ {endDate || "현재"}
                            </span>
                        )}
                        {searchKeyword && <span className="ml-2 bg-blue-200 px-2 py-1 rounded">검색: {searchKeyword}</span>}
                        <span className="ml-2 text-blue-600">총 {filteredReviews.length}개 리뷰</span>
                    </div>
                </div>
            )}
        </div>
    );
});

ReviewFilters.propTypes = {
    stores: PropTypes.array.isRequired,
    activeStore: PropTypes.string.isRequired,
    onStoreChange: PropTypes.func.isRequired,
    showRatingDropdown: PropTypes.bool.isRequired,
    setShowRatingDropdown: PropTypes.func.isRequired,
    selectedRating: PropTypes.string.isRequired,
    ratingOptions: PropTypes.array.isRequired,
    onRatingSelect: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    setStartDate: PropTypes.func.isRequired,
    endDate: PropTypes.string.isRequired,
    setEndDate: PropTypes.func.isRequired,
    searchKeyword: PropTypes.string.isRequired,
    onResetFilters: PropTypes.func.isRequired,
    filteredReviews: PropTypes.array.isRequired
};

ReviewFilters.displayName = 'ReviewFilters';

export default ReviewFilters; 