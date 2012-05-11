var didLoadFile = false;
var dataArray = [];

function loadData()
{
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

function Book(color, height, pages, genre, feeling, author){
	this.color = color;
	this.height = height;
	this.pages = pages;
	this.genre = genre;
	this.feeling = feeling;
	this.author = author;
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

function onLoad() {
	loadData();
	var madeBooks = makeBook();
	for (var property in madeBooks[0]){
		console.log(property);
	}
}