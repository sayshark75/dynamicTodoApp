import React, { useState } from "react";
import { Input, Button, Flex, Box, useToast } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/Hooks/app_hooks";
import { todoObj } from "@/Redux/todo.reducer";
import { addTodoApi } from "@/Redux/todos.actions";

type Props = {};

const TodoInput = (props: Props) => {
  const toast = useToast();
  const { loading } = useAppSelector((store) => store.todo_m);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const HandleSubmit: () => void = () => {
    if (todoTitle !== "") {
      let obj: todoObj = {
        id: Date.now(),
        title: todoTitle,
        status: false,
      };
      dispatch(addTodoApi(obj));
      setTodoTitle("");
    } else {
      toast({
        position: "bottom-left",
        render: () => (
          <Box color="white" p={3} bg="green.500">
            Please Enter Something
          </Box>
        ),
      });
    }
  };

  return (
    <>
      <Flex w={"340px"} m={4}>
        <Input disabled={loading} value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} type={"text"} placeholder={"Write New Todo"} />
        <Button isDisabled={loading} onClick={HandleSubmit} bgColor={"blue.400"} color={"white"} _hover={{ color: "black" }}>
          Add Todo
        </Button>
      </Flex>
    </>
  );
};

export default TodoInput;
