import { List } from '../../../components/bases/List/List';
import type { Task } from '../../../features/task/task.model';

export const TaskList = ({ taskList }: { taskList: Task[] }) => {
	return (
		<List
			items={taskList}
			renderItem={(item) => (
				<div key={item.id}>
					<h2>{item.name}</h2>
					<p>{item.description}</p>
				</div>
			)}
		/>
	);
};
