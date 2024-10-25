import { Item } from "../../type";

interface propsItem {
  item: Item;
}

const Card = ({ item }: propsItem) => {
  return (
    <div className="min-w-[300px] h-[300px] bg-[#eee] rounded-md  shadow-lg flex flex-col p-6">
      <div className="text-2xl"> Post : {item.id}</div>
      <div className="text-xl py-2">{item.title}</div>
    </div>
  );
};

export default Card;
