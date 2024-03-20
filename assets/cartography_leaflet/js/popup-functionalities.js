function closePopup() {
    let popup = document.getElementById("sidePopup");
    popup.style.display = "none";
    while (popup.firstChild) {
      popup.removeChild(popup.firstChild);
       }
  }
  
  function goToSelected(element, type) {
    let popup = document.getElementById("sidePopup");
    popup.style.display = "none";
    if(type.name == 'POI_dormitory') {
      let dormitory2 = dormitory.features;
      for (let i = 0; i < dormitory2.length; ++i) {
        if (element.id == dormitory2[i].properties.fid) {
          let coord = dormitory2[i].geometry.coordinates;
          for (let j = 0; j < markers.length; ++j) {
            if (
              markers[i]._latlng.lat == coord[1] &&
              markers[i]._latlng.lng == coord[0]
            ) {
              markers[i].openPopup();
              break;
            }
          }
          break;
        }
      }
    } else if(type.name == 'POI_university') {
  
    } else if(type.name == 'POI_library') {
      
    }
    
  }
  
  
  
  function openPopup(type) {
    if (document.getElementById("sidePopup").style.display == "block") {
      let popup = document.getElementById("sidePopup");
      popup.style.display = "none";
      while (popup.firstChild) {
        popup.removeChild(popup.firstChild);
      }
    } else {
      let currentlySelectedObjectTypeCollection = [];
      if (type == "dormitory") {
        currentlySelectedObjectTypeCollection = dormitory.features;
      } else if (type == "university") {
        currentlySelectedObjectTypeCollection = university.features;
      } else if (type == "library") {
        currentlySelectedObjectTypeCollection = library.features;
      }
  
      let containerElement = document.getElementById("sidePopupContent");
      for (let i = 0; i < currentlySelectedObjectTypeCollection.length; ++i) {
        // var elementcreateElementnt = document("div");
        var element = document.createElement("div");
        element.innerHTML +=
          '<div style="padding: 10px" id="' +
          currentlySelectedObjectTypeCollection[i].properties.fid +
          '" onclick="goToSelected(this,' + type + ')">' +
          currentlySelectedObjectTypeCollection[i].properties.name +
          "</div>";
        containerElement.appendChild(element);
      }
      document.getElementById("sidePopup").style.display = "block";
    }
  }
  
  function markerFunction(id) {
    for (var i in markers) {
      var markerID = markers[i].options.title;
      if (markerID == id) {
        markers[i].openPopup();
      }
    }
  }
  
  var markers = [];
  
  var selectedTypeForPopup = ["dormitory", "university", "library"];