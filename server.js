var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("");

var PORT = 3000;

// Initialize Express
var app = express();

// First, tell the console what server.js is doing
console.log("\n***********************************\n" +
    "Grabbing every thread name and link\n" +
    "from buzzfeed's webdev board:" +
    "\n***********************************\n");

// Making a request via axios for reddit's "webdev" board. The page's HTML is passed as the callback's third argument
axios.get("https://www.buzzfeed.com/").then(function (response) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    var results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $("h2").each(function (i, element) {

        // Save the text of the element in a "title" variable
        var title = $(element).text();

        // In the currently selected element, look at its child elements (i.e., its a-tags),
        // then save the values for any "href" attributes that the child elements may have
        var link = $(element).children().attr("href");


      


        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: link,
            
        });
    });


    // ? This will grab the <p> tag in the console . 
        //TODO Correct routing to the brief summary
 
        $("").each(function (i, element) {

            // Save the text of the element in a "title" variable
            var title = $(element).text("");
    
            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            var link = $(element).children().attr("href");
    
    
          
    
    
            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                link: link,
                
            });
        });
    
    

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
});