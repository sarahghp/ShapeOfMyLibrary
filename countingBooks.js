function onLoad(){

    var dataArray = [];

    loadData = function(){
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

    loadData();


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

    makeBook = function(dataArray){
        var madeBooks = [];
        // Start at 1 to avoid header row
        for (var i = 1 ; i < dataArray.length; i++){
            var newBook;
            newBook = new Book (dataArray[i][0], dataArray[i][1], dataArray[i][2], dataArray[i][3], dataArray[i][4], dataArray[i][5]);
            madeBooks.push(newBook);
        }
        return madeBooks;
    };

    var books = makeBook(dataArray);

    var genreToFeelings = {};

    for (var bookIndex in books){

        var book = books[bookIndex];

        var feelingsToColor = genreToFeelings[book.genre];

        if (feelingsToColor === undefined){
            feelingsToColor = {};
            genreToFeelings[book.genre] = feelingsToColor;
        }

        var colorToCount = feelingsToColor[book.feeling];

        if (colorToCount === undefined){
            var colorToCount = {};
            feelingsToColor[book.feeling] = colorToCount;
        }

        var count = colorToCount[book.color];

        if (count === undefined){
            count = 1;
        }

        else {
            count = count + 1;
        }

        colorToCount[book.color] = count;

    }

    console.log(genreToFeelings);

}


















