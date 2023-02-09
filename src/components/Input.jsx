import React from "react";

export const Input = (props) => {
  const { todoText, disabled, onClick, onChange } = props;
  return (
    <>
      {/* ↓親で渡したonSubmitを設定するためにdivタグからformタグに直してonSubmitを設定してあげると想定通りのコードになりそうです。 */}
      <form className="input_area" onSubmit={onClick}>
        <input
          className="input_text"
          type="text"
          placeholder="ToDoを入力"
          value={todoText}
          onChange={onChange}
          disabled={disabled}
        />
        <button
          type="input"
          className="input_btn"
          disabled={disabled}
          onClick={onClick}
        >
          追加
        </button>
      </form>
    </>
  );
};
