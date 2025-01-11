import { styled } from "@mui/system";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { elapsedTimeAtom } from "../../../../atoms/pomodoro-atom";



type TimeDisplayProps = {
  durationTimeSeconds?: number; // 設定時間（秒）
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  durationTimeSeconds = 0,
}) => {

// elapsedTimeSecondsとdurationTimeSecondsを整数化
const [elapsedTimeSeconds] = useAtom(elapsedTimeAtom);
const durationTimeSecondsInt = Math.floor(durationTimeSeconds);
const elapsedTimeSecondsInt = Math.floor(elapsedTimeSeconds);

// 残り秒数を計算
const remainingSeconds = Math.max(durationTimeSecondsInt - elapsedTimeSecondsInt, 0);

// 分・秒に変換
const minutes = Math.floor(remainingSeconds / 60); // 分数部分
const seconds = remainingSeconds % 60; // 秒数部分

// 表示用のゼロ埋め
const displayMinutes = String(minutes).padStart(2, "0");
const displaySeconds = String(seconds).padStart(2, "0");

  return (
    <IndicatorContainer
      durationTimeSeconds={durationTimeSeconds}
      remainingSeconds={remainingSeconds}
    >
      {/* 時間表示 */}
      <TimeDisplayContainer>
        {displayMinutes}:{displaySeconds}
      </TimeDisplayContainer>

      {/* 丸いインジケータ先端用ラッパ (ドットを含む) */}
      <IndicatorDotWrapper
        durationTimeSeconds={durationTimeSeconds}
        remainingSeconds={remainingSeconds}
      >
        <IndicatorDot />
      </IndicatorDotWrapper>
    </IndicatorContainer>
  );
};

// ===== 時間表示部分 (中央の丸) =====
const TimeDisplayContainer = styled("div")({
  fontSize: "3em",
  fontWeight: "bold",
  color: "#333",
  width: "14rem",
  height: "14rem",
  backgroundColor: "#F5DEB3",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

// ===== インジケータ本体 (conic-gradient) =====
type IndicatorContainerProps = {
  durationTimeSeconds: number;
  remainingSeconds: number;
};

const IndicatorContainer = styled("div")<IndicatorContainerProps>(
  ({ durationTimeSeconds, remainingSeconds }) => {
    const fraction =
      durationTimeSeconds > 0
        ? remainingSeconds / durationTimeSeconds
        : 0;
    const degrees = fraction * 360;

    return {
      position: "relative",
      width: "16rem",
      height: "16rem",
      borderRadius: "50%",
      background: `conic-gradient(
        #66CC66 0deg ${degrees}deg,
        #e6e6e6 ${degrees}deg 360deg
      )`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  }
);

// ===== ドットのラッパ要素 =====
type IndicatorDotWrapperProps = {
  durationTimeSeconds: number;
  remainingSeconds: number;
};

const IndicatorDotWrapper = styled("div")<IndicatorDotWrapperProps>(
  ({ durationTimeSeconds, remainingSeconds }) => {
    const fraction =
      durationTimeSeconds > 0
        ? remainingSeconds / durationTimeSeconds
        : 0;
    const degrees = fraction * 360;

    return {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) rotate(${degrees}deg)`,
      transformOrigin: "center center",
      width: 0,
      height: 0,
    };
  }
);

// ===== ドットそのもの =====
const IndicatorDot = styled("div")({
  position: "absolute",
  top: "-8.1rem",
  left: "-0.6rem",
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "50%",
  backgroundColor: "#417b41",
});
