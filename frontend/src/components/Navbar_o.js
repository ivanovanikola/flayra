import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { ModsList } from '../features/mods/ModsList';
import { FlayraLogo } from '../app/logo';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../features/api/apiSlice'
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../utils"
import { userSelector, clearState } from "../features/user/userSlice"
import { useHistory } from "react-router-dom"





export const NavbarTop = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const userStote = useSelector(userSelector)
  const { data: user, isSuccess, isError} = useGetUserQuery(userStote.id)
  

  useEffect(() => {
    if (isError) {
      dispatch(clearState())
      history.push("/login")
    }
  }, [isError])
  
  const onLogOut = () => {
    logout();
    history.push("/login")
  }

  let content

  if (isSuccess) {
    content = (

      <Navbar bg="light" expand="md" sticky="top" >
      <Navbar.Brand href="/">
        <FlayraLogo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
          as="ul"
        >
          <NavDropdown title="Моды" id="navbarScrollingDropdown">
            <ModsList />
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action">Другое</NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
        <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
   Аккаунт: {user.username}
</Navbar.Text>  
<button
            onClick={onLogOut}
            className=""
          >
            Выйти
          </button>
    </Navbar.Collapse>
      </Navbar.Collapse>
      </Navbar>

     
      ) 
  } else {
    content =  (

      <Navbar bg="light" expand="md" sticky="top" >
      <Navbar.Brand href="/">
        <FlayraLogo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
          as="ul"
        >
          <NavDropdown title="Моды" id="navbarScrollingDropdown">
            <ModsList />
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action">Другое</NavDropdown.Item>
          </NavDropdown>
          
        </Nav>
        <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
    <Navbar.Text>
    <Link to="/login"> Войти</Link>
    </Navbar.Text> 

    </Navbar.Collapse>
      </Navbar.Collapse>
      </Navbar>
      )
  }

  return  <>{content}</>
 }
