$(document).ready(function() {

//Global var
	var userSearch = "";
	var name = "";
	var age = "";

//functions



//Events


	//1. Check if age is already stored locally

//********add this:
	//if user local storage has a value stored for age, then:

	// $("#ageScreen").hide();
	// $("#searchScreen").show();
	// $("#userName").text("PUT LOCAL Storage NAME variable here");

	//else if no age value is saved do this:

	$("#searchScreen").hide();
	$("#searchData").hide();
	$("#wineInfoPage").hide();




	//2.Age check

	$("#submitButton").on("click", function(event) {
	    event.preventDefault();

	    name = $("#nameInput").val().trim();

	  	age = $("#ageInput").val().trim();

	if (age >= 21) {
		alert("Congratulations, Jedi " + name + ", you are of legal age to enjoy this website!");

		$("#ageScreen").hide();
		$("#searchScreen").show();
		$("#userName").text(name);

		//save this information to local storage (name and age) here only (since user is over 21)




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
  	
   			$("#wineInfoPage").show();

	    	var winery = $(this).attr("winery-id");
	    	var wine = $(this).attr("wine-code");

	    	var wineryURL = "http://api.snooth.com/winery/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + winery;
      		//var wineryURL = "http://api.snooth.com/winery/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + winery_id variable from query1

     		var wineDetailURL = "http://api.snooth.com/wine/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + wine + "&food=1&photos=1";
      		//var wineDetailURL = "http://api.snooth.com/wine/?akey=ncs5n8ji7da3tqv033d1or3daisn244rq6utp037mtx3ogpi&ip=66.28.234.115&id=" + code from query1

	    	$.ajax({
	            url: wineryURL,
	            method: "GET"
	        }).then(function(response) {
	            console.log(JSON.parse(response));
		   		var parsedData = JSON.parse(response);


		   		//save necessary variables here, and then write to page



	        })

        	$.ajax({
	            url: wineDetailURL,
	            method: "GET"
	        }).then(function(response) {
	            console.log(JSON.parse(response));
		   		var parsedData = JSON.parse(response);



		   		//save necessary variables here and then write to page


          	})


	        //within the wineDetail page, there is an onclick for the back button
	    	$("#backButton").on("click", function(event) {
				event.preventDefault();

		 		$("#searchData").show();
		 		$("#searchScreen").show();		 		  	
	   			$("#wineInfoPage").hide();

	    	});




	    });





























});
