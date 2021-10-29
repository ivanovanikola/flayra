import React, { useState } from 'react'
import classnames from 'classnames'
import { Spinner } from '../../components/Spinner'
import { useListPostsQuery, useCountPostsQuery } from '../api/apiSlice'
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import algoliasearch from 'algoliasearch';
import { CardNoImg, CardWithImage } from '../../components/Card'
import Stack from 'react-bootstrap/Stack'
import { CardImg } from '../../components/CardImg'



let PostExcerpt = ({ post }) => {

  let content
  if (post.image === null) {
    content = <CardNoImg key={post.id} post={post} />
  } else {
    
    content = <CardImg key={post.id} post={post} />

  }
  return (<>{content}</>)
}

export const PostsList = ( {currentUser} ) => {

  const [page, setPage] = useState(1);

  const { data: count } = useCountPostsQuery()
  console.log('count', count)
  let list = page === 1 ? 0 : (page - 1) * 8; 
  let lastPage = Math.ceil(count / 8)

  const {
    data: posts = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useListPostsQuery(list);


  const client = algoliasearch('KPA3GHXADV', 'be4695366c85753cb61721b506dff312');
  const index = client.initIndex('flayra_posts');

  let content

  if (isLoading) {
    content = <Spinner text="Загрузка..." />
  } else if (isSuccess) {
    index.saveObjects(posts, { autoGenerateObjectIDIfNotExist: true });

    console.log('Posts from PostsList')
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


  let active = page;
  let items = [];
  //TODO: Пагинация будет расползаться в зависимости от количества постов, нужно ограничить. 

  for (let number = 1; number <= lastPage; number++) {
    items.push(
      <Pagination.Item 
      key={number} 
      active={number === active}
      onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }
  
  const paginationBasic = (
      <Pagination className=" justify-content-center">
              <Pagination.First  
              onClick={() => setPage(1)}
              disabled={page <= 1}
              />
              <Pagination.Prev 
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              />
               <Pagination.Ellipsis 
               onClick={() => setPage(page - 2)}
               disabled={page <= 2}
               />
             {items}
             <Pagination.Ellipsis
              onClick={() => setPage(page + 2)}
              disabled={page >= lastPage - 1}
             />
             <Pagination.Next
                onClick={() => setPage(page + 1)}
                disabled={page >= lastPage}
              />
              <Pagination.Last 
                onClick={() => setPage(lastPage)}
                disabled={page >= lastPage}
              />
        </Pagination>
  );


  return (

    // <Stack style={{ backgroundColor: '#fafafa', minHeight: 65, marginTop: 65 }}>
      <>
        
                {content}
          
        <Row>
          <Col >
            {paginationBasic}
          </Col>
          <Col></Col>

        </Row>

      </>
    // </Stack>

  );
}
