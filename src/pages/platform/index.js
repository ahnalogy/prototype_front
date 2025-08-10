import React, { useState } from "react";
import { fetchCreatePlatform } from "@/api/platform";



const PlatformRegister = () => {
  const [platformName, setPlatformName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {ok,data}=await fetchCreatePlatform(platformName)
    console.log("Platform registration response:", ok, data);
    if (!ok) {
        alert("플랫폼 등록에 실패하였습니다.");
        return;
        }
    // TODO: Add API call or logic to register the platform
    alert(`플랫폼 이름: ${platformName}`);
    setPlatformName("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 350,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          padding: "40px 32px 32px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 24 }}>
          <span style={{ color: "#00c4c4" }}>플랫폼</span> 등록이 필요해요
        </div>
        <div style={{ width: "100%" }}>
          <label
            style={{
              fontSize: 14,
              color: "#888",
              marginBottom: 6,
              display: "block",
            }}
          >
            플랫폼 이름
          </label>
          <input
            type="text"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
            placeholder="플랫폼 이름을 입력하세요"
            required
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "1px solid #eee",
              borderRadius: 8,
              fontSize: 15,
              marginBottom: 28,
              outline: "none",
              background: "#fafafa",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#36d1c4",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            border: "none",
            borderRadius: 10,
            padding: "14px 0",
            cursor: "pointer",
            marginTop: 8,
          }}
          onClick={handleSubmit}
        >
          등록
        </button>
      </form>
    </div>
  );
};

export default PlatformRegister;