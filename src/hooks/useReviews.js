import { useState, useEffect } from 'react';
import { fetchReviews, fetchUpdateReview } from '@/api/review';
import { fetchStores } from '@/api/store';
import { fetchPlatformList } from '@/api/platform';

export const useReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [stores, setStores] = useState([]);
  const [activeStore, setActiveStore] = useState("전체");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadStores = async () => {
    const token = localStorage.getItem("token");
    const {ok, data} = await fetchPlatformList();
    setStores(data || []);
  };

  const loadReviews = async (store, pageNum = 1, append = false) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const { ok, data } = await fetchReviews(token, store, pageNum);
      if (!ok) {
        alert(data.detail);
        return;
      }
      
      if (append) {
        setReviewsData(prev => [...prev, ...(data || [])]);
        setFilteredReviews(prev => [...prev, ...(data || [])]);
      } else {
        setReviewsData(data || []);
        setFilteredReviews(data || []);
      }
      
      setHasMore((data || []).length === 10);
    } catch (error) {
      console.error("리뷰 로드 중 오류:", error);
      if (!append) {
        setReviewsData([]);
        setFilteredReviews([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateReview = async (reviewId, updateData) => {
    const token = localStorage.getItem("token");
    const { ok, data } = await fetchUpdateReview(token, reviewId, updateData);
    if (!ok) {
      alert(data.detail);
      return false;
    }
    return true;
  };

  useEffect(() => {
    loadStores();
    loadReviews("전체");
  }, []);

  useEffect(() => {
    if (activeStore) {
      setPage(1);
      setHasMore(true);
      loadReviews(activeStore, 1, false);
    }
  }, [activeStore]);

  return {
    reviewsData,
    setReviewsData,
    filteredReviews,
    setFilteredReviews,
    stores,
    activeStore,
    setActiveStore,
    page,
    setPage,
    hasMore,
    setHasMore,
    isLoading,
    loadReviews,
    updateReview
  };
}; 