let mapOptions = {
    center:[23.00, 82.00],
    zoom:14,
    minZoom: 12
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '© <a href="http://openstreetmap.org" target="_blank">OpenStreetMap</a>'
});
map.addLayer(layer);
map.locate({setView: true, maxZoom: 18});

let locateIcon = L.control.locate().addTo(map);
locateIcon.start();

let marker = null;
map.on('click', (event)=> {

    if(marker !== null){
        map.removeLayer(marker);
    }

    marker = L.marker([event.latlng.lat , event.latlng.lng]).addTo(map);

    document.getElementById('loc_latitude').value = event.latlng.lat;
    document.getElementById('loc_longitude').value = event.latlng.lng;
    
})