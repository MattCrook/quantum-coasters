

const GetData = async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=oVbjj1iEMr2fXGT6jgNQugBlL69tPWDaRsZaDbPl`
  )
    .then(response => response.json())
    .then(data => console.log(data));
  return response;
};
export default GetData
