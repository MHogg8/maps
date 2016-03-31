var url = "https://restcountries.eu/rest/v1",
 countries;

window.onload = function(){
  var select = document.getElementById( "countries-select" ),//grabs elements needs to add too
      content = document.getElementById( "content" );//grabs elements needs to add too
      lobject = JSON.parse(localStorage.getItem("savedCountry")) || {};//gets last stored selection defined below.


  request = new XMLHttpRequest(); //needed to initiate request
  request.open( "GET", url ); // opens the request
  request.onload = function() { 
    if( request.status === 200 ) {    //if the request connection is good do the following
      var jsonString = request.responseText 
      countries = JSON.parse( jsonString );
      createSelect( select );
      select.onchange = selectCountry;
    }
    var selected; /// these are all to do with our new map define selected here to access it further down
    var center = {lat: 55.9520, lng: -3.1900}
    var zoom = 5;
    var map = new Map(center, zoom);
  }
  request.send();
}

function createSelect( select ) {
  countries.forEach( function( country, index ) {
    var option = document.createElement( "option" );
    option.value = index;
    option.innerHTML = country.name;
    select.appendChild( option );
  });
}

function selectCountry() {
  content.innerHTML = "";// resets the content section to nothing again without it each 'select' would stack 
  var countryName = document.createElement( "p" ), //creates new p element countryName
    population = document.createElement( "p" ), //creates new p element population
    capital = document.createElement( "p" ),//creates new p element capital
    countryNameTwo = document.createElement( "h1" ); //creates new h1 element 


  countryName.innerText = 'Country Name: ' + countries[this.value].name; //defines text between tags
  population.innerText = 'Population size: ' + countries[this.value].population;//defines text between
  capital.innerText = 'Capital city: ' + countries[this.value].capital;//defines text between tags
  countryNameTwo.innerText = countries[this.value].name;//defines text between tags
  languagesSpoken = 'Languages spoken: ' + countries[this.value].languages.length;




  // content.appendChild( countryNameTwo );// pushes teh variable to the content element
  // content.appendChild( countryName );// pushes teh variable to the content element
  // content.appendChild( population );// pushes teh variable to the content element
  // content.appendChild( capital );// pushes teh variable to the content element

  selected = {
    lat: countries[this.value].latlng[0],
    lng: countries[this.value].latlng[1],
  }


 map = new Map(selected)

var details = countryName.innerText + " || " + countries[this.value].nativeName + "<br>" + population.innerText + "<br>" + capital.innerText + "<br>" + languagesSpoken;

 map.addInfoWindow(selected, countries[this.value].alpha2Code, details)

  var lobject = {                 //creates an object of the last selected selection
    name: countryName.innerText,
    population: population.innerText,
    capital: capital.innerText
  }

  localStorage.setItem("savedCountry", JSON.stringify(lobject)) // defines a key value pair 'saved country' is the  key we give it JSON.stringify turns lobject into a string

};

