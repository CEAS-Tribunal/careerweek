var labelUri = "https://tribunal.uc.edu/careerweek/representative-sign-in/admin/labels/Company.label";
var label = dymo.label.framework.openLabelFile(labelUri);
var paramsXml = dymo.label.framework.createLabelWriterPrintParamsXml({ copies: 1 });

var printerSelected = "";

var checkPrinterStatus = function(name, company, title, email) {
    if (!printerSelected) {
        alert("Please select a printer before continuing.")
    }
    var printers = dymo.label.framework.getPrinters();
    for(var i = 0; i < printers.length; i++) {
        if (printers[i].name === printerSelected) {
            if (printers[i].isConnected != true) {
                alert("DYMO LabelWriter is not connected. Please connect the printer to continue.");
                return false;
            } else {
                return true;
            }
        }
    }
}

var getConnectedPrinter = function() {
    var printerSelection = document.querySelector('.adminStation .content .printerSelect');
    printerSelection.innerHTML = "";
    var printers = dymo.label.framework.getPrinters();
    for(var i = 0; i < printers.length; i++) {
        if (printers[i].isConnected === true) {
            var printer = document.createElement('a');
            printer.textContent = printers[i].name;
            printerSelection.appendChild(printer);

            printer.onclick = function() {
                printerSelected = printer.textContent;
                printer.style.background = "rgb(211, 228, 250)";
            }
        }
    }

    printerSelectionPrinters = document.querySelectorAll('.adminStation .content .printerSelect a');
    if (printerSelectionPrinters.length === 0 ) {
        var noPrinterDialog = document.createElement('p');
        noPrinterDialog.textContent = "No printer was found.";
        printerSelection.appendChild(noPrinterDialog);
    }
}

getConnectedPrinter();

var refreshButton = document.querySelector('.adminStation .content input[type=button]');
refreshButton.onclick = function() {
    getConnectedPrinter();
}

var adminExpand = document.querySelector('.adminStation h2');
document.querySelector('.adminStation .content').style.display = "none";
adminExpand.onclick = function() {
    var adminContent = document.querySelector('.adminStation .content');
    if (adminContent.style.display === "none") {
        adminContent.style.display = "block";
    } else {
        adminContent.style.display = "none";
    }
}

var printLabel = function(name, company, title) {
    var labelSetXml = new dymo.label.framework.LabelSetBuilder();
    var record = labelSetXml.addRecord();
    record.setText("name", name);
    record.setText("company", company);
    record.setText("title", title);
    return dymo.label.framework.printLabel2Async(printerSelected, paramsXml, label.getLabelXml(), labelSetXml);
}

// Representatives

var locationChosen = "none";
var getEmployers = function() {
    $.get("getemployers.php", function(employerInfo) {
        var employerInfo = jQuery.parseJSON(employerInfo);
        var representativeTable = document.querySelector(".representative-container table");
        for (var i = employerInfo.length - 1; i >= 0; i--) {
            if (locationChosen == "none" || locationChosen == employerInfo[i]["location"]) {
                employerId = employerInfo[i]["id"];
                employerName = employerInfo[i]["name"];
                employerCompany = employerInfo[i]["company"];
                employerTitle = employerInfo[i]["title"];
                employerboothLocation = employerInfo[i]["boothLocation"];
                employerSignInTime = employerInfo[i]["sign in time"];
                employerPrintedStatus = employerInfo[i]["printed"];
                generateRepresentatives(representativeTable, employerId, employerName, employerCompany, employerTitle, employerboothLocation, employerSignInTime, employerPrintedStatus);
            }
        }
    });
}

getEmployers();
var repIdStart = "rep-";

var generateRepresentatives = function(table, id, name, company, title, boothLocation, signInTime, printedStatus) {
    var tableRow = document.createElement("tr");
    if (printedStatus == "0") {
        tableRow.setAttribute("class", "unprinted");
    } else {
        tableRow.setAttribute("class", "printed");
    }
    tableRow.setAttribute("id", repIdStart + String(id));


    tableRow.onclick = function() {
        tableRow.setAttribute("class", "printed");
        addToPrintingQueue(id, name, company, title);
    } 

    var tableRepName = document.createElement("td");
    tableRepName.textContent = name;
    var tableRepCompany = document.createElement("td");
    tableRepCompany.textContent = company;
    var tableRepTitle = document.createElement("td");
    tableRepTitle.textContent = title;
    var tableRepBoothLocation = document.createElement("td");
    tableRepBoothLocation.textContent = boothLocation;
    var tableRepSignInTime = document.createElement("td");
    tableRepSignInTime.textContent = signInTime;

    tableRow.appendChild(tableRepName);
    tableRow.appendChild(tableRepCompany);
    tableRow.appendChild(tableRepTitle);
    tableRow.appendChild(tableRepBoothLocation);
    tableRow.appendChild(tableRepSignInTime);

    table.appendChild(tableRow);
}

var updatePrintingInfo = function(id) {
    $.post("updateemployers.php",
    {
        repIdText: id,
        helpText: "success",
    });
}

var addToPrintingQueue = function(id, name, company, title) {
    if (checkPrinterStatus()) {
        var printedLabel = printLabel(name, company, title);
        updatePrintingInfo(id);
    }
}

// Representives location select
var generateLocationOptions = function(selectElement, displayName, internalName) {
    var optionElement = document.createElement("option");
    optionElement.textContent = displayName;
    optionElement.value = internalName;

    selectElement.appendChild(optionElement);
}

$.get("../getlocations.php", function(data) {
    var locations = jQuery.parseJSON(data);
    var locationContainer = document.querySelector("#location-select select");

    for (iloc = 0; iloc < locations.length; iloc++) {
        generateLocationOptions(locationContainer, locations[iloc], locations[iloc]);
    }
});

//Update table
updateButton = document.querySelector(".representative-container #update-button");

updateButton.onclick = function() {
    var locationSelect = document.querySelector("#location-select select");
    locationOption = locationSelect.options[locationSelect.selectedIndex].value;
    if (locationOption) {
        locationChosen = locationOption;
    }
    var allTableRows = document.querySelectorAll(".representative-container table tr");
    var representativeTable = document.querySelector(".representative-container table");
    for (var irow = 1; irow < allTableRows.length; irow++) {
        representativeTable.removeChild(allTableRows[irow]);
    }
    getEmployers();

}

// Print all unprinted
printAllButton = document.querySelector(".representative-container #print-button");

printAllButton.onclick = function() {
    if (checkPrinterStatus()) {
        allUnprintedReps = document.querySelectorAll(".representative-container table .unprinted");
        for (var irep = 0; irep < allUnprintedReps.length; irep++) {
            var repName = allUnprintedReps[irep].childNodes[0].textContent;
            var repCompany = allUnprintedReps[irep].childNodes[1].textContent;
            var repTitle = allUnprintedReps[irep].childNodes[2].textContent;
            printLabel(repName, repCompany, repTitle);
            var repId = allUnprintedReps[irep].getAttribute("id");
            repId = repId.split(repIdStart)[1];
            updatePrintingInfo(repId);
        }
        setTimeout(function() {
            updateButton.click();
        }, 300);
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (event.ctrlKey && keyName === "p") {
        printAllButton.click();
    }

    if (event.ctrlKey && keyName === "u") {
        updateButton.click();
    }
}, false);
