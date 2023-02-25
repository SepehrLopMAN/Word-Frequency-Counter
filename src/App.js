import { createContext, useContext, useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";

const Heading1 = styled.h1`
  text-align: center;
`;

const TextBox = styled.textarea.attrs(({ $rows, $cols }) => ({
  rows: $rows,
  cols: $cols,
}))`
   {
    resize: none;
    font-size: 1.125rem;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  :focus {
    outline-color: mediumaquamarine;
    color: mediumaquamarine;
  }
`;

TextBox.defaultProps = {
  $rows: 20,
  $cols: 30,
};

const Button = styled.button`
   {
    cursor: pointer;
    text-transform: capitalize;
    margin: 0.5rem 0;
    font-weight: bolder;
    font-size: 1.375rem;
    padding: 0.5rem;
    background-color: #d9d9d9;
    box-sizing: border-box;
    border: none;
  }
  :hover {
    color: white;
    background-color: mediumaquamarine;
  }
`;

const FrequencyTable = styled(({ className }) => {
  const WordsContextData = useContext(WordsContext);
  const wordsTable = new Map();
  for (let word of WordsContextData.toLowerCase().match(/[\w]+/g) || [])
    wordsTable.set(word, wordsTable.get(word) ? wordsTable.get(word) + 1 : 1);
  const wordsFrData = Array.from(wordsTable).sort(
    ([, elem1_count], [, elem2_count]) => elem2_count - elem1_count
  );
  console.log(wordsFrData);

  return (
    WordsContextData && (
      <table className={className}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Count</th>
            <th>Word</th>
          </tr>
        </thead>
        <tbody>
          {wordsFrData.map(([word, count], index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{count}</td>
              <td>{word}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
})`
   {
    font-size: 1.25rem;
  }

  td,
  tr,
  th {
    padding: 0.375em;
  }
  &,
  td,
  tr {
    border: 1px solid #e6e6e6;
    border-collapse: collapse;
  }

  th {
    background-color: mediumaquamarine;
    text-align: left;
    color: white;
  }

  th:last-of-type {
    width: 70%;
  }

  tbody tr:nth-child(odd) {
    background-color: #ddd;
  }

  tbody tr:hover {
    background-color: #ccc;
  }
`;

const WordsContext = createContext();

function App() {
  let textBoxNode = useRef();
  const [sentence, setSentence] = useState("");
  return (
    <>
      <Heading1>Word Frequency Counter</Heading1>
      <TextBox
        ref={textBoxNode}
        defaultValue="Paste your text content here!"
      ></TextBox>
      <Button
        onClick={() => {
          setSentence(textBoxNode.current.value);
        }}
      >
        Count those words!
      </Button>
      <WordsContext.Provider value={sentence}>
        <FrequencyTable />
      </WordsContext.Provider>
    </>
  );
}

export default App;
