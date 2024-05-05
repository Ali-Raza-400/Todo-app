/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import {
  useDeleteTodoMutation,
  useListTodoQuery,
  useSaveTodoMutation,
} from "../slices/todoSlice";

const Hero = () => {
  const [editedDataId, setEditDataId] = useState(null);
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });
  const [saveTodo, { data, isLoading }] = useSaveTodoMutation();
  const [deleteTodo, { data: deleteData, isLoading: deleteLoading }] =
    useDeleteTodoMutation();
  const getTodos = useListTodoQuery();

  const onSubmit = async (e) => {
    try {
      e.preventDefault(false);
      if (editedDataId?._id) {
        await saveTodo({ ...formValue, todo_id: editedDataId._id }).unwrap();
        setFormValue({
          title: "",
          description: "",
        });
        setEditDataId(null);
        return;
      }
      await saveTodo(formValue).unwrap();
      setFormValue({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleChange = () => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const handleDelete = async (index) => {
    try {
      await deleteTodo({ todo_id: index });
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleEdit = (todo) => {
    setFormValue({
      title: todo.title,
      description: todo.description,
    });
    setEditDataId(todo);
  };

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Enter Title</Form.Label>
              <Form.Control
                name={"title"}
                value={formValue.title}
                onChange={handleChange}
                type="text"
                placeholder="Enter Title"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example Description</Form.Label>
              <Form.Control
                name={"description"}
                value={formValue.description}
                onChange={handleChange}
                as="textarea"
                rows="3"
                placeholder="Enter Description"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Todo
            </Button>
          </Form>
        </Card>
        <Card style={{minWidth:'20vw'}}>
          <Card.Header>TODO LISTING</Card.Header>
          {getTodos?.data?.length === 0 ? (
            <>No Record to show</>
          ) : getTodos?.isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              {" "}
              <Spinner animation="grow" />
            </div>
          ) : (
            (getTodos?.data || []).map((todos, index) => {
              return (
                <Card.Body key={index}>
                  <Card.Title>{todos.title}</Card.Title>
                  <Card.Text>{todos.description}</Card.Text>
                  <Button
                    onClick={() => handleEdit(todos)}
                    style={{ marginRight: "8px" }}
                    variant="secondary"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(todos._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              );
            })
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
