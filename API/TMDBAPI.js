const API_Token = "5d372fa42e0024775c25d6a7ef89dce2";

export function getFilmsFromApiWithSearchedText(text) {
  const url = 'https://api.themoviedb.org/3/movie?api_key='+API_Token+'&language=fr&query='+text
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}