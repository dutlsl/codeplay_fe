import styled from "styled-components";

const PrimaryButton = styled.button`
  width: 198px;
  height: 59px;
  padding: 0;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background: linear-gradient(180deg, #9747FF 12.5%, #5E00BC 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: white;
    font-family: Pretendard, sans-serif;
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    text-decoration: none;
  }

  &:hover {
    background: linear-gradient(180deg, #613FA4 0%, #321A61 100%);
  }

  &:active {
    background: linear-gradient(140.12deg, rgba(15, 51, 209, 0.3) 11.62%, rgba(255, 255, 255, 0.3) 94.65%),
                linear-gradient(143.01deg, #000068 10.03%, #6F3DA1 91.86%); 
  }

  &:disabled {
    background: linear-gradient(180deg, #9747FF 12.5%, #5E00BC 100%);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
    outline: none;
  }
`;

export default PrimaryButton;
