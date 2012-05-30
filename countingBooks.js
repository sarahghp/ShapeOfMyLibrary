function onLoad(){

    var dataArray = [];

    loadData = function(){
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


















