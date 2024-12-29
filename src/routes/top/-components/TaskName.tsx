import { styled } from '@mui/material/styles';

 const TaskNameInner = styled("div")({
    fontSize: "1.5em",
    fontWeight: "bold",
    margin: "0 0 0.5em",
    color: "#333",
    "&:hover": {
        color: "#000",
    },
    textAlign: "center",
});


type Props = {
    name: string;
};
export const TaskName = ({ name }: Props) => {
    return <TaskNameInner>{name}</TaskNameInner>;
}