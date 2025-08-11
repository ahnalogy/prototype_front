import { API_BASE_URL } from "@/config/api";




export async function fetchRefPlatformList() {
  try {
    const res = await fetch(`${API_BASE_URL}/refplatform/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API 응답 상태:", res.status, res.statusText);

    const data = await res.json();
    console.log("API 응답 데이터:", data);

    return { ok: res.ok, data };
  } catch (error) {
    console.error("refPlatform list API 오류:", error);
    throw error;
  }
}
