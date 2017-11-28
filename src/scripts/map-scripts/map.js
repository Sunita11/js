//Map's callback function
    var initMap = () => {
        let map,
            infoWindow,
            latLong,
            marker;
        map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng(2.8, -187.3),
            zoom: 2,
            mapTypeId: 'terrain'
        });
       /*  //alphabets for labeling the markers
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var locations = [
            {lat: 31.563910, lng: 77.154312},
            {lat: 33.718234, lng: 80.363181},
            {lat: 33.727111, lng: 80.371124},
            {lat: 33.848588, lng: 81.209834},
            {lat: 33.851702, lng: 81.216968},
            {lat: 34.671264, lng: 80.863657},
            {lat: 35.304724, lng: 78.662905},
            {lat: 36.817685, lng: 95.699196},
            {lat: 36.828611, lng: 95.790222},
            {lat: 37.750000, lng: 75.116667},
            {lat: 37.759859, lng: 75.128708},
            {lat: 37.765015, lng: 75.133858},
            {lat: 37.770104, lng: 75.143299},
            {lat: 37.773700, lng: 75.145187},
            {lat: 37.774785, lng: 75.137978},
            {lat: 37.819616, lng: 74.968119},
            {lat: 38.330766, lng: 74.695692},
            {lat: 39.927193, lng: 95.053218},
            {lat: 41.330162, lng: 94.865694},
            {lat: 42.734358, lng: 77.439506},
            {lat: 42.734358, lng: 77.501315},
            {lat: 42.735258, lng: 77.438000},
            {lat: 43.999792, lng: 90.463352}
        ];
        var markers = locations.map(function(location,i){
           return new google.maps.Marker({
               position: location,
               label: labels[i % labels.length]
           }) 
        });
        var marketCluster =  new MarkerClusterer(map, markers,{
            imagePath: 'src/images/m'
        });
        */
        
        var script = document.createElement('script');
        script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
        
        document.getElementsByTagName('head')[0].appendChild(script);
        
        window.eqfeed_callback = function(results) {
            for(var i=0;i< results.features.length;i++) {
                var coords = results.features[i].geometry.coordinates;
                var latLng = new google.maps.LatLng(coords[1],coords[0]);
                var marker = new google.maps.Marker({
                    position : latLng,
                    map: map
                });
            }
        }
        
      /*  infoWindow = new google.maps.InfoWindow;
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                //map.setCenter(pos);
               
            }, function(){
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, map.getCenter());
        }*/
    }
    
    let handleLocationError = (browserhasGeoLocation, infoWindow,pos) => {
        infoWindow.setPosition(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserhasGeoLocation ?
                              'Error: The Geolocation service failed.':
                              'Error: Your browser doen not support Geolocation');
        
        infoWindow.open(map);
    }
