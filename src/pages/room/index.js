import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import tw from "tailwind-styled-components";
import { fetchPlatformList } from "@/api/platform";

const StoreTab = tw.div`flex flex-wrap gap-2 mb-4`;
const StoreButton = tw.button`px-4 py-2 bg-white border border-[#E5E7EB] rounded-lg text-[#888]`;

const rooms = [
  { number: "101", type: "Standard", status: "사용 가능", cleaning: "청소 완료", memo: "배개 2개 있음", platform: "야놀자" },
  { number: "102", type: "Deluxe", status: "사용 중", cleaning: "청소 완료", memo: "침구류 상태 최상", platform: "여기어때" },
  { number: "103", type: "Suite", status: "서비스 중지", cleaning: "청소 전", memo: "공사로 사용 불가", platform: "야놀자" },
  { number: "104", type: "Deluxe", status: "사용 가능", cleaning: "청소 전", memo: "새벽 1시 예약", platform: "Agoda" },
  { number: "105", type: "Suite", status: "사용 중", cleaning: "청소 완료", memo: "비품 준비 완료", platform: "Booking.com" },
  { number: "201", type: "Standard", status: "사용 중", cleaning: "청소 완료", memo: "샤워기 교체 완료", platform: "여기어때" },
  { number: "202", type: "Standard", status: "사용 가능", cleaning: "청소 전", memo: "바닥 청소 필요", platform: "Trip.com" },
  { number: "203", type: "Deluxe", status: "사용 가능", cleaning: "청소 전", memo: "에어컨·냉장고 작동 양호", platform: "야놀자" },
  { number: "204", type: "Suite", status: "사용 중", cleaning: "청소 완료", memo: "타월 보충 필요", platform: "Booking.com" },
  { number: "205", type: "Standard", status: "서비스 중지", cleaning: "청소 완료", memo: "샤워기 고장", platform: "Agoda" },
];

function Dropdown({ value, onChange, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="ml-2 px-2 py-1 text-sm border border-gray-300 rounded bg-white"
      >
        {value} ▼
      </button>
      {open && (
        <ul className="absolute mt-1 z-10 w-max bg-white border border-gray-300 rounded shadow text-sm">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReserveIndex({ currentUser }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = () => setSearchTerm(searchInput);

  const [filterType, setFilterType] = useState("전체");
  const [filterStatus, setFilterStatus] = useState("전체");
  const [filterCleaning, setFilterCleaning] = useState("전체");
  const [platformFilter, setPlatformFilter] = useState("전체");

  const [platforms, setPlatforms] = useState([]);
  const [activeStore, setActiveStore] = useState("전체");

  const filteredRooms = rooms.filter((room) => {
    const matchType = filterType === "전체" || room.type === filterType;
    const matchStatus = filterStatus === "전체" || room.status === filterStatus;
    const matchCleaning = filterCleaning === "전체" || room.cleaning === filterCleaning;
    const matchPlatform = platformFilter === "전체" || room.platform === platformFilter;
    const matchSearch =
      searchTerm === "" ||
      Object.values(room).some((value) => value.includes(searchTerm));
    return matchType && matchStatus && matchCleaning && matchSearch && matchPlatform;
  });

  const loadPlatforms = async () => {
    const {ok,data} = await fetchPlatformList();
    setPlatforms(data || []);
  };

  useEffect(() => {
    loadPlatforms();
  }, []);

  return (
    <Layout>
      <div className="bg-white min-h-screen w-full">
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
          <main className="flex-1 px-8 py-10">
            <h1 className="text-3xl font-bold text-[#222] mb-2">객실 관리</h1>
            <p className="text-[#888] mb-8">객실 재고, 상태, 세부정보를 관리합니다.</p>

          {/* Source Tabs */}
          <StoreTab>
            <StoreButton
              onClick={() => setPlatformFilter("전체")}
              className={`${platformFilter === "전체" ? "bg-[#fcefdc] text-black" : ""}`}
            >
              전체
            </StoreButton>
            {platforms.map((platform, index) => (
              <StoreButton
                key={platform.id || index}
                onClick={() => setPlatformFilter(platform.name)}
                className={`${platformFilter === platform.name ? "bg-[#fcefdc] text-black" : ""}`}
              >
                {platform.name}
              </StoreButton>
            ))}
          </StoreTab>

          {/* 검색창 */}
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-[#222] mb-4">객실 검색</h2>
            <div className="flex items-center gap-2 w-full mb-4">
              <input
                type="text"
                placeholder="검색하기"
                className="flex-grow px-4 py-2 border border-[#E5E7EB] rounded-lg bg-white text-[#222]"
                value={searchInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchInput(value);
                  if (value.trim() === "") setSearchTerm("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="px-4 py-2 bg-[#fcefdc] text-black rounded-lg font-medium whitespace-nowrap"
                onClick={handleSearch}
              >
                검색
              </button>
            </div>
          </div>

          {/* 객실 테이블 */}
          <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full text-center">
              <thead>
                <tr className="text-[#888] text-sm border-b">
                  <th className="py-2">객실 번호</th>
                  <th className="py-2">
                    객실 유형
                    <Dropdown
                      value={filterType}
                      onChange={setFilterType}
                      options={["전체", "Standard", "Deluxe", "Suite"]}
                    />
                  </th>
                  <th className="py-2">
                    상태
                    <Dropdown
                      value={filterStatus}
                      onChange={setFilterStatus}
                      options={["전체", "사용 가능", "사용 중", "서비스 중지"]}
                    />
                  </th>
                  <th className="py-2">
                    청소 여부
                    <Dropdown
                      value={filterCleaning}
                      onChange={setFilterCleaning}
                      options={["전체", "청소 완료", "청소 전"]}
                    />
                  </th>
                  <th className="py-2">객실 상태 메모</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.number} className="border-b last:border-b-0">
                    <td className="py-2">{room.number}</td>
                    <td className="py-2 text-[#000] font-medium">{room.type}</td>
                    <td className="py-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          room.status === "사용 가능"
                            ? "bg-[#E8F5EF] text-[#03C75A]"
                            : room.status === "사용 중"
                            ? "bg-[#F1F3F5] text-[#888]"
                            : "bg-[#FDEFEF] text-[#FF5A5A]"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="py-2 text-[#000]">{room.cleaning}</td>
                    <td className="py-2 text-[#000]">{room.memo}</td>
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-[#999]">
                      해당 조건에 맞는 객실이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default ReserveIndex;