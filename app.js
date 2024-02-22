
//import all functions from authors.mjs
import {
getAuthorById,
searchAuthorsByAge,
getBooksByState,
searchAuthorsByHometown,
getAuthorBooks
} from './authors.js';

//import all functions from books.mjs
import {
getBookById,
booksByPageCount,
sameYear,
minMaxPrice,
searchBooksByPublisher
} from './books.js';

/////////////////////////////////////////////////////////////////////

//authors.mjs:

try {
    const authorData = await getAuthorById('1871e6d7-551f-41cb-9a07-08240b86c95c');
    console.log(authorData);
    } catch (e) {
            console.log(e)
        }
    

//-------------------------------------------------------------------

// //searchAuthorsByAge()

     try {
const authors1 = await searchAuthorsByAge(40);
console.log(authors1);
     } catch (e) {
        console.log(e)
    }

// //------------------------------------------------------------

// //getBooksByState
try {
const books = await getBooksByState('NJ');
console.log(books);
} catch (e) {
    console.log(e);
}

// //------------------------------------------------------------

// //searchAuthorsByHometown (town, state)
try { 
const authors = await searchAuthorsByHometown('NeW YoRk CitY', 'Ny');
console.log(authors);
} catch (e) {
    console.log(e);
}

// //-----------------------------------------------------------

// // //getAuthorBooks
try {
const authorBooks1 = await getAuthorBooks("69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd");
console.log(authorBooks1);
} catch (e) {
    console.log(e);
}

// ///////////////////////////////////////////////////////////////////////

// //books.mjs:

// //getBookById
try {
const book1 = await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
console.log(book1);
} catch (e) {
    console.log(e);
}

// //-------------------------------------------

// //booksByPageCount(min, max)
try {
const bookIds1 = await booksByPageCount(300, 500);
console.log(bookIds1);
} catch (e) {
    console.log(e);
}

// //----------------------------------------------

// //sameYear
try {
const booksInSameYear = await sameYear(2000);
console.log(booksInSameYear);
} catch (e) {
    console.log(e);
}

// //------------------------------------------

// //minMaxPrice !!NO ERROR CHECKING NEEDED!!

const { cheapest, mostExpensive } = await minMaxPrice();
console.log({"cheapest": cheapest, "mostExpensive": mostExpensive});


// //--------------------------------------------

// // //searchBooksByPublisher
try {
const bookIds11 = await searchBooksByPublisher("Skilith");
console.log(bookIds11);
} catch (e) {
    console.log(e);
}







