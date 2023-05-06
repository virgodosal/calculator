import React, { useState, useEffect } from 'react';
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  const [result, setResult] = useState('');
  const [viewResult, setviewResult] = useState('')
  const [history, setHistory] = useState([]); 
  const [value, setValue] = useState("");

  function handleClick(e) {
    const inputValue = e.target.name;
    if (inputValue === "-") {
      setValue(value => - value);
    }
    if (inputValue === '=') {
      calculate();
    } else if (inputValue === 'C') {
      clear();
    } else {
      setResult((prevResult) => prevResult.concat(inputValue));
    }
  }


  function clear() {
    setResult('');
  }

  async function calculate() {
    try {
      const sanitizedResult = result.replaceAll('x', '*');
      const newResult = eval(sanitizedResult).toString();
      setResult(newResult);
    
      console.log(`String: ${result}`)
      console.log(`Answer: ${newResult}`)
      const allString = `${result} = ${newResult}`.replaceAll('*', 'x'); 
      console.log(`String to be saved to the database: ${allString}`)
      setviewResult(allString)
  
      if (result !== '') {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/saveCalc`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: "virgo06",
            calcStrings: allString
          }),
        });
            const data = await response.json();
            console.log(data);
            //setHistory([...history, allString]);
       
      }
       else {
        clear();
      }
    } catch (error) {
      setResult('');
    }
    clear();
  }

  useEffect(() => {
    async function getHistory() {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/viewStrings`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: "virgo06"          
        })
      });
      const data = await response.json();
      setHistory(data.reverse());
      console.log(`Whats this: ${data}`)
    }
    getHistory();
  }, [result]);

  /// [SECTION] Clearing Database
  
  function deleteHistory() {
    setHistory(["Empty do some Calculations"]);
    console.log("Deleting history. . .");
  
    fetch(`${process.env.REACT_APP_API_URL}/users/clearHistory`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: "virgo06",
        calcStrings: []
      })
    }) 
    .then(response => response.json())
    .then(data => {
      console.log(`Response data: ${data}`);
      if (data) {
        console.log("History deleted successfully!");

      } else {
        console.log("Failed to delete history.");
      }
    })
    .catch(error => {
      console.error("Error deleting history:", error);
    });
  }


  return (
  <div id="center-container">
    <div id='Container-calc'>
    <div className="calculator">
      <input className="prev"  type="text" value={viewResult}/>
      <input 
          className="answer" 
          type="text"  
          inputPlaceholder={result ? result : "0" } 
          value={result} 
          onChange={(e) => setResult(e.target.value.replaceAll('*', 'x'))} 
        />


      <div className="keypad">
       <button className="ac" onClick={clear}>AC</button>

       <button className="posneg" name="-" onClick={handleClick}>+/-</button>
        <button className="modulo" name=" % ">%</button>
        <button className="divide" name=" / " onClick={handleClick}>÷</button>
        <button className="seven"  name="7" onClick={handleClick}>7</button>
        <button className="eight" name="8" onClick={handleClick}>8</button>
        <button className="nine" name="9" onClick={handleClick}>9</button>        
        <button className="multiply" name=" x " onClick={handleClick}>X</button>       
        <button className="four" name="4" onClick={handleClick}>4</button>
        <button className="five" name="5" onClick={handleClick}>5</button>
        <button className="six" name="6" onClick={handleClick}>6</button>
        <button className="minus" name=" - " onClick={handleClick}>-</button>
        <button className="one" name="1" onClick={handleClick}>1</button>
        <button className="two" name="2" onClick={handleClick}>2</button>
        <button className="three" name="3" onClick={handleClick}>3</button>
        <button className="plus" name=" + " onClick={handleClick}>+</button>
        <button className="dot" name="." onClick={handleClick}>.</button>
        <button className="zero" name="0" onClick={handleClick}>0</button>
        <button className="history"><FontAwesomeIcon icon={faHistory} /></button>
        <button className="equal" name=" = " onClick={calculate}>=</button>
      </div>
  </div>
</div>
      
      <div className='calculator2'>
      <p>
      <span>History</span>
      <span className='trashIcon' onClick={deleteHistory}><FontAwesomeIcon icon={faTrashAlt} size="m"/></span>
      </p>
    <div className="history-container">
      {history.length > 0 ? (
        history.slice(0).reverse().map((item, index) => (
          <input key={index} className="answer2" type="text" value={item} disabled />
        ))
      ) : (
        <input className="answer2" type="text" value="Empty history make some calculations" disabled></input>
      )}
    </div>

    </div>


</div>
    
  );
}

export default Main;
 
