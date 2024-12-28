import { styled } from "@mui/system";

type CardProps = {
	isEmpty: boolean; // タスクが空かどうか
  taskName?: string; // カード(タスク)のタイトル
	time?: number; // タスクの時間
};

export const Card: React.FC<CardProps> = ({isEmpty, taskName, time}) => {
  return (
		<>
			{isEmpty ? (
				<CardArea>タスクがありません</CardArea>
			) : (
				<CardArea>
					<h2>{taskName}</h2>
					<p>{time}</p>
				</CardArea>
			)}
		</>
  );
};

const CardArea= styled('div')(({ theme }) => ({
	backgroundColor: theme.color.primary,
}));