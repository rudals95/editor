import React, { useState, useCallback, useEffect, useRef } from "react";
import { Container, Bg_con, Img_con, Text_con } from "./styleComponents/style";
import { TextField, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { ChromePicker } from "react-color";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DownloadIcon from "@mui/icons-material/Download";

function Client() {
  const conRef = useRef(null);
  const canvasRef = useRef(null);
  const [colorState, setColorState] = useState({
    width: "800px",
    height: "500px",
    color: "",
    position: "",
    font: "휴먼범석체",
    fontSize: "16px",
    img_url: "",
  });
  const [stateType, setStateType] = useState("");
  const [innerText, serInnerText] = useState("");

  const handleChange = useCallback(
    (e) => {
      setColorState((state) => ({ ...state, font: e.target.value }));
    },
    [colorState]
  );
  const onChangeText = useCallback(
    (e) => {
      serInnerText(e.target.value);
    },
    [innerText]
  );
  const clickAlign = useCallback(
    (type) => {
      setColorState((state) => ({
        ...state,
        position: type,
      }));
    },
    [colorState]
  );

  const onClick = useCallback(
    (type) => {
      console.log(type);
      setStateType(type);
    },
    [stateType]
  );
  const onUpload = useCallback(
    (e) => {
      if (e.target.files.length === 0) {
        return;
      }
      setStateType("upload");
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          resolve(
            setColorState((state) => ({
              ...state,
              img_url: reader.result,
            }))
          );
          e.target.value = "";
        };
      });
    },
    [stateType]
  );
  const onChange = useCallback(
    (e) => {
      setStateType("color");
      setColorState((state) => ({
        ...state,
        color: e.hex,
      }));
    },
    [stateType]
  );
  const onChangeSize = useCallback(
    (e, type) => {
      console.log(e.target.value);
      setColorState((state) => ({
        ...state,
        [type]: e.target.value + "px",
      }));
    },
    [colorState]
  );
  const onDownloadBtn = () => {
    domtoimage.toBlob(conRef.current).then((blob) => {
      saveAs(blob, `${stateType === "color" ? "defaul.png" : "dd"}`);
    });
  };

  const innerWidth = () => {
    window.addEventListener("resize", () => {
      setColorState((state) => ({
        ...state,
        width: conRef.current?.offsetWidth - 22 + "px",
      }));
    });
  };

  // console.log(process.env.NODE_ENV);

  useEffect(() => {
    setColorState((state) => ({
      ...state,
      width: conRef.current?.offsetWidth - 22 + "px",
    }));
    innerWidth();
  }, []);

  const [location, setLocation] = useState({
    move: false,
    x: 10,
    y: 10,
    moveX: 0,
    moveY: 0,
  });
  const canvasDown = useCallback(
    (e) => {
      const ctx = canvasRef.current.getContext("2d");
      const x = e.clientX - ctx.canvas.offsetLeft;
      const y = e.clientY - ctx.canvas.offsetTop;
      setLocation((state) => ({ ...state, move: true, x, y }));
    },
    [location.move]
  );
  const canvasMove = useCallback(
    (e) => {
      const ctx = canvasRef.current.getContext("2d");

      if (location.move) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.beginPath();
        ctx.fillRect(
          location.x,
          location.y,
          e.clientX - location.x,
          e.clientY - location.y
        );

        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    },
    [location]
  );

  const canvasUp = useCallback(
    (e) => {
      setLocation((state) => ({ ...state, move: false }));
    },
    [location.move]
  );

  return (
    <>
      <canvas
        onMouseDown={canvasDown}
        onMouseMove={canvasMove}
        onMouseUp={canvasUp}
        ref={canvasRef}
        width="150"
        height="150"
      />
      <Container>
        <div className="box">
          <div className="top">
            <TextField
              id="outlined-basic"
              label="width"
              variant="outlined"
              type="number"
              value={colorState.width.replace(/[^0-9]/g, "")}
              onChange={(e) => {
                onChangeSize(e, "width");
              }}
            />
            <TextField
              id="outlined-basic2"
              label="height"
              variant="outlined"
              type="number"
              value={colorState.height.replace(/[^0-9]/g, "")}
              onChange={(e) => {
                onChangeSize(e, "height");
              }}
            />
            <IconButton
              color={stateType === "upload" ? "primary" : "rgba(0, 0, 0, 0.54)"}
              aria-label="upload picture"
              component="label"
              onClick={() => {
                onClick("upload");
              }}
            >
              <input hidden accept="image/*" type="file" onChange={onUpload} />
              <PhotoCamera />
            </IconButton>
            <IconButton
              color={stateType === "color" ? "primary" : "rgba(0, 0, 0, 0.54)"}
              aria-label="color picture"
              component="label"
              onClick={() => {
                onClick("color");
              }}
            >
              <ColorLensIcon />
            </IconButton>

            <IconButton
              color={"primary"}
              aria-label="color picture"
              component="label"
              onClick={onDownloadBtn}
            >
              <DownloadIcon />
            </IconButton>
          </div>

          <div className="text_con">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "start",
                gap: "10px",
              }}
            >
              <FormControl sx={{ m: 0 }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  font
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  onChange={handleChange}
                  autoWidth
                  label="font"
                  defaultValue={"휴먼범석체"}
                >
                  <MenuItem value={"휴먼범석체"}>휴먼범석체</MenuItem>
                  <MenuItem value={"나눔손글씨_옥비체"}>
                    나눔손글씨_옥비체
                  </MenuItem>
                  <MenuItem value={"나눔손글씨_외할머니글씨"}>
                    나눔손글씨_외할머니글씨
                  </MenuItem>
                  <MenuItem value={" Pretendard-Bold"}>
                    Pretendard-Bold
                  </MenuItem>
                  <MenuItem value={"Pretendard-Medium"}>
                    Pretendard-Medium
                  </MenuItem>
                  <MenuItem value={"Pretendard-Regular"}>
                    Pretendard-Regular
                  </MenuItem>
                  <MenuItem value={" NotoSansKR-Black"}>
                    NotoSansKR-Black
                  </MenuItem>
                  <MenuItem value={" NotoSansKR-Bold"}>
                    NotoSansKR-Bold
                  </MenuItem>
                  <MenuItem value={" NotoSansKR-Regular"}>
                    NotoSansKR-Regular
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                id="outlined-basic"
                label="size"
                variant="outlined"
                type="number"
                value={colorState.fontSize.replace(/[^0-9]/g, "") || 16}
                onChange={(e) => {
                  onChangeSize(e, "fontSize");
                }}
              />
            </div>
            <div style={{ maxWidth: "400px", width: "100%" }}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="text"
                variant="outlined"
                value={innerText}
                onChange={onChangeText}
              />
            </div>
            <div className="align_con" style={{ display: "flex" }}>
              <IconButton
                component="label"
                color={
                  colorState.position === "left"
                    ? "primary"
                    : "rgba(0, 0, 0, 0.54)"
                }
                onClick={() => {
                  clickAlign("left");
                }}
              >
                <FormatAlignLeftIcon />
              </IconButton>
              <IconButton
                component="label"
                color={
                  colorState.position === "center"
                    ? "primary"
                    : "rgba(0, 0, 0, 0.54)"
                }
                onClick={() => {
                  clickAlign("center");
                }}
              >
                <FormatAlignCenterIcon />
              </IconButton>
              <IconButton
                component="label"
                color={
                  colorState.position === "end"
                    ? "primary"
                    : "rgba(0, 0, 0, 0.54)"
                }
                onClick={() => {
                  clickAlign("end");
                }}
              >
                <FormatAlignRightIcon />
              </IconButton>
            </div>
          </div>

          <div
            ref={conRef}
            style={{
              border: "1px solid",
              overflowX: "auto",
              padding: "10px",
              position: "relative",
            }}
          >
            <Bg_con props={colorState} />
            <Img_con props={colorState}>
              <img src={colorState.img_url} alt="" />
            </Img_con>
            <Text_con props={colorState}>{innerText}</Text_con>
          </div>
        </div>
        {stateType === "color" && (
          <ChromePicker color={colorState.color} onChange={onChange} />
        )}
      </Container>
    </>
  );
}
export default Client;
