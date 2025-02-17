// src/pages/Main/HarmonyPage.jsx
import React, { useState, useContext } from "react";
// import Navbar from "../../components/Navbar";  // 삭제
import ConditionalNavbar from "../../components/ConditionalNavbar";

import TitleNavbar from "../../components/TitleNavbar";
import PurpleButton from "../../components/Buttons/PurpleButton";
import Othersystems from "../../components/Othersystems";
import UploadHarmony from "../../components/UploadHarmony";
import styled from "styled-components";
import BackgroundSvg from "../../assets/HarmonyBg.svg";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const API_BASE_URL = import.meta.env.VITE_API_URL;

const HarmonyPage = () => {
  const [uploadedMusicId, setUploadedMusicId] = useState(null);
  const { token } = useContext(AuthContext);

  const handleUploadSuccess = (musicId) => {
    setUploadedMusicId(musicId);
  };

  const handleResult = async () => {
    if (!uploadedMusicId) {
      console.error("업로드된 음악 ID가 없습니다.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}task/harmony`,
        { musicId: uploadedMusicId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("화성분석 작업 결과:", response.data);
    } catch (error) {
      console.error("화성분석 작업 요청 실패:", error);
    }
  };

  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경됨 */}
      <TitleNavbar title="화성 분석" subtitle="내용들" />
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <UploadHarmony onUploadSuccess={handleUploadSuccess} />
      </div>

      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <PurpleButton onClick={handleResult}>결과보기</PurpleButton>
      </div>

      <Othersystems />
    </PageContainer>
  );
};

export default HarmonyPage;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;
const BackgroundImage = styled.img`
  width: 100vw;
  min-height: 747px;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 350px;
  left: 0;
  z-index: -1;
`;
