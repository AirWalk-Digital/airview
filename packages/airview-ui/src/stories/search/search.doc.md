The Search component is used to allow a user to perform a search query on a given string input. If results are found, these are presented in a lisyt with the search query higlighted within the result summary.

## Component States

The Search can be rendered in the following states:

- **Closed:** The Search UI is not presented to the user
- **Open:** The Search UI is presented to the user in a ready state (no input, no results)
- **Search in progress:** The Search UI has a user input and is awaiting results. A user can abort at this state
- **Search results returned:** The Search results have been returned and are either presented to the user, if there are results or in the event of no results found an appropriate feedback message is displayed
- **Error:** There has been an error fetching the results, an appropriate feedback message is displayed

## Importing the component

You can import the Search component as a named import from the airview-ui library

```javascript
import { Search } from "airview-ui";
```

## Responding to user queries

The Search component accepts a `onQueryChange` prop as a callback; the argument of this callback is the search query, a resolved or rejected promise should be returned.

### Returning a successfull response

A successful response should return an array, either empty (for no results) or containing and object of results:

**Signature:**

- `title` the title of the result (string _required_)
- `summary` a short description of the result (string optional)
- `linkProps` props to pass to the supplied `linkComponent` (object _required_)

**Example:**

```jsx
const mockSearchResults = [{
  title: "Result Title",
  summary: "Result summary"
  linkProps: {
    href: "/"
  }
}];

function MySearchComponent() {
  const [searchOpen, setSearchOpen] = useState(false)

  const handleOnQueryChange = async (query) => {
    return momockSearchResults
  }

  return (
    <Search
      open={searchOpen}
      onRequestToClose={() => setSearchOpen(false)}
      onQueryChange={handleOnQueryChange}
      linkComponent="a"
    />
  )
}
```

### Rejecting a response

If the response failed, you can return a rejected promise with an error message for user feedback:

**Signature:**

- `message` the reason for the error (string _required_)

**Example:**

```jsx
const mockErrorResponse = { message: "There was an error" };

function MySearchComponent() {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleOnQueryChange = async (query) => {
    return mockErrorResponse;
  };

  return (
    <Search
      open={searchOpen}
      onRequestToClose={() => setSearchOpen(false)}
      onQueryChange={handleOnQueryChange}
      linkComponent="a"
    />
  );
}
```

## The LinkComponent prop

The Search component accepts a `linkComponent` prop, this is to allow the use of your prefered Routing solution (e.g native anchor tag, React Router, Gatsby Link etc). You can pass props to this linkComponent via the `linkProps` key as per the results response object example above.
