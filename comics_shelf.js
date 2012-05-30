function BarChart(){
	this.width = 1000;
	this.height = 300;
	
	var barPadding = 1;
	var padding = 30;
	

	var dataset = [];
	var nodes = [];
	var svg;

	var didLoadFile = false;
	var dataArray = [];
	var that = this;

	//Main run method
	    this.run = function() {
	        this.loadData();
	        dataset = this.makeBook(dataArray);
	        nodes = this.createNodes(dataset);
	        svg = this.createSVG();
    };

    // Load data

        this.loadData = function(){
            try {
                var request = new XMLHttpRequest();
                request.open("GET", "BookProject_all_munged.csv", false);
                request.send();
                didLoadFile = (request.responseText != "")
                if (didLoadFile) {
                    dataArray = CSVToArray(request.responseText);
                }
            }
            catch (e) {
                console.log(e)
            }
            finally {
                delete request;
            }
        };

    // Book constructor
        function Book(color, height, pages, unsplitGenre, feeling, author){
            // console.log(color);
            this.color = color;
            this.height = height;
            this.pages = pages;
            this.author = author;

            var splitArray = unsplitGenre.split("/");
            var cleanGenre = function(dirtyGenre){
                var lowerDirty = dirtyGenre.toLowerCase();
                switch (lowerDirty){
                    case "comic":
                        return "comic";

                    case "picture":
                        return "art and design";

                    case "design":
                        return "art and design";

                    case "fiction":
                        return "fiction";

                    case "mystery":
                        return "mystery";

                    case "nonfiction":
                        return "nonfiction";

                    case "literary theory":
                        return "literary theory";

                    case "books about books":
                        return "book on books";

                    case "sports":
                        return "sports";

                    default:
                        return "misc";
                }
            }

            var cleanSub = function(dirtySub){
                if (dirtySub === undefined){
                    return "";
                }

                else {
                    return dirtySub.toLowerCase();
                }
            }

            var formatFeeling = function(feeling){
                var lowerFeeling = feeling.toLowerCase();

                // This incredible long switch starement gave me a good excuse to dig into the data and relive the experience of creation, adding one more layer of memory, like a varnish
                switch(lowerFeeling){

                    case "affectionate":
                        return "an affectionate";

                    case "ambivalent":
                        return "an ambivalent";

                    case "burden":
                        return "an oppressed by the Western canon";

                    case "cozy":
                        return "a cozy";

                    case "cringestalgia":
                        return "a cringe-stalgic";   

                    case "cringe-stalgia":
                        return "a cringe-stalgic";    

                    case "curious":
                        return "a curious";

                    case "empowered":
                        return "an empowered";

                    case "excited":
                        return "an excited";

                    case "guilty":
                        return "a guilty";

                    case "introspective":
                        return "an introspective";

                    case "minimalist":
                        return "a minimalist";

                    case "nostalgic":
                        return "a nostalgic";

                    case "proud":
                        return "a proud";

                    case "wistful":
                        return "a wistful";

                    case "unread and not sorry":
                        return "an unrepentant";

                    default:
                        return "a " + lowerFeeling;
                } 
            }

            this.genre = cleanGenre(splitArray[0]);
            this.subgenre = cleanSub(splitArray[1]);
            this.feeling = formatFeeling(feeling);
        } 

    // Create array of books
        this.makeBook = function(dataArray){
            var madeBooks = [];
            // Start at 1 to avoid header row
            for (var i = 1 ; i < dataArray.length; i++){
                var newBook;
                newBook = new Book (dataArray[i][0], dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4], dataArray[i][5]);
                madeBooks.push(newBook);
            }
            return madeBooks;
        };


    // Layout variables
		var yScale = d3.scale.linear()
	                .domain([0, 12])
	                .range([padding, this.height - padding]);

	    var yAxis = d3.svg.axis()
	                  .scale(yScale)
	                  .orient("left")
	                  .ticks(5);
    // Bind dataset to nodes
        this.createNodes = function(dataset){
            var nodes =[];
            var newNode;
            for (var i = 0; i < dataset.length; i++){
            	if (dataset[i].genre === "comic"){
	                newNode = {
	                    id: i,
	                    nodeHeight: dataset[i].height,
	                };
	                nodes.push(newNode);
	            }
            } 
            return nodes;
        };

        this.createSVG = function() {
        	return d3.select("body")
		            .append("svg")
		            .attr("width", this.width)
		            .attr("height", this.height)
		            

		           .selectAll("rect")
				   .data(nodes)
				   .enter()
				   .append("rect")
				   .attr("x", function(d, i) {
				    	return (i * (that.width/nodes.length - barPadding)) + padding + 10; 
					})
			   	   .attr("y", function(d) {
			       		return that.height - (padding + yScale(d.nodeHeight));  
			   		})
				   .attr("width", 7)
	   			   .attr("height", function(d) {
    					return yScale(d.nodeHeight);
					})
	   			   .attr("fill", "#11b4c3")
		};

	this.createAxis = function() {
				return d3.select("svg")

	   			  .append("g")
			      .attr("class", "axis")
			      .attr("transform", "translate(" + padding + ",0)")
			      .call(yAxis);
	};

}

//Create new vis object on load, call run method

var barChart;
function onLoad() {
    barChart = new BarChart();
    barChart.run();
    barChart.createAxis();

}