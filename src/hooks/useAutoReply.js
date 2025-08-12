import { useState } from 'react';
import { createAutoReview } from '@/api/autoreview';
import { fetchRefAutoReview } from '@/api/autoreview';

export const useAutoReply = () => {
  const [showOptionsFor, setShowOptionsFor] = useState(null);
  const [selectedVersionFor, setSelectedVersionFor] = useState({});
  const [recommendResults, setRecommendResults] = useState({});
  const [previewText, setPreviewText] = useState({});
  const [isPreviewing, setIsPreviewing] = useState({});
  const [isCreatingAutoReview, setIsCreatingAutoReview] = useState({});
  
  const checkFirstCharType = (str) => {
    if (!str) return '빈 문자열';
    const firstChar = str[0];
    if (/^[A-Za-z]$/.test(firstChar)) {
      return '영어';
    } else if (/^[가-힣]$/.test(firstChar)) {
      return '한글';
    } else {
      return '기타';
    }
  };

  const previewTypeText = (reviewId, versionId, fullText) => {
    setIsPreviewing(prev => ({ ...prev, [`${reviewId}-${versionId}`]: true }));
    setPreviewText(prev => ({ ...prev, [`${reviewId}-${versionId}`]: "" }));
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setPreviewText(prev => ({ 
          ...prev, 
          [`${reviewId}-${versionId}`]: fullText.slice(0, currentIndex) 
        }));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const stopPreview = (reviewId, versionId) => {
    setIsPreviewing(prev => ({ ...prev, [`${reviewId}-${versionId}`]: false }));
    setPreviewText(prev => ({ ...prev, [`${reviewId}-${versionId}`]: "" }));
  };

  const stopAllPreviews = (reviewId) => {
    const results = recommendResults[reviewId] || [];
    results.forEach(result => {
      stopPreview(reviewId, result.id);
    });
  };

  const handleGenerateReply = async (review) => {
    setShowOptionsFor(review.id);
    setSelectedVersionFor(prev => ({ ...prev, [review.id]: null }));
    
    // 해당 리뷰의 생성 상태를 true로 설정
    setIsCreatingAutoReview(prev => ({ ...prev, [review.id]: true }));
    
    try {
      const token = localStorage.getItem("token");
      
      const reviewData = {
        username: review.reviewer,
        rating: review.rating,
        content: review.content
      };
      
      // const { ok, data } = await createAutoReview(token, reviewData);
      const { ok, data } = await fetchRefAutoReview(token, review.id);
      
      if (!ok) {
        alert("답변을 생성할 수 없습니다.");
        return;
      }

      const previewResults = data.results || [];
      if (!previewResults || previewResults.length === 0) {
        alert("답변을 생성할 수 없습니다.");
        return;
      }
      
      const resultsWithLanguage = previewResults.map(result => ({
        ...result,
        koreanText: result.text,
        englishText: data.results_en?.find(en => en.id === result.id)?.text || result.text
      }));
      
      setRecommendResults(prev => ({ ...prev, [review.id]: resultsWithLanguage }));
      
      resultsWithLanguage.forEach((result) => {
        previewTypeText(review.id, result.id, result.koreanText);
      });
    } catch (error) {
      console.error("답변 생성 중 오류:", error);
      alert("답변을 생성할 수 없습니다.");
    } finally {
      // 해당 리뷰의 생성 상태를 false로 설정
      setIsCreatingAutoReview(prev => ({ ...prev, [review.id]: false }));
    }
  };

  const handleSelectVersion = (reviewId, version) => {
    setSelectedVersionFor(prev => ({ ...prev, [reviewId]: version.id }));
    stopAllPreviews(reviewId);
    
    // 리뷰 언어에 따라 적절한 텍스트 선택
    const isKoreanReview = checkFirstCharType(version.koreanText || version.text) === '한글';
    const displayText = isKoreanReview ? version.koreanText : version.englishText;
    
    return displayText;
  };

  const getFinalReply = (review, selectedVersion) => {
    if (!selectedVersion) return review.reply;
    
    const isKoreanReview = checkFirstCharType(review.content) === '한글';
    return isKoreanReview ? selectedVersion.koreanText : selectedVersion.englishText;
  };

  return {
    showOptionsFor,
    setShowOptionsFor,
    selectedVersionFor,
    setSelectedVersionFor,
    recommendResults,
    previewText,
    isPreviewing,
    isCreatingAutoReview,
    checkFirstCharType,
    handleGenerateReply,
    handleSelectVersion,
    getFinalReply,
    stopAllPreviews
  };
}; 