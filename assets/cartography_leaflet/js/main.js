//define boundaries of Area of Interest since further panning outside of it is unnecessary
var southWest = L.latLng(47.865, 12.9),
    northEast = L.latLng(47.715, 13.2),
    bounds = L.latLngBounds(southWest, northEast);

//create a map variable with defined main elements
var map = L.map("map",
 {
    center: [47.797, 13.05],
    zoom: 12,
    minZoom: 13,
    maxBounds: bounds,
    zoomControl: false
 }
);

var zoomHome = new L.Control.ZoomHome({zoomHomeTitle: 'Home',
homeCoordinates: [47.797, 13.05]
});
zoomHome.addTo(map);

//basemap 1 (CartoDB_Voyager) - default basemap
var CartoDB_Voyager = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
).addTo(map);

//basemap 2 (Esri WorldStreetMap)
var Esri_WorldStreetMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
  }
).addTo(map);

//baseMaps variable to hold and store them in the layers control
var baseMaps = {
  "Esri_WorldStreetMap basemap": Esri_WorldStreetMap,
  "CartoDB_Voyager basemap": CartoDB_Voyager,
};


//ICONS
//function that generates each passed icon from the iconUrlList and is furtherly used in generateJSONpoint function
function generateIcon(iconUrl) {
  var passIconUrl = L.icon({
    iconUrl: iconUrl,
    iconSize: [50, 50],
  });
  return passIconUrl;
}

//List of vector images used as icons for point feature representation(icons are personally created in Inkscape software)
const iconUrlList = [
  "css/images/dormitory-icon.svg",
  "css/images/university-icon.svg",
  "css/images/library-icon.svg",
];

//POPUP SECTION
/*closes a popup by modifying a style.display to 'none' and deletes 
previously generated functionalities in it so that new ones can take place*/
function closePopup() {
  let popup = document.getElementById("sidePopup");
  popup.style.display = "none";
  containerElement.innerHTML = null;
}

//if element is clicked in openPopup() popup, it finds its coordinates, opens and zooms to it
function goToSelected(element, type) {
  let popup = document.getElementById("sidePopup");
  popup.style.display = "none";
  if (type.name == "POI_dormitory") {
    let dormitory2 = dormitory.features;
    for (let i = 0; i < dormitory2.length; ++i) {
      if (element.id == dormitory2[i].properties.fid) {
        let coord = dormitory2[i].geometry.coordinates;
        for (let j = 0; j < markers.length; ++j) {
          if (
            markers[j]._latlng.lat == coord[1] &&
            markers[j]._latlng.lng == coord[0]
          ) {
            markers[j].openPopup();
            map.setView([coord[1], coord[0]], 18);
            break;
          }
        }
        break;
      }
    }
  } else if (type.name == "POI_university") {
    let university2 = university.features;
    for (let i = 0; i < university2.length; ++i) {
      if (element.id == university2[i].properties.fid) {
        let coord = university2[i].geometry.coordinates;
        for (let j = 0; j < markers.length; ++j) {
          if (
            markers[j]._latlng.lat == coord[1] &&
            markers[j]._latlng.lng == coord[0]
          ) {
            markers[j].openPopup();
            map.setView([coord[1], coord[0]], 18);
            break;
          }
        }
        break;
      }
    }
  }
  containerElement.innerHTML = null;
}

//function with predefined variables(in order to be accessed globaly) that handles and displays elements as divisions inside a sidePopupContainer division
var element;
var containerElement;
function openPopup(type) {
  if (document.getElementById("sidePopup").style.display == "block") {
    let popup = document.getElementById("sidePopup");
    popup.style.display = "none";
  } else {
    
    
    let backgroundColor;
    let color;
    let currentlySelectedObjectTypeCollection = [];
    if (type == "dormitory") {
      currentlySelectedObjectTypeCollection = dormitory.features;
      backgroundColor = "#c6e9afff";
      color = "#626262" 
    } else if (type == "university") {
      currentlySelectedObjectTypeCollection = university.features;
      backgroundColor = "#ffd5d5ff";
      color = "#626262"; 
     }
    
    containerElement = document.getElementById("sidePopupContent");
    for (let i = 0; i < currentlySelectedObjectTypeCollection.length; ++i) {
      element = document.createElement("div");
      element.innerHTML +=
        '<div style="padding: 5px; border: 1px solid; border-radius: 5px; background-color:'+ backgroundColor +';font-weight: bold; border-color: black;color:'+ color +'" id="' +
        currentlySelectedObjectTypeCollection[i].properties.fid +
        '" onclick="goToSelected(this,' +
        type +
        ')">' +
        currentlySelectedObjectTypeCollection[i].properties.name +
        "</div>";
        
      containerElement.appendChild(element);
    }
    document.getElementById("sidePopup").style.display = "block";
  } 
}

var markers = [];
var selectedTypeForPopup = ["dormitory", "university", "library"];

/*function with such parameters that it will generate 3 datasets with
respective icons and popups*/
function generateJSONpoint(geoJSONname, iconList) {
  geoFeature = L.geoJSON(geoJSONname, {
    onEachFeature: function (feature, layer) {

      //Generate and on click open the respective popup with its feature list
      function typePopup(type) {
        var newType = type.charAt(0).toUpperCase() + type.slice(1);
        var returnTypeName = "<br><b> Type: </b><br>" + newType;

        var typeInfo;
        if (newType == "Dormitory") {
          typeInfo =
            '<span id="dormitory" style="color: blue; cursor: pointer" onclick="openPopup(selectedTypeForPopup[0])">(info)</span>';
        } else if (newType == "University") {
          typeInfo =
            '<span id="university" style="color: blue; cursor: pointer" onclick="openPopup(selectedTypeForPopup[1])">(info)</span>';
       } else {
           typeInfo = '';
         }

        return returnTypeName + " " + typeInfo;
      }

      //if website url exists, display and make it responsive
      var displayWebsite = feature.properties.Website;
      if (displayWebsite === null) {
        displayWebsite = "";
      } else {
        displayWebsite =
          '<a href="' + displayWebsite + '"target=_blank>Visit Website</a>';
      }

      //displays contact number if it exists
      var displayNumber = feature.properties["Contact number"];
      if (displayNumber === null) {
        displayNumber = "";
      } else {
        displayNumber =
          "<br><b> Contact number: </b><br>" +
          feature.properties["Contact number"];
      }

      layer.bindPopup(
        "<b>Name: </b><br>" +
          feature.properties.name +
          typePopup(feature.properties.type) +
          "<br><b> Address: </b><br>" +
          feature.properties.Address +
          displayNumber +
          "<br><br>" +
          displayWebsite
      );
      markers.push(layer);
    },
    pointToLayer: function (point, latlng) {
      return L.marker(latlng, { icon: iconList });
    },
  }).addTo(map);

  return geoFeature;
}


  //names of features listed as their variables are named in geoJSON files
  var featureList = [dormitory, university, library];
  var featureNameList = [];
  var groupLayers = new L.FeatureGroup();

  //iterate through featureList in order to generate point features and their corresponding icons
  for (var i = 0; i < featureList.length; i++) {
    featureNameList[i] = generateJSONpoint(
      featureList[i],
      generateIcon(iconUrlList[i])
    );
    groupLayers.addLayer(featureNameList[i]);
  }

  //include all features with corresponding icons to be listed in the layers
  var features = {
    "<img src = 'css/images/dormitory-icon.svg' width='40' height='40'> <font size='+1'>Dormitories</font>":
      featureNameList[0],
    "<img src = 'css/images/university-icon.svg' width='40' height='40'> <font size='+1'>Universities</font>":
      featureNameList[1],
    "<img src = 'css/images/library-icon.svg' width='40' height='40'> <font size='+1'>Library</font>":
      featureNameList[2],
  };

  //set up Leaflet search, scale and layers controls
  L.control.search({layer: groupLayers, initial: false, propertyName: "name", zoom: 18, hideMarkerOnCollapse: true}).addTo(map);
  L.control.scale({ position: "bottomleft", imperial: false }).addTo(map);
  L.control.layers(baseMaps, features, { position: "topleft" }).addTo(map);

