
//must use axios to get the data
import axios from "axios";

//function to download authors.json
async function getAuthors() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json');
    return data //this will be the array of author objects
};

//function to download books.json
async function getBooks() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json')
    return data //this will be the array of book objects
};

//----------------------------------------------------------------

export const getBookById = async (id) => {

    //error checks
    if (!id) throw "Error: id parameter nonexistent";
    if (typeof id !== 'string') throw "Error: id input must be a string";
    if (id.trim() === '') throw "Error: id must not contain just empty spaces";

    //trim our string input
    id = id.trim();

    const books1 = await getBooks();


    //initialize variable to store the book we located
    let located;

    //use for loop to iterate over each book
    for (const locate of books1) {

        //check if current book id matches our parameter id
        if (locate.id === id) {

            //if yes, register it to our variable located
            located = locate;
        }
        
    }

    if (!located) throw "Error: book not found";

    return located;

};

//----------------------------------------------------------------

export const booksByPageCount = async (min, max) => {////////////////////////////////

    //error check
    if (!min) throw "Error: min input nonexistent";
    if (!max) throw "Error: max input nonexistent";
    if (typeof min !== 'number') throw "Error: min must be a number";
    if (typeof max !== 'number') throw "Error: max must be a number";
    if (max <= min) throw "Error: max must be greater than min";
    if (max === 0) throw "Error: max cannot be 0";
    if ((Number.isInteger(min)) === false || min < 0) throw "Error: min must be postivie whole number";
    if ((Number.isInteger(max)) === false || max < 0) throw "Error: max must be postivie whole number";
    
    
    
        const books = await getBooks();
        
        //filter via page count
        const filteredBooks = books.filter(book => {
            //convert page count to an integer value...
            const count = parseInt(book.pageCount);
            //...so we can correctly see if it is within range using our min and max parameters
            return count >= min && count <= max;
        });
        
        //get the IDs 
        return filteredBooks.map(book => book.id);
        
        
        };

//----------------------------------------------------------------

export const sameYear = async (year) => {

    //error checks
    if (!year) throw "Error: year input nonexistent";
    if (typeof year !== 'number') throw "Error: year input must be a number";
    if ((Number.isInteger(year)) === false) throw "Error: year input must be a postive whole number";
    if (year > 2024 || year < 1900) throw "Error: invalid year";

    //make sure year is an integer
    year = parseInt(year);

const books = await getBooks();

//this array will store our books based on our condition
const sameYearArray = [];

//iterate through the books
for (const getYear of books) {

    //get the publication year from the book's publication date
    const bookYear = new Date(getYear.publicationDate).getFullYear();

    //check that the publication year matches our parameter
    if (bookYear === year) {

        //if it matches, push that book into our array...
        sameYearArray.push(getYear);
    }
}

//... and return that array
return sameYearArray;

};

//----------------------------------------------------------------

export const minMaxPrice = async () => {

    const books = await getBooks();
    
    //variable for cheapest price
    let cheap;
    //variable for most expensive price
    let expensive;

    //array that will hold book IDs that are the cheapest
    let cheapBook = [];
    //array that will hold book IDs that are the most expensive
    let expensiveBook = [];
    

    //for of loop to iterate over each book
    for (const identity of books) {
        //get the price
        const price = identity.price;

        //below we cover < > and ties
    
        //if current price is lower that cheapest price
        if (price < cheap || cheap === undefined) {
            //update price
            cheap = price;
            //clear array so we end up with the single most cheapest book id, not an array full of book ids
            cheapBook.length = 0;
            //push the id into cheapBook array
            cheapBook.push(identity.id);
        }

        //if the current price is higher than the most exepnsive price
        else if (price > expensive || expensive === undefined) {
            //update price
            expensive = price;
            //clear array so we end up with the single most expensive book id, not an array full of book ids
            expensiveBook.length = 0;
            //push the id into expensiveBook array
            expensiveBook.push(identity.id);
        }

        //if there is a tie in cheapest book, add that book id to the array 
        else if (price === cheap) {
            cheapBook.push(identity.id);
        }

        //if there is a tie in most expensive book, add that book id to the array
        else if (price === expensive) {
            expensiveBook.push(identity.id);
        }
    }
    
    //return the object
    return { "cheapest": cheapBook, "mostExpensive": expensiveBook };
    
    
    
    };

//----------------------------------------------------------------

export const searchBooksByPublisher = async (publisher) => {

    //error checks
    if (!publisher) throw "Error: publisher input nonexistent";
    if (typeof publisher !== 'string') throw "Error: publisher input must be a string";

    const books = await getBooks();

    //use toUpperCase() to make comparison case insensitive, and use trim() to trim our input string as required for all string inputs
    const publisher1 = publisher.toUpperCase().trim();

    //use filter to filter the books via their publisher
    const bookViaPublisher = books.filter(findBook => 
        //identify publisher names from JSON file
        //becasue we converted our input string to uppercase to make comparison case insensitive and trimmed our input string, we must do the same...
        //...to our publisher we pulled from the JSON file to ensure a correct comparison
        findBook.publisher.toUpperCase().trim() === publisher1);

    //error check
    if (bookViaPublisher.length === 0) throw "Error: publisher cannot be found";

    //retrieve the IDs of the books that match our publisher using map
    return bookViaPublisher.map(findBook => findBook.id);
    
};

