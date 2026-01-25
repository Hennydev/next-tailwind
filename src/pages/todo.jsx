import { Inter, JetBrains_Mono } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const Todo = () => {
  const [todo, setTodo] = useState({});

  const [search, setSearch] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodoList = () => {
    if (todo.task.trim().length === 0) {
      return;
    }
    const isEditing = todoList.some((item) => item.id === todo.id);
    // console.log(isEditing, "editing");
    if (isEditing) {
      setTodoList((prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? { ...item,  task: todo.task, status: todo.status }
            : item
        )
      );
    } else {
      const newTodo = {
        id: Date.now(),
        task: todo.task,
        status: false,
      };
     setTodoList((prev) => [ newTodo, ...prev]);
    }


   return setTodo({
        id:null,
        task:"",
        status:false
    });
    // console.log(todoList);
  };
  const updateStatus = (todo) => {
    setTodoList((prev) =>
      prev.map((item) =>
        item.id === todo.id ? {...item, status:!item.status}: item
      )
    );
    console.log(todo);
  };
  const deleteTodo = (todo) => {
    setTodoList((prev) => prev.filter((item) => item.id !== todo.id));
  };
  const editTodo = (todo) => {
    setTodo(todo);
  };
      const filterList =  todoList.filter((item)=> item.task.toLowerCase().includes(search.toLowerCase()))

  return (
    <div
      className={`${inter.className} ${jetbrainsMono.className} p-16 flex flex-col items-center justify-center`}
    >
      <h1 className="text-white font-bold text-center text-3xl ">
        Todo List with Search Functionality in Reactjs and Tailwind Css
      </h1>
      <div className=" bg-black/60 md:h-200 md:w-200 w-[80vw] min-h-[80vh]  flex flex-col items-center py-12 my-16 px-12 relative">
        <h1 className=" text-center text-white font-semibold text-2xl pb-6">
          Todo List
        </h1>
        <div className="w-full">
          <div className="w-full">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="border border-solid rounded-lg w-full py-3 px-3"
              placeholder="Search your todo..."
            ></input>
            {search.trim().length > 0 && filterList.map((item) => (
              <p className="pt-4">{item.task}</p>
            ))}
          </div>
          <div className="pt-6 md:h-150 h:[85vh] overflow-y-scroll  ">
            {todoList.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center py-6 justify-between  bg-gray-900 rounded-xl  p-6 my-4"
              >
                <div className="flex flex-row flex-3 items-center space-x-4">
                  <div
                    onClick={() => {
                      updateStatus(item);
                    }}
                    className="h-4 w-4 rounded-full border-2 border-white"
                  >
                    <div
                      className={`h-3 w-3 rounded-full  ${
                        item.status ? "bg-white" : "bg-black"
                      }`}
                    ></div>
                  </div>
                  <ul className=" flex flex-3 text-wrap">
                    <li>{item.task}</li>
                  </ul>
                </div>

                <div className=" flex flex-row flex-1 space-x-6  ">
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      deleteTodo(item);
                    }}
                  >
                    delete
                  </p>
                  <p
                    className="cursor-pointer "
                    onClick={() => {
                      editTodo(item);
                    }}
                  >
                    Edit
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex flex-row w-full  px-12
        items-end space-x-4 justify-center absolute bottom-10"
        >
          <input
            className="border border-solid rounded-lg  flex-3 py-3 px-3"
            placeholder="Add a new todo"
            value={todo.task}
            onChange={(e) => {
              setTodo({ ...todo, task: e.target.value });
            }}
          ></input>
          <button
            onClick={() => {
              addTodoList();
            }}
            className=" bg-gray-900 py-3 px-4 rounded-lg cursor-pointer "
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};
export default Todo;
