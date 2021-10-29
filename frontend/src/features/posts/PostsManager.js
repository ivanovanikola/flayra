import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { Spinner } from '../../components/Spinner'
import { ReactionButtons } from './ReactionButtons'
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { LastPublish } from '../../components/TimeAgo'

import { useListPostsQuery } from '../api/apiSlice'


let PostExcerpt = ({ post }) => {
  return (
    <Container style={{ marginTop: 8 }}>
      <Row>
        <Col />
        <Col xs={10}>
          <CardGroup>
            <Card key={post.id}>
              {/* <PostAuthor userId={post.author.id} /> */}
              <Card.Img variant="top" src={post.image} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Title>{post.author.name}</Card.Title>
                <Card.Text>
                  {post.content.substring(0, 100)}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <LastPublish date={post.published_at} />
                <ReactionButtons post={post} />
                <Link to={`/posts/${post.id}`} >
                  Смотреть
                </Link>
              </Card.Footer>
            </Card>
          </CardGroup>
        </Col>
        <Col />

      </Row>
    </Container>
  )
}

export const PostManagerList = () => {

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  (async () => {
    let url = 'http://localhost:1337/posts/count';
    let response = await fetch(url);
    let data = await response.text();
    let dataToInt = parseInt(data);
    setCount(dataToInt)
  })()
  let list = page === 1 ? 0 : (page - 1) * 3;
  let lastPage = Math.ceil(count / 3)

  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useListPostsQuery(list);

 
  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {
    console.log(posts)
    const renderedPosts = posts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ))

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderedPosts}</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <div>
     {content}

      <button onClick={() => setPage(page - 1)} 
        disabled={page <= 1}
      >
        Назад
      </button>
      <button
        onClick={() => setPage(page + 1)}
       
        disabled={page >= lastPage}
      >
        Вперед
      </button>
      <button onClick={refetch}>Обновить</button>
    </div>
  );
}