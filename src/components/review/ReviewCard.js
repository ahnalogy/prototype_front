import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinner } from "@/components/spinner";
import { renderStars } from "@/utils/reviewUtils";

const ReviewCard = memo(({
    review,
    replyVersions,
    showOptionsFor,
    editModeFor,
    editTextFor,
    selectedVersionFor,
    isPreviewing,
    previewText,
    isCreatingAutoReview,
    onGenerateReply,
    onSelectVersion,
    onSubmitReply,
    onEditReply,
    onSaveEdit,
    onCancelEdit,
    onDeleteReply,
    onTextChange,
    onTranslate,
    isTranslating,
    isTranslated,
    displayText
}) => {

    // 해당 리뷰의 생성 상태 확인
    const isCreatingForThisReview = isCreatingAutoReview[review.id] || false;

    // 선택된 버전의 텍스트 가져오기
    const getSelectedVersionText = () => {
        if (!selectedVersionFor[review.id]) return review.reply || "";
        
        const selectedVersion = replyVersions.find(v => v.id === selectedVersionFor[review.id]);
        if (!selectedVersion) return review.reply || "";
        
        // 리뷰 언어에 따라 적절한 텍스트 선택
        const isKoreanReview = /^[가-힣]/.test(review.content);
        return isKoreanReview ? selectedVersion.koreanText : selectedVersion.englishText;
    };

    // 텍스트 상자에 표시할 내용 결정
    const getTextareaValue = () => {
        if (editModeFor[review.id]) {
            return editTextFor[review.id] || "";
        }
        return getSelectedVersionText();
    };

    // 페이지 처음 렌더링 시 한 번만 이미지 번호와 타입을 결정
    const { imgNum, showOverlay } = useMemo(() => {
        const num = String(Math.floor(Math.random() * 10) + 1).padStart(3, '0');
        const overlay = Math.random() >= 0.5;
        return { imgNum: num, showOverlay: overlay };
    }, []);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-4">
                    <h3 className="font-semibold text-[#222]">{review.reviewer}</h3>
                    <p className="text-sm text-[#888]">{review.created_at}</p>
                </div>
                <div className="flex-shrink-0">
                    {renderStars(review.rating)}
                </div>
            </div>
            
            <div className="mb-4 pr-4 flex justify-between gap-2">
                
                <p className="text-[#222] whitespace-pre-wrap break-words leading-relaxed">{displayText}</p>
                {/* 렌더링 시 한 번만 결정된 이미지 */}
                {showOverlay ? (
                    <div className="border border-gray-200 rounded-lg overflow-hidden relative group">
                        <img 
                            src={`/hotel_images/${imgNum}.png`}
                            alt="호텔 이미지"
                            className="w-24 h-24 object-cover rounded"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gray-800/60 transform translate-y-0 flex items-center justify-center">
                            <div className="text-white text-2xl font-bold flex items-center justify-center h-full w-full">+3</div>
                        </div>
                    </div>
                ) : (
                    <img
                        src={`/hotel_images/${imgNum}.png`}
                        alt="호텔 이미지"
                        className="w-24 h-24 object-cover rounded"
                    />
                )}
            </div>
            
            {/* 영어 리뷰인 경우에만 번역하기 버튼 표시 */}
            {!/^[가-힣]/.test(review.content) && (
                <div className="flex justify-end mb-4">
                    <div className="flex flex-col items-center gap-1">
                        {/* 번역 아이콘 이미지 */}
                        <img 
                            src="../../hotel_images/001.png" 
                            alt="번역 아이콘" 
                            className="w-4 h-4 opacity-60"
                        />
                        <button
                            className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors flex items-center gap-1"
                            onClick={() => onTranslate(review.id, review.content)}
                            disabled={isTranslating}
                        >
                            {isTranslating ? (
                                <>
                                    <LoadingSpinner size="xs" />
                                    번역 중...
                                </>
                            ) : (
                                <>
                                    {isTranslated ? "원문 보기" : "번역하기"}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
            
            <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-[#888]">{review.thumbsUp}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="text-sm text-[#888]">{review.thumbsDown}</span>
                </div>
            </div>

            {/* AI Reply Section */}
            <div className="border-t pt-4">
                {/* AI Reply Options */}
                {(showOptionsFor === review.id || editModeFor[review.id]) && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-[#222] mb-3">
                            AI 답변 버전을 선택해주세요:
                        </h5>
                        <div className="space-y-2">
                            {replyVersions.map((version) => (
                                <button
                                    key={version.id}
                                    onClick={() => onSelectVersion(review.id, version)}
                                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                                        selectedVersionFor[review.id] === version.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                                >
                                    <div className="font-medium text-[#222] mb-1">
                                        {version.title || `버전 ${version.id}`}
                                    </div>
                                    <div className="text-sm text-gray-600 min-h-[3rem] whitespace-pre-wrap">
                                        {isPreviewing[`${review.id}-${version.id}`]
                                            ? previewText[`${review.id}-${version.id}`] || ""
                                            : version.koreanText || version.text
                                        }
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <textarea
                    className="w-full h-24 p-3 border border-[#E5E7EB] rounded-lg bg-white text-[#222] resize-none mb-3"
                    placeholder="AI가 생성한 답변을 여기에 표시합니다."
                    value={getTextareaValue()}
                    readOnly={false}
                    onChange={(e) => onTextChange(review.id, e.target.value, editModeFor[review.id])}
                />
                
                {selectedVersionFor[review.id] && !editModeFor[review.id] && (
                    <div className="mb-3 text-sm text-blue-600">
                        선택된 버전: {replyVersions.find(v => v.id === selectedVersionFor[review.id])?.title || `버전 ${selectedVersionFor[review.id]}`}
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    {/* 생성하기 버튼 - 답변이 없고 해당 리뷰의 프리뷰가 없을 때만 표시 */}
                    {!review.isReplied && 
                     !isPreviewing[`${review.id}-1`] && 
                     !isPreviewing[`${review.id}-2`] && 
                     !isPreviewing[`${review.id}-3`] &&
                     !previewText[`${review.id}-1`] && 
                     !previewText[`${review.id}-2`] && 
                     !previewText[`${review.id}-3`] && (
                        <button 
                            className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer flex items-center gap-2"
                            onClick={() => {onGenerateReply(review)}}
                            disabled={isCreatingForThisReview}
                        >
                            {isCreatingForThisReview ? (
                                <>
                                    <LoadingSpinner size="sm" />
                                    생성 중...
                                </>
                            ) : (
                                "생성하기"
                            )}
                        </button>
                    )}
                    
                    {/* 재생성하기 버튼 - 답변이 없고 해당 리뷰의 프리뷰가 있을 때만 표시 */}
                    {!review.isReplied && 
                     (isPreviewing[`${review.id}-1`] || 
                      isPreviewing[`${review.id}-2`] || 
                      isPreviewing[`${review.id}-3`] ||
                      previewText[`${review.id}-1`] || 
                      previewText[`${review.id}-2`] || 
                      previewText[`${review.id}-3`]) && (
                        <button 
                            className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer flex items-center gap-2"
                            onClick={() => {onGenerateReply(review)}}
                            disabled={isCreatingForThisReview}
                        >
                            {isCreatingForThisReview ? (
                                <>
                                    <LoadingSpinner size="sm" />
                                    생성 중...
                                </>
                            ) : (
                                "재생성하기"
                            )}
                        </button>
                    )}
                    
                    {/* 답변달기 버튼 - 답변이 없을 때만 표시 */}
                    {!review.isReplied && (
                        <button 
                            className="px-4 py-2 bg-[#e8edf2] text-black rounded-lg cursor-pointer"
                            onClick={() => onSubmitReply(review.id)}
                        >
                            답변달기
                        </button>
                    )}
                    
                                         {/* 수정하기 버튼 - 답변이 있고 수정 모드가 아닐 때만 표시 */}
                     {review.isReplied && !editModeFor[review.id] && (
                         <button 
                             className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                             onClick={() => onEditReply(review.id)}
                         >
                             수정하기
                         </button>
                     )}
                     
                     {/* 삭제하기 버튼 - 답변이 있고 수정 모드가 아닐 때만 표시 */}
                     {review.isReplied && !editModeFor[review.id] && (
                         <button 
                             className="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600"
                             onClick={() => onDeleteReply(review.id)}
                         >
                             삭제하기
                         </button>
                     )}
                    
                    {/* 수정 모드일 때만 표시되는 버튼들 */}
                    {editModeFor[review.id] && (
                        <>
                            <button 
                                className="px-4 py-2 border border-[#E5E7EB] text-black rounded-lg cursor-pointer"
                                onClick={() => onCancelEdit(review.id)}
                            >
                                취소
                            </button>
                            <button 
                                className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600"
                                onClick={() => onSaveEdit(review.id)}
                            >
                                저장
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

ReviewCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.number.isRequired,
        reviewer: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        thumbsUp: PropTypes.number.isRequired,
        thumbsDown: PropTypes.number.isRequired,
        reply: PropTypes.string,
        isReplied: PropTypes.bool
    }).isRequired,
    replyVersions: PropTypes.array.isRequired,
    showOptionsFor: PropTypes.number,
    editModeFor: PropTypes.object.isRequired,
    editTextFor: PropTypes.object.isRequired,
    selectedVersionFor: PropTypes.object.isRequired,
    isPreviewing: PropTypes.object.isRequired,
    previewText: PropTypes.object.isRequired,
    isCreatingAutoReview: PropTypes.object.isRequired,
    onGenerateReply: PropTypes.func.isRequired,
    onSelectVersion: PropTypes.func.isRequired,
    onSubmitReply: PropTypes.func.isRequired,
    onEditReply: PropTypes.func.isRequired,
    onSaveEdit: PropTypes.func.isRequired,
    onCancelEdit: PropTypes.func.isRequired,
    onDeleteReply: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    onTranslate: PropTypes.func.isRequired,
    isTranslating: PropTypes.bool.isRequired,
    isTranslated: PropTypes.bool.isRequired,
    displayText: PropTypes.string.isRequired
};

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;