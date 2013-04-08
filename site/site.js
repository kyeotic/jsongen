$(function(){
    var submitButton = $('#tinkerButton');
    var inputBox = $('#tinkerInput');
    var results = $('#tinkerResults');
    
    var starterTemplate = {
        "fathers|5-10": [{
            "married|0-1": true,
                "name": "@MALE_FIRST_NAME @LAST_NAME",
                "sons": null,
                "daughters|0-3": [{
                "age|0-31": 0,
                    "name": "@FEMALE_FIRST_NAME"
            }]
        }]
    };
    
    inputBox.val(JSON.stringify(starterTemplate, undefined, 2));
    
    var getIt = function() {
        var input = JSON.parse(inputBox.val());
        $.ajax({
            url: '/',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({ template: input }),
            success: function (response) {
                console.log(response);
                results.val(JSON.stringify(response, undefined, 2));
            }
        });
    };
    
    submitButton.click(getIt);
    getIt();
});