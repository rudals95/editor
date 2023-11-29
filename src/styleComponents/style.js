import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  font-family: SF Pro;
  font-weight: 100;
  text-align: center;
  background-color: #282c34;
  padding: 20px;
  display: flex;
  align-items: center;
  & > div.box {
    border: 1px solid;
    min-width: 300px;
    max-width: 864px;
    padding: 20px;
    background: rgb(255, 255, 255);
    margin: 0px auto;
  }
  & div.top {
    margin-bottom: 15px;
    display: flex;
    gap: 10px;
  }
  & div.text_con {
    width: 100%;
    margin-bottom: 15px;
    text-align: left;
    display: flex;
    align-items: center;
    gap: 10px;

    flex-wrap: wrap;
  }
  & div.pickerStyle {
    z-index: 2;
    position: absolute;
    top: 60px;
    right: 0;
  }
`;

export const Bg_con = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  background: #fff;

  width: ${(props) => `${props.props.width}`};
  height: ${(props) => `${props.props.height}`};
  background: ${(props) => `${props.props.color}`};
  justify-content: ${(props) => `${props.props.position}`};
  overflow: hidden;
`;

export const Img_con = styled.div`
  /* position: absolute; */
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  width: 100%;
  height: 100%;
  padding: 10px;
`;

export const Text_con = styled.div`
  /* position: absolute;
  top: calc(50% + 10px);
  left: calc(50% + 10px);
  transform: translate(calc(-50% - 10px), calc(-50% - 10px)); */
  /* width: calc(100% - 20px); */
  text-align: ${(props) => `${props.props.position}`};
  /* font-family: ${(props) => `${props.props.font}`}; */
  /* font-size: ${(props) => `${props.props.fontSize}`}; */
  word-break: break-word;
`;
