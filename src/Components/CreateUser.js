import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const CreateUser = ({ isOpen, onClose, onSubmit }) => {
  function validateName(value) {
    let error;
    if (!value) {
      error = "Name is required";
    }
    return error;
  }
  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    }
    return error;
  }
  function validateRole(value) {
    let error;
    if (!value) {
      error = "Role is required";
    }
    return error;
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody paddingBottom="2vw">
            <Formik
              initialValues={{
                name: "",
                email: "",
                role: "",
              }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  onSubmit(values);

                  //   alert(JSON.stringify(values, null, 2))

                  actions.setSubmitting(false);
                }, 1000);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="name" validate={validateName}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel>Name</FormLabel>
                        <Input {...field} placeholder="Enter your name" />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email" validate={validateEmail}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input {...field} placeholder="Enter your email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="role" validate={validateRole}>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.role && form.touched.role}
                      >
                        <FormLabel>Role</FormLabel>
                        {/* <Input {...field} placeholder='Enter Role' /> */}
                        <Select {...field} placeholder="Select Role">
                          <option value="Editor">Editor</option>
                          <option value="Administrator">Administrator</option>
                          <option value="Viewer">Viewer</option>
                        </Select>
                        <FormErrorMessage>{form.errors.role}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Button
                    mt={5}
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    // onClick={()=>onSubmit("newdata")}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateUser;
