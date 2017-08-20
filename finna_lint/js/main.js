//defining the searched words
var searchWord1 = 'seksuaaliset vähemmistöt';
var searchWord2 = 'lhbt';

$(function () {

    // getting the pictures using finna api
    function getPictures(pictureSearch1, pictureSearch2) {
        console.log('getPictures');
        $.ajax({
            'url': 
            'https://api.finna.fi/v1/search?lookfor=' + pictureSearch1 + '+OR+' 
            + pictureSearch2 + '&filter[]=online_boolean:"1"&filter[]=format:"0/Image/',
            'dataType': 'json',
            'success': onGetPictures
        });
    }

    //getting the url:s and adding the pictures to html
    function onGetPictures(obj) {

        if (obj) {
            var records = obj.records;

            var pictureAddress = records.map(
                function (rec) {
                    return rec.images;
                }
            );
            console.log(pictureUrl);
        } else {
            console.log('Not found!');
        }

        //This function should be in two parts but I did not know how to do it....
        var firstPictureUrl = 'https://api.finna.fi' + pictureAddress[0];

        $('#carousel').append('<div class="item active" id="item"><img src="' 
        + firstPictureUrl + '" alt="pic"></div>');

        for (var i = 1; i < pictureAddress.length; i++) {

            var pictureUrl = 'https://api.finna.fi' + pictureAddress[i];
            console.log(pictureUrl);
            $('#carousel').append('<div class="item"><img src="' + pictureUrl 
            + '" alt="pic"></div>');

        }


    }

    getPictures(searchWord1, searchWord2);

    /*function getBooks(searchBook) {
     console.log('getPictures');
     $.ajax({
         'url': 'https://api.finna.fi/v1/search?lookfor=' + searchBook + '&filter[]=online_boolean:"1"&filter[]=format:"0/Book/',
         'dataType': 'json',
         'success': onGetBooks
     });
 }

 function onGetBooks(obj) {
         
     if (obj) {
         var bookRecords = obj.records;

         var bookNames = bookRecords.map(
             function(rec) {
                 return rec.title;
             }
         );

         

         //$('#result').append(bookNames.join(', ') + '<br>');
         console.log(bookNames);
     } else {
         console.log('Not found!');
     }

     for (var i=0; i<bookNames.length; i++){

         var singleBook = bookNames[i];

         $('#result').append('<li>' + singleBook + '</li>');

     }
 }



$('#searchButton').click(function () {
    $('#result').empty();
  var searchValue = $('#searchInput').val();
    console.log(searchValue);
     getBooks(searchValue);
 });*/
});