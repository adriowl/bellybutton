function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    //console.log(result)
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    otu_ids = result.otu_ids.slice(0,10).reverse();
    otu_labels = result.otu_labels.slice(0,10).reverse();
    sample_values = result.sample_values.slice(0,10).reverse();
    //console.log(otu_ids, otu_labels, sample_values)
    // 3. Create a variable that holds the washing frequency.
    var metadata = data.metadata;
    var resultMetadata = metadata.filter(sampleObj => sampleObj.id == sample);
    wfreq = parseFloat(resultMetadata[0].wfreq)
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var topTen_otu_ids = otu_ids.slice(0,10).reverse()
    //console.log(topTen_otu_ids)
    //Create arrays for city names x and pop growths y
    //var topFiveCityNames = cityGrowths.map(city => city.City);

    
    //console.log(topTen_otu_ids)
    // 8. Create the trace for the bar chart. 
    var trace = {
      x: sample_values,
      y: otu_ids,
      hover: otu_labels,
      type: "bar",
      orientation: "h"
    }
    var data = [trace];
    // 9. Create the layout for the bar chart. 
    var layout = {
     title: "Belly Button Bacteria",
     yaxis: {type: 'category',
            showticklabels: true,
            ticktext: topTen_otu_ids,
            showtickprefix: 'all',
            tickprefix: 'OTU '}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", data, layout);
    //Deliverable 2 Bubble Chart
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      type: "bubble",
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {color: "rgb(255,182,193)",
                line: {
                  color: 'rgb(201,214,255)',
                  width: 2
                },
                size:40
              }

    }];
    
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Belly Button Bacteria",
      xaxis: {title: {text: "Bacteria ID"}},
      yaxis: {title: {text: "Count"}},
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
      },
      hovermode:'closest'
    };
    
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout); 

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: wfreq,
		  title: { text: "Belly Button Washing Frequency" },
		  type: "indicator",
		  mode: "gauge+number",
      gauge: {
        axis: { range: [null,10]},
        steps: [{range: [0,2], color: "red"},
          {range: [2,4], color: "orange"},
          {range: [4,6], color:"yellow"},
          {range: [6,8], color: "lightgreen"},
          {range: [8,10], color: "green"}],
        bar: { color: "black" },
    }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}

