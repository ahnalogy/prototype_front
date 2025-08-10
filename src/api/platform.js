import { API_BASE_URL } from "@/config/api";



export async function fetchCreatePlatform(name) {
  try {
    

    const res = await fetch(`${API_BASE_URL}/platform/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name}), // ✅ 구조가 이미 맞춰져 있다면 바로 전달
    });

    console.log("API 응답 상태:", res.status, res.statusText);

    const data = await res.json();
    console.log("API 응답 데이터:", data);

    return { ok: res.ok, data};
  } catch (error) {
    console.error("Autoreview API 오류:", error);
    throw error;
  }
}

export async function fetchPlatformList() {
  try {
    const res = await fetch(`${API_BASE_URL}/platform/list`, {
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
    console.error("Platform list API 오류:", error);
    throw error;
  }
}
