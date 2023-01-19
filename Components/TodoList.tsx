import { useAppDispatch, useAppSelector } from "@/Hooks/app_hooks";
import { todoObj } from "@/Redux/todo.reducer";
import { removeTodoApi, updateTodoApi } from "@/Redux/todos.actions";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

type Props = {};

const TodoList = (props: Props) => {
  const { todo, loading, error } = useAppSelector((store) => store.todo_m);
  const dispatch = useAppDispatch();
  const handleToggle: (id: number, val: { status: boolean }) => void = (id, val) => {
    dispatch(updateTodoApi(id, val));
  };
  const handleDelete: (id: number) => void = (id) => {
    dispatch(removeTodoApi(id));
  };
  return (
    <>
      {todo.map(({ title, status, id }: todoObj) => {
        return (
          <Flex key={id} w={"340px"} bgColor={!status ? "white" : "green.300"} gap={3} m={2} p={4} justifyContent={"space-between"} borderRadius={8} border={"2px solid #DDDDDD"}>
            <Heading size={"md"}>{title}</Heading>
            <Flex gap={1}>
              <IconButton
                bgColor={status ? "green.400" : "blue.400"}
                color={"white"}
                _hover={{ color: "black" }}
                aria-label="xyz"
                onClick={() => handleToggle(id, { status: !status })}
                icon={status ? <BsToggle2On size={"24px"} /> : <BsToggle2Off size={"24px"} />}
              />
              <IconButton bgColor={"red.500"} color={"white"} _hover={{ color: "black" }} aria-label="xyz" onClick={() => handleDelete(id)} icon={<MdDelete size={"24px"} />} />
            </Flex>
          </Flex>
        );
      })}
    </>
  );
};

export default TodoList;
