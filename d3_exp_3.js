function runProgram(){

// Code for creating collection
    var didLoadFile = false;
    var dataArray = [];

    function loadData(){
        try {
            var request = new XMLHttpRequest();
            request.open("GET", "BookProject_all.csv", false);
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
    }

    loadData();

    function Book(color, height, pages, genre, feeling, author){
        this.color = color;
        this.height = height;
        this.pages = pages;
        this.genre = genre;
        this.feeling = feeling;
        this.author = author;

        /*this.subgenre = "";
        this.splitGenres = function(entry) */
    } 

    function makeBook(){
        var madeBooks = [];
        // Start at 1 to avoid header row
        for (var i = 1 ; i < dataArray.length; i++){
            var newBook;
            newBook = new Book (dataArray[i][0], dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4], dataArray[i][5]);
            madeBooks.push(newBook);
        }
        return madeBooks;
    }

    function Collection(madeBooks){
        this.collection = madeBooks;

    }

        /* function onLoad() {
        loadData();
        var madeBooks = makeBook();
        for (var property in madeBooks[0]){
            console.log(property);
        }
        } */



//Code for force layout & SVG
    var width = 1280,
    height = 800;
    nodes = [];

    var dataset = makeBook();

    function createNodes(dataset){
        var newNode;
        for each (var book in dataset){
            newNode = {
                id: dataset.index,
                genre: this.genre,
                x: 625,
                y: 450,
            };
            nodes.push(newNode);
        } 
    }

    createNodes();


    var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.1)
    .charge(-32)
    .links([])
    .size([width, height]);

    var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);


//Persists nodes
    force.on("tick", function() {
    svg.selectAll("circle")
    	.attr("cx", function(d) { return d.x; })
    	.attr("cy", function(d) { return d.y; });
    });

    svg.on("click", function(){
    var point1 = d3.svg.mouse(this);
    var node = {
        x: 625,
        y: 450,
    	};
    nodes.push(node);
    console.log(nodes)

    var nodeCircle = svg.selectAll("circle.node")
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

function onLoad() {
    runProgram();
}	

