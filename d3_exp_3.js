function runProgram(){

    /* this.test = function(){
        loadData();
        var madeBooks = makeBook();
        for (var property in madeBooks[0]){
            console.log(property);
        }
    } */


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

    function Book(color, height, pages, unsplitGenre, feeling, author){
        this.color = color;
        this.height = height;
        this.pages = pages;
        this.feeling = feeling;
        this.author = author;

    
       
        var splitArray = unsplitGenre.split("/");

        this.genre = splitArray[0];
        this.subgenre = splitArray[1];
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

         //Test makeBook();

        
         //   var madeBooks = makeBook();
         //   for (var property in madeBooks[0]){
         //       console.log(madeBooks[0][property]);
         //   }
        



//Code for force layout & SVG
    var width = 1280,
    height = 800;

    var dataset = makeBook();

    function createNodes(dataset){
        var nodes =[];
        var newNode;
        for (var book in dataset){
            newNode = {
                id: dataset.index,
                genre: this.genre,
                x: Math.random() * 3400,
                y: Math.random() * 3000,
                cx: this.x,
                cy: this.y,
            };
            nodes.push(newNode);
        } 
        return nodes;
    }

    var nodes = createNodes(dataset);


    var force = d3.layout.force()
        .nodes(nodes)
        .gravity(.09)
        .charge(-12)
        .friction(.97)
        .alpha(.05)
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
    var nodeCircle = svg.selectAll("circle.node")
    		.data(nodes)
    			.enter()
    			.append("circle")
    		.attr("class", "node")
    		.attr("cx", function(d) { return d.x; })
    		.attr("cy", function(d) { return d.y; })
    		.attr("r", 6)
    		.attr("fill", "#f00b36");
    	force.start();
        svg.on("click", null);

    })


    force.start();

}

function onLoad() {
    runProgram();
}	

