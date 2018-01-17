var svg2 = dimple.newSvg("#chartContainer", 600, 500);
    d3.csv("data/python-algorithms-accuracy.csv", function (data) {
      var myChart = new dimple.chart(svg2, data);
      myChart.setBounds(60, 30, 510, 305);
      var x = myChart.addCategoryAxis("x", "algorithm");
      var y = myChart.addMeasureAxis("y", " accuracy");
      y.tickFormat = ',.3f';
      myChart.addSeries(null, dimple.plot.bar);
      myChart.draw();
      
      // svg2.append("text")
   // .attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
   // .attr("y", myChart._yPixels() -10)
   // .style("text-anchor", "middle")
   // .style("font-family", "sans-serif")
   // .style("font-size", "20px")
   // .style("font-weight", "bold")
   // .text("Comparison accuracy algorithms")
            
    });

d3.csv('data/evaluation_set.csv', function loadCallback(error, data) {
                data.forEach(function(d) { // convert strings to numbers
                    d.temp = +d.temp;
                    d.soc = +d.soc;
                });
                console.log(data);
               // makeEv(data, "#ev-container");
            });
d3.csv('data/train_set.csv', function loadCallback(error, data) {
    data.forEach(function(d) { // convert strings to numbers
        d.temp = +d.temp;
        d.soc = +d.soc;
    });
    console.log(data);
   // makeEv(data, "#tr-container");
});


          var makeEv = function(data, container) {
              // Common pattern for defining vis size and margins
              var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                  width  = 960 - margin.left - margin.right-500,
                  height = 500 - margin.top - margin.bottom -100;

              // Add the visualization svg canvas to the ev-container <div>
              var canvas = d3.select(container).append("svg")
                  .attr("width",  width  + margin.left + margin.right)
                  .attr("height", height + margin.top  + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              // Define our scales
              var colorScale = d3.scale.category10();

              var xScale = d3.scale.linear()
                  .domain([ d3.min(data, function(d) { return d.soc; }) - 1,
                            d3.max(data, function(d) { return d.soc; }) + 1 ])
                  .range([0, width]);

              var yScale = d3.scale.linear()
                  .domain([ d3.min(data, function(d) { return d.temp; }) - 1,
                            d3.max(data, function(d) { return d.temp; }) + 1 ])
                  .range([height, 0]); // flip order because y-axis origin is upper LEFT

              // Define our axes
              var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');

              var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient('left');

              // Add x-axis to the canvas
              canvas.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")") // move axis to the bottom of the canvas
                  .call(xAxis)
                .append("text")
                  .attr("class", "label")
                  .attr("x", width) // x-offset from the xAxis, move label all the way to the right
                  .attr("y", -6)    // y-offset from the xAxis, moves text UPWARD!
                  .style("text-anchor", "end") // right-justify text
                  .text("State of charge");

              // Add y-axis to the canvas
              canvas.append("g")
                  .attr("class", "y axis") // .orient('left') took care of axis positioning for us
                  .call(yAxis)
                .append("text")
                  .attr("class", "label")
                  .attr("transform", "rotate(-90)") // although axis is rotated, text is not
                  .attr("y", 15) // y-offset from yAxis, moves text to the RIGHT because it's rotated, and positive y is DOWN
                  .style("text-anchor", "end")
                  .text("Temperature");

              // Add the tooltip container to the vis container
              // it's invisible and its position/contents are defined during mouseover
              // var tooltip = d3.select(container).append("div")
                  // .attr("class", "tooltip")
                  // .style("opacity", 0);

              // var tipMouseover = function(d) {
                  // var color = colorScale(d.start);
                  // var html  = d.id + "<br/>" +
                              // "<span style='color:" + color + ";'>Start: " + d.start + "</span><br/>" +
                              // "<b>" + d.soc + "</b> SoC, <b/>" + d.temp + "</b> C";

                  // tooltip.html(html)
                      // .style("left", (d3.event.clientX-800) + "px")
                      // .style("top", (d3.event.clientY-200) + "px")
                    // .transition()
                      // .duration(200) // ms
                      // .style("opacity", .9) // started as 0!

              // };
              // // tooltip mouseout event handler
              // var tipMouseout = function(d) {
                  // tooltip.transition()
                      // .duration(300) // ms
                      // .style("opacity", 0); // don't care about position!
              // };

              // Add data points!
              canvas.selectAll(".dot")
                .data(data)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5.5) // radius size, could map to another data dimension
                .attr("cx", function(d) { return xScale( d.soc ); })     // x position
                .attr("cy", function(d) { return yScale( d.temp ); })  // y position
                .style("fill", function(d) { return colorScale(d.start); })
                // .on("mouseover", tipMouseover)
                // .on("mouseout", tipMouseout);
          };
          
          var svg = dimple.newSvg("#scatterContainer", 590, 400);
      d3.csv("data/dataset.csv", function (data) {console.log(data);
        var myChart = new dimple.chart(svg, data);
        myChart.setBounds(60, 30, 500, 330)
        myChart.addMeasureAxis("x", "soc");
        myChart.addMeasureAxis("y", "temp");
        myChart.addSeries(["id","start"], dimple.plot.bubble);
        myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });
      

      var svg7 = dimple.newSvg("#piechart", 590, 400);
      piedata=[{Dataset:'Test dataset', Amount: 250},{Dataset:'Training dataset', Amount: 750}]

      var myChart = new dimple.chart(svg7, piedata);
      myChart.setBounds(10, 10, 230, 180)
      myChart.addMeasureAxis("p", "Amount");
      myChart.addSeries("Dataset", dimple.plot.pie);
      myChart.addLegend(250, 10, 45, 150, "left");
      myChart.draw();

      
      
                var svg10 = dimple.newSvg("#tr-container2", 590, 400);
      d3.csv("data/train_set.csv", function (data) {console.log(data);
        var myChart = new dimple.chart(svg10, data);
        myChart.setBounds(60, 30, 500, 330)
        myChart.addMeasureAxis("x", "soc");
        myChart.addMeasureAxis("y", "temp");
        myChart.addSeries(["id","start"], dimple.plot.bubble);
        myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });
      
      
                var svg9 = dimple.newSvg("#ev-container2", 590, 400);
      d3.csv("data/evaluation_set.csv", function (data) {console.log(data);
        var myChart = new dimple.chart(svg9, data);
        myChart.setBounds(60, 30, 500, 330)
        myChart.addMeasureAxis("x", "soc");
        myChart.addMeasureAxis("y", "temp");
        myChart.addSeries(["id","start"], dimple.plot.bubble);
        myChart.addLegend(200, 10, 360, 20, "right");
        myChart.draw();
      });