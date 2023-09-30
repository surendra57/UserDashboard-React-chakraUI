import React, { useState } from "react";
import "./App.css";
import UserList from "./Components/UserList";
import { Box, Heading } from "@chakra-ui/react";
import EditUser from "./Components/EditUser";
import DeleteUser from "./Components/DeleteUser";
import CreateUser from "./Components/CreateUser";
import ErrorMessages from "./Components/ErrorMessages";
import ReactPaginate from "react-paginate";
function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Viewer",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
    },
    {
      id: 3,
      name: "Surendra Gahlot",
      email: "surendra@example.com",
      role: "Administrator",
    },
    {
      id: 4,
      name: "John wick",
      email: "johnwick@example.com",
      role: "Administrator",
    },
    {
      id: 5,
      name: "Rock Wynce",
      email: "batman@example.com",
      role: "Viewer",
    },
    {
      id: 6,
      name: "Dark Wynce",
      email: "batman@example.com",
      role: "Viewer",
    },
    {
      id: 7,
      name: "Night Soul",
      email: "batman@example.com",
      role: "Viewer",
    },
    {
      id: 8,
      name: "Wynce",
      email: "batman@example.com",
      role: "Viewer",
    },
  ]);
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (formData) => {
    console.log(formData);

    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setMessage("User Updated succesfully");
    setTimeout(() => {
      setMessage(false);
    }, 15000);
    setEditingUser(null);
  };

  const handleConfirmDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    setIsDeleteModalOpen(false);
    setMessage("User Deleted succesfully");
    setTimeout(() => {
      setMessage(false);
    }, 2000);
    setUserToDelete(null);
  };

  const handleAddUser = (formData) => {
    console.log(formData);

    const newUserId = Math.max(...users.map((user) => user.id), 0) + 1;
    console.log(newUserId);
    const newUser = { id: newUserId, ...formData };
    setUsers([...users, newUser]);

    setIsAddModalOpen(false);
    setMessage("User created Successfully");
    setTimeout(() => {
      setMessage(false);
    }, 2000);
    setNewUserFormData({ name: "", email: "", role: "" });
  };
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedUsers = filteredUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  return (
    <Box bg="#e7e5cb" minHeight="100vh">
      <Box
        minHeight="12vh"
        // border="1px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Heading>User Dashboard</Heading>
      </Box>
      <Box float="right" marginTop="2vw">
        {message && <ErrorMessages status="success">{message}</ErrorMessages>}
      </Box>
      <UserList
        users={displayedUsers}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
        onAddClick={handleAddClick}
        onSearch={setSearchQuery}
      />
      <Box display="flex" justifyContent="center"  alignItems="center" mt={5}>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(users.length / usersPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Box>

      {isModalOpen && (
        <div>
          {/* <UserForm user={editingUser} onSubmit={} /> */}
          <EditUser
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            user={editingUser}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteUser
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          user={userToDelete}
        />
      )}

      {isAddModalOpen && (
        <CreateUser
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddUser}
        />
      )}
    </Box>
  );
}

export default App;
