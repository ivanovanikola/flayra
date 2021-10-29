import React, { Component } from 'react';

import './App.css';
// import { PostsList } from './features/posts/PostsList';
import {
  BrowserRouter,
  Switch
} from 'react-router-dom'
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm'
import { SingleModPage } from './features/mods/SingleModPage';
import Signup from './features/user/Singup';
import Login from './features/user/Login';
import { PrivateRoute } from './helpers/PrivateRoute';
import { PublicRoute } from './helpers/PublicRoute';
import Dashboard  from './features/user/Dashboard';
import { Home } from './components/Home';
import { PostCommentsList } from './comments/PostCommentsList';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectAutoComplete
} from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import { isLogin } from './utils';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import { PostItem } from './features/search/PostItem';
import { SearchAutocomplete } from './features/search/SearchAutocomplete';

//Дизайн
import { NavbarMain } from './components/Navbar';
import { BeAuthor } from './components/BeAuthor';
import { Mission } from './components/Mission';
import { LogIn } from './features/auth/LogIn';
import { Suggestion } from './features/search/Suggesten';
import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';



const searchClient = algoliasearch('KPA3GHXADV', 'eb0014f4625282906fa4e19e2db5a1b5');



function App() {

  return (
    <>
      {/* <div className="ais-InstantSearch">
        <h1>React InstantSearch e-commerce demo</h1>
        <InstantSearch indexName="flayra_posts" searchClient={searchClient}>
          <div className="left-panel">
            <ClearRefinements />
            <h2>Mods</h2>
            <RefinementList attribute="mod.name" />
            <Configure hitsPerPage={8} />
          </div>
          <div className="right-panel">
            <SearchBox />
            <Hits hitComponent={Hit} />
            <Pagination />
          </div>
        </InstantSearch>
      </div> */}



<BrowserRouter>
          <Switch>
            <PublicRoute exact path="/posts/:postId" restricted={false} component={SinglePostPage} />
            <PublicRoute exact path="/authors/comments/:postId" restricted={false} component={PostCommentsList} />
            <PublicRoute exact path="/editPost/:postId" restricted={false} component={EditPostForm} />
            <PublicRoute exact path="/" restricted={false} component={Home} />
            <PublicRoute exact path="/mods/:modId" restricted={false} component={SingleModPage} />
            <PublicRoute exact path="/login" restricted={true} component={LogIn} />
            <PublicRoute exact path="/signup" restricted={true} component={Signup} />
            <PublicRoute exact path="/beauthor" restricted={false} component={BeAuthor}/>
            <PublicRoute exact path="/mission" restricted={false} component={Mission}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/users" component={UsersList} /> */}
            {/* <Route exact path="/users/:userId" component={UserPage} /> */}
            {/* <Route exact path="/notifications" component={NotificationsList} /> */}
          </Switch>
</BrowserRouter>   



     </>
  )

}


// function Hit(props) {
//   return (
//     <div>
//       <img src={props.hit.image} align="left" alt={props.hit.name} />
//       <div className="hit-title">
//         <Highlight attribute="title" hit={props.hit} />
//       </div>
//       <div className="hit-content">
//         <Highlight attribute="content" hit={props.hit} />
//       </div>
//       <div className="hit-mod">
//         <Highlight attribute="mod" hit={props.hit} />
//       </div>
//     </div>
//   );
// }


// Hit.propTypes = {
//   hit: PropTypes.object.isRequired,
// };
export default App