//Call spaceX API
const url = "https://api.spacexdata.com/v2/launchpads";
//Print the results to the console
d3.json(url).then(receivedData => console.log(receivedData));
//print the first element full name
d3.json(url).then(spaceXResults => console.log(spaceXResults[0].full_name));
//Retrieve&print data from file
//Extract metadata from the first person in the dataset
d3.json("samples.json").then(function(data){
    firstPerson = data.metadata[0];
    Object.entries(firstPerson).forEach(([key, value]) =>
      {console.log(key + ': ' + value);});
});
