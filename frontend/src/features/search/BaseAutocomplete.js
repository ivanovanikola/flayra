import React, { useEffect, useRef, useState, useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
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

return (
  <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
    <form
      className="aa-Form"
      {...autocomplete.getFormProps({ inputElement: inputRef.current })}
    >
      <div className="aa-InputWrapperPrefix">
        <label className="aa-Label" {...autocomplete.getLabelProps({})}>
          <button className="aa-SubmitButton" type="submit" title="Submit">
            <SearchIcon />
          </button>
        </label>
      </div>
      <div className="aa-InputWrapper">
        <input
          className="aa-Input"
          ref={inputRef}
          {...autocomplete.getInputProps({})}
        />
      </div>
      <div className="aa-InputWrapperSuffix">
        <button className="aa-ClearButton" title="Clear" type="reset">
          <ClearIcon />
        </button>
      </div>
    </form>
    {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            'aa-Panel',
            'aa-Panel--desktop',
            autocompleteState.status === 'stalled' && 'aa-Panel--stalled',
          ]
            .filter(Boolean)
            .join(' ')}
          {...autocomplete.getPanelProps({})}
        >
   <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            <div className="aa-ItemWrapper">
                              <div className="aa-ItemContent">
                                <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    width="40"
                                    height="40"
                                  />
                                </div>
                                <div className="aa-ItemContentBody">
                                  <div
                                    className="aa-ItemContentTitle"
                                    dangerouslySetInnerHTML={{
                                      __html: item._highlightResult.title
                                        .value,
                                    }}
                                  />
                                  <div className="aa-ItemContentDescription">
                                    опубликовано <strong>{item.author.name}{' '}{item.author.surname}</strong> в моде {' '}
                                    <strong>{item.mod.name}{' '}</strong>
                                  </div>
                                </div>
                              </div>
                              <div className="aa-ItemActions">
                                <button
                                  className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                  type="button"
                                  title="Select"
                                  style={{ pointerEvents: 'none' }}
                                >
                                  <svg fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
  </div>
)}
</div>
);
};
         