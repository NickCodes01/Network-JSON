
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

//function for valid state abbreviations
const validState = (abb) => {
    const valid_abb = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 
                        'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 
                        'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];
    const nowValid = abb.toUpperCase();
    for (let i =0; i < valid_abb.length; i++) {
        if (valid_abb[i] === nowValid) {
            return true;
        }
    }
    return false;
}

//---------------------------------------------------------------

export const getAuthorById = async (id) => {


    const authors = await getAuthors();

    //error check
    if (!id) throw "Error: id is nonexistent";
    if (typeof id !== 'string') throw "Error: input does not exist or not a string";
    if (id.trim() === '')  throw "Error: just empty spaces"; 
    

    //use .find which is a built-in array method to search the array
    const getTheAuthor = authors.find(function(a) { 
        //check if the value from our object equals our parameter
        return a.id === id;
    
    });

    //error check if author not found (needs to be after .find)
    if (!getTheAuthor) throw "Error: Author not found";

    //return our match
    return getTheAuthor;

};

//----------------------------------------------------------------

export const searchAuthorsByAge = async (age) => {

    //error checks
    if (!age) throw "Error: age parameter does not exist or is out of range";
    if (typeof age !== 'number') throw "Error: age must be a number";
    if (age < 1 || age > 100) throw "Error: age is out of bounds, no result exists";


const authors = await getAuthors();

//this is our current year, and we will use this to calculate the age of our authors
const currentYear = 2024;

//this array will hold authors who match our requirements
const completeAuthors = [];

//iterate over each author
for (let i = 0; i < authors.length; i++) {
    
    //retrieve the current author
    const a = authors[i];

    //extract the year of birth YOB from the author's date_of_birth from authros.json
    const YOB = new Date(a.date_of_birth).getFullYear();

    //calculate how old the author is (ie. 2024 - year of birth YOB)
    const howOld = currentYear  - YOB;

    //if the author's age is >= our age parameter...
    if (howOld >= age) {

        //...push that author into our completeAuthors array
        completeAuthors.push(a);
    }
}

//extract full names of all authors who match our requirements and concatenate
//if we don't do this part, we get everything. We only want first and last name!
const nameOfAuthor = completeAuthors.map(a => `${a.first_name} ${a.last_name}`);

//return
return nameOfAuthor;

};

//----------------------------------------------------------------

//in order to do the function getBooksByState, we need to first complete a function that retreives authors by state
export const getAuthorsByState = async (state) => {


    //error checks
    if (!state) throw "Error: input nonexistent";
    if (typeof state !== 'string') throw "Error: input not a string";
    if (state.trim().length < 2 || state.trim().length > 2) throw "Error: input must be 2 characters long";
    if (!validState(state)) throw "Error: Invalid state abbreviation";
    
    
    const authors = await getAuthors();
    
    
    //convert to uppercase to match and then compare if hometown state matches the parameter
    //HometownState is from the JSON file and state is our parameter
    return authors.filter(author => author.HometownState.toUpperCase().trim() === state.toUpperCase().trim());
    };
    
    
    export const getBooksByState = async (state) => {
    
    
    //error checks
    if (!state) throw "Error: input nonexistent";
    if (typeof state !== 'string') throw "Error: input not a string";
    if (state.trim().length < 2 || state.trim().length > 2) throw "Error: input must be 2 characters long";
    if (!validState(state)) throw "Error: Invalid state abbreviation";
    
    
    const authors = await getAuthorsByState(state);
    const books = await getBooks();
    
    
    //this array will hold the names of our books
    const namesOfBooks = [];
    
    
    //loop over each author from our authors array
    authors.forEach(author => {
        //loop over each book ID from author's books array
        author.books.forEach(ID => {
            //find book object in our book array via the book ID
            const b = books.find(b => b.id === ID);
            //if found, we push the book title into our array...
            if (b) {
                namesOfBooks.push(b.title);
            }
        });
    });
     
    //...then we return that array
    return namesOfBooks;
    
    
    };
    

//----------------------------------------------------------------

export const searchAuthorsByHometown = async (town, state) => {


    const authors = await getAuthors();
    
    
    //error checks
    if (!town) throw "Error: town parameter nonexistent";
    if (!state) throw "Error: state parameter nonexistent";
    if (typeof town !== 'string') throw "Error: town paramenter must be string";
    if (typeof state !== 'string') throw "Error: state paramenter must be string";
    if (state.trim().length < 2 || state.trim().length > 2) throw "Error: input must be 2 characters long";
    //need one for valid state abbreviation!!!!!!!!!!!!!!!!!
    if (!validState(state)) throw "Error: State abbreviation not valid";
    
    
    
    
    //use .filter to filter the authors based on town and state and toUpperCase just sets everything equally to compare
    //HometownCity and HometownState are from the JSON file and town and state are our parameters
    //all the inputs must be strings, so we need to trim
    const completeAuthors = authors.filter(a => (
        a.HometownCity.toUpperCase().trim() === town.toUpperCase().trim()
        &&
        a.HometownState.toUpperCase().trim() === state.toUpperCase().trim()
    ));
    
    
    completeAuthors.sort((x, y) => {
        //to sort, first convert to uppercase to set everything equally
        const lastNameX = x.last_name.toUpperCase();
        const lastNameY = y.last_name.toUpperCase();
    
    
        //now we sort based on last name, A -> Z
        if (lastNameX < lastNameY) {
            return -1;
         }
    });
    
    
    //extract author names from completeAuthors and concatenate
    const namesOfAuthors = completeAuthors.map(a => `${a.first_name} ${a.last_name}`);
    
    
    //then return our author names
    return namesOfAuthors;
    
    
    };    

//----------------------------------------------------------------

export const getAuthorBooks = async (authorid) => {

const authors = await getAuthors();
const books = await getBooks();

//error check
if (!authorid) throw "Error: authorid is nonexistent";
if (typeof authorid !== 'string') throw "Error: must be a string as input";

const authoridTrim = authorid.trim();

//find the author via id using .find
const a = authors.find(a => a.id === authoridTrim);

//error check
if (!a) throw "Error: authorid invalid";

//this array holds our titles
const titleArray = [];

//iterate over the IDs
a.books.forEach(identifier => {
    //find our book via its ID
    const b = books.find(b => b.id === identifier);
    //if we find our book, push it into our titleArray
    if (b) {
        titleArray.push(b.title);
    }
});

//return our array
return titleArray;

};
