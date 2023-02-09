import React, { useState } from "react";
import { Header } from "./components/Header";
import { Input } from "./components/Input";
import { List } from "./components/List";
import "./style.css";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [listTodo, setListTodo] = useState([]);
  const [radio, setRadio] = useState("all");
  const [todoEditing, setTodoEditing] = useState(null);


  // 入力値をtodoTextに反映
  const handleChange = (e) => setTodoText(e.target.value);

  // ボタン押したら追加 ステータスとidもふる
  const clickAdd = () => {
    if (todoText === "") return;

    const todo = {
      id: listTodo.length + 1,
      text: todoText,
      status: "incomplete",
    };
    const newListTodos = [...listTodo, todo];
    setListTodo(newListTodos);
    setTodoText("");
  };

  // 削除ボタン
  const onClickDelete = (index) => {
    const newListTodos = [...listTodo];
    newListTodos.splice(index, 1);
    setListTodo(newListTodos);
    // 削除してから同じ文字を入れると同じidになってしまう為削除時にidを振り直す
    setListTodo(newListTodos.map((e, i) => ({ ...e, id: i + 1 })));
  };

  // 完了ボタン
  const onClickComplete = (index) => {
    const newListTodos = [...listTodo];
    newListTodos.splice(index, 1);
    setListTodo(newListTodos);
    setListTodo(newListTodos.map((e, i) => ({ ...e, id: i + 1 })));
  };

  // ステータス変更
  const toggle = (todoID) => {
    setListTodo(
      listTodo.map((todo,i) =>
        todoID === todo.id
          ? {
              ...todo,
              status: todo.status === "incomplete" ? "completed" : "incomplete",
            }
          : todo
      )
    );
  };

  // フィルター
  const switchTodos = () => {
    if (radio === "completed") {
      return listTodo.filter((todo) => todo.status === "completed");
    }
    if (radio === "incomplete") {
      return listTodo.filter((todo) => todo.status === "incomplete");
    }
    return listTodo;
  };

  // 編集
  const handleEdit = (id, value) => {
    const newTodos = listTodo.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステートを更新
    setTodoText(newTodos);
  };

  return (
    <>
      <Header />
      <Input todoText={todoText} onChange={handleChange} onClick={clickAdd} />

      <List
        toggle={toggle}
        todos={listTodo}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        switchTodos={switchTodos}
        radio={radio}
        setRadio={setRadio}
        setTodoEditing={setTodoEditing}
        todoEditing={todoEditing}
        handleEdit={handleEdit}
      />
    </>
  );
};
