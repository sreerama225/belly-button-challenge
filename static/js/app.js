const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
    let dropDownList = d3.select("#selDataset");

    d3.json(url).then((data) => {
        let names = data.names;

        names.forEach((id) => {
            // console.log(id);
            dropDownList.append("option").text(id).property("value", id);
        });

        let initial_value = names[0];
        console.log(initial_value);
        buildBarChart(initial_value);
        buildDemoGraphicInfo(initial_value);
        buildBubbleChart(initial_value);
    });
}

function buildBarChart(value) {
    console.log(value);

    d3.json(url).then((data) => {
        let sampleInfo = data.samples;
        let sampleValue = sampleInfo.filter(result => result.id == value);
        let sampleValueData = sampleValue[0];

        let otu_ids = sampleValueData.otu_ids;
        let otu_labels = sampleValueData.otu_labels;
        let sample_values = sampleValueData.sample_values;

        console.log(otu_ids, otu_labels, sample_values);

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0, 10).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace])
    });
};

function buildDemoGraphicInfo(value) {
    console.log(value);

    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let filteredMetadata = metadata.filter(result => result.id == value);
        let filteredMetadataValue = filteredMetadata[0];
        console.log(filteredMetadataValue);

        d3.select("#sample-metadata").html("");

        Object.entries(filteredMetadataValue).forEach(([key, value]) => {
            console.log(key, value);
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

    });

};

function buildBubbleChart(value) {
    console.log(value);

    d3.json(url).then((data) => {
        let sampleInfo = data.samples;
        let sampleValue = sampleInfo.filter(result => result.id == value);
        let sampleValueData = sampleValue[0];

        let otu_ids = sampleValueData.otu_ids;
        let otu_labels = sampleValueData.otu_labels;
        let sample_values = sampleValueData.sample_values;

        let trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Set up the layout
        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace], layout);
    });
};

function optionChanged(changedValue) {

    // Log the new value
    console.log(changedValue);

    // Call all functions 
    buildDemoGraphicInfo(changedValue);
    buildBarChart(changedValue);
    buildBubbleChart(changedValue);
};

init();