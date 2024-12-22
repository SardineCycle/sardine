import { Button as Btn }	from '@mui/base/Button';

type Props = { text: string };

export const Button:React.FC<Props> = ({ text }) => {
  return (
    <Btn >
    {text}
    </Btn>
  );
}