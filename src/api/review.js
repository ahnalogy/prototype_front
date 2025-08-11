import { API_BASE_URL } from "@/config/api";

export async function fetchReviews(token, store,pageNum) {
    const encodedStore = encodeURIComponent(store);
    const offset = (pageNum - 1) * 10;
    const res = await fetch(`${API_BASE_URL}/review/list/${encodedStore}?offset=${offset}&limit=10`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json().then(data => ({ ok: res.ok, data }));
  }

export async function fetchDeleteReview(token, reviewId) {
    const res = await fetch(`${API_BASE_URL}/review/delete/${reviewId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json().then(data => ({ ok: res.ok, data }));
  }

export async function fetchUpdateReview(token, reviewId, content) {
    const res = await fetch(`${API_BASE_URL}/review/update/${reviewId}`, {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
       },
      body: JSON.stringify({ 
        content: content.content,
        rating: content.rating,
        reviewer: content.reviewer,
        reply: content.reply,
        is_replied: content.isReplied
       }),
    });
    return res.json().then(data => ({ ok: res.ok, data }));
  }

export async function fetchCreateReview(token,reviewer,rating,platform,content) {
  const res = await fetch(`${API_BASE_URL}/review/create`, {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
     },
    body: JSON.stringify({ 
      content: content,
      rating: rating,
      reviewer: reviewer,
      platform: platform
     }),
  });
  return res.json().then(data => ({ ok: res.ok, data }));
}