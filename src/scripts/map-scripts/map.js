//Map's callback function
    var initMap = () => {
        let map,
            infoWindow,
            latLong,
            marker;
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -34.397,
                lng: 150.644
            },
            zoom: 10
        });
        
        
        infoWindow = new google.maps.InfoWindow;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                //infoWindow.setPosition(pos);
                //infoWindow.setContent('Location Found...');
                //infoWindow.open(map);
                map.setCenter(pos);
                marker = new google.maps.Marker({
                    position: pos,
                    map: map
                });
            }, function(){
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    
    let handleLocationError = (browserhasGeoLocation, infoWindow,pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserhasGeoLocation ?
                              'Error: The Geolocation service failed.':
                              'Error: Your browser doen not support Geolocation');
        
        infoWindow.open(map);
    }
