import React from "react";

export default function DashboardStats() {
  const dashboardStats = [
    {
      label: "예약률",
      value: "75%",
    },
    {
      label: "평점",
      value: "4.5/5",
    },
    {
      label: "총 수익",
      value: "3,200,000원",
    },
  ];

  const bookingData = [
    {
      customerName: "김몽몽",
      roomType: "Deluxe Suite",
      checkIn: "2025-03-15",
      checkOut: "2025-03-20",
      status: "확정",
    },
    {
      customerName: "박올리브",
      roomType: "Standard Room",
      checkIn: "2025-03-18",
      checkOut: "2025-03-22",
      status: "체크인 완료",
    },
    {
      customerName: "Eonusele",
      roomType: "Executive Suite",
      checkIn: "2025-03-20",
      checkOut: "2025-03-25",
      status: "확정",
    },
    {
      customerName: "Geneoya",
      roomType: "Standard Room",
      checkIn: "2025-03-22",
      checkOut: "2025-03-26",
      status: "대기 중",
    },
    {
      customerName: "정하나",
      roomType: "Deluxe Suite",
      checkIn: "2025-03-25",
      checkOut: "2025-03-30",
      status: "확정",
    },
  ];

  const reviewData = [
    {
      username: "배고픈너구리13",
      date: "2025-03-10",
      comment: "방은 깨끗하고 좋은데다가 편리했어요.",
    },
    {
      username: "호호우리사랑",
      date: "2025-03-05",
      comment: "사장님 친절하신데 저녁에 좀 시끄러웠어요ㅠㅠ",
    },
  ];

  return (
    <div className="flex items-start justify-center gap-1 px-6 py-5 relative flex-1 self-stretch w-full grow">
      <main className="flex-1 px-8 py-10">
        <h1 className="text-3xl font-bold text-[#222] mb-2">대시보드</h1>
        <p className="text-[#888] mb-8">호텔 운영에 필요한 주요 지표를 한눈에 확인할 수 있습니다.</p>

        {/* 통계 카드 섹션 */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2 p-6 bg-[#e8edf4] rounded-lg"
            >
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <div className="mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#0c141c] text-sm leading-[21px] relative self-stretch tracking-[0]">
                  {stat.label}
                </div>
              </div>
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <div className="mt-[-1.00px] [font-family:'Inter-Bold',Helvetica] font-bold text-[#0c141c] text-2xl leading-8 relative self-stretch tracking-[0]">
                  {stat.value}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 고객 리뷰 섹션 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#222] mb-4">
            고객 리뷰
          </h2>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="space-y-6">
              {reviewData.map((review, index) => (
                <article key={index} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="font-medium text-[#222] text-base">
                      {review.username}
                    </div>
                    <time className="text-[#49729b] text-sm">
                      {review.date}
                    </time>
                  </div>
                  <p className="text-[#222] text-base leading-6">
                    {review.comment}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 예약 현황 섹션 */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#222] mb-4">
            최근 예약 현황
          </h2>
          
          <div className="bg-white rounded-xl shadow p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 font-medium text-[#222] text-sm text-left">고객 이름</th>
                    <th className="px-4 py-3 font-medium text-[#222] text-sm text-left">객실 타입</th>
                    <th className="px-4 py-3 font-medium text-[#222] text-sm text-left">체크인 날짜</th>
                    <th className="px-4 py-3 font-medium text-[#222] text-sm text-left">체크아웃 날짜</th>
                    <th className="px-4 py-3 font-medium text-[#222] text-sm text-left">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData.map((booking, index) => (
                    <tr key={index} className="border-t border-[#e5e8ea]">
                      <td className="px-4 py-2 text-left font-normal text-[#0c141c] text-sm">
                        {booking.customerName}
                      </td>
                      <td className="px-4 py-2 text-left font-normal text-[#49729b] text-sm">
                        {booking.roomType}
                      </td>
                      <td className="px-4 py-2 text-left font-normal text-[#49729b] text-sm">
                        {booking.checkIn}
                      </td>
                      <td className="px-4 py-2 text-left font-normal text-[#49729b] text-sm">
                        {booking.checkOut}
                      </td>
                      <td className="px-4 py-2 text-center align-middle">
                        <span className="inline-block w-full bg-[#e8edf2] rounded-lg px-4 py-1 font-medium text-[#0c141c] text-sm whitespace-nowrap truncate text-center">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
