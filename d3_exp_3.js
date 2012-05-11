var w = 1280,
	h = 800;
	nodes = [];

function onLoad(){

var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.1)
	.charge(-12)
    .links([])
    .size([w, h]);

var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);


force.on("tick", function() {
	svg.selectAll("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});

svg.on("click", function(){
	var point1 = d3.svg.mouse(this);
	var node = {x: point1[0],
		y: point1[1],
		px: point1[0] - 1,
		py: point1[1] - 1};
	nodes.push(node);
	console.log(nodes);
	var node = svg.selectAll("circle.node")
    		.data(nodes)
  			.enter()
  			.append("circle")
    		.attr("class", "node")
    		.attr("cx", function(d) { return d.x; })
    		.attr("cy", function(d) { return d.y; })
    		.attr("r", 4)
    		.attr("fill", "#f00b36");
   	force.start();

})
    
force.start();

}	

