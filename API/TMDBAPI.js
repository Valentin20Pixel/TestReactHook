const API_Token = "5d372fa42e0024775c25d6a7ef89dce2";

export function getFilmsFromApiWithSearchedText(text, page) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key='+API_Token+'&language=fr&query='+text+'&page='+page
  return fetch(url)
  .then((response) => response.json())
  .catch((error) => console.log(error))
}
export function getImageFromApi(name) {

  return 'https://image.tmdb.org/t/p/w500'+name

}
