import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';

const getrandomText = () => `code react windows mac laptop macbook
coding html earth wood`.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1)

Word = React.memo(Word)

function Word(props) {
  const { text, active, correct } = props

  if (correct === true) {
    return <span className="correct">{text}</span>
  }
  if (correct === false) {
    return <span className="incorrect">{text}</span>
  }
  if (active) {
    return <span className='active'>{text}</span>
  }
  return <span style={{
    fontWeight: active ? "bold" : "normal"
  }}>{text}</span>
}

function App() {
  const [userInput, setUserInput] = useState("")
  const randomText = useRef(getrandomText())
  const [activeTextIndex, setActiveTextIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [startCounting, setStartCounting] = useState(false)

  function processInput(value) {

    if (activeTextIndex === randomText.current.length) {
      return
    }

    if (!startCounting) {
      setStartCounting(true)
    }

    if (value.endsWith(" ")) {
      if (activeTextIndex === randomText.current.length - 1) {
        setStartCounting(false)
        setUserInput("Completed")
      } else {
        setUserInput("")
      }
      setActiveTextIndex(index => index + 1)


      setCorrectWordArray(data => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeTextIndex] = word === randomText.current[activeTextIndex]
        return newResult
      })

    } else {
      setUserInput(value)
    }
  }
  const [timeElapsed, setTimeElapsed] = useState(0)
  function Timer(props) {
    const { correctWords, startCounting } = props
   

    useEffect(() => {
      let id
      if (startCounting) {
        id = setInterval(() => {
          setTimeElapsed(oldTime => oldTime + 1)
        }, 1000)
      }
      return () => {
        clearInterval(id)
      }
    }, [startCounting])
    const minutes = timeElapsed / 60
    return <div>
      <p>Time: {timeElapsed}</p>
      <p>Speed: {(correctWords / minutes) || 0}WPM</p>
    </div>

  }
  return (
    <div className="App">
      <Timer startCounting={startCounting} correctWords={correctWordArray.filter(Boolean).length} />
      <p>{randomText.current.map((word, index) => {
        return <Word text={word} active={index === activeTextIndex} correct={correctWordArray[index]} />
      })}</p>
      <input type="text" value={userInput} onChange={(e) => processInput(e.target.value)} />
    </div>
  );
}

export default App;
