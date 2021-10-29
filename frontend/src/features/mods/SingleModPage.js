import React from 'react'
import { Spinner } from '../../components/Spinner'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import { useGetModQuery } from '../api/apiSlice'
import { ReactionButtons } from '../posts/ReactionButtons'
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { LastPublish } from '../../components/TimeAgo'
import { getStrapiMedia } from "../../lib/media"



let PostExcerpt = ({ post }) => {
  const imageUrl = getStrapiMedia(post.image)

  return (
    <Container style={{ marginTop: 8 }}>
      <Row>
        <Col />
        <Col xs={10}>
          <CardGroup>
            <Card key={post.id}>
              {/* <PostAuthor userId={post.author.id} /> */}
              <Card.Img variant="top" src={imageUrl} />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
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


export const SingleModPage = ({ match }) => {
  const { modId } = match.params

  
  const { data: mod = [], isLoading, isFetching, isSuccess,
    isError,
    error,
   } = useGetModQuery(modId);  
 

  let content

  if (isLoading) {
    content = <Spinner text="Loading..." />
  } else if (isSuccess) {

    //TODO: Сортировка без useMemo() - постоянный ререндеринг. Изменить на useMemo. 
    const posts = mod.posts.slice().sort((a, b) => b.updated_at.localeCompare(a.updated_at))
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
    <>
      {content}
    </>

  )
}