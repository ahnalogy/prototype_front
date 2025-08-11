import { API_BASE_URL } from "@/config/api";

export async function fetchRefReviewCreate(reviewer, rating, platform, content) {
    try {
        const res = await fetch(`${API_BASE_URL}/refreview/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // post 요청의 경우 body에 데이터를 담아야 함.
        body: JSON.stringify({
            reviewer,
            rating,
            platform,
            content
            
        }), // 구조가 이미 맞춰져 있다면 바로 전달
        });
    
        console.log("API 응답 상태:", res.status, res.statusText);
    
        const data = await res.json();
        console.log("API 응답 데이터:", data);
    
        return { ok: res.ok, data };
    } catch (error) {
        console.error("RefReview API 오류:", error);
        throw error;
    }
}