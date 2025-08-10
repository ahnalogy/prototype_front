import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function AlarmReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const dummyReviews = [
      {
        id: 1,
        nickname: "달려****",
        rating: 1,
        date: "2025.08.09",
        content: "객실이 청결하지 않았고 침구에서 냄새가 났어요.",
        reply: "",
      },
      {
        id: 2,
        nickname: "ki****",
        rating: 2,
        date: "2025.08.04",
        content: "조식이 너무 부실해서 실망했어요. 메뉴가 거의 없고 음식도 차가웠습니다.",
        reply: "",
      },
      {
        id: 3,
        nickname: "하루***",
        rating: 3,
        date: "2025.08.03",
        content: "직원은 친절했지만 방음이 잘 안돼서 불편했어요.",
        reply: "",
      },
      {
        id: 4,
        nickname: "Pe*******",
        rating: 1,
        date: "2025.08.01",
        content: "체크인 절차가 너무 느리고 불친절했어요.",
        reply: "",
      },
      {
        id: 5,
        nickname: "So****",
        rating: 4,
        date: "2025.07.29",
        content: "전반적으로 만족했지만 욕실 환기가 부족했어요.",
        reply: "",
      },
      {
        id: 6,
        nickname: "ew*****",
        rating: 1,
        date: "2025.07.25",
        content: "에어컨이 고장 나서 더운 방에서 잠을 제대로 못 잤어요. 대응도 늦었습니다.",
        reply: "",
      },
    ];
    setReviews(dummyReviews);
  }, []);

  const handleReplyChange = (id, newReply) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, reply: newReply } : review
      )
    );
  };

  const handleSubmit = (id) => {
    const review = reviews.find((r) => r.id === id);
    alert(`답변이 등록되었습니다: \n\n${review.reply}`);
  };

  const handleGenerate = (id) => {
    const generated = "이용해 주셔서 감사합니다. 고객님의 의견을 반영하여 개선하겠습니다.";
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id ? { ...review, reply: generated } : review
      )
    );
  };

  return (
    <Layout>
    <div className="flex bg-[#F6F8FB] min-h-screen">
       {/* 본문 */}
      <main className="flex-1 px-10 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#222] mb-2">불만 리뷰 알림</h1>
          <p className="text-[#888] mb-4">
            고객 불만 리뷰를 확인하고, 답변을 등록할 수 있습니다.
          </p>

          <div className="bg-white rounded-lg shadow p-4 mb-8 flex items-center justify-between">
            <div className="text-[#222] font-medium">
              총 불만 리뷰{" "}
              <span className="text-blue-600 font-bold">{reviews.length}</span>건
            </div>
            <div className="text-sm text-gray-500">불만 리뷰에 대한 답변을 빠르게 남겨보세요.</div>
          </div>

          <div className="space-y-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white rounded-xl shadow p-6 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-[#222]">{r.nickname}</div>
                      <div className="flex text-yellow-400 text-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star}>{star <= r.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{r.date}</div>
                </div>

                <p className="text-[#222] mb-3">{r.content}</p>

                <textarea
                  placeholder="답변을 입력해주세요."
                  className="w-full h-28 p-4 border border-gray-300 rounded-lg resize-none"
                  value={r.reply}
                  onChange={(e) => handleReplyChange(r.id, e.target.value)}
                />

                <div className="flex justify-end mt-2 gap-2">
                  <button
                    onClick={() => handleGenerate(r.id)}
                    className="px-4 py-2 bg-white border border-[#E5E7EB] text-black rounded-lg text-sm"
                  >
                    답변 생성
                  </button>
                  <button
                    onClick={() => handleSubmit(r.id)}
                    className="px-4 py-2 bg-[#fcefdc] text-black rounded-lg text-sm"
                  >
                    답변 등록
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
    </Layout>
  );
}