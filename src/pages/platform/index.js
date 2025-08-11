import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { fetchCreatePlatform, fetchPlatformList, fetchDeletePlatform } from "@/api/platform";



const PlatformRegister = () => {
  const [platformName, setPlatformName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleBusinessNumberChange = (e) => {
    const value = e.target.value;
    // 숫자만 허용
    const numericValue = value.replace(/[^0-9]/g, '');
    setBusinessNumber(numericValue);
  };

  // 플랫폼 목록 로드
  const loadPlatforms = async () => {
    try {
      console.log("플랫폼 목록 로드 시작");
      const { ok, data } = await fetchPlatformList();
      console.log("플랫폼 목록 로드 결과:", { ok, data });
      if (ok) {
        setPlatforms(data);
        console.log("플랫폼 목록 설정 완료:", data);
      } else {
        console.error("플랫폼 목록 로드 실패:", data);
      }
    } catch (error) {
      console.error("플랫폼 목록 로드 오류:", error);
      console.error("에러 타입:", error.name);
      console.error("에러 메시지:", error.message);
    }
  };

  // 플랫폼 삭제
  const handleDeletePlatform = async (platformId) => {
    if (!window.confirm("정말로 이 플랫폼을 삭제하시겠습니까?")) {
      return;
    }

    console.log("삭제 시작 - Platform ID:", platformId);
    console.log("현재 API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000");

    try {
      const { ok, data } = await fetchDeletePlatform(platformId);
      console.log("삭제 API 응답:", { ok, data });
      
      if (ok) {
        alert("플랫폼이 삭제되었습니다.");
        loadPlatforms(); // 목록 새로고침
      } else {
        // 서버에서 반환한 에러 메시지가 있으면 사용, 없으면 기본 메시지
        const errorMessage = data?.detail || data?.message || "플랫폼 삭제에 실패했습니다.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("플랫폼 삭제 오류:", error);
      console.error("에러 상세:", {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      alert("플랫폼 삭제 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
    }
  };

  // 컴포넌트 마운트 시 플랫폼 목록 로드
  useEffect(() => {
    loadPlatforms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {ok,data}=await fetchCreatePlatform(platformName, businessNumber)
      console.log("Platform registration response:", ok, data);
      if (!ok) {
          const errorMessage = data?.detail || data?.message || "플랫폼 등록에 실패하였습니다.";
          alert(errorMessage);
          return;
      }
      alert(`플랫폼 이름: ${platformName}, 사업자번호: ${businessNumber}`);
      setPlatformName("");
      setBusinessNumber("");
      loadPlatforms(); // 목록 새로고침
    } catch (error) {
      console.error("플랫폼 등록 오류:", error);
      alert("플랫폼 등록 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="bg-white flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
        <main className="flex-1 px-8 py-10">
                     <div className="mb-8">
             <h1 className="text-3xl font-bold text-[#222] mb-2">플랫폼 관리</h1>
             <p className="text-[#888]">새로운 플랫폼을 등록하고 기존 플랫폼을 관리할 수 있습니다.</p>
           </div>

                      {/* 플랫폼 목록 */}
           <div className="mb-8">
             <h2 className="text-xl font-semibold text-[#222] mb-4">등록된 플랫폼 목록</h2>
             {platforms.length === 0 ? (
               <div className="text-center py-8 text-gray-500">
                 등록된 플랫폼이 없습니다.
               </div>
                          ) : (
                <div className="flex flex-wrap gap-3">
                  {platforms.map((platform, index) => (
                                        <div key={platform.id || platform.name || index} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 hover:bg-[#FFEDD4] hover:shadow-sm transition-all duration-200 cursor-pointer">
                       <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                       <button
                         onClick={() => handleDeletePlatform(platform.id)}
                         className="ml-1 text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                       >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
           </div>

            <div className="flex justify-center mb-8">
             <form
               onSubmit={handleSubmit}
               className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-sm p-8"
             >
               <div className="text-center mb-6">
                 <h2 className="text-xl font-bold text-[#222] mb-2">
                   <span className="text-[#00c4c4]">플랫폼</span> 등록이 필요해요
                 </h2>
               </div>
               
                              <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-2">
                      플랫폼 이름
                    </label>
                    <input
                      type="text"
                      value={platformName}
                      onChange={(e) => setPlatformName(e.target.value)}
                      placeholder="플랫폼 이름을 입력하세요"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent bg-gray-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[#222] mb-2">
                      사업자번호
                    </label>
                                        <input
                       type="text"
                       value={businessNumber}
                       onChange={handleBusinessNumberChange}
                       placeholder="사업자번호를 입력하세요 (예: 1234567890)"
                       required
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8edf2] focus:border-transparent bg-gray-50"
                     />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#36d1c4] text-white py-3 rounded-lg font-medium hover:bg-[#2bb5a8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "등록 중..." : "등록"}
                  </button>
                </div>
             </form>
           </div>
        </main>
      </div>
    </Layout>
  );
};

export default PlatformRegister;