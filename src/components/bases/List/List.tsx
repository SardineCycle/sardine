type Props<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

export const List = <T,>({ items, renderItem }: Props<T>) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={index}>{renderItem(item, index)}</li>
      ))}
    </ul>
  );
};
