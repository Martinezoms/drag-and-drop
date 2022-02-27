import { useState, useRef } from "react";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ tasks, status, title, data, index, saveNewData, draggedItem, setDraggedItem, prevId, setPrevId }) {
  const [showTextarea, setShowTextarea] = useState(false);

  const inputRef = useRef();
  const progressRef = useRef();
  const emptyDivRef = useRef();

  let color;
  // Setting color for each particular progress tab/box
  if (status === "backlog") {
    color = "dodgerBlue";
  } else if (status === "inprogress") {
    color = "goldenRod";
  } else if (status === "complete") {
    color = "green";
  } else {
    color = "darkRed";
  }

  // Addinng tasks to each progress progress box
  const createTaskHandler = () => {
    if (inputRef.current.value !== "") {
      const newTask = {
        id: v4(),
        title: inputRef.current.value
      };
      const newTasks = [...tasks, newTask];
      data[index].tasks = newTasks;
      saveNewData(data);
      inputRef.current.value = "";
      setShowTextarea(false);
    }
    setShowTextarea(false);
  };

  // Deleting task
  const deleteTaskHandler = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    data[index].tasks = newTasks;

    saveNewData(data);
  };

  // Data transfer of dragged element
  const dragTask = (e) => {
    const item = e.target;
    setDraggedItem(item);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  // saving details of previous box from where item is dragged
  const dragStartHandler = () => {
    const prevProgressRefId = progressRef.current.id;
    setPrevId(prevProgressRefId);
  };

  // Dropping item in another column
  const dropHandler = (e) => {
    e.preventDefault();

    progressRef.current.classList.remove("over");
    // Removing duplicate of item when item is dragged and dropped on where it was dragged from

    const newTasks = tasks.filter((task) => task.id !== draggedItem.id);
    data[index].tasks = newTasks;

    // Adding dragged item into column to which it is dropped
    const newTask = {
      id: draggedItem.id,
      title: draggedItem.textContent
    };

    const taskToChange = data[progressRef.current.id].tasks;
    const updatedTasks = [...taskToChange, newTask];
    data[progressRef.current.id].tasks = updatedTasks;

    // Removing item from where it was dragged from
    if (prevId !== progressRef.current.id) {
      const newTasksAfterDrag = data[prevId].tasks.filter((task) => task.id !== draggedItem.id);
      data[prevId].tasks = newTasksAfterDrag;
    }

    saveNewData(data);
  };

  // dropping item in an empty div
  const dropHandlerOnEmptyDiv = (e) => {
    e.preventDefault();

    const newTask = {
      id: draggedItem.id,
      title: draggedItem.textContent
    };

    const taskToChange = data[emptyDivRef.current.id].tasks;

    const updatedTasks = [...taskToChange, newTask];
    data[emptyDivRef.current.id].tasks = updatedTasks;

    // Removing item from where it was dragged from
    const newTasksAfterDrag = data[prevId].tasks.filter((task) => task.id !== draggedItem.id);

    data[prevId].tasks = newTasksAfterDrag;

    saveNewData(data);
  };

  const dragEnterHandler = () => {
    if (emptyDivRef.current) {
      emptyDivRef.current.classList.add("over");
    } else {
      progressRef.current.classList.add("over");
    }
  };

  const dragLeaveHandler = () => {
    if (emptyDivRef.current) {
      emptyDivRef.current.classList.remove("over");
    } else {
      progressRef.current.classList.remove("over");
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg m-5 shadow-2xl w-96 select-none">
        <div className="text-center text-white p-2 rounded-t-lg" style={{ background: color }}>
          <h1>{title}</h1>
        </div>

        {tasks.length > 0 ? (
          <ul
            className="custom-scroll text-xl "
            id={index}
            title={title}
            ref={progressRef}
            onDragStart={dragStartHandler}
            onDragOver={allowDrop}
            onDrop={dropHandler}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
          >
            {tasks.map((task, i) => (
              <li
                id={task.id}
                key={task.id}
                className="border-2 border-solid py-3 px-2 m-2 cursor-pointer hover:border-black/30"
                draggable
                onDragStart={dragTask}
              >
                {task.title}
                <FontAwesomeIcon
                  icon="times"
                  className=" float-right pt-1 text-black/40 hover:text-black"
                  onClick={() => deleteTaskHandler(task.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="flex justify-center items-center h-[250px] text-black/20 text-5xl"
            ref={emptyDivRef}
            id={index}
            onDragOver={allowDrop}
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandlerOnEmptyDiv}
          >
            Add task
          </div>
        )}
        <div className="px-3 mt-3 flex justify-between">
          <button
            className="rounded-lg py-2 px-4 mb-4 text-white shadow-sm hover:brightness-125 hover:shadow-md "
            style={{ background: color }}
            onClick={setShowTextarea}
          >
            + Add
          </button>
          {showTextarea && (
            <button
              className="rounded-lg py-2 px-4 mb-4 text-white shadow-sm hover:brightness-125 hover:shadow-md "
              style={{ background: color }}
              onClick={createTaskHandler}
            >
              Save
            </button>
          )}
        </div>
        {showTextarea && (
          <textarea className="w-full bg-smoke outline-none p-2 rounded-b-lg h-40" ref={inputRef}></textarea>
        )}
      </div>
    </div>
  );
}

export default Card;
