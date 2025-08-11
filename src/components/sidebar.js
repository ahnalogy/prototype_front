
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaCalendarAlt,
  FaBed,
  FaChartBar,
  FaStar,
  FaUserFriends,
  FaCog,
  FaGlobe,
  FaQuestionCircle 
} from "react-icons/fa";

function Menu({ text, url, icon, active }) {
  return (
    <Link href={url || "#"} passHref>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer w-full
          ${active ? "bg-orange-100 text-black font-semibold" : "text-gray-500 hover:bg-sky-100"}
        `}
      >
        <span className={`text-xl ${active ? "text-black" : "text-gray-400"}`}>
          {icon}
        </span>
        <span className="text-sm">{text}</span>
      </div>
    </Link>
  );
}

export default function LeftNavigationBar() {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <div className="flex flex-col h-screen bg-[#FFFCF7]">
      {/* 로고 클릭 시 대시보드로 이동 */}
      <Link href="/dashboard">
        <div className="flex items-center gap-3 px-6 py-5 cursor-pointer">
          <div className="w-[50px] h-[50px] bg-[url('/icons/lemong_logo.png')] bg-contain bg-no-repeat bg-center" />
          <div className="font-semibold text-base text-black">The Dream Solution</div>
        </div>
      </Link>

      <div className="flex flex-col gap-2 px-2 w-full">
        <Menu text="대시보드" url="/dashboard" icon={<FaHome />} active={currentPath === "/dashboard"} />
        <Menu text="플랫폼관리" url="/platform" icon={<FaGlobe />} active={currentPath === "/store"} />
        <Menu text="예약관리" url="/reservation" icon={<FaCalendarAlt />} active={currentPath === "/reservation"} />
        <Menu text="객실관리" url="/room" icon={<FaBed />} active={currentPath === "/room"} />
        <Menu text="통계/분석" url="/report" icon={<FaChartBar />} active={currentPath === "/report"} />
        <Menu text="리뷰관리" url="/review" icon={<FaStar />} active={currentPath === "/review"} />
        <Menu text="내 정보" url="/myinfo" icon={<FaUserFriends />} active={currentPath === "/myinfo"} />
        <Menu text="설정" url="/settings" icon={<FaCog />} active={currentPath === "/settings"} />
      </div>

      <div className="mt-auto px-2 py-4 w-full flex flex-col gap-2">
        <Menu text="도움이 필요하신가요?" url="/support" icon={<FaQuestionCircle />} active={currentPath === "/support"} />
      </div>
      
    </div>
  );
}
