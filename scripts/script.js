
console.log('Script file loaded.');

$(document).ready(function(){

    console.log('HTML file loaded and parsed.');

    addMyEventListener()
    topSlider()
    typing()
    footerSlider()
    getDate() 

    
    // Populate table of domain prices
    $(window).scroll(function() {                                                                   //Scroll down to table to start populate
        var top_of_element = $("#pricetable").offset().top;                                         //Element positions
        var bottom_of_element = $("#pricetable").offset().top + $("#pricetable").outerHeight();
        var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        var top_of_screen = $(window).scrollTop();
    
        if ((bottom_of_screen > top_of_element + 200) && (top_of_screen < bottom_of_element)){      //If we reach table
            $(window).unbind('scroll');                                                             //Stop scroll event
            for(var i = 0; i < m.length; i++) {                                                     //Go throught all elements of array
                (function(i){                                                                       //Helps delay between iterations
                    setTimeout(function(){
                        var obj = m[i];                                                             //Assign pair of data
                        $('#pricetable > tbody:last-child').append('<tr class="hide"><td>' + obj.tld + '</td><td>' + obj.price + '</td></tr>'); //Add row with data
                        $('.hide').show(500);                                                       //Display row
                    }, 100*i);                                                                      //Delay between loops 100 ms
                })(i);
            }
        }
    });
});



function addMyEventListener(){

	// Hamburger Menu
	$('.hamburger').click(function(){
		$(this).toggleClass('opened');
		$('header nav').toggleClass('active-menu');
	});

	// Pricing
	$('#pricing').click(function(){
        checkDomain()
	});

    // Contact Form script
   // Contact Form script
   $('#submitButton').on('click', function(event){
        
    var name = $('#name').val();
    var company = $('#companyName').val();
    var phone = $('#phone').val();
    var budget = $('#budget').val();
    var email = $('#email').val();

    // in variable called email pattern is simple Regular Expression to validate email address
    //[a-z0-9._%+-]  -----this part is checking beginning of a RegExp - its looking for alphabet chars from 'a' to 'z', numbers from 0 to 9, and characters like ._%+-
    //+@  -----this part looks for '@' sign 
    //[a-z0-9.-]   ------this is looking for 'a' to 'z' chars numbers from 0 to 9
    //+\.     ----- this is adding a dot '.' to our RegExp
    //[a-z]{2,16}$   -----this is looking for 'a' to 'z' letters in strings made of min 2 and max 16 letters
    var emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,16}$/;

    //if we keep clicking send button our if statements below will continue to add text if input fields are empty
    // so on every click send button we need to empty errorMessage - we can do it with .empty() method
    $('#errorMessage').empty();
    //We need to make sure that our form isnt submited before full filled and validated
    //We will use preventDefault() method to prevent submiting to early
    //event.preventDefault();
    
    if( name ==''){   //we check if name input isnt empty if it is user will see message that this input is empty and form will not be send
        $('#errorMessage').append('Please fill Name field. ');
        event.preventDefault();
    }
    else if( name !='' && name.length <3){   //when name input is not empty we check length of name, if its shorter than 3 letters user will see error message and form will not be send
        $('#errorMessage').append('Please fill proper name(min 3 letters). ');
        event.preventDefault();
    }
    else if( company ==''){   //we check if company input isnt empty if it is user will see message that this input is empty and form will not be send
        $('#errorMessage').append('Please fill Company field. ');
        event.preventDefault();
    }
    else if( phone ==''){   //we check if phone input isnt empty if it is user will see message that this input is empty and form will not be send
        $('#errorMessage').append('Please fill Phone field. ');
        event.preventDefault();
    }
    else if( phone !='' && phone.length < 10 || isNaN(phone)){  //when phone input is shorter than 10 and when user does not put numbers user will see error message and form will not be send
        $('#errorMessage').append('Please enter valid Phone number(min 10 digits). ');
        event.preventDefault();
    }
    else if( budget ==''){   //we check if budget input isnt empty if it is user will see message that this input is empty and form will not be send
        $('#errorMessage').append('Please fill Budget field. ');
        event.preventDefault();
    }
    else if( budget !='' && isNaN(budget) && budget !=''){   //when budget input is not empty we check if user put number, if it is not a number user will see error message and form will not be send
        $('#errorMessage').append('Please fill Budget field with a number. ');
        event.preventDefault();
    }
    else if( email ==''){   //we check if email input isnt empty if it is user will see message that this input is empty and form will not be send
        $('#errorMessage').append('Please fill email field. ');
        event.preventDefault();
    }
    else if( email !='' && !email.match(emailPattern)){   //we check if entered email address is in correct format( .match() method ), if not user will see message that this input is not correct and form will not be send
        $('#errorMessage').append('Please fill correct email address. Email should contain "@" and "." signs. ');
        event.preventDefault();
    }else{        

        $.post('https://mycourseresource.com/mcr76/po3-artur.php',  //Send request to server
                {'key': 'PO3',                                      
                'name':$('#name').val(), 
                'company name':$('#companyName').val(), 
                'phone number':$('#phone').val(), 
                'budget':$('#budget').val(), 
                'email':$('#email').val(),
                'notify':true,                                      //this can be changed to false
                'format':'json'},
                function(data, status){                             //Request sent data and status
                    var jsObject = JSON.parse(data);                //Json to text
                }
            );
                
            alert('Thank you for filling out contact form. We will get to you soon!');
            $('form')[0].reset();       //Reset form, empty input fields
            return false;               //Prevent reloading page
    }
});      
}


// top and bottom slider settings

var speed = 500;            // fade speed
var autoLoopSpeed = 3000;   // auto slider speed
var m = [
    {tld:'.aero', price:'€78.00'},
    {tld:'.asia', price:'€19.49'},
    {tld:'.biz', price:'€18.60'},
    {tld:'.co', price:'€25.00'},
    {tld:'.co.com', price:'€33.00'},
    {tld:'.com', price:'€15.99'},
    {tld:'.coop', price:'€138.00'},
    {tld:'.info', price:'€19.99'},
    {tld:'.jobs', price:'€129.99'},
    {tld:'.mobi', price:'€18.00'},
    {tld:'.name', price:'€14.00'},
    {tld:'.net', price:'€19.99'},
    {tld:'.org', price:'€19.99'},
    {tld:'.pro', price:'€18.00'},
    {tld:'.tel', price:'€18.00'},
    {tld:'.travel', price:'€98.00'},
    {tld:'.ie', price:'€19.99'},
    {tld:'.uk.com', price:'€38.00'},
    {tld:'.lu', price:'€34.00'},
    {tld:'.co.uk', price:'€16.50'}
]  //Assign array (Changes:added square bracked to create array m)


// top slider

function topSlider(){

    $('.slide').first().addClass('active');     // Add inital active class to first image
    
    $('.slide').hide();                         // Hide all slides

    $('.active').show();                        // show first slide image

    $('#next').click(nextSlide);                // next button

    $('#prev').click(prevSlide);                // prev button

    setInterval(nextSlide, autoLoopSpeed);      // auto slider, set timer for slider with variable assign above

    // switch to next slide
    function nextSlide(){
        $('.active').removeClass('active').addClass('oldActive'); 
        if($('.oldActive').is(':last-child')){                    
            $('.slide').first().addClass('active');					// display first image after the last image 
        } else {
            $('.oldActive').next().addClass('active');				// or keep displaying the next image
        }
        $('.oldActive').removeClass('oldActive');
        $('.slide').fadeOut(speed);                                 // fade out speed
        $('.active').fadeIn(speed);                                 // fade in speed
    }

    // switch prev slide
    function prevSlide(){
        $('.active').removeClass('active').addClass('oldActive');
        if($('.oldActive').is(':first-child')){
            $('.slide').last().addClass('active');                  // display last image after the first image
        } else {
            $('.oldActive').prev().addClass('active');              // or keep displaying the next image
        }
        $('.oldActive').removeClass('oldActive');
        $('.slide').fadeOut(speed);                                 // fade out speed
        $('.active').fadeIn(speed);                                 // fade in speed
    }
}


// footer slider

function footerSlider(){

    $('.footerSlide').first().addClass('footerActive');     // Add inital active class
    
    $('.footerSlide').hide();                               // Hide all slides

	$('.footerActive').show();                              // show first slide image

	setInterval(function(){
		$('.footerActive').removeClass('footerActive').addClass('footerOldActive');
        if($('.footerOldActive').is(':last-child')){
            $('.footerSlide').first().addClass('footerActive');     // display first image after the last image
        } else {
            $('.footerOldActive').next().addClass('footerActive');  // or keep displaying the next image
        }
        $('.footerOldActive').removeClass('footerOldActive');
        $('.footerSlide').fadeOut(speed);                           // fade out speed
        $('.footerActive').fadeIn(speed);                           // fade in speed
	}, autoLoopSpeed);

}


//update year in footer
function getDate(){
	var d = new Date();          // get new date
	var n = d.getFullYear()		 // get year only from the new date
	$('.year').html(n);			 // display year in html year class
}


// text typing effect

function typing(){
	var text = "Let's build your site!";               // assign new content to variable
	function letter() {
		var animatedText = $('#animatedText').text(); 
		var t = text.charAt(0);                        // grab first text's letter
		text = text.substr(1);						   // shorten the text
		$('#animatedText').text(animatedText + t);	   // add first letter
		if(text.length > 0) setTimeout(letter, 75);	   // if there's anything left to type, continue.
	}
		setTimeout(letter, 75);
}
	

// Pricing script

function checkDomain() {
    domainName = $("#txt").val();                           //Read domain name (Changes:Added parentesis in function val)
    var name = domainName.split('.')                        //Separate domain name and contry extention (Changes:Added var before name variable)
    window.alert("You are looking for a "+"." + name[1] + " domain"); //Pop up alert with contry code (Changes:Added space before domain word)
    x = money('.' + name[1]);                               //Find price by contry code (Changes:name(1) changed to name[1])
    
    if (x === false) {                                      //If found nothing
    $("#results").html("We don't have a price for this domain right now! Please call use later!");  //(Changes:Changed "innerHTML =" to html())
    }
    else
    $("#results").html("Well done. Your domain will cost you " + x  + " Try again?");               //(Changes:Changed "innerHTML =" to html())
}

function money(name) {                                                                              //Find price by country code
    for(var i = 0; i < m.length; i++) {                                                             //added loop to find matching "tld". Run through all array
        var obj = m[i];                                                                             //Assign pair to variable
        if (obj.tld == name) {return obj.price}                                                     //If found contry code, stop loop and return value
    }
    return false                                                                                    //If nothing found return false
}


