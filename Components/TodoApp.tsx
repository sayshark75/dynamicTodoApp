import { useAppDispatch, useAppSelector } from "@/Hooks/app_hooks";
import { getTodosApi } from "@/Redux/todos.actions";
import { Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoApp = () => {
  const { todo, loading, error } = useAppSelector((store) => store.todo_m);
  const [loading_Title, setLoading_Title] = useState<string>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTodosApi());
    setTimeout(() => {
      setLoading_Title("First Time Opened? API Might be Initializing... ");
    }, 4000);
  }, []);
  return (
    <>
      <Heading my={"7"} textAlign={"center"}>
        TodoApp
      </Heading>
      {loading ? (
        <Flex w={"100%"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Text as={"b"}>{loading_Title}</Text>
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
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
