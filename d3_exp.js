 var dataset = [266, 380, 280, 120, 170, 330, 252, 202, 246, 252, 162, 
 				152, 298, 234, 252, 268, 384, 384, 360, 406, 192, 192, 
 				128, 148, 144, 128, 144, 154, 190, 164, 442, 358, 408, 
 				174, 192, 154, 198, 170, 170, 264, 184, 188, 218, 248, 
 				218, 248, 192, 270, 280, 216, 176, 204, 244, 310, 298, 
 				280, 184, 190, 278, 288, 224, 296, 384, 248, 194, 356, 
 				108, 326, 324, 338, 326, 182, 217, 276, 246, 238, 254, 
 				216, 184, 172, 184, 164, 188, 166, 168, 186, 172];

function onLoad(){
	//Width and height
	var width = 1000;
	var height = 500;
	var barPadding = 1;
	var padding = 30;

	var svg = d3.select("body")
	            .append("svg")
	            .attr("width", width)
	            .attr("height", height);

	var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset)])
                .range([height - padding, padding]);

    var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient("left")
                  .ticks(10);


	svg.selectAll("rect")
	   .data(dataset)
	   .enter()
	   .append("rect")
	   .attr("x", function(d, i) {
	    	return (i * (width/dataset.length - barPadding)) + padding + 10; 
		})

	   .attr("y", function(d) {
    		return yScale(d);   //Height minus data value
		})

	   .attr("width", 5)
	   .attr("height", function(d) {
    		return (height - padding) - yScale(d);
		})

	   .attr("fill", function(d) {
	   		if (d === d3.max(dataset) || d === d3.min(dataset) ){
	   			return "#ff0000";
	   		}

	   		else if (d > 300){
	   			return "#febf97";
	   		}

	   		else if (d <= 300 && d > 200){
	   			return "#6bf09a";
	   		}

	   		else if (d <= 200 && d > 100){
	   			return "#8487f6";
	   		}

	   		else {
	   			return "#afafbe";
	   		}
	   });

	svg.append("g")
    	.attr("class", "axis")
    	.attr("transform", "translate(" + padding + ",0)")
    	.call(yAxis);
}


