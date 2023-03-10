import React from "react";
// import { useState } from "react";

export const List = (props) => {

  const {
    onClickComplete,
    onClickDelete,
    toggle,
    radio,
    setRadio,
    todos,
    handleEdit,
  } = props;



  const switchTodos = () => {
    if (radio === "completed") {
      return todos.filter((todo) => todo.status === "completed");
    }
    if (radio === "incomplete") {
      return todos.filter((todo) => todo.status === "incomplete");
    }
    return todos;
  };

  const switched=switchTodos();

  // const [check,setCheck]=useState(0);
  // const checks =()=>{

  // };


  return (
    <>
      <div className="list_area">
        <h1 className="list-title">タスク</h1>

        {/* フィルター機能 */}
        <form className={todos.length === 0 ? "formnone" : ""}>
          <label>
            <input
              type="radio"
              value="all"
              onChange={(e) => setRadio(e.target.value)}
              checked={radio === "all"}
            />
            全て
          </label>
          <label>
            <input
              type="radio"
              value="incomplete"
              onChange={(e) => setRadio(e.target.value)}
              checked={radio === "incomplete"}
            />
            作業中
          </label>
          <label>
            <input
              type="radio"
              value="completed"
              onChange={(e) => setRadio(e.target.value)}
              checked={radio === "completed"}
            />
            完了
          </label>
        </form>

        {/* チェックボックス */}
        <ul>
          {switched.map((todo, index) => {
            return (
              <div key={todo.id} className="list-row">
                <button
                  className="comp"
                  onClick={() => onClickComplete(index)}
                  //   完了にチェック入れないと完了ボタン押せない
                  disabled={todo.status === "incomplete"}
                >
                  完了
                </button>
                <form>
                  <label>
                    <input
                      type="checkbox"
                      value={todo.status === "incomplete" ? "作業中" : "完了"}
                      style={{ padding: "5px" }}
                      onClick={() => toggle(todo.id)}
                      onChange={handleEdit}
                      checked={todo.status === "incomplete" ? false : true}
                      // おそらくチェックボックスがレンダリングされる際にデフォルトでチェックを外した状態でレンダリングされるため、結果反転しているように見えるのだと思います。
                      // レンダリングされる際にtodoの状態を見て完了であればチェックがつくように追加してあげれば解決できそうです！！
                    ></input>
                  </label>
                </form>
                {/* 完了にチェック入れた時文字色変えるためのクラス付与 */}
                <li className={todo.status === "completed" ? "completed" : ""}>
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleEdit(todo.id, e.target.value)}
                  />
                </li>
                {/* 編集 */}
                {/* {todo.id === todoEditing ? (
                  <button onClick={() => todos(todo.id)}>
                    再投稿
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(todo.id)}
                  >
                    編集
                  </button>
                )} */}
                <button className="delete" onClick={() => onClickDelete(index)}>
                  削除
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
