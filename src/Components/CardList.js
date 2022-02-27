import { useState, useEffect } from "react";
import Card from "./Card";
const initialState = [
  {
    title: "Backlog",
    tasks: [],
    status: "backlog"
  },
  {
    title: "In Progress",
    tasks: [],
    status: "inprogress"
  },
  {
    title: "Complete",
    tasks: [],
    status: "complete"
  },
  {
    title: "On Hold",
    tasks: [],
    status: "onhold"
  }
];

function CardList() {
  const [data, setData] = useState([]);
  const [draggedItem, setDraggedItem] = useState("");
  const [prevId, setPrevId] = useState();

  // setting data depending on progress box
  const fetchData = () => {
    const localData = JSON.parse(localStorage.getItem("data"));

    if (!localData) {
      setData(initialState);
    } else {
      setData(localData);
    }
  };

  const saveNewData = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap justify-between sm:justify-center">
      {data.map((info, i) => (
        <Card
          key={i}
          index={i}
          data={data}
          {...info}
          saveNewData={saveNewData}
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          prevId={prevId}
          setPrevId={setPrevId}
        />
      ))}
    </div>
  );
}

export default CardList;
