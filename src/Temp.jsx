import { useState, useEffect } from "react";

const Url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const Random = () => {

    const [quote, setQuote] = useState({});
    const [loading, setLoading] = useState(true);
    const [bgColors, setbgColors] = useState("#057f4e");

    const colors = [
        "#057f4e", "#5f0303ff", "#976221ff", "#550e98ff", "#5f9ea0", 
        "#1c7603ff", "#0344bdff", "#b00729ff", "#156d8bff", "#d20572ff"
    ]

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch(Url);
      const data = await response.json();
      console.log('API response:', data); 
      setQuote(data.quotes[Math.floor(Math.random()*data.quotes.length)]);
      setbgColors(colors[Math.floor(Math.random()*colors.length)])
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({quote: "Oops! Something went wrong.", author: "Unknown"});
    } finally {
      setLoading(false);
    }
};
    useEffect(()=>{
        fetchQuote();
    }, []);

  return (
    <div id="container" style={{backgroundColor: bgColors}}>
    <div id="quote-box">
       {loading ? (
        <p>Loading...</p>
       ):(
        <>
        <p id="text" style={{color: bgColors}}>"{quote.quote}"</p>
        <p id="author" style={{color: bgColors}} >- {quote.author}</p>

        </>
       )}
       <div className="buttons">

        <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.quote}" - ${quote.author}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            id="tweet-quote"
            style={{backgroundColor: bgColors}}
            >
            <i className="fab fa-twitter"></i>
        </a>


        <button id="new-quote" onClick={fetchQuote} 
        style={{backgroundColor: bgColors}} >New quote</button>   
        

       </div>

        
      
    </div>
    </div>
  )
}

export default Random

