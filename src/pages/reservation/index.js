import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import tw from "tailwind-styled-components";
import { fetchPlatformList } from "@/api/platform";

const StoreTab = tw.div`flex flex-wrap gap-2 mb-4`;
const StoreButton = tw.button`px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]`;

const columns = ["고객 이름", "객실 번호", "체크인 날짜", "체크아웃 날짜", "상태", "총 금액"];

// ✅ 플랫폼명을 마지막 열에 추가
const data = [
  ["김수연", "101", "2025-07-15", "2025-07-17", "완료", "100,000", "야놀자"],
  ["윤지호", "102", "2025-07-16", "2025-07-18", "완료", "150,000", "야놀자"],
  ["Noah Carter", "103", "2025-07-17", "2025-07-19", "취소", "110,000", "여기어때"],
  ["김초롱초롱", "104", "2025-07-18", "2025-07-20", "확인", "110,000", "여기어때"],
  ["Ethan Foster", "105", "2025-07-19", "2025-07-21", "확인", "150,000", "Agoda"],
  ["Isabella Green", "201", "2025-07-20", "2025-07-22", "확인", "130,000", "Agoda"],
  ["Mason Hayes", "202", "2025-07-21", "2025-07-23", "취소", "100,000", "Booking.com"],
  ["이현우", "203", "2024-07-22", "2024-07-27", "확인", "130,000", "Trip.com"],
  ["이은소", "204", "2025-07-23", "2025-07-25", "확인", "130,000", "Trip.com"],
  ["안애경", "205", "2025-07-24", "2025-07-26", "확인", "150,000", "야놀자"],
];

function renderRow(row, idx) {
  return (
    <tr key={idx} className="border-t border-[##f6b26b]">
      {row.slice(0, 6).map((cell, i) =>
        i === 4 ? (
          <td key={i} className="px-4 py-2 text-center align-middle">
            <span className="inline-block w-full bg-[#fcefdc] rounded-lg px-4 py-1 font-medium text-[#0c141c] text-sm whitespace-nowrap truncate text-center">
              {cell}
            </span>
          </td>
        ) : (
          <td
            key={i}
            className="px-4 py-2 text-center align-middle font-normal text-[#4c7299] text-sm truncate"
          >
            {cell}
          </td>
        )
      )}
    </tr>
  );
}

function DepthFrameWrapper({ currentUser }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [activeStore, setActiveStore] = useState("전체");

  const loadPlatforms = async () => {
    const {ok,data} = await fetchPlatformList();
    setPlatforms(data || []);
  };

  useEffect(() => {
    loadPlatforms();
  }, []);

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const filteredData = data.filter((row) => {
    const matchesSearch = row[0].toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStore = activeStore === "전체" || row[6] === activeStore;
    return matchesSearch && matchesStore;
  });

  return (
    <Layout>
      <div className="bg-white min-h-screen w-full">
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
          <main className="flex-1 px-8 py-10">
            <h1 className="text-3xl font-bold text-[#222] mb-2">예약관리</h1>
            <p className="text-[#888] mb-8">호텔 예약 현황을 관리하고 확인할 수 있습니다.</p>

            {/* 플랫폼 필터 탭 */}
            <StoreTab>
              <StoreButton
                onClick={() => setActiveStore("전체")}
                className={activeStore === "전체" ? "bg-[#fcefdc] text-black" : ""}
              >
                전체
              </StoreButton>
              {platforms.map((platform, index) => (
                <StoreButton
                  key={platform.id || index}
                  onClick={() => setActiveStore(platform.name)}
                  className={activeStore === platform.name ? "bg-[#fcefdc] text-black" : ""}
                >
                  {platform.name}
                </StoreButton>
              ))}
            </StoreTab>

            {/* 검색 필터 */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h2 className="text-lg font-bold text-[#222] mb-4">예약 검색</h2>
              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="검색하기"
                    className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                    value={searchInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSearchInput(value);
                      if (value.trim() === "") {
                        setSearchTerm("");
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </div>
                <button
                  className="px-6 py-2 bg-[#fcefdc] text-black rounded-lg font-medium"
                  onClick={handleSearch}
                >
                  검색
                </button>
              </div>
            </div>

            {/* 테이블 */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold text-[#222] mb-4">예약 현황</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      {columns.map((col, i) => (
                        <th key={i} className="px-4 py-3 font-medium text-[#222] text-sm text-center">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map(renderRow)
                    ) : (
                      <tr>
                        <td colSpan={columns.length} className="text-center py-6 text-[#888]">
                          검색 결과가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default DepthFrameWrapper;