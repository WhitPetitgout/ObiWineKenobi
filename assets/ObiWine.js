$(document).ready(function() {

	//show/hide certain elements

	//var
	var userSearch = "";

	//functions

	//click events


	//1. Over 21
	$("#searchScreen").hide();
	$("#searchData").hide();
	$("#wineInfoPage").hide();

	$("#submitButton").on("click", function(event) {
	    event.preventDefault();


	  	var age = $("#ageInput").val().trim();
	    console.log(age);
	        //$().text(age);
	if (age >= 21) {
		alert("Congratulations, Jedi, you are of legal age to enjoy this website!");

		$("#ageScreen").hide();
		$("#searchScreen").show();


	}

	 else {age=== false;
	 	alert("Please come back when you are 21 or older, young Jedi!")
	    }

	});


	//2. Wine Search




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


		   		$("#searchResults").append("<tr><td><image src='" + wineImageURL + "'/></td><td>" + wineName + "</td><td>" + wineType + "</td><td>" + wineVintage + "</td></tr>")



		   	}


		})









    });































});
