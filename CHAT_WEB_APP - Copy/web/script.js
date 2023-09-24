/*let rating = 0;

function rateProduct(stars) {
  rating = stars;

  // Highlight the selected stars
  const starElements = document.getElementsByClassName('star');
  for (let i = 0; i < starElements.length; i++) {
    if (i < stars) {
      starElements[i].innerHTML = '&#9733;'; // filled star
    } else {
      starElements[i].innerHTML = '&#9734;'; // empty star
    }
  }
}

function submitReview() {
  if (rating === 0) {
    alert('Please rate the product before submitting the review.');
    return;
  }

  const reviewText = prompt('Please enter your review:');
  if (reviewText) {
    const reviewsList = document.getElementById('reviews-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${rating} stars:</strong> ${reviewText}`;
    reviewsList.appendChild(listItem);

    // Reset rating
    rating = 0;
    const starElements = document.getElementsByClassName('star');
    for (let i = 0; i < starElements.length; i++) {
      starElements[i].innerHTML = '&#9734;'; // empty star
    }
  }
  
}*/

let ratings = [];
let reviews = [];

// Function to handle rating the product
function rateProduct(rating) {
  ratings.push(rating);
  updateStarRating();
}

// Function to update the star rating display
function updateStarRating() {
  const stars = document.getElementsByClassName("star");
  for (let i = 0; i < stars.length; i++) {
    if (i < ratings.length) {
      stars[i].style.color = "orange";
    } else {
      stars[i].style.color = "gray";
    }
  }
}

// Function to handle submitting a review
function submitReview() {
  const reviewText = document.getElementById("reviewText").value;
  reviews.push(reviewText);
  analyzeSentiment();
  document.getElementById("reviewText").value = "";
}

// Function to analyze the sentiment of reviews
function analyzeSentiment() {
  const sentiments = [];

  // Perform sentiment analysis on each review
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const sentiment = getSentiment(review);
    sentiments.push(sentiment);
  }

  const mode = findMode(sentiments);

  const sentimentMode = document.getElementById("sentimentMode");
  sentimentMode.innerHTML = `Mode of Sentiment: <span class="highlight">${mode}</span>`;
}

// Function to find the mode (most frequent) sentiment
function findMode(sentiments) {
  let mode;
  const sentimentCounts = {};

  // Count the occurrences of each sentiment
  for (let i = 0; i < sentiments.length; i++) {
    const sentiment = sentiments[i];
    sentimentCounts[sentiment] = (sentimentCounts[sentiment] || 0) + 1;
  }

  // Find the sentiment with the highest count
  let maxCount = 0;
  for (const sentiment in sentimentCounts) {
    if (sentimentCounts[sentiment] > maxCount) {
      maxCount = sentimentCounts[sentiment];
      mode = sentiment;
    }
  }

  return mode;
}
function getSentiment(review) {
  const positiveWords = ["good", "great", "excellent", "love", "happy"];
  const negativeWords = ["bad", "terrible", "awful", "hate", "sad", "worst"];

  const words = review.toLowerCase().split(" ");

  let hasPositiveWord = false;
  let hasNegativeWord = false;

  for (const word of words) {
    if (positiveWords.includes(word)) {
      hasPositiveWord = true;
    }
    if (negativeWords.includes(word)) {
      hasNegativeWord = true;
    }
  }

  if (hasPositiveWord) {
    return "positive";
  } else if (hasNegativeWord) {
    return "negative";
  } else {
    return "neutral";
  }
}
