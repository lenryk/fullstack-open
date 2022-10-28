import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import { EDIT_AUTHOR } from "../mutations";
import { useState } from "react";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [error, setError] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(name, born);
    await editAuthor({ variables: { name, setBornTo: Number(born) } });
    setName("");
    setBorn("");
  }

  if (!authors.loading) {
    return (
      <div>
        <h2>authors</h2>
        {error && <h2>{error}</h2>}
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born || null}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>set birth year</h2>
        <form onSubmit={handleSubmit}>
          <span>
            name:
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </span>
          <br />
          <span>
            born:
            <input
              value={born}
              onChange={(event) => setBorn(event.target.value)}
            />
          </span>
          <br />
          <button type="submit">update author</button>
        </form>
      </div>
    );
  }
};

export default Authors;
