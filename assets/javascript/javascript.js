//app pre-chosen topics
var topics = 'Captain America, Iron Man, Thor, Hulk, Hawkeye, Ant Man, Black Widow, Wolverine, Deadpool'.split(',');

// on document load run
$(document).ready(function() {
	
	// run the create buttons fucntion
	createButtons();

	// clicking the submit button on the form for a new topic
	$('#submit').on('click', function(submitbutton) {

		var userTopic = $('#userTopic').val().trim(); //gets newly entered topic and trims the white space

		//if the new topic is not blank, then push the text to the array, else pop an alert
		if (userTopic !== '') {
			$('#userTopic').val('');
			topics.push(userTopic);
			createButtons(); // run createButtons function
		} else {
			alert("OPPS! Looks like you forgot to enter a topic"); //alert user
		}

		submitbutton.preventDefault(); //prevents reloading the page
		
	});

	// clicking the clear button will remove the called images
	$('#clear').on('click', function(clearbutton) {
		$(".well" ).empty();
		console.log('clear images')


	});

});

// menu buttons
$(document).on("click",".btn-userTopic",function() {

	
	var topic = $(this).attr("data-topic");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10"; 

    // get images 

    $.ajax({
    	url: queryURL,
        method: "GET"
    })

    // after call, grab  images and display

    .done(function(getimages) {
    	var data = getimages.data;
    	console.log(data);

    	for (var i = 0; i < data.length; i++) {
    		console.log(data[i]);

    		var displayImg = $('<div><ul>');
    		var rating = $('<li> Image Rating: ' + data[i].rating + '</li>');
    		var url = $('<li> URL: ' + data[i].url + '</li>');
    		var img = $('<img>')
    			.addClass('img-gif')
    			.attr('src', data[i].images.fixed_height_still.url)
    			.attr('data-state', 'still')
    			.attr('data-still', data[i].images.fixed_height_still.url)
    			.attr('data-animate', data[i].images.fixed_height.url);

    		displayImg.append(img).append(rating, url);

    		$('#imageWell').prepend(displayImg);
    	}
    })
});	


// when clickedn images handle the states
$(document).on('click', '.img-gif', function() {

	var img = $(this);

	if (img.attr('data-state') === 'still') {
		img.attr('data-state', 'animate')
		img.attr('src', img.attr('data-animate'));
		console.log('turn on animation')
	} else {
		img.attr('data-state', 'still')
		img.attr('src', img.attr('data-still'));
		console.log('turn off animation')
	}
});


// functions for buttons

function createButtons() {
	var buttonList = $('#buttonList');

	buttonList.empty();

	for (i in topics) {
		var button = singleButton(topics[i]);
		buttonList.append(button);
	}
}

function singleButton(buttontext) {
	var button = $('<button>').html(buttontext)
	.attr('class', 'btn btn-danger btn-userTopic')
	.addClass('capitalise') // converts what users type to caps, due to my OCD
	.attr('data-topic', buttontext);

	return button;
}
