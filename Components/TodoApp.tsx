import { useAppDispatch, useAppSelector } from "@/Hooks/app_hooks";
import { getTodosApi } from "@/Redux/todos.actions";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoApp = () => {
  const { todo, loading, error } = useAppSelector((store) => store.todo_m);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosApi());
  }, []);
  return (
    <>
      <Heading my={"7"} textAlign={"center"}>
        TodoApp
      </Heading>
      {loading ? (
        <Flex w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner transition={"1000ms"} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Flex>
      ) : error ? (
        <Flex w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Text as={"b"}>Run Json-Server on Port 8080 with todo[]</Text>
        </Flex>
      ) : (
        <>
          <Flex w={"100%"} direction={"column"} justifyContent={"center"} alignItems={"center"}>
            <TodoInput />
            <TodoList />
          </Flex>
        </>
      )}
    </>
  );
};

export default TodoApp;
