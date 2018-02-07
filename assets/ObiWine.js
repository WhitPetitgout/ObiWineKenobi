$(document).ready(function() {

//Global var
	var userSearch = "";
	var username = "";
	var age = "";
	var favoriteWines = [];
	var description = "";
	var isPlaying = false;
	var audioElement = "";
	var name = "";
	var image = "";
	var type = "";
	var vintage = "";
	var code = "";
	var winerySearchID = "";
	var favorites = [];

//functions




//Events


	//1. Check if age is already stored locally

	//if user local storage has a value stored for age, then:
	if (localStorage.getItem("age")) {

	$("#ageScreen").hide();
	$("#searchScreen").show();
	$("#searchData").hide();
	$("#wineInfoPage").hide();
	$("#favoritesPage").hide();
	$("#userName").text(localStorage.getItem("name"));
	
	//else if no age value is saved do this:
	} else {

	$("#ageScreen").show();
	$("#searchScreen").hide();
	$("#searchData").hide();
	$("#wineInfoPage").hide();
	$("#favoritesPage").hide();

	}


	//2.Age check

	$("#submitButton").on("click", function(event) {
	    event.preventDefault();

	    username = $("#nameInput").val().trim();

	  	age = $("#ageInput").val().trim();

	if (age >= 21) {
		alert("Congratulations, Jedi " + username + ", you are of legal age to enjoy this website!");

      	localStorage.setItem("name", username);
      	localStorage.setItem("age", age);

		$("#ageScreen").hide();
		$("#searchScreen").show();
		$("#userName").text(localStorage.getItem("name"));

	}

	 else {age=== false;
	 	alert("Please come back when you are 21 or older, young Jedi!")
	    }

	});




	//3. Wine Search

    $("#searchButton").on("click", function(event) {

		$("#searchData").show();  	

		event.preventDefault();

		$("#searchResults").empty();

    	userSearch = $("#wineSearchInput").val().trim();
    	console.log(userSearch);

    	var queryURL = "http://api.snooth.com/wines/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&t=wine&q=" + userSearch;
      //var queryURL = "http://api.snooth.com/wines/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&t=wine&q=" + search term

		$.ajax({
		   	url: queryURL,
		   	method: "GET"
		}).then(function(response) {
		   	console.log(JSON.parse(response));

		   	var parsedData = JSON.parse(response);

		   	for (var i = 0; i < parsedData.wines.length; i++) {

		   		var wineImageURL = parsedData.wines[i].image;
		   		var wineName = parsedData.wines[i].name;
		   		var wineType = parsedData.wines[i].varietal;
		   		var wineVintage = parsedData.wines[i].vintage;
		   		var wineryID = parsedData.wines[i].winery_id;
		   		var wineCode = parsedData.wines[i].code;

		   		$("#searchResults").append("<tr id='resultLine' winery-id='" + wineryID + "' wine-code='" + wineCode + "'><td><image src='" + wineImageURL + "'/></td><td>" + wineName + "</td><td>" + wineType + "</td><td>" + wineVintage + "</td></tr>")

		   	}


		})

    });


	//4. Click Event on Search Results

	$(document).on("click", "#resultLine", function(event) {

	 	$("#searchData").hide();
	 	$("#searchScreen").hide(); 
	 	$("#favoritesPage").hide(); 	
  	
   		$("#wineInfoPage").show();


   		$("#winery-image, #winery-name").text("");
   		$("#wine-name, #wine-type, #wine-year, #wine-price, #wine-location, #wine-description, #food1, #food2, #food3, #wine-review").text("");




	   	var winery = $(this).attr("winery-id");
	   	var wine = $(this).attr("wine-code");

	   	var wineryURL = "http://api.snooth.com/winery/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + winery;

     	var wineDetailURL = "http://api.snooth.com/wine/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + wine + "&food=1&photos=1";

	    $.ajax({
	        url: wineryURL,
	        method: "GET"
	    }).then(function(response) {
	        console.log(JSON.parse(response));
		   	var parsedData = JSON.parse(response);


		//save necessary API variables here, and then write to page
			var wineryImg = parsedData.winery.image;
			var wineryName = parsedData.winery.name;
			var wineryURL = parsedData.winery.url;

			$("#winery-image").html("<img src='" + wineryImg + "' width='100%'>");
			$("#winery-name").html("<a href='" + wineryURL + "' target='_blank'>" + wineryName + "</a>");



	    })


        $.ajax({
	        url: wineDetailURL,
	        method: "GET"
	    }).then(function(response) {
	        console.log(JSON.parse(response));
	   		var parsedData = JSON.parse(response);


		//save necessary API variables here and then write to page
			image = parsedData.wines[0].image;
			name = parsedData.wines[0].name;
			type = parsedData.wines[0].varietal;
			vintage = parsedData.wines[0].vintage;
			var avgprice = parsedData.wines[0].price;
			var region = parsedData.wines[0].region;
			description = parsedData.wines[0].wm_notes;
			var food0 = parsedData.wines[0].recipes[0].name;
			var food1 = parsedData.wines[0].recipes[1].name;
			var food2 = parsedData.wines[0].recipes[2].name;
			var food0URL = parsedData.wines[0].recipes[0].source_link;
			var food1URL = parsedData.wines[0].recipes[1].source_link;
			var food2URL = parsedData.wines[0].recipes[2].source_link;
			var review = parsedData.wines[0].snoothrank
			code = parsedData.wines[0].code;
			winerySearchID = parsedData.wines[0].winery_id;

			console.log(review);


			$("#wine-image").html("<img src='" + image + "' width='100%'>")

			$("#wine-name").text(name);
			$("#wine-type").text(type);
			$("#wine-year").text(vintage);
			$("#wine-price").text(avgprice);
			$("#wine-location").text(region);
			$("#wine-description").text(description);
			$("#food1").html("<a href='" + food0URL + "' target='_blank'>" + food0 + "</a>");
			$("#food2").html("<a href='" + food1URL + "' target='_blank'>" + food1 + "</a>");
			$("#food3").html("<a href='" + food2URL + "' target='_blank'>" + food2 + "</a>");

			$("#wine-review").append(review);

	    // 5. Text to Speech on wine detail page (nest within a timeout to start after click, or we can do it on click of a button)
			var textSpeechURL = "http://api.voicerss.org/?key=a2833f41ad5743d3bfbb43f822503d1c&hl=en-gb&b64=true&src=" + description;

		    $.ajax({
		        url: textSpeechURL,
		        method: "GET"
		    }).then(function(response) {
		        console.log(response);

		        audioElement = document.createElement("audio");
		        audioElement.setAttribute("src", response);

		     });

	    	$("#playButton").on("click", function(event) {
				
				event.preventDefault();

		      	var state = $(this).attr("data-state");


		        if (state == "stopped") {

		            	audioElement.play();
		      			$(this).attr("data-state", "playing");

			       	if (audioElement.duration > 0 && !audioElement.paused) {

			       		var newDiv = $("<img src='https://media.giphy.com/media/VtB1RvWAZVauc/giphy.gif' width='100%'>");
		      			$("#wine-image").html(newDiv);

					} else {

		      			$(this).attr("data-state", "stopped");
		      			$("#wine-image").html("<img src='" + image + "' width='100%'>");

					}


		       	} else if (state == "playing") {

		            audioElement.pause();
		      		$(this).attr("data-state", "stopped");
		      		$("#wine-image").html("<img src='" + image + "' width='100%'>");
		       	}



		    });


        })


	    //6. Back Button
	    	//within the wineDetail page, there is an onclick for the back button to show previous search results
	    $("#backButton").on("click", function(event) {
			event.preventDefault();

		    $("#playButton").attr("data-state", "stopped");
		    $("#wine-image").html("<img src='" + image + "' width='100%'>");

		 	$("#searchData").show();
		 	$("#searchScreen").show();		 		  	
	   		$("#wineInfoPage").hide();
			
			if (audioElement.duration > 0 && !audioElement.paused) {
				audioElement.pause();
			}

	   	});





	});

	//7. Wine Info Page "Add as Favorite Wine button" could go here if we do that (with local storage)

		$("#favoriteButton").on("click", function(event) {
			event.preventDefault();

			var favWineImageURL = image;
			var favWineName = name;
			var favWineType = type;
			var favWineVintage = vintage;
			var favWineryCode = winerySearchID;
			var favWineCode = code;

			//store object in local storage as an obect within a string
			var newFav = {
				favWineImageURL: favWineImageURL,
				favWineName: favWineName,
				favWineType: favWineType,
				favWineVintage: favWineVintage,
				favWineryCode: favWineryCode,
				favWineCode: favWineCode			
			}

			favorites.push(newFav);
			console.log(favorites); //why is this adding extra items sometimes??

			var favString = JSON.stringify(favorites);
			localStorage.setItem("favorites", favString);


		});
		
	//8. Favorites page On click functionality

	$("#favoritesPageButton").on("click", function(event) {
		event.preventDefault();

		$("#wineInfoPage").hide();
		$("#searchData").hide();
		$("#searchScreen").hide();		 		  	
	   	$("#wineInfoPage").hide();

		$("#favoritesPage").show();

		//clear page and then populate from the local storage.
		// $("#favoritesPageData").empty()

		var storedFavorites = localStorage.getItem("favorites");
		var favArray = JSON.parse(storedFavorites);
		// console.log(favArray);

		for (var i = 0; i < favArray.length; i++) {

		   	$("#favoritesPageData").append("<tr id='resultLine' winery-id='" + favArray[i].favWineryCode + "' wine-code='" + favArray[i].favWineCode + "'><td><image src='" + favArray[i].favWineImageURL + "'/></td><td>" + favArray[i].favWineName + "</td><td>" + favArray[i].favWineType + "</td><td>" + favArray[i].favWineVintage + "</td></tr>")

		}


	});




	//9. Contact Page Submit Click functionality 
		//(Maybe make it send the details as an email to 3 group members when submitted)

	//10. Other functionalities?



});
