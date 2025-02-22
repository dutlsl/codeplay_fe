// src/components/Mypg/harmonyconentire.jsx
import React, { useState } from "react";
import styled from "styled-components";
import likeButtonOff from "../../assets/Mypg_img/like_button_off.svg";
import likeButtonOn from "../../assets/Mypg_img/like_button_on.svg";
import { Link } from "react-router-dom";


/**
 * data: {
 *   harmonyId, musicId, musicTitle, createdAt, scale, genre, bpm, voiceColor, isLiked
 * }
 * onAddFavorite(musicId, true)
 * onRemoveFavorite(musicId, true)
 * onDelete(musicId, true)
 */
const Harmonybar = ({ data, onAddFavorite, onRemoveFavorite, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);

  const dateString = data.createdAt?.split("T")[0] || "";
  const isLiked = data.isLiked || false;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // 즐겨찾기 토글
  const handleLikeToggle = () => {
    if (isLiked) {
      onRemoveFavorite(data.musicId, true);
    } else {
      onAddFavorite(data.musicId, true);
    }
    setShowPopup(false);
  };

  // 삭제하기
  const handleDelete = () => {
    onDelete(data.musicId, true);
    setShowPopup(false);
  };

  return (
    <TrackRow>
      <PurpleBadge>화성분석</PurpleBadge>

      <MainContent>
        <TrackInfo>
          <AlbumCover />
          <TrackDetails>
            <TrackTitle>{data.musicTitle}</TrackTitle>
            <TrackDate>{dateString}</TrackDate>
          </TrackDetails>
        </TrackInfo>

        <TrackContent>
          <TrackCell>
            <Label>키</Label>
            {data.scale || "Major"}
          </TrackCell>
          <TrackCell>
            <Label>장르</Label>
            {data.genre || "장르 없음"}
          </TrackCell>
          <TrackCell>
            <Label>BPM</Label>
            {data.bpm ?? "??"}
          </TrackCell>

          {/* 좋아요(하트) 버튼 */}
          <LikeButtonWrapper>
            <LikeButton onClick={togglePopup}>
              <img
                src={isLiked ? likeButtonOn : likeButtonOff}
                alt="좋아요 버튼"
              />
            </LikeButton>
            {showPopup && (
              <Popup>
                <PopupArrow />
                <PopupContent>
                  {isLiked ? (
                    <PopupItem onClick={handleLikeToggle}>
                      즐겨찾기 취소
                    </PopupItem>
                  ) : (
                    <PopupItem onClick={handleLikeToggle}>즐겨찾기</PopupItem>
                  )}
                  <PopupItem
                    style={{ color: "red", fontWeight: "bold" }}
                    onClick={handleDelete}
                  >
                    삭제하기
                  </PopupItem>
                </PopupContent>
              </Popup>
            )}
          </LikeButtonWrapper>
        </TrackContent>
      </MainContent>
    </TrackRow>
  );
};

export default Harmonybar;

/* ───────────────────────── styled-components ───────────────────────── */
const TrackRow = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 10px;
  background-color: rgba(249, 248, 250, 1);
  border-radius: 8px;
  border-bottom: 1px solid #ddd;
  overflow: visible;
`;

const PurpleBadge = styled.div`
  background-color: #9280ec;
  color: #fff;
  font-size: 14px;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 20px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  font-weight: bold;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  padding: 30px 25px;
  justify-content: space-between;
`;

const TrackInfo = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const AlbumCover = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d3d3d3;
  border-radius: 4px;
`;

const TrackDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TrackTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const TrackDate = styled.div`
  font-size: 12px;
  color: #666;
`;

const TrackContent = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
`;

const TrackCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  font-size: 14px;
  color: #000;
`;

const Label = styled.span`
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
`;

const LikeButtonWrapper = styled.div`
  position: relative;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center;
  img {
    width: 36px;
    height: 36px;
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  width: 180px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PopupArrow = styled.div`
  position: absolute;
  top: 50%;
  left: -8px;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid #fff;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  font-size: 14px;
  text-align: center;
`;

const PopupItem = styled.div`
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
