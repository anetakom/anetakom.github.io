$(document).ready(
    function()
    {
//tutaj jest kawałek kodu w którym przypisane są zmienne do udostępniania danych
var daneOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var daneORTO = L.tileLayer.wms ("http://mapy.geoportal.gov.pl/wss/service/img/guest/ORTO/MapServer/WMSServer", {layer:"Raster", format:"image/png", transparent: 'true', version:'1.1.1'});
        
var danePanstwo = L.tileLayer.wms("http://localhost:8080/geoserver/projekt_KOM/wms", {layers:"projekt_KOM:panstwo_clip", format:'image/png', version:'1.1.1.'});
var daneWojewodztwa = L.tileLayer.wms("http://localhost:8080/geoserver/projekt_KOM/wms", {layers:"projekt_KOM:wojewodztwa", format:'image/png', version:'1.1.1.'});
var danemapaAS = L.tileLayer.wms("http://localhost:8080/geoserver/projekt_KOM/wms", {layers:"projekt_KOM:MapaAS", format:'image/png', version:'1.1.1.'});
                
      // zmienna przechowująca stylizację danych pobieranych z pliku geojson
        
//var styl_wojewodztwa = {"color": "green"} (to nie powinno być)
        
        // zmienna przechowująca obiekt biblioteki leaflet wywołujący na rzecz obiektu metodę geoJSON.ajax jako adrybuty dla metody podaję adres danych i nazwę zmiennej do stylizacji
        
//var wojewodztwa_qgis = new L.GeoJSON.AJAX("qgiswojewodztwa.geojson",{style: styl_wojewodztwa}); (to nie powinno być)
        
        // wywołanie metody addTo na rzecz obiektu województwa i dodanie danych do okna mojamapa
        
       // wojewodztwa_qgis.addTo(mojamapa);  
        
// tutaj jest obiekt przypisanie do zmiennej obiektu "L" i wywołanie metody .map ktora tworzy mapę o wybranych parametrach
var mojamapa = L.map('mymap',{center:[54.346667, 18.833333], zoom: 15});

        // wywołanie mapy i wprowadzenie do niej danych z OSM
mojamapa.addLayer(daneOSM);
        
 // obsługa obrazka rastrowego z dysku lub strony www
        
var imageUrlUstka = 'ustka.png',
    imageBoundsUstka = [[54.595833, 16.86167], [54.579167, 16.845]];
L.imageOverlay(imageUrlUstka, imageBoundsUstka).addTo(mojamapa);

var imageUrlSobieszewo = 'sobieszewo.png',
    imageBoundsSobieszewo = [[54.346667, 18.833333], [54.333333, 18.815]];
L.imageOverlay(imageUrlSobieszewo, imageBoundsSobieszewo).addTo(mojamapa);
        
// obsługa różnych źródeł danych 
var baseMaps = {
    "OpenStreetMaps": daneOSM,
    "Ortofotomapa": daneORTO,
   
};
var overlays = {
    "GranicaPanstwo": danePanstwo,
    "GranicaWojewodztwa": daneWojewodztwa,
    "MapaMorska": danemapaAS,
    //"GranicaWojewodztwa": wojewodztwa_qgis,
        };
        
// dodanie guzika do przełączania danych między różnymi źródłami
L.control.layers(baseMaps, overlays).addTo(mojamapa);  
        
//dodanie skali
L.control.scale({imperial: false}).addTo(mojamapa);
        
//dodanie lokalizacji i obsługa lokalizacji
        
mojamapa.locate({setView: true, maxZoom: 14});

// funkcja, która wyświetla ikony okręgu w miejscu gdzie się znajdujemy (współrzędne są przesyłane za pomocą zmiennej o nazwie event)        
function zlokalizowano(event){
var radius = event.accuracy/2;
    
//L.marker(event.latlng).addTo(mojamapa);
L.circle(event.latlng, radius).addTo(mojamapa);
        };
        
        mojamapa.on('locationfound',zlokalizowano);

       
        
        
    });

