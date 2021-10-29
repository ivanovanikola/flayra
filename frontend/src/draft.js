
// const {
//     data: posts = [],
//     isLoading,
//     isFetching,
//     isSuccess,
//     isError,
//     error,
//     refetch
//   } = useGetPostsQuery()

//   const sortedPosts = useMemo(() => {
//     const sortedPosts = posts.slice()
//     sortedPosts.sort((a, b) => b.updated_at.localeCompare(a.updated_at))
//     return sortedPosts
//   }, [posts])

// // Вычисляет количество Entity из state.entity
//   const dispatch = useDispatch()
//   const postsForCount = dispatch(fetchPosts())
//   const countTotal = useSelector(selectTotalPosts)
//   console.log('countTotal', countTotal )





  <OverlayTrigger
  trigger={["focus"]}
  rootCloseEvent="click"
  key="bottom"
  placement="bottom"
  overlay={
      <Popover id={`popover-positioned-bottom`}>
          <Popover.Header>
              {currentUser.user.author.name}{' '}{currentUser.user.author.surname}
          </Popover.Header>
          <Popover.Body>
              <Row>
                  <Button
                      className="custom-navbar btn"
                      onClick={onLogOut} >
                      Выйти
                  </Button>
              </Row>
          </Popover.Body>
      </Popover>
  }
>
  <Button
      onClick={(e) => { e.target.focus() }}
      className="custom-navbar btn"

  >
     < Avatar currentUser={currentUser} />
  </Button>


</OverlayTrigger>

 {/* <Navbar className="custom-navbar" expand="md" fixed="top">
          <Container >
              <Navbar.Brand href="/">
                  < FlayraLogo id='flayraLogoDark' />
              </Navbar.Brand>
              <Nav className="justify-content-end" activeKey="/home">
                  <Search />
                  <Button className="custom-navbar btn"
                  >
                      <HouseIcon
                          href="/"
                      />
                  </Button>
                  <OverlayTrigger
                      trigger={["focus"]}
                      rootCloseEvent="click"
                      key="bottom"
                      placement="bottom"
                      overlay={
                          <Popover id={`popover-positioned-bottom`}>
                              <Popover.Header>
                                  {currentUser.user.author.name}{' '}{currentUser.user.author.surname}
                              </Popover.Header>
                              <Popover.Body>
                                  <Row>
                                      <Button
                                          className="custom-navbar btn"
                                          onClick={onLogOut} >
                                          Выйти
                                      </Button>
                                  </Row>
                              </Popover.Body>
                          </Popover>
                      }
                  >
                      <Button
                          onClick={(e) => { e.target.focus() }}
                          className="custom-navbar btn"
                      >
                         < Avatar currentUser={currentUser} />
                      </Button>
                  </OverlayTrigger>
              </Nav>

          </Container>
      </Navbar> */}



       {/* <Breadcrumb.Item href="/" style={{color: '#000000' }}>
                        Главная
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href={`/mods/${post.mod.name}`} style={{color: '#000000' }}>{post.mod.name}</Breadcrumb.Item>
                      <Breadcrumb.Item href="" style={{color: '#000000' }}>{post.author.name}{' '}{post.author.surname}</Breadcrumb.Item>
                      <Breadcrumb.Item >
                        {post.description}{': '}{post.title}
                      </Breadcrumb.Item> */}



                      /* .scloll-menu-span{
background-image: linear-gradient(270deg,hsla(0,0%,100%,0) 0,#000 80%);
width: 3.5em !important;
height: 3.5em !important;
--tw-shadow: 0 0 transparent !important;
} */


const menuItemMain = 'Главная';
const menuItemMod = post.mod.name;
const menuItemAuthorName = post.author.name;
const menuItemAuthorSurname = post.author.surname;
const menuItemPostTitle = post.title;
const menuItemPostDescription = post.description;


const data = [
  menuItemMain,
  menuItemMod,
  menuItemAuthorName + ' ' + menuItemAuthorSurname,
  menuItemPostDescription + ': ' + menuItemPostTitle,
];