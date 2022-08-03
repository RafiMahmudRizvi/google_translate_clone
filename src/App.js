import React, { useState, useEffect } from "react";
import axios from "axios";
import Arrows from "./components/Arrows";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {
  const [showModal, setShowModal] = useState(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("Bengali");
  const [languages, setLanguages] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  //GET LANGUAGES START
  const getLanguages = () => {
    const options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/languages",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        const arrayOfData = Object.keys(response.data.data).map(
          (key) => response.data.data[key]
        );
        setLanguages(arrayOfData);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //GET LANGUAGES END

  useEffect(() => {
    getLanguages();
  }, []);

  // TRANSLATE START
  const translate = async () => {
    const options = {
      method: "GET",
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };

    try {
      const response = await axios(
        "https://google-translate20.p.rapidapi.com/translate",
        options
      );
      setTranslatedText(response.data.data.translation);
    } catch (err) {
      console.log(err);
      // res.status(500).json({ message: err });
    }
  };
  // TRANSLATE END

  function handelClick() {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            setShowModal={setShowModal}
            style={"input"}
            setLanguage={inputLanguage}
            textToTranslate={textToTranslate}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
          />

          <div className="arrow-container" onClick={handelClick}>
            <Arrows />
          </div>

          <TextBox
            setShowModal={setShowModal}
            setLanguage={outputLanguage}
            style={"output"}
            translatedText={translatedText}
          />

          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === "input" ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === "input" ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  );
}

export default App;
