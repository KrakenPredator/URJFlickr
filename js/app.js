{
    $(function() {
        $('#findButton').click(validar);
        function validar() {
            var text = $("#searchField").val();
            getPhotosByText(text);
        }

        $("#searchField").keypress(function(e) {
            if(e.which == 13) {
                var text = $("#searchField").val();
                getPhotosByText(text);
            }
        });

        function showAllPhotos(info) {
            $('#cuerpo').replaceWith('<main id="cuerpo">' +
                '<div class="container" id="imagenes">' +
                '<div class="row portfolio" id="portfolio">' +
                '</div>' +
                '</div>' +
                '</main>');
            for (var i = 0; i < info.photos.photo.length; i++) {
                var item = info.photos.photo[i];
                var urlm = 'https://farm' + item.farm + ".staticflickr.com/" + item.server
                    + '/' + item.id + '_' + item.secret + '_m.jpg';
                var url = 'https://farm' + item.farm + ".staticflickr.com/" + item.server
                    + '/' + item.id + '_' + item.secret + '_o.png';
                console.debug(url);

                $('<div class="col-sm-6 col-md-3"><div id="contenedorMiniatura" class="thumbnail"><span class="glyphicon glyphicon-plus-sign"></span> Añadir'
                    +'<img id="imagenMiniatura" class="img-responsive" src="'+urlm+'" data-toggle="modal" data-target="#'+item.id+'"></div>').appendTo('#portfolio');

                $('<div class="modal fade" id="' + item.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog" id="preview">' +
                    '<div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">'
                    + '<span aria-hidden="true">×</span><span class="sr-only">Close</span></button>'
                    + '<h4 class="modal-title" id="myModalLabel">' + item.title + '</h4> </div>' +
                    '<div class="modal-body"> <img class="img-responsive" src="' + url + '" alt="The awesome description"> </div></div>').appendTo('#cuerpo');
            }
        }

        function getPhotosByText(text){
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.photos.search' +
                '&api_key=' + api_key + '&text=' + text + '&format=json&nojsoncallback=1',showAllPhotos);
        }

        /*function getPhotosByUsername(userName){
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.people.findByUsername' +
                '&api_key=' + api_key + '&username=' + userName + '&format=json&nojsoncallback=1',getPhotosById);
        }

        function getPhotosById(info) {
            var usuario = info.user;
            $.getJSON('https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key='
                + api_key + '&user_id=' + usuario.id + '&format=json&nojsoncallback=1', showAllPhotos);
        }*/
    })
}