import { useState } from "react";
import "./App.css";

function App() {
  const [url, setURL] = useState("");
  const [shortURL, setShortURL] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // console.log("e", e);

        fetch("http://localhost:4000/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            setShortURL(data.url);
          })
          .catch((err) => {
            console.log("err", err);
          });
      }}
    >
      <input type="url" onChange={(e) => setURL(e.target.value)} value={url} />
      <button type="submit">Create</button>
      {shortURL && (
        <p>
          Short URL : <a href={shortURL}>{shortURL}</a>
        </p>
      )}
    </form>
  );
}

export default App;
