// Javascript Document

var jsonObj;
var recipeName;
var query = window.location.search.substring(8);
var qs = query.replace(/%20/g, " ").trim();

$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '../Content/Recipes.json',
        dataType: 'json',
        complete: function (data) {
            jsonObj = data.responseJSON;
        }
    }).done(function () {
        console.log("dont");
    }).fail(function () {
        console.log("fail");
    })
    // Create Web Worker
	/*var worker = new Worker("../Scripts/Ajax_Worker.js");

    worker.onmessage = function (event) {
        jsonObj = event.data;
        window.sessionStorage.setItem("json", JSON.stringify(event.data));
    }
	worker.postMessage("fetch");
	$(".tab").hide();
    $("#recipeImg").hide();
    // Click event for Ingredients URL
    /*$("#recipeHeader").click(function () {
        window.location = 'Recipes/Ingredients?Recipe=' + recipeName.replace(/\s+/g, "%20");
	})*/
	var imgSrc;

    $('.recipeItem').click(function (event) {
        $("#recipeHeader").attr('href', 'Recipes/Ingredients?Recipe=' + event.currentTarget.id.replace(/\s+/g, "%20"));
	    $(".tab").show();
	    $("#recipeImg").show();
        $("#Ingredients").empty();
        $("#Directions").empty();
        $("#Nutrition").empty();
        $("#notes").empty();
        $("#recipeImg").empty();
        imgSrc = jQuery(this).find("img").attr("src");
        $("#recipeImg").attr("src", imgSrc);
        
        $.each(jsonObj, function (index, element) {
            if (event.currentTarget.id == element.name) {
                recipeName = element.name;
                $("#recipeHeader").append().text(element.name + " Recipe");
                var p = $("<p></p>");
                $("#Ingredients").append(p);
                p.append($("<h3></h3>").text("Ingredients"));
                $(element["Ingredients"]).each(function (index, element) {
                    var p = $("<p></p>");
                    var s = $('<strong />').text(index + 1 + ": ");
                    p.prepend(s);
                    p.append(element);
                    $("#Ingredients").append(p);
                })

                // Directions
                var p = $("<p></p>");
                $("#Directions").append(p);
                p.append($("<h3></h3>").text("Directions"));
                $(element["Directions"]).each(function (index, element) {

                    for (var ele in element) {
                        var p = $("<p></p>");
                        var s = $('<strong />').text(ele + ": ");
                        p.prepend(s);
                        p.append(element[ele]);
                        $("#Directions").append(p);
                    }
                })

                // Nutrition
                var p = $("<p></p>");
                $("#Nutrition").append(p);
                p.append($("<h3></h3>").text("Nutrition Facts"));
                $(element["Nutrition"]).each(function (index, element) {

                    for (var ele in element) {
                        var p = $("<p></p>");
                        var s = $('<strong />').text(ele + ": ");
                        p.prepend(s);
                        p.append(element[ele]);
                        $("#Nutrition").append(p);
                    }
                })

                var p = $("<p></p>");
                $("#notes").append(p);
                p.append($("<h3></h3>").text("Notes"));

                var p = $("<p></p>");
                $("#notes").append(p);
                p.text(element["Notes"]);
            }
        })
	})

    $('.IngredientsUrl').click(function (event) {
        if (typeof(imgSrc) == 'undefined')
            imgSrc = jQuery(this).find("img").attr("src");

        window.sessionStorage.setItem("recipeImage", "../"+imgSrc);
    })

    // Nav bar hover color
    $(".navbar-nav > li").on("click", function () {
        $(".navbar-nav > li").removeClass("active");
        $(this).addClass("active");
    })

    // Recipe list click color
    $(".recipeItem").click(function () {
        $("#divPadding").css("cssText", "background-color:#333");
        $("#divPadding > div").css("cssText", "background-color:#fff");
        $(".recipeItem").css("cssText", "");
        $(this).css("cssText", "background-color:#333; color:#fff");


        $('[data-toggle="tooltip"]').tooltip('show');
        setTimeout(function () { $('[data-toggle="tooltip"]').tooltip('hide'); }, 3000);
    })
})

// Tab control code
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}