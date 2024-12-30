import { styled } from "@mui/system";
import { useEffect, useState } from "react";

type TimeDisplayProps = {
  durationTimeSeconds?: number; // 設定時間（秒）
  elapsedTimeSeconds?: number;  // 経過時間（秒）
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  durationTimeSeconds = 0,
  elapsedTimeSeconds = 0,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(0); // 残り時間（秒）

  useEffect(() => {
    const diff = durationTimeSeconds - elapsedTimeSeconds; // 残り時間を計算
    setRemainingSeconds(Math.max(diff, 0)); // 0秒未満にならないように補正
  }, [durationTimeSeconds, elapsedTimeSeconds]);

  // 分・秒に変換
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const displayMinutes = String(minutes).padStart(2, "0"); // 1→01,10→10
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
    // 残り時間割合を計算
    const fraction =
      durationTimeSeconds > 0
        ? remainingSeconds / durationTimeSeconds
        : 0;
    // 回転角度 (0～360)
    const degrees = fraction * 360;

    return {
      // 中心を (50%, 50%) にしておいて、そこを基準に回転
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
  // ラッパ要素を回転させた状態で、ドットは “上端” (半径ぶん) に置く
  position: "absolute",
  // 以下は、直径 1.2rem の丸を作っているので、半径 0.6rem 分だけ上にずらすイメージ
  // ただし、外側の円の半径が 8rem (直径 16rem) = 実際の px で言えば 128px
  // ドットの中心が外周上に来るように top を負の値にする (上方向へ)
  top: "-8.1rem", // ちょうどインジケータ外周分 (8rem) 上に置く
  left: "-0.6rem", // ドット自身の直径が 1.2rem なので、半分ずらして中心に
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "50%",
  backgroundColor: "#417b41",
});
