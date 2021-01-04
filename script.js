const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");

// API refers to https://forismatic.com/en/api/
// Add a proxy Url to get around with the CORS policy, for info refers to https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

async function getQuote() {
  const proxyUrl = "https://still-spire-54351.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // add 'Unknown' for the quote with no author
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // to-do reduce font size for long quotes

    quoteText.innerText = data.quoteText;
  } catch (error) {
    console.log("Oops, no quote", error);
  }

  // to-do Twitter Quote

  function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, "_blank");
  }

  // Event listenners

  twitterButton.addEventListener("click", tweetQuote);

  newQuoteButton.addEventListener("click", getQuote);
}

// On Load

getQuote();
