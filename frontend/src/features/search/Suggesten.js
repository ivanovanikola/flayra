import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import algoliasearch from 'algoliasearch/lite';
import { Form } from 'react-bootstrap';



const searchClient = algoliasearch('KPA3GHXADV', 'be4695366c85753cb61721b506dff312');


export const Suggestion = () => {



    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
        searchClient,
        indexName: 'flayra_posts_query_suggestions',
        getSearchParams() {
            return {
                hitsPerPage: 3,
            };
        },
    });

    autocomplete({
        container: '#autocomplete',
        placeholder: 'Search',
        openOnFocus: true,
        plugins: [querySuggestionsPlugin],
    });


    return (
        <>
        <div id="autocomplete"></div>
            <Form>
                <Form.Group 
                class="container" 
                controlId="autocomplete"
                >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control id='autocomplete' type="search" placeholder="Search" />
                </Form.Group>
            </Form>
        </>
    )
}