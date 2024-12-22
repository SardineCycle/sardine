import { List } from "../../components/bases/List/List";
import { Task } from "../../types/task/Task";

export const HomePage = () => {
  const items = [
    {
      id: "1",
      title: "Item 1",
      description: "Description 1",
      completed: false,
    },
    {
      id: "2",
      title: "Item 2",
      description: "Description 2",
      completed: false,
    },
    {
      id: "3",
      title: "Item 3",
      description: "Description 3",
      completed: false,
    },
  ] satisfies Task[];
  return (
    <List
      items={items}
      renderItem={(item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      )}
    ></List>
  );
};
