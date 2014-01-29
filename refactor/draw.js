function draw(){
  var width = 1200,
    height = 600;

  var center = {
    x: width/2,
    y: height/2
  };

  // Should I automate this inside d3.json?

  var colors = {
    "comic": "#11b4c3",
    "art and design": "#fa660f",
    "fiction": "#f86984",
    "mystery": "#1ee638",
    "nonfiction": "#d00",
    "literary theory": "#8c23d5",
    "book on books": "#7a7594",
    "sports": "#261bd8",
    "grab bag": "#fbac1c"
  };

  var genreCenters = {
    "comic": {x: width/10 , y: height/3 },
    "art and design": {x: 2 * width/10, y: height/3 },
    "fiction": {x: 3 * width/10, y: height/3 },
    "mystery": {x: 4 * width/10, y: height/3 },
    "nonfiction": {x: 5 * width/10, y: height/3 },
    "literary theory": {x: 6 * width/10, y: height/3 },
    "book on books": {x: 7 * width/10, y: height/3 },
    "sports": {x: 8 * width/10, y: height/3 },
    "grab bag": {x: 9 * width/10, y: height/3 }
  };


  var svg = d3.select(".chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);



  d3.json("books.json", function(error, data){
    
    var force = d3.layout.force()
      .nodes(data)
      .gravity(.1)
      .charge(-12)
      .friction(.97)
      .alpha(.05)
      .links([])
      .size([width, height])
      .start();

    var nodes = svg.selectAll("circle.node")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", 4)
      .attr("fill", function(d){ return colors[d.genre]; });

    force.on("tick", function(){
      nodes.attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
    });






  });

}

$(document).ready(function(){
  draw();
})