import React from 'react'
import { useGetCommentsPostQuery } from '../features/api/apiSlice'
import { Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
import { LastPublish } from '../../src/components/TimeAgo'

// TODO: Загрузить все комментарии к конкретному посту с отображением автора, аватара, рерайтом, статистикой, со всеми подкомметариями и зависимостями
//как все будет готово добавить роут в контроллер /authors/post/:postId
//добавить сортировку комметариев по дате
// добавить комментарий комментария
// адд новый комент с рерэндом

let CommentList = ({ comment }) => {
  console.log('comment in CommentList', comment )

let author = comment.author;
let content;

  if (author) {

    content = (
      <Container style={{ marginTop: 8 }}>
      <Row>
        <Col />
        <Col xs={10}>
          <CardGroup>
            <Card key={comment.id}>
              <Card.Img variant="top" src={comment.author.picture} /> 
              <Card.Body>
              <Card.Title>{comment.author.name} {comment.author.surname}</Card.Title>
                <Card.Text>{comment.content} </Card.Text>
                <LastPublish date={comment.created_at} />
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col />
      </Row>
    </Container>
    )
    } else {

      content = (
<Container style={{ marginTop: 8 }}>
      <Row>
        <Col />
        <Col xs={10}>
          <CardGroup>
            <Card key={comment.id}>
              <Card.Img variant="top" src="" /> 
              <Card.Body>
              <Card.Title>Упс что-то пошло не так</Card.Title>
                <Card.Text>У поста есть комметнарий без автора </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col />
      </Row>
    </Container>
      )
    }
    return <>{content}</>
  }


export const PostCommentsList = ({ postId }) => {
  console.log('postId', postId)
  const { data: comments = [], isSuccess } = useGetCommentsPostQuery(postId)

  let content
  if (isSuccess) {
    console.log('authors who comment this post', comments)
    const renderedComments = comments.map((comment) => (
      //take comments for post
      < CommentList key={comment.id} comment={comment} />

    ))
    content = (
      <div>{renderedComments}</div>

    )
  }
  return <> {content} </>
}
