import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LeftNavigationBar from "@/components/sidebar";
import "@/styles/globals.css";
import { fetchMe } from "@/api/user";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";

const privatePaths = [
  "/dashboard",
  "/myinfo",
  "/store",
  "/reservation",
  "/room",
  "/report",
  "/review",
  "/settings",
  "/customer",
  "/alarm",
];

function AuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null: 로딩, false: 비로그인, true: 로그인
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { ok,data } = await fetchMe(token);
          setIsAuthenticated(!!ok);
          if (ok) setCurrentUser(data);
          if (!ok) localStorage.removeItem('token');
        } catch {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    checkAuthStatus();
    console.log(`Checking authentication status ${isAuthenticated}`);
    // eslint-disable-next-line
  }, [router.pathname]);

  useEffect(() => {
    // 인증이 필요한 경로에서만 리다이렉트
    if (
      isAuthenticated === false &&
      privatePaths.some(path => router.pathname.startsWith(path))
    ) {
      if (router.pathname !== "/") {
        router.replace("/");
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated, router.pathname]);

  // 인증 체크 중이거나 리다이렉트 중이면 아무것도 렌더링하지 않음
  if (
    isAuthenticated === null ||
    (isAuthenticated === false && privatePaths.some(path => router.pathname.startsWith(path)))
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8edf2] mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 인증된 상태에서 보호 경로면 사이드바와 함께 렌더링
  if (isAuthenticated && privatePaths.some(path => router.pathname.startsWith(path))) {
    return (
      <div className="flex min-h-screen">
        <div className="w-80 fixed left-0 top-0 h-full z-10">
          <LeftNavigationBar />
        </div>
        <div className="flex-1 ml-80">
          {children}
        </div>
      </div>
    );
  }

  // 그 외는 그냥 렌더링
  return children;
}

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </AuthProvider>
  );
}
