//DO NOT MODIFY ↓
define([
    'jquery'
], function($) {
    //DO NOT MODIFY ↑

    function initialize() {
        setEvents();
    }

    function setEvents() {
        $(masterStructure)
            .on("Framework:systemReady", function() {
                systemReady();
            })
            .on("Framework:pageLoaded", function() {
                pageLoaded();
            });
    }

    /* is called only once, when the Course has loaded*/
    function systemReady() {
        //console.log("Interactions:systemReady");
    }

    /* is called on every page load, great for adding custom code to all pages*/
    function pageLoaded() {
        //console.log("Interactions:pageLoaded");
        loadFAQ();
        printCert();
    }
    //This inserts the name in the certificate
    function printCert() {
    // This is to get month in text
        function getMonth( localeName) {
        	var d = new Date();
        	var n = d.getMonth();
        	var day = d.getDate();
        	var year = d.getFullYear();
            var objDate = new Date();
            objDate.setDate(1);
            objDate.setMonth(n);

            var locale = localeName || "en-ca",
                month = objDate.toLocaleString(locale, { month: "long" }),
                completeDate="";
                if (lang=="fr"){
                	completeDate=day+" "+month+" "+year;

                } else {
                	completeDate=month+" "+day+", "+year;
                }

            return completeDate;
        }
        var certObj = document.getElementById("b9549ee9-3cef-4068-8c2b-6ab9c802a5d7");
        if (certObj) {
            // certObj.addEventListener("click",print_svg(this));
            // $("#b9549ee9-3cef-4068-8c2b-6ab9c802a5d7").click(print_svg(this));
            var studentName = scorm.api.doLMSGetValue("cmi.core.student_name") || "Name, Surname",
                ChangeStudentName = document.getElementById("CertificateName"),
                ChangeDate = document.getElementById("CertificateDate");
            ChangeStudentName.innerHTML = studentName;
            ChangeDate.innerHTML = getMonth(lang+"-ca");
            window.printMe = print_svg;
        }
    }
    //This is to print the object that was clicked
    function print_svg(o) {
        // console.log("Yes!")
        win = window.open('', 'winPrint', 'status=1,width=800,height=600');
        win.document.write(o.outerHTML);
        win.print();
    }




    //this is for the FAQ favourites.
    function loadFAQ() {
        var itemID;
        //list of learneable items
        for (var i = 0; i < $(".learn-list>li").length; i++) {
            itemID = $(".learn-list>li>.hint").eq(i).attr("id");
            $(".learn-list>li>.hint").eq(i).append("<a data-fav=\"#" + itemID + "\" class='favbtntest'>toggle favourite</a>");
        }
        //this is the list of buttons for a predefined search
        for (i = 0; i < $(".search-list>button").length; i++) {
            $(".search-list>button").eq(i).click(function() {
                var searchText = ($(this).text() === "*") ? "" : $(this).text();
                $(".wb-fltr-inpt").val(searchText)
                var e = jQuery.Event("keyup");
                //e.which = 50; // # Some key code value
                $(".wb-fltr-inpt").trigger(e);

            });
        }
    }



    initialize();

});