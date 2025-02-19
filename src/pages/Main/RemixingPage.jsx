// src/pages/Main/SessionPage.jsx
import ConditionalNavbar from "../../components/ConditionalNavbar";
import TitleNavbar from "../../components/TitleNavbar";
import SessionButton from "../../components/Buttons/GreenButton";
import Othersystems from "../../components/Othersystems";
import { Link } from "react-router-dom";
import UploadSession from "../../components/UploadSession";
import BackgroundSvg from "../../assets/SessionBg.svg";
import styled from "styled-components";

const SessionPage = () => {
  return (
    <PageContainer>
      <ConditionalNavbar /> {/* 변경 */}
      <TitleNavbar title="리믹싱" subtitle="피치, 템포, 리버브 조정이 가능하며 코러스도 추가할 수 있습니다. "/>
      <BackgroundImage src={BackgroundSvg} alt="Background" />

      <div style={{ marginTop: "100px", display: "flex", justifyContent: "center" }}>
        <UploadSession />
      </div>

      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
        <SessionButton>
          <Link to="/remixing/result_remixing">진행하기</Link>
        </SessionButton>
      </div>
      {/* <Othersystems /> */}
    </PageContainer>
  );
};

export default SessionPage;

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
  background-color: black;
`;
