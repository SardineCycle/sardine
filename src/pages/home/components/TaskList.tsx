import { List } from "../../../components/bases/List/List";
import { Task } from "../../../types/task/Task";

export const TaskList = ({taskList}:{taskList: Task[]}) => {
  return (
    <List
      items={taskList}
      renderItem={(item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      )}
    ></List>
  );
};
