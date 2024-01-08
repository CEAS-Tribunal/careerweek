// Location radio buttons

var generateLocationRadios = function(locationContainer, location, id) {
    var radioButtonContainer = document.createElement("div");
    radioButtonContainer.setAttribute("class", "radio-button");

    var radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("id", "radio-" + String(id));
    radioButton.setAttribute("name", "radio");
    radioButton.setAttribute("value", location);

    var radioButtonLabel = document.createElement("label");
    radioButtonLabel.setAttribute("for", "radio-" + String(id));
    radioButtonLabel.textContent = location;

    radioButtonContainer.appendChild(radioButton);
    radioButtonContainer.appendChild(radioButtonLabel);
    locationContainer.appendChild(radioButtonContainer);
}

// Uncomment to allow locations
$.get("getlocations.php", function(data) {
    var locations = jQuery.parseJSON(data);
    var locationContainer = document.querySelector(".radio-group");

    for (iloc = 0; iloc < locations.length; iloc++) {
        generateLocationRadios(locationContainer, locations[iloc], iloc);
    }
});

enterButton = document.querySelector('form #enterButton');

// Submit sign in information
var signIn = function(name, company, title, email, boothLocation, location) {
    $.post("representative.php",
    {
        nameText: name,
        companyText: company,
        titleText: title,
        emailText: email,
        boothLocationText: boothLocation,
        locationText: location,
    })
    .done(function( data ) {
        if (data != "Success") {
            alert("There was an error submitting your information.");
            document.querySelector(".lds-ellipsis").style.display = "none";
            enterButton.style.display = "block";
        } else {
            document.querySelector(".success-box").style.display = "block";
            document.querySelector(".container form").style.display = "none";

            var signInNewUser = document.querySelector(".success-box a");
            signInNewUser.onclick = function() {
                document.querySelector(".success-box").style.display = "none";
                document.querySelector(".lds-ellipsis").style.display = "none";
                enterButton.style.display = "block";
                document.querySelector(".container form").style.display = "block";
            }
        }
    });
}

 function getSelectedLocation() {
    var locations = document.getElementsByName('radio');
    var  locVal = "";
    locations.forEach(location => {
    if(location.checked == true){
        locVal =  location.value;
    }
})
return locVal;
}

// Reset form for next representative
function clearResponses(name, company, title, email, boothLocation) {
    name.value = "";
    company.value = "";
    title.value = "";
    email.value = "";
    boothLocation.value = "";
    var locations = document.getElementsByName('radio');
    locations.forEach(location => {
        if(location.checked == true){
            location.checked = false;
        }
})
}

enterButton.onclick = function() {
    var name = document.querySelector('form #name');
    var company = document.querySelector('form #company');
    var title = document.querySelector('form #title');
    var email = document.querySelector('form #email');
    var boothLocation = document.querySelector('form #boothLocation')
    var location = getSelectedLocation();
    if(name.value && company.value && title.value && boothLocation.value){
        signIn(name.value, company.value, title.value, email.value, boothLocation.value, location);

        document.querySelector(".lds-ellipsis").style.display = "block";
        enterButton.style.display = "none";

        clearResponses(name, company, title, email, boothLocation, location);
    } else {
        alert("Please complete the form before signing in.")
    }
}
