/**
 * js de test_twig
 */

console.log("entra al ajax");
$(document).ready(function () {
   getInfoInicial();
});


function getInfoInicial(){
    console.log("twig por ajax");
    $.ajax({
        type: "POST",
        url: "/test_twig",
        data: {id: 'varporajax'},
        
        success: function (response) {
            console.log(response);
            
        }
    });
}