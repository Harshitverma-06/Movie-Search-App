const card = document.querySelector(".card");
const movie = document.querySelector(".Movie");
const input = document.querySelector("#SearchMovie");
const apiKey = "8443430f";
const loader = document.querySelector("#loader");

movie.addEventListener("submit", async (event) => {
  event.preventDefault();
  const movieName = input.value;
  if (movieName) {
    try {
      const MovieData = await getData(movieName);
      DisplayCard(MovieData);
    } catch (err) {
      console.log(err);
      displayError(err.message);
    }
  } else {
    displayError("Please enter a Movie NAME");
  }
});

async function getData(movieName) {
  loader.style.display = "block";
  document.body.classList.add("blur");
  card.style.display = "none";
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=8443430f&t=${movieName}`
    );
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error("Could NOT find a movie named " + movieName);
    } else {
      return data;
    }
  } catch (err) {
    displayError("something went wrong");
  } finally {
    loader.style.display = "none";
    document.body.classList.remove("blur");
    card.style.display = "flex";
  }
}

function DisplayCard(movieData) {
  const { Poster, Title, Year, Genre, Runtime, imdbRating, Country } =
    movieData;
  card.textContent = "";
  const poster = document.createElement("img");
  const title = document.createElement("h1");
  const year = document.createElement("h3");
  const genre = document.createElement("p");
  const runtime = document.createElement("p");
  const Rating = document.createElement("p");
  const origin = document.createElement("p");

  poster.src = Poster;
  title.textContent = "Name: " + Title;
  year.textContent = "Year: " + Year;
  genre.textContent = "Genre: " + Genre;
  runtime.textContent = "Runtime: " + Runtime;
  Rating.textContent = "IMDB-Rating: " + imdbRating;
  origin.textContent = "Country: " + Country;

  poster.classList.add("poster");
  title.classList.add("Title");
  year.classList.add("year");
  genre.classList.add("genre");
  runtime.classList.add("runtime");
  Rating.classList.add("rating");
  origin.classList.add("origin");

  card.appendChild(poster);
  card.appendChild(title);
  card.appendChild(year);
  card.appendChild(genre);
  card.appendChild(runtime);
  card.appendChild(Rating);
  card.appendChild(origin);
  card.style.display = "flex";
}

function displayError(err) {
  const ErrorMessege = document.createElement("p");
  ErrorMessege.textContent = err;
  ErrorMessege.classList.add("ErrorDisp");
  card.textContent = "";
  card.appendChild(ErrorMessege);
  card.style.display = "flex";
}
