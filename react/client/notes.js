// in react we have to use link from react-router-dom instead of traditional anchor tags from html, this is done 
// to get all the features of single page application , so using link makes our application single page and it 
// doesn't refresh each time a link is clicked while when using anchor tags we don't get the single page application feature tags
// and each time we click a link there is a page refresh, so use Link tag from react

// to use link tags instead of anchor tags first we have to import it from react router dom and then we have to use it something like this
import Link from 'react-router-dom';
// using the link tag
<Link to="any link">Using react link tags</Link>

// Error: Element type is invalid: expected a string (for built-in components) or a class/function 
// (for composite components) but got: undefined. You likely forgot to export your component from the file 
// it's defined in, or you might have mixed up default and named imports.

// if one gets this error then it means that we are going to a page or route which has not exported 
// anything then just add this snippet below with some changes like function_name should be replaced with 
// name of the route


