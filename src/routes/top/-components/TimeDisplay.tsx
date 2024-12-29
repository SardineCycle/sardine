import { styled } from "@mui/system";
import { useEffect, useState } from "react";

type TimeDisplayProps = {
  durationTimeSeconds?: number; // 設定時間（秒）
  elapsedTimeSeconds?: number; // 経過時間（秒）
};

export const TimeDisplay: React.FC<TimeDisplayProps> = ({
  durationTimeSeconds = 0, //undefinedの場合は0
  elapsedTimeSeconds = 0,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState(0); // 残り時間（秒）

  useEffect(() => {
    const diff = durationTimeSeconds - elapsedTimeSeconds; // 残り時間
    setRemainingSeconds(Math.max(diff, 0)); // 設定時間より経過時間が大きい場合は 0 をセット
  }, [durationTimeSeconds, elapsedTimeSeconds]);

  // 分・秒に変換
  const minutes = Math.floor(remainingSeconds / 60); // 小数点以下を切り捨てて整数を返す(分に変換)
  const seconds = remainingSeconds % 60; // 60で割った余りを返す(秒に変換)

  const displayMinutes = String(minutes).padStart(2, "0"); //1の場合は01になる,11の場合は11のまま
  const displaySeconds = String(seconds).padStart(2, "0");

  return (
    <>
			<TimeDisplayContainer>
				{displayMinutes}:{displaySeconds}
			</TimeDisplayContainer>
    </>
  );
};

const TimeDisplayContainer = styled("div")({
	fontSize: "3em",
	fontWeight: "bold",
	margin: "0 0 0.5em",
	color: "#333",
	textAlign: "center",
});