import React, { useEffect, useState } from "react";
import axios from "axios";
import Languages from "./Languages.json";
import Options from "./Options";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [translatedData, setTranslatedData] = useState("");
  const [from, setFrom] = useState("Set Language");
  const [to, setTo] = useState("Set Language");

  useEffect(() => {
    if (inputValue && from !== "Set Language" && to !== "Set Language") {
      getData();
    }
  }, [inputValue, from, to]);

  async function getData() {
    const fromCode = Languages.find((elem) => elem.language === from)?.code;
    const toCode = Languages.find((elem) => elem.language === to)?.code;

    if (!fromCode || !toCode) {
      console.error("Invalid language selection");
      return;
    }

    const data = new FormData();
    data.append("source_language", fromCode);
    data.append("target_language", toCode);
    data.append("text", inputValue);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "becbd0749dmshb4f42be5b366128p114464jsn831eeb1b363e",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTranslatedData(response.data.data.translatedText);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div></div>
      <label>Enter Text</label>
      <textarea onChange={(e) => setInputValue(e.target.value)}></textarea>
      <br />
      <label>Convert From</label>
      <select onChange={(e) => setFrom(e.target.value)}>
        <option value="Set Language">Set Language</option>
        {Languages.map((elem, ind) => (
          <Options key={ind} val={elem.language} />
        ))}
      </select>
      <br />
      <label>Convert To</label>
      <select onChange={(e) => setTo(e.target.value)}>
        <option value="Set Language">Set Language</option>
        {Languages.map((elem, ind) => (
          <Options key={ind} val={elem.language} />
        ))}
      </select>
      <br />
      <label>Translated Data</label>
      <textarea value={translatedData} readOnly></textarea>
    </>
  );
}

export default App;
