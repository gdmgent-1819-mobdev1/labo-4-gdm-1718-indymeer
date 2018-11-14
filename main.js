/*---------------------------------------------------------------------------------------------------------------

ERRORS:

- toggleIcon werkt alleen op de eerste met getElementbyId
- Zie regel 608, elke keer hij er 10 in laad, telt hij per keer 1 extra bij


TODO:

- Naar links of rechts swipen wordt ook gezien als een dislike button zodat het tussen de lijst komt te staan


------------------------------------------------------------------------------*/



function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}



// lege arrays om te storen

let people = new Array();
console.log(people);


// like array
let like_button = new Array();
localStorage.setItem("like", JSON.stringify(like_button));

//dislike array
let dislike_button = new Array();
localStorage.setItem("dislike", JSON.stringify(dislike_button));

//fetch id for buttons
let bad = document.getElementById("nope");
let good = document.getElementById("like");
let next = document.getElementById("next");
let close = document.getElementById("close");
let close2 = document.getElementById("close2");




// buttons

//fetch nieuwe data wanneer er op next gedrukt wordt
let index = 0;

function fetchData() {
    people = new Array()
    console.log("fetching to do implement")
    fetch('https://randomuser.me/api?results=10').then(response => {
        return response.json();
    }).then(data => {
        function create() {
            
            for (let i = 0; i < 10; i++) {
                let authors = data.results[i];
                localStorage.setItem('test', JSON.stringify(authors));
                


                let allPeople = {
                    name: authors.name.first + authors.name.last,
                    picture: authors.picture.large,
                    age: authors.dob.age,
                    city: authors.location.city,
                    lng: authors.location.coordinates.longitude ,
                    lat:  authors.location.coordinates.latitude
                }
                   

                people.push(allPeople);
                const main = createNode('div');
                let li = createNode('div');
                let image = createNode('div');
                let span = createNode('span');
                let info = document.createElement('div');
                let quote = createNode('div');
                /*HIER NOG IDS TOEGEVOEGD ZODAT ZE TE MANIPULEREN ZIJN VANUIT RENDERNEWPERSON*/
    
                main.className = "main-window";
                main.id = "main-window";
    
                info.className = "user-info";
                info.id = "user-info";
    
                info.id = "personInfo"
    
                image.className = "user-image";
                li.className = "user-image";
    
                image.id = "user-image";
    
                image.id = "personImage"
    
                span.className = "username";
                span.id = "username";
    
                quote.className = "quote";
                quote.id = "quote";
    
                main.innerHTML = "";
                image.style.background = 'url(' + authors.picture.large + ')';
                span.innerHTML =  authors.name.first + authors.name.last;
                quote.innerHTML = "age" + " " + authors.dob.age +'<br>' + authors.location.city ;
/*toegevoegd*/
		
			/*
			getposition hier aanroepen om elk object een afstand mee te geven
			de gewone vond het element van de quote niet dus heb ik hem een beetje aangepast
			naar setPositionForQuote(container)
			*/
			setPositionForQuote(quote)
    
    
                append(info, quote);
                append(li, image);
                append(li, span);
                append(main, li);
                append(main, info);
                append(ul, main);

            }
        }
        function initCards(card, index) {
            let allCards = document.querySelectorAll('#main-window');

            let newCards = document.querySelectorAll('#main-window:not(.removed)');
          
            newCards.forEach(function (card, index) {
           card.style.zIndex = allCards.length - index;
             card.style.zIndex = (10 - index) / 10;
            });
                        
        
          }
          
          initCards();
        create()
        setupMap();

        swipe();



    })

}


// functie om nieuwe persoon te genereren
function renderNewPerson(person) {
    let array = JSON.parse(localStorage.getItem('distance'));

    console.log("Rendering: " + person.name + ". to do implement")
    let image = document.getElementById("personImage")
    let userName = document.getElementById("username")
    let quote = document.getElementById("quote")
    image.style.background = 'url(' + person.picture + ')';
    userName.innerHTML =  person.name  ;
    quote.innerHTML = "age" + " " + person.age + '<br>'+person.city ;
    

      

}
/*TOT HIER*/


// dislike button
function disLike(){
   // event.preventDefault();
   let cards = document.querySelectorAll('#main-window');

    let array = JSON.parse(localStorage.getItem('test'));


    array = people[index];

    dislike_button.push(people[index]);


    renderNewPerson(array);

   // setupMap();
  //  distanceKm();

  let card = cards[index];
  
  card.classList.add('removed');



    console.log(index);
    if (index >= 9) {
        index = 0;
        return fetchData();

    } else {
        index++;
    }

}

bad.addEventListener("click", disLike);










// like button

function Like(){
   // event.preventDefault();
   let cards = document.querySelectorAll('#main-window');

    console.log("good button clicked")
   


    let array = JSON.parse(localStorage.getItem('test'));

    array = people[index];

    like_button.push(people[index]);

    renderNewPerson(array);
    //setupMap();
   // distanceKm();
   let card = cards[index];
  
   card.classList.add('removed');
 

    //console.log(currentProfile.name);
   console.log(index);
    if (index >= 9) {
        index = 0;
        return fetchData();

    } else {
        index++;
    }

}

good.addEventListener("click", Like);


//show list like
next.addEventListener("click", function () {
    document.getElementById("overlay2").style.transform = "translateX(0%)";

    displayLike();

})

function displayLike(){
    document.getElementById("text2").innerHTML = "";
   
    // let switchLike = document.querySelectorAll("#move1");
 
     for (i = 0; i < like_button.length; i++) {
 
         document.getElementById("text2").innerHTML +=  '<a href="#" class="close" id="move1" onclick="switchDislike(' + i + ')" >'+ like_button[i].name +'</a> <br>';
 
 
     }
}

function switchDislike(index){
    dislike_button.push(like_button[index]);
            like_button.splice(index, 1);
            displayLike();
}





// show list dislike 

previous.addEventListener("click", function () {
    document.getElementById("overlay1").style.transform = "translateX(0%)";
   
     displayDislike();
    
})

function displayDislike(){
    document.getElementById("text1").innerHTML = "";
   
    // let switchLike = document.querySelectorAll("#move1");
 
     for (i = 0; i < dislike_button.length; i++) {
 
         document.getElementById("text1").innerHTML +=  '<a href="#" class="close" id="move1" onclick="switchLike(' + i + ')" >'+ dislike_button[i].name +'</a> <br>';
 
 
     }
}

function switchLike(index){
    like_button.push(dislike_button[index]);
            dislike_button.splice(index, 1);
            displayDislike();
}

// set remove button
close.addEventListener("click", function () {
    document.getElementById("overlay1").style.transform = "translateX(-100%)";

})
close2.addEventListener("click", function () {
   document.getElementById("overlay2").style.transform = "translateX(100%)";


})

// switch image to corner on mapicon click


function iconButton() {

    let element = document.getElementById("personImage");
    element.classList.toggle("user-image2");

}



// create elements plus insert json : beginnende array 

const ul = document.getElementById('card-wrapper');
fetch('https://randomuser.me/api?results=10').then(response => {
    return response.json();
}).then(data => {
    //call in objects from json 


    function create() {
        for (let i = 0; i < 10; i++) {
            let authors = data.results[i];
            localStorage.setItem('test', JSON.stringify(authors));


            let allPeople = {
                name: authors.name.first + authors.name.last,
                    picture: authors.picture.large,
                    age: authors.dob.age,
                    city: authors.location.city,
                   lat: authors.location.coordinates.latitude, 
                    lng: authors.location.coordinates.longitude
            }
            
          if (like_button.includes(authors.login.uuid) || dislike_button.includes(authors.login.uuid)){
            continue;
        }else{
          people.push(allPeople);

        }
        let array = JSON.parse(localStorage.getItem('distance'));

            const main = createNode('div');
            let li = createNode('div');
            let image = createNode('div');
            let span = createNode('span');
            let info = document.createElement('div');
            let quote = createNode('div');
            /*HIER NOG IDS TOEGEVOEGD ZODAT ZE TE MANIPULEREN ZIJN VANUIT RENDERNEWPERSON*/

            main.className = "main-window";
            main.id = "main-window";

            info.className = "user-info";
            info.id = "user-info";

            info.id = "personInfo"

            image.className = "user-image";
            li.className = "user-image";

            image.id = "user-image";

            image.id = "personImage"

            span.className = "username";
            span.id = "username";

            quote.className = "quote";
            quote.id = "quote";

            main.innerHTML = "";
            image.style.background = 'url(' + authors.picture.large + ')';
            span.innerHTML =  authors.name.first + authors.name.last;
            quote.innerHTML = "age" + " " + authors.dob.age +'<br>' + authors.location.city ;
/*toegevoegd*/
		
			/*
			getposition hier aanroepen om elk object een afstand mee te geven
			de gewone vond het element van de quote niet dus heb ik hem een beetje aangepast
			naar setPositionForQuote(container)
			*/
			setPositionForQuote(quote)

            append(info, quote);
            append(li, image);
            append(li, span);
            append(main, li);
            append(main, info);
            append(ul, main);
        }    

    }
    create();
    setupMap();
    function initCards(card, index) {
        let allCards = document.querySelectorAll('#main-window');

        let newCards = document.querySelectorAll('#main-window:not(.removed)');
      
        newCards.forEach(function (card, index) {
       card.style.zIndex = allCards.length - index;
         card.style.zIndex = (10 - index) / 10;
        });
                    
    
      }

      initCards();
/*verwijderd*/
    //getPosition();


}).catch(function (error) {
    console.log(error.message);
});

// MAP

let i= 0;
    
    
    function setupMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaW5keW1lZXJtYW5zIiwiYSI6ImNqbjRqOWkydjNrM2Qza284cWJtNGIzMmMifQ.n1bFi7TfjO65EtziFqnpeA';
     let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
       //center: [people[index].lng, people[index].lat],  //index is ingesteld als standaardwaarde 0
       
        zoom: 3
       
      });
      map.flyTo({
        center:[people[index].lng, people[index].lat],
             // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        zoom: 9,
        bearing: 0,

        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.7, // make the flying slow
        curve: 1, // change the speed at which it zooms out

    });
      map.on('load', function(){
        i++

        let mapid = 'location' +i;
        console.log(mapid);

        map.addLayer({
        'id': mapid,
        'type': 'circle',
        'source': {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [people[index].lng, people[index].lat] , //index is ingesteld als standaardwaarde 0, werkt om volgende object op te halen
                }
            },
        },
        'paint': {
            'circle-color': "#3BBB87",
            'circle-radius': {
                'base': 10,
                'stops': [[9, 35], [12, 40], [22, 180]]
            },
            'circle-opacity': 0.5
        }
    });

    })

     
    }
/*toegevoegd*/
  
function setPositionForQuote(container){
	if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          let lat2 = position.coords.latitude,
              lng2 = position.coords.longitude,
              latlng = [lng2, lat2];
              localStorage.setItem("coord", JSON.stringify(latlng));
    
          let marker = new mapboxgl.Marker()
          .setLngLat(latlng);
    
});
appendKm(container);

      }
}
function appendKm(container){
	let array = JSON.parse(localStorage.getItem('coord'));

    let  lat1 = array[0];
    let lon1 = array[1];
    let lat2 =  people[index].lat;
    let lon2 = people[index].lng;
    let R = 6371; // Radius of the earth in km
    let dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let a = 
       0.5 - Math.cos(dLat)/2 + 
       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
       (1 - Math.cos(dLon))/2;
       container.innerHTML += " " +  Math.ceil(R * 2 * Math.asin(Math.sqrt(a))) + "km";
}


document.addEventListener('dragstart', dragStart);
		document.addEventListener('dragend', dragEnd);
		document.addEventListener('drop', dragDrop);
		document.addEventListener('dragover', dragOver);
		function dragStart(e){
            e.target.style.opacity = .3;

			e.dataTransfer.setData("clickedButton", e.target.id);
			e.dataTransfer.dropEffect = "move";
		}
		function dragEnd(e){
			e.preventDefault();
            e.target.style.opacity = 1.0;

		}
		function dragDrop(e) {
            e.preventDefault();

			// only drop on dropzones
			if (e.toElement.className === "likedropzone") {
                //e.target.classList.add('removed'); 

                Like();

			}else{
              //  e.target.classList.add('removed'); 

            disLike();

			}
		}
		function dragOver(e) {
			e.preventDefault();
		}

