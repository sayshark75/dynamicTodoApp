import axios from "axios";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { rootState } from "./store";
import { todoObj } from "./todo.reducer";
import { Todo_Loading, Todo_Error, Todo_GetData, Todo_AddData, Todo_RemoveData, Todo_UpdateData } from "./todos.types";

export const getTodosApi = (): ThunkAction<void, rootState, unknown, AnyAction> => async (dispatch) => {
  dispatch({ type: Todo_Loading });
  try {
    let res = await fetch("https://dynamictodoappdb.onrender.com/todos");
    let data = await res.json();
    dispatch({ type: Todo_GetData, payload: data });
  } catch (err) {
    dispatch({ type: Todo_Error });
  }
};

export const addTodoApi =
  (obj: todoObj): ThunkAction<void, rootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: Todo_Loading });
    try {
      let res = await fetch("https://dynamictodoappdb.onrender.com/todos", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = await res.json();
      dispatch({ type: Todo_AddData, payload: data });
    } catch (err) {
      dispatch({ type: Todo_Error });
    }
  };

export const updateTodoApi =
  (id: number, val: { status: boolean }): ThunkAction<void, rootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: Todo_Loading });
    try {
      let res = await fetch(`https://dynamictodoappdb.onrender.com/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(val),
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = await res.json();
      dispatch({ type: Todo_UpdateData, payload: data });
    } catch (err) {
      dispatch({ type: Todo_Error });
    }
  };

export const removeTodoApi =
  (id: number): ThunkAction<void, rootState, unknown, AnyAction> =>
  async (dispatch) => {
    dispatch({ type: Todo_Loading });
    try {
      let res = await axios.delete(`https://dynamictodoappdb.onrender.com/todos/${id}`);
      dispatch({ type: Todo_RemoveData, payload: id });
    } catch (err) {
      dispatch({ type: Todo_Error });
    }
  };
