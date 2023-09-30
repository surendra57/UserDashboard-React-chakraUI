import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
const UserList = ({
  onAddClick,
  onEditClick,
  onSearch,
  users,
  onDeleteClick,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
 

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <>
      <Box>
       
        <Box display="flex" gap="1vw" padding={"2vw 8vw"}>
          <Button colorScheme="teal" onClick={() => onAddClick()}>Add User</Button>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="black.300" />}
            />
            <Input
              width="20%"
              type="text"
              placeholder="Search..."
              border="1px solid #615a5a;"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={handleSearch}
            />
          </InputGroup>

        </Box>


        <TableContainer
          boxShadow="lg"
          p="6"
          rounded="md"
          bg="#cccccc8a "
          margin={"0vw 8vw"}
          borderRadius={"0.5rem"}
        >
          <Table variant="simple" size="sm">
            {/* <TableCaption>User list </TableCaption> */}
            <Thead>
              <Tr>
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role </Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>

                  <Td>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Button
                        padding="1vw 1.6vw"
                        bgColor={"green.400"}
                        colorScheme="green"
                        onClick={() => onEditClick(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        padding="1vw 1.3vw"
                        bgColor={"red.400"}
                        colorScheme="red"
                        onClick={() => onDeleteClick(user)}
                      >
                        Delete
                      </Button>
                    </Box>{" "}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserList;
