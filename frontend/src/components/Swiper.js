import { Carousel, Col, Row, Pagination } from "react-bootstrap"
import React, { useState } from "react"





export const Swiper = () => {


    let menus = ['arfa', 'box', 'copyning', 'row', 'story']


    const [item, setItem] = useState(menus[0]);
    let active = item;

    
    menus.map(menuItem => (

        <Pagination.Item 
        key={menuItem}

        >
              <h1>{menuItem}</h1>  
            </Pagination.Item>
    ));


    const IterateNext = (array) => {
        let nextIndex = array.indexOf(item);
    
        return {
           next: function(){
               return nextIndex < array.length ?
                   {value: array[nextIndex++], done: false} :
                   {done: true};
           },
        }
    }

    const IteratePrevious = (array) => {
        let prevIndex = array.indexOf(item);

        return {
           prev: function(){
               return  array.length > prevIndex ?
                   {value: array[--prevIndex], done: false} :
                   {done: true};
           }
        }
    }

    let itNext= IterateNext(menus);
    let itPrev= IteratePrevious(menus);
    console.log(itNext.next().done);  // true
    console.log(item);



    const paginationBasic = (
        <div >
            <br />
            <br />      
            <br />
            <br />
            <br />
            <br />
            <Pagination>
                 <Pagination.Prev 
                    onClick={() => setItem(itPrev.prev().value)}
                    
                />
                {menus}
                <Pagination.Next
                    onClick={() => setItem(itNext.next().value)}
                />    
            </Pagination>
        </div>
    );
    return (
        <>{paginationBasic}</>
    )
}




{/* <Pagination.First  
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
</Pagination> */}