// JavaScript Document

var query = window.location.search.substring(8);
var qs = query.replace(/%20/g, " ").trim();
var jsonObj = JSON.parse(window.sessionStorage.getItem("json"));

window.onload = function () {

    var imgSrc = window.sessionStorage.getItem("recipeImage");
    $("#recipeImgIn").attr("src", imgSrc);
    $.each(jsonObj, function (index, element) {
        if (qs == element.name) {
            $("#recipeHeader").append().text(element.name + " Recipe");

            // Ingedients
            var p = $("<p></p>");
            $("#IngredientsDiv").append(p);
            p.append($("<h2></h2>").addClass("page-header").text("Ingredients"));
            $(element["Ingredients"]).each(function (index, element) {
                var p = $("<p></p>");
                var s = $('<strong />').text(index + 1 + ": ");
                p.prepend(s);
                p.append(element);
                $("#IngredientsDiv").append(p);
            })

            // Directions
            var p = $("<p></p>");
            $("#DirectionsDiv").append(p);
            p.append($("<h2></h2>").addClass("page-header").text("Directions"));
            $(element["Directions"]).each(function (index, element) {

                for (var ele in element) {
                    var p = $("<p></p>");
                    var s = $('<strong />').text(ele + ": ");
                    p.prepend(s);
                    p.append(element[ele])
                    $("#DirectionsDiv").append(p);
                }
            })

            // Nutrition
            var p = $("<p></p>");
            $("#NutritionDiv").append(p);
            p.append($("<h2></h2>").addClass("page-header").text("Nutrition Facts"));
            $(element["Nutrition"]).each(function (index, element) {

                for (var ele in element) {
                    var p = $("<p></p>");
                    var s = $('<strong />').text(ele + ": ");
                    p.prepend(s);
                    p.append(element[ele])
                    $("#NutritionDiv").append(p);
                }
            })

            var p = $("<p></p>");
            $("#notesDiv").append(p);
            p.append($("<h2></h2>").addClass("page-header").text("Notes"));

            var p = $("<p></p>");
            $("#notesDiv").append(p);
            p.text(element["Notes"]);
        }
    })
}