  export const exerciseOptions = {
    method: 'GET',
    // url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': 'c02f65d377msh6a05af2474bbe07p1a145bjsn47c5843d9184',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  export const youtubeOptions = {
    method: "GET",
    // url: "https://youtube-search-and-download.p.rapidapi.com/video/related",
    headers: {
      'X-RapidAPI-Key': 'c02f65d377msh6a05af2474bbe07p1a145bjsn47c5843d9184',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

  export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data
  }

// const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://openai80.p.rapidapi.com/models',
//   headers: {
//     'X-RapidAPI-Key': 'c02f65d377msh6a05af2474bbe07p1a145bjsn47c5843d9184',
//     'X-RapidAPI-Host': 'openai80.p.rapidapi.com'
//   }
// };

// export const fetchData = async () => {
//     const res = await fetch(url, exerciseOptions);
//     const data = await res.json();
//     return data;
// }

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });