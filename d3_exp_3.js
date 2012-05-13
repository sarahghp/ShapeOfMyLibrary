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
    this.width = 1280,
    this.height = 800;

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

    this.center = {
        x: this.width/2,
        y: this.height/2
    }

    var moveTowardsCenter = function(alpha, d){
        d.x = d.x + (this.center.x - d.x) * (this.damper + 0.02) * alpha;
        d.y = d.y + (this.center.y - d.y) * (this.damper + 0.02) * alpha;

    };

    this.genreCenters = {
        "comic": {x: this.width/11 , y: this.height/3 },
        "picture": {x: 2 * this.width/11 , y: this.height/3 },
        "design": {x: 3 * this.width, y: this.height/3 },
        "fiction": {x: 4 * this.width, y: this.height/3 },
        "mystery": {x: 5 * this.width , y: this.height/3 },
        "nonfiction": {x: 6 * this.width, y: this.height/3 },
        "literary theory": {x: 7 * this.width , y: this.height/3 },
        "books about books": {x: 8 * this.width, y: this.height/3 },
        "sports": {x: 9 * this.width, y: this.height/3 },
        "misc": {x: 10 * this.width, y: this.height/3 }
    }

    var moveTowardsGenre = function(alpha, d){
        var target = this.genreCenters[d.genre]
        d.x = d.x + (target.x - d.x) * (this.damper + 0.02) * alpha * 1.1;
        d.y = d.y + (target.y - d.y) * (this.damper + 0.02) * alpha * 1.1;
    } 


//Displays by genre


var displayByGenre = function(){
    force.on ("tick", function(e){
        svg.selectAll("circle")
            .each(this.moveTowardsGenre(e.alpha))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
        force.start();
    })
};


//Displays all
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

