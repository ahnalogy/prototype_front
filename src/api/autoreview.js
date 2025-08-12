// frontend/api/autoreview.js
import { API_BASE_URL } from "@/config/api";

export async function createAutoReview(token, reviewData) {
  try {
    console.log("Autoreview API 호출:", {
      url: `${API_BASE_URL}/autoreview/create`,
      data: reviewData,
    });

    const res = await fetch(`${API_BASE_URL}/autoreview/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData), // ✅ 구조가 이미 맞춰져 있다면 바로 전달
    });

    console.log("API 응답 상태:", res.status, res.statusText);

    const data = await res.json();
    console.log("API 응답 데이터:", data);

    return { ok: res.ok, data };
  } catch (error) {
    console.error("Autoreview API 오류:", error);
    throw error;
  }
}

export async function fetchRefAutoReview(token, reviewId) {
  try {
    const res = await fetch(`${API_BASE_URL}/autoreview/ref/${reviewId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching auto review: ${res.statusText}`);
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error fetching auto review:", error);
    return { ok: false, error };
  }
}