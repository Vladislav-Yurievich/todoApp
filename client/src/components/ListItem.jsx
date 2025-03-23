import { useState } from "react";
import Modal from "./Modal";
import useDeleteItem from "../hooks/useDeleteItem";
import useFetchUserRole from "../hooks/useFetchUserRole";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const deleteItem = useDeleteItem(getData);
  const userRole = useFetchUserRole();

  // Проверка, просрочена ли задача
  const isOverdue = new Date(task.dueDate) < new Date();

  const priorityStyles = {
    HIGH: { text: "высокий приоритет", color: "#F54343" },
    MEDIUM: { text: "средний приоритет", color: "#F5C543" },
    LOW: { text: "низкий приоритет", color: "#43F55A" },
  };

  return (
    <>
      <li
        onClick={() => setShowModal(true)}
        className="list-item justify-between p-3 mt-5 bg-white rounded-[10px] max-w-2xl text-black text-lg"
      >
        <div className="info-container flex justify-between">
          <div className="left__info">
            <p
              className={`text-sm ${
                priority ? `text-[${priority.color}]` : "text-gray-400"
              }`}
            >
              {priority ? priority.text : "Приоритет не указан"}
            </p>
            <p className={`task-title ${isOverdue ? "text-red-500" : ""}`}>
              {task.title}
            </p>{" "}
            <h3 className="responsible text-sm">
              Ответственный: {task.responsible}
            </h3>
          </div>
          <div className="right__info flex flex-col text-sm justify-evenly ml-auto">
            <h3 className="status">
              <u className={task.status === "DONE" ? "text-green-500" : ""}>
                {task.status === "TODO"
                  ? "к выполнению"
                  : task.status === "IN_PROGRESS"
                  ? "выполняется"
                  : task.status === "DONE"
                  ? "выполнена"
                  : task.status === "CANCELED"
                  ? "отменена"
                  : null}
              </u>
            </h3>
            <span className="end__date">
              Дедлайн: {new Date(task.dueDate).toLocaleDateString()}
            </span>
            <div className="button-container text-sm">
              {userRole === "MANAGER" && (
                <button
                  className="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(task.id);
                  }}
                >
                  удалить
                </button>
              )}
            </div>
          </div>
        </div>
      </li>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </>
  );
};

export default ListItem;
