// Wrap everything in IntroVis constructor

function IntroVis() {
    //Main object properties
        this.width = 1280;
        this.height = 600;
        var dataset = [];
        var nodes = [];
        var layout;
        var svg;
        var didLoadFile = false;
        var dataArray = [];
        var clickState = 0;
        var that = this;


        this.center = {
            x: this.width/2,
            y: this.height/2
        };

        this.genreCenters = {
            "comic": {x: this.width/11 , y: this.height/3 },
            "picture": {x: 2 * this.width/11 , y: this.height/3 },
            "design": {x: 3 * this.width/11, y: this.height/3 },
            "fiction": {x: 4 * this.width/11, y: this.height/3 },
            "mystery": {x: 5 * this.width/11, y: this.height/3 },
            "nonfiction": {x: 6 * this.width/11, y: this.height/3 },
            "literary theory": {x: 7 * this.width/11, y: this.height/3 },
            "book on books": {x: 8 * this.width/11, y: this.height/3 },
            "sports": {x: 9 * this.width/11, y: this.height/3 },
            "misc": {x: 10 * this.width/11, y: this.height/3 }
        };


        // this.logGenreCenters = function() {
           // for each (genre in this.genreCenters){
           //     console.log (genre);
           // }
        //}



    //Main run method
        this.run = function() {
            this.loadData();
            dataset = this.makeBook(dataArray);
            nodes = this.createNodes(dataset);
            layout = this.createLayout();
            svg = this.createSVG();
            layout.start();
        };

    


    // Load data

        this.loadData = function(){
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
                        return "picture";

                    case "design":
                        return "design";

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
                    case "a good one":
                        return "a solid and happy";

                    case "affection":
                        return "an affectionate";

                    case "burden":
                        return "an oppressed by the Western canon";

                    case "can do":
                        return "a can do";

                    case "cool":
                        return "a happy and pleased";

                    case "cozy":
                        return "a cozy";

                    case "cringe-stalgia":
                        return "a cringe-stalgic";    

                    case "formative":
                        return "wistful";

                    case "get rid of":
                        return "a minimalist";

                    case "get rid of?":
                        return "a minimalist";

                    case "guilt":
                        return "a guilty";

                    case "happiness":
                        return "a happy"

                    case "hm":
                        return "an ambivalent";

                    case "i made that":
                        return "a proud";

                    case "meh":
                        return "an ambivalent";

                    case "maybe i'd like it now":
                        return "a mature";

                    case "nostalgic":
                        return "a nostalgic";

                    case "read again":
                        return "an excited";

                    case "relevant":
                        return "a this might have some thing to say to me";

                    case "reminiscence":
                        return "a wistful";

                    case "should finish":
                        return "a longing";

                    case "should read":
                        return "a guilty";

                    case "was cool":
                        return "an affectionate";

                    case "sexy":
                        return "a sexy";

                    case "some day ...":
                        return " a some day";

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

    // Test this.makeBook()
        this.testBook = function(){
            var testData = [[], ["Green 1", "7.12", "224", "literay theory/instruction", "Can do"]];
            var madeBooks = this.makeBook(testData);
            for (var property in madeBooks[0]){
                console.log(madeBooks[0][property]);
            }
        };

    // Bind dataset to nodes
        this.createNodes = function(dataset){
            var nodes =[];
            var newNode;
            for (var i = 0; i < dataset.length; i++){
                newNode = {
                    id: i,
                    genre: dataset[i].genre,
                    subgenre: dataset[i].subgenre,
                    feeling: dataset[i].feeling,
                    x: Math.random() * 3400,
                    y: Math.random() * 3000,
                };
                nodes.push(newNode);
            } 
            return nodes;
        };


    // Move functions
       /* this.moveTowardsCenter = function(alpha, d){
            d.x = d.x + (this.center.x - d.x) * (this.damper + 0.02) * alpha;
            d.y = d.y + (this.center.y - d.y) * (this.damper + 0.02) * alpha;
        }; */

        this.moveTowardsGenre = function(alpha){
            var genreCenters = this.genreCenters;
            var damper = 1.1;
            return function(d){
                var target = genreCenters[d.genre];
                d.x = d.x + (target.x - d.x) * (damper + 0.02) * alpha * 1.1;
                d.y = d.y + (target.y - d.y) * (damper + 0.02) * alpha * 1.1;
            };
        };

        this.handleClick = function(){
            if (clickState === 0){
                clickState = 1;
                that.displayMessy();
            }
            

            else {
                clickState = 0;
                that.displayByGenre();
            }

        }

        
        
    // Create force layout
        this.createLayout = function() {
            return d3.layout.force()
            .nodes(nodes)
            .gravity(.1)
            .charge(-12)
            .friction(.97)
            .alpha(.05)
            .links([])
            .size([this.width, this.height]);
        };

    // Create SVG
        this.createSVG = function(){
            return d3.select("body")
                .append("svg")
                .attr("width", this.width)
                .attr("height", this.height);
        };

    // Create circles
        this.displayMessy = function () {
            layout.charge(-12)
                .gravity(.1);
            document.getElementById("genres").style.visibility="hidden";
            document.getElementById("instruction").innerHTML="<button>Sort books</button>";



            layout.on("tick", function() {
                svg.selectAll("circle")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
            });
            var nodeCircle = svg.selectAll("circle.node")
                .data(nodes)
                .enter()
                .append("circle")
                .attr("class", "node")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 4)
                .attr("fill", function(d){
                    switch(d.genre){
                        case "comic":
                            return "#11b4c3";

                        case "picture":
                            return "#fa660f";

                        case "design":
                            return "#0b7e2d";

                        case "fiction":
                            return "#f86984";

                        case "mystery":
                            return "#1ee638";

                        case "nonfiction":
                            return "#d00";

                        case "literary theory":
                            return "#8c23d5";

                        case "book on books":
                            return "#7a7594";

                        case "sports":
                            return "#261bd8";

                        default:
                            return "#fbac1c";   
                    }
                });

            layout.start();
           
            nodeCircle.on("mouseover", that.mouseOver);
            nodeCircle.on("mouseout", that.mouseOut);
        };


    // Display by genre
        this.displayByGenre = function(){
            var that = this;
            layout.on ("tick", function(e){
                svg.selectAll("circle")
                    .each(that.moveTowardsGenre(e.alpha))
                    .attr("cx", function(d) { return d.x; })
                    .attr("cy", function(d) { return d.y; });
                
            })
            layout.charge(-72)
                .gravity(.01);
            layout.start();
            
            document.getElementById("genres").style.visibility="visible";
            document.getElementById("instruction").innerHTML="<button>Mix them up again!</button>";

        };

    // Labels functions

        this.mouseOver = function() {
            var node = d3.select(this);
            var nodeX = parseInt(node.attr("cx"));
            var nodeY = parseInt(node.attr("cy"));
            var labelGroup =  svg.append("g")
                .attr("class", "label");
            var text = labelGroup.append("text")
                .attr("x", nodeX + 12)
                .attr("y", nodeY)
                .attr("class", "labelText")
                .text(function(){
                    if (node.datum().genre === "nonfiction"){
                        return "This " + node.datum().subgenre + " book gives me " + node.datum().feeling + " kind of feeling.";
                    }

                    else if (node.datum().genre === "misc") {
                        return "This grab-bag " + node.datum().subgenre + " book gives me " + node.datum().feeling + " kind of feeling."
                    }
                    else { 
                        return "This " + node.datum().subgenre + " " + node.datum().genre + " book gives me " + node.datum().feeling + " kind of feeling.";
                    }
                });
            
            var boundingBox = text.node().getBBox();
            
            text.attr("x", function(){
                if (nodeX > that.width/2){
                    return (nodeX - 12) - boundingBox.width;
                }

                else {return nodeX + 12}; 
            });
            boundingBox = text.node().getBBox();

            labelGroup.insert("rect", "text")
                .attr("x", boundingBox.x - 6)
                .attr("y", boundingBox.y - 4)
                .attr("width", boundingBox.width + 12)
                .attr("height", boundingBox.height + 8)
                .attr("class", "labelStyle");


        }

         this.mouseOut= function(node) {
            svg.selectAll("g.label").remove();
        }


}

//Create new vis object on load, call run method

var introVis;
function onLoad() {
    introVis = new IntroVis();
    introVis.run();
}

function instructionButtonClicked(){
    introVis.handleClick();
}