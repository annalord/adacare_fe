import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const LoginForm = () => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>username</Form.Label>
          <Form.Control type="username" placeholder="Enter " />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>

  )
};

export default LoginForm;