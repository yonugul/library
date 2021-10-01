import React from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  isEmail,
  isEmpty,
  isContainWhiteSpace,
} from '../../components/validator';

import { login, getAccessToken } from '../../services/authservice';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {}, // Contains login form data
      errors: {}, // Contains login field errors
      formSubmitted: false, // Indicates submit status of login form
      loading: false, // Indicates in progress state of login form
    };
  }

  handleInputChange = (event: { target: any }) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData,
    });
  };

  validateLoginForm = () => {
    const errors = {};
    const { formData } = this.state;
    if (isEmpty(formData.email)) {
      errors.email = 'E-Posta adresi girilmeli';
    } else if (!isEmail(formData.email)) {
      errors.email = 'Geçerli bir E-Posta adresi giriniz';
    }

    if (isEmpty(formData.password)) {
      errors.password = 'Parola girilmeli';
    } else if (isContainWhiteSpace(formData.password)) {
      errors.password = 'Parolanızı boşluk bırakmadan giriniz';
    }

    if (isEmpty(errors)) {
      return true;
    }
    return errors;
  };

  submit = (e) => {
    e.preventDefault();
    const res = this.validateLoginForm();
    if (res) {
      const { formData } = this.state;
      login(formData.email, formData.password).then((ls) => {
        if (ls.access_token) {
          alert(getAccessToken());
          return true;
        }
        return false;
      });
    } else {
      this.setState({
        errors: res,
        formSubmitted: true,
      });
    }
  };

  render() {
    const { errors, formSubmitted } = this.state;
    return (
      <div className="Login">
        <Form onSubmit={this.submit}>
          <Form.Group
            className="mb-3"
            controlId="email"
            validationstate={
              formSubmitted ? (errors.email ? 'error' : 'success') : null
            }
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={this.handleInputChange}
            />
            {errors.email && (
              <Form.Text className="text-muted">{errors.email}</Form.Text>
            )}
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="password"
            validationstate={
              formSubmitted ? (errors.password ? 'error' : 'success') : null
            }
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
            {errors.password && (
              <Form.Text className="text-muted">{errors.password}</Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
