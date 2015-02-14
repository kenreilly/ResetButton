"use strict";

// IE 10 Mobile Viewport Fix
(function () {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
        var msViewportStyle = document.createElement("style");
        msViewportStyle.appendChild(
          document.createTextNode("@-ms-viewport{width:auto!important}")
        );
        document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
    }
})();

$(".btn-reset").click(function () {
    //$(this).removeClass("btn-danger").addClass("btn-success");
    //$("h1")[0].innerText = "SUCCESS!"
    
    $.ajax({ url: "getQuote" }).done(function(result) {
        $("h1").addClass("hidden");
        $(".btn-reset").addClass("hidden");
        $("h2.quote").removeClass("hidden").html(result.randomQuote.quote);
        $("h3.author").removeClass("hidden").html("- " + result.randomQuote.author);
    });
});

