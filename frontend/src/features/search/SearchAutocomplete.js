import React, { useEffect, useRef, useState, useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import styles from './Search.module.css';
import { Container, Form, InputGroup, Button, Row, Col, Card, CardGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { LastPublish } from '../../components/TimeAgo'
import { ArrowReturnLeft } from './ArrowReturnLeft';
import { SearchIcon } from '../search/SearchIcon'
import { ClearIcon } from '../search/ClearIcon'




const searchClient = algoliasearch('KPA3GHXADV', 'be4695366c85753cb61721b506dff312');


export const SearchAutocomplete = (props) => {
  const [autocompleteState, setAutocompleteState] = useState({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: '',
    activeItemId: null,
    status: 'idle',
  }
  );

  const autocomplete = useMemo(() =>
    createAutocomplete(
      {
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'posts',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'flayra_posts',
                      query,
                      params: {
                        hitsPerPage: 4,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    []
  );

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const panelRef = useRef(null);

  const { getEnvironmentProps } = autocomplete;

  useEffect(() => {
    if (!(formRef.current && panelRef.current && inputRef.current)) {
      return;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      panelElement: panelRef.current,
      inputElement: inputRef.current,
    });

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [getEnvironmentProps, formRef, panelRef, inputRef]);



  // return (
    // <>

      {/* <OverlayTrigger
        trigger={["focus"]}
        rootCloseEvent="click"
        key="bottom"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Header>

            </Popover.Header>
            <Popover.Body>
              <Row>
                <Button
                  className="custom-navbar btn"
                >
                  Выйти
                </Button>
              </Row>

            </Popover.Body>

          </Popover>
        }
      >
         
        <Form {...autocomplete.getRootProps({})}>
          <Form.Group
            ref={formRef}
            {...autocomplete.getFormProps({ inputElement: inputRef.current })}
//           >
//             {/* <Form.Label 
//               htmlFor="formGridSearch"
//               {...autocomplete.getLabelProps({})}></Form.Label> */}
//             <InputGroup>
//               <Form.Control
//                 id="formGridSearch"
//                 type="search"
//                 className="mr-2"
//                 aria-label="Найти"
//                 ref={inputRef}
//                 {...autocomplete.getInputProps({ inputElement: inputRef.current })}
//                 placeholder="Поиск по сайту"
//               >
//               </Form.Control>
//             </InputGroup>
//           </Form.Group>
//         </Form>
    

//       </OverlayTrigger>
//  */}




return (
  <Container {...autocomplete.getRootProps({})}>
    <Form
      {...autocomplete.getFormProps({ inputElement: inputRef.current })}
    >
        <Form.Control 
          aria-label="Поиск"
          ref={inputRef}
          {...autocomplete.getInputProps({})}
          placeholder="Поиск по сайту"
          type="search"
        />
    </Form>
    {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          {...autocomplete.getPanelProps({})}
        >
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;
              return (
                <Container key={`source-${index}`}>
                  {items.length > 0 && (
                    <Row  {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <Card 
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                          
                                <Card.Body >
                                  <Card.Title
                                    dangerouslySetInnerHTML={{
                                      __html: item._highlightResult.title
                                        .value,
                                    }}
                                  />
                                  <Card.Text>
                                    опубликовано <strong>{item.author.name}{' '}{item.author.surname}</strong> в моде {' '}
                                    <strong>{item.mod.name}{' '}</strong>
                                  </Card.Text>
                                  <Card.Link href={`/posts/${item.id}`}>Подробнее...</Card.Link>
                                </Card.Body>
                              
                         
                          </Card>
                        );
                      })}
                    </Row>
                  )}
                </Container>
              );
            })}
          </div>
  
)}
</Container>
);
};
         



//       <Container {...autocomplete.getRootProps({})}>
//         <Row>
//           <Col />
//           <Col>

//             <Form>
//               <Form.Group
//                 ref={formRef}
//                 {...autocomplete.getFormProps({ inputElement: inputRef.current })}
//               >
//                 {/* <Form.Label 
//               htmlFor="formGridSearch"
//               {...autocomplete.getLabelProps({})}></Form.Label> */}
//                 <InputGroup>
//                   <Form.Control
//                     id="formGridSearch"
//                     type="search"
//                     className="mr-2"
//                     aria-label="Найти"
//                     ref={inputRef}
//                     {...autocomplete.getInputProps({ inputElement: inputRef.current })}
//                     placeholder="Поиск по сайту"
//                   >
//                   </Form.Control>
//                 </InputGroup>
//               </Form.Group>
//             </Form>
//           </Col >
//           <Col />
//         </Row>
//         {autocompleteState.isOpen && (
//           <Row>
//             <Col />
//             <Col xs={10}>
//               {/* <CloseButton /> */}

//               <div
//                 ref={panelRef}
//                 className={[
//                   autocompleteState.status === 'stalled' && 'aa-Panel--stalled',

//                 ]
//                   .filter(Boolean)
//                   .join(' ')}
//                 {...autocomplete.getPanelProps({})}
//                 className={styles.zindex}>
//                 <div className="" >
//                   {autocompleteState.collections.map((collection, index) => {
//                     const { source, items } = collection;

//                     return (
//                       <Container key={`source-${index}`} >
//                         {items.length > 0 && (

//                           <div className="" {...autocomplete.getListProps()}>
//                             {
//                               items.map((item) => {
//                                 return (
//                                   <CardGroup key={item.objectID}>
//                                     <Card
//                                       key={item.objectID}
//                                       className=""
//                                       {...autocomplete.getItemProps({ item, source })}
//                                     >
//                                       <Card.Body>
//                                         <Link to={`/posts/${item.id}`} style={{ color: '#010101' }}>
//                                           <Card.Title
//                                             dangerouslySetInnerHTML={{
//                                               __html: item._highlightResult.title
//                                                 .value,
//                                             }}
//                                           />
//                                         </Link>
//                                         <Card.Text>
//                                           {item.content.substring(0, 100)}
//                                         </Card.Text>
//                                         <Link to={`/posts/${item.id}`} >
//                                           <Button variant="outline-dark"
//                                             style={{ pointerEvents: 'none' }}
//                                           >
//                                             <ArrowReturnLeft />
//                                             {' '}
//                                           </Button>
//                                         </Link>
//                                       </Card.Body>
//                                       <Card.Footer>
//                                         <Card.Text> автор <strong>{item.author.name} {item.author.surname}</strong> в моде: {' '}
//                                           <strong>{item.mod.name} {' '} </strong>
//                                         </Card.Text>
//                                         <LastPublish date={item.published_at} />
//                                       </Card.Footer>
//                                     </Card>
//                                   </CardGroup>
//                                 );
//                               })}
//                           </div>



//                         )}
//                       </Container>
//                     );
//                   })}
//                 </div>
//               </div>
//             </Col >
//             <Col />
//           </Row>
//         )}

//       </Container>
//     </>
//   );
// }
