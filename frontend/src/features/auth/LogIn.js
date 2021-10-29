import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import { loginUser, userSelector, clearState } from './userSlice';
import { useHistory } from 'react-router-dom';
import { Spinner } from '../../components/Spinner'
import { useLoginMutation } from '../api/apiSlice';
import { Form, FormGroup, FormControl, FormLabel, Container, Row, Col, Nav, NavDropdown, Button } from 'react-bootstrap';
import { setCredentials, clearCredentials} from '../auth/authSlice'
import { setToken, removeToken} from '../../utils';
import { login, setUser } from './authProvider';






export const LogIn = () => {

  const dispatch = useDispatch();
  const { push }  = useHistory();


  const [formState, setFormState] = useState({
    identifier: '',
    password: '',
  })

  const [loginning, { isLoading }] = useLoginMutation()

  const handleChange = ({
    target: { name, value }
        }) => setFormState((prev) => ({ ...prev, [name]: value }))

 return (

<>
<Container>
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email адрес</Form.Label>
    <Form.Control
            onChange={handleChange}
            name="identifier"
            type="text"
            placeholder="Email"
    />
    <Form.Text className="text-muted">
    Мы никогда никому не передадим вашу электронную почту.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password" placeholder="Пароль" onChange={handleChange} name="password"/>
  </Form.Group>
  <Button 
  
  onClick={async () => {
    try {
      const data = await loginning(formState).unwrap();
      // dispatch(setCredentials(data))
      console.log('onClick:data', data);
      // setUser(data.user);
      login(data);
      push('/')
    } catch (error) {
        console.error('Failed to login in the site: ', error)
    }
  }}
  isloading={isLoading.toString()}
  
  >
    Войти
  </Button>
</Form>
</Container>
</>
 )
}

