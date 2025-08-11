import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

function ReportIndex({ currentUser }) {
  const [selectedReport, setSelectedReport] = useState("예약률");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    setShowReport(false); // 날짜가 변경되면 리포트 숨김
  }, [startDate, endDate]);

  const today = new Date().toISOString().split("T")[0];
  const reportTypes = ["예약률", "매출분석", "리뷰분석", "고객분석"];

  const getDateRangeLabels = () => {
    if (!startDate || !endDate) return [];
    const s = new Date(startDate);
    const e = new Date(endDate);
    const labels = [];
    let current = new Date(s);
    while (current <= e) {
      labels.push(current.toISOString().slice(5, 10));
      current.setDate(current.getDate() + 7);
    }
    return labels;
  };

  const generateLineChartData = () => {
    return getDateRangeLabels().map((label) => ({
      label,
      value: 60 + Math.floor(Math.random() * 30),
    }));
  };

  const generateKeywordsWithCounts = () => {
    if (!startDate || !endDate) return [];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)));

    const baseKeywords = [
      "청결", "친절", "위치", "가격",
      "침구", "시설", "뷰", "주차",
      "가족", "수영장", "냉난방", "방음"
    ];

    const keywords = baseKeywords.map((word, idx) => {
      const base = 5 + idx * 2;
      const variation = Math.floor(Math.random() * (diffDays + 1));
      return {
        word,
        count: base + variation
      };
    });

    return keywords.sort((a, b) => b.count - a.count);
  };

  const handleGenerateReport = () => {
    if (startDate && endDate) {
      setShowReport(true);
    }
  };

  const renderLineChart = (data) => (
    <div className="w-full h-64 bg-[#f5f8fa] rounded-lg px-6 py-4 overflow-x-auto">
      <svg viewBox={`0 0 ${data.length * 50} 200`} className="w-full h-full">
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          points={data.map((d, i) => `${i * 50},${200 - d.value * 1.5}`).join(" ")}
        />
        {data.map((d, i) => (
          <text key={i} x={i * 50} y={195} fontSize="10" fill="#999" textAnchor="middle">
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );

  const renderChart = () => {
    if (!startDate || !endDate) return null;

    switch (selectedReport) {
      case "예약률": {
        const data = generateLineChartData();
        return (
          <>
            <div className="text-3xl font-bold mb-1">75%</div>
            <div className="text-sm text-[#888] mb-4">
              최근 12개월 <span className="text-[#03C75A]">+5%</span>
            </div>
            {renderLineChart(data)}
          </>
        );
      }
      case "매출분석": {
        const data = generateLineChartData();
        return (
          <>
            <div className="text-sm text-[#888] mb-4">최근 일주일별 매출 변화입니다.</div>
            {renderLineChart(data)}
          </>
        );
      }
      case "리뷰분석": {
        const keywords = generateKeywordsWithCounts();
        const top5 = keywords.slice(0, 5);
        const extra = keywords.slice(5);

        return (
          <div className="w-full bg-[#F0F4F8] rounded-lg p-6 text-sm text-[#333]">
            <h3 className="font-semibold mb-4">주요 키워드 언급량</h3>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <ul className="space-y-2">
                  {top5.map((kw, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-white rounded-full py-2 px-4 border border-[#D1D5DB]"
                    >
                      <span>{kw.word}</span>
                      <span className="text-[#888]">{kw.count}회</span>
                    </li>
                  ))}
                </ul>
                {extra.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {extra.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs text-[#444] bg-white border border-[#D1D5DB] rounded-full"
                      >
                        {kw.word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* 워드클라우드 이미지 */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <img
                  src="/icons/wordcloud.png"
                  alt="워드클라우드"
                />
              </div>
            </div>
          </div>
        );
      }
      case "고객분석": {
        return (
          <div className="w-full bg-[#fff7ed] rounded-lg p-6">
            <h3 className="font-semibold text-[#b45309] mb-3">고객 이용 분석 요약</h3>
            <ul className="text-sm text-[#92400e] list-disc list-inside">
              <li>객실 점유율: 87% (평균)</li>
              <li>1박 이상 숙박 고객 비율: 72%</li>
              <li>체크인 시간대: 16시~18시에 집중</li>
              <li>가족 고객 비율: 전체의 35%</li>
              <li>고객 재방문율: 22%</li>
              <li>가장 인기 있는 객실 타입: 디럭스룸</li>
              <li>예약 시기: 체크인 7일 전 예약이 45%로 가장 많음</li>
              <li>예약 취소율: 8%</li>
              <li>고객 성별 비율: 남성 48%, 여성 52%</li>
              <li>고객 연령대: 20대 15%, 30대 25%, 40대 35%, 50대 이상 25%</li>
              <li>평균 숙박 일수: 1.8일</li>
            </ul>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen w-full">
        <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
          <main className="flex-1 px-8 py-10">
            <h1 className="text-3xl font-bold text-[#222] mb-2">통계/분석</h1>
            <p className="text-[#888] mb-8">호텔의 성과를 파악할 수 있는 통계와 분석자료입니다.</p>

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">리포트 유형</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {reportTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedReport(type)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedReport === type
                      ? "bg-[#fcefdc] text-black" // ✅ 선택된 버튼: 테두리 없음
                      : "bg-white text-[#888] border border-[#e5e7eb]" // ✅ 비선택 버튼: 연한 테두리
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-[#222] font-medium mb-2">{selectedReport}</label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={today}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-[#888] mt-1">시작일</p>
                </div>
                <div className="flex-1">
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    max={today}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <p className="text-xs text-[#888] mt-1">종료일</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              className="w-full bg-[#f59e0b] text-white py-3 rounded-lg font-medium"
            >
              리포트 생성하기
            </button>
          </div>

          {showReport && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-bold mb-2">
                {selectedReport === "예약률" && "예약률 통계자료"}
                {selectedReport === "매출분석" && "매출분석 통계자료"}
                {selectedReport === "리뷰분석" && "리뷰분석 통계자료"}
                {selectedReport === "고객분석" && "고객분석 통계자료"}
              </h2>
              {renderChart()}
            </div>
          )}
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default ReportIndex;