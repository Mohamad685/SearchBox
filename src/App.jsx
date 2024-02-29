import React from 'react';
import './styles.css';
import { useState } from 'react';

function App() {
  const [searchBox,setSearchBox]=useState(' ');

  const handleSearch= (e) => {
    setSearchBox(e.target.value);
  }

  return (
    <>
    <div className='search-page'>
      
      <h1>Search</h1>
      <input type='text' value={searchBox} onChange={handleSearch} className='search-input' placeholder='Write a word or phrase ... '/>
      <div> 
        {articles.map((article, index)=> (
          <p key={index}>text</p>
        ))}
      </div>
    </div>
    
    </>
  )
}

export default App
