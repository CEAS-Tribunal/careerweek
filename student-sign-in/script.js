var labelUri = "https://tribunal.uc.edu/careerweek/student-sign-in/labels/Student.label";
var label = dymo.label.framework.openLabelFile(labelUri);
var paramsXml = dymo.label.framework.createLabelWriterPrintParamsXml({ copies: 1 });

var printerSelected = "";

var checkPrinterStatus = function(name, major, type) {
    if (!printerSelected) {
        alert("Please select a printer before continuing.")
    }
    var printers = dymo.label.framework.getPrinters();
    for(var i = 0; i < printers.length; i++) {
        if (printers[i].name === printerSelected) {
            if (printers[i].isConnected != true) {
                alert("DYMO LabelWriter is not connected. Please connect the printer to continue.");
            } else {
                $.post("student.php",
                {
                    nameText: name,
                    majorText: major,
                    typeText: type,
                })
                .done(function( data ) {
                    if (data != "Success") {
                        alert("There was an error submitting your information.");
                    } else {
                        printLabel(name, major, type);
                    }
                });
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

var printLabel = function(name, major, type) {
    var labelSetXml = new dymo.label.framework.LabelSetBuilder();
    var record = labelSetXml.addRecord();
    record.setText("name", name);
    record.setText("major", major);
    record.setText("type", type);
    dymo.label.framework.printLabel2Async(printerSelected, paramsXml, label.getLabelXml(), labelSetXml);
}

printButton = document.querySelector('form #printButton');

printButton.onclick = function() {
    var name = document.querySelector('form #name');
    var major = document.querySelector('form #major');
    var type = document.querySelector('form #type select');

    if(name.value && major.value && type.value){
        checkPrinterStatus(name.value, major.value, type.value);
        name.value = "";
        major.value = "";
        type.value = "";
    } else {
        alert("Please complete the form before printing.")
    }
}
