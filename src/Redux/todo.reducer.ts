import { AnyAction } from "redux";
import { Todo_Loading, Todo_Error, Todo_GetData, Todo_AddData, Todo_RemoveData, Todo_UpdateData } from "./todos.types";

export interface todoObj {
  id: number;
  status: boolean;
  title: string;
}

export interface todoInterface {
  todo: todoObj[];
  loading: boolean;
  error: boolean;
}

const initData: todoInterface = {
  todo: [],
  error: false,
  loading: false,
};

const todoReducer = (state = initData, { type, payload }: AnyAction) => {
  switch (type) {
    case Todo_Loading: {
      return { ...state, loading: true, error: false };
    }
    case Todo_Error: {
      return { ...state, error: true, loading: false };
    }
    case Todo_GetData: {
      return { ...state, todo: payload, loading: false, error: false };
    }
    case Todo_AddData: {
      return { ...state, todo: [...state.todo, payload], loading: false, error: false };
    }
    case Todo_UpdateData: {
      const updatedTodo = state.todo.map((el) => {
        if (el.id === payload.id) {
          return { ...el, status: payload.status };
        }
        return el;
      });
      return {
        ...state,
        loading: false,
        todo: updatedTodo,
      };
    }
    case Todo_RemoveData: {
      const filteredTodo = state.todo.filter((el) => {
        if (el.id !== payload) {
          return el;
        }
      });
      return {
        ...state,
        loading: false,
        todo: filteredTodo,
      };
    }
    default: {
      return state;
    }
  }
};

export default todoReducer;
