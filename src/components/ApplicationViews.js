

const GetData = async () => {
  const response = await fetch(
    `https://api.nasa.gov/techtransfer?api_key=oVbjj1iEMr2fXGT6jgNQugBlL69tPWDaRsZaDbPl`
  )
    .then(response => response.json())
    .then(data => console.log(data));
  return response;
};
export default GetData
