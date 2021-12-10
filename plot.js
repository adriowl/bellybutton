console.log(cityGrowths);

//Sort cities by growth
//use sort to compare each individual growth amount to each other, then reverse the array to sort descending 
var sortedCities = cityGrowths.sort((a,b) => a.Increase_from_2016 - b.Increase_from_2016).reverse();

//Slice to create top 5
var topFiveCities = sortedCities.slice(0,5);

//Create arrays for city names x and pop growths y
var topFiveCityNames = cityGrowths.map(city => city.City);
var topFiveCityGrowths = cityGrowths.map(city=>parseInt(city.Increase_from_2016));

//Create trace for plotly plot
var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
  var data = [trace];
  //Set layout
  var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);