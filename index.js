
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// [START maps_map_simple]
let map;

const myLatLng = { lat: -40.600, lng: -73.050 };


async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 8,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hola InMundo!",
    draggable: true
  });
}

function showResults(data) {
  const container = document.getElementById('result-grop-conditions')

  container.textContent = data.message == 'OK'
    ? 'Tu cultivo de soya SI puede ser factible en esta ubicación'
    : 'Tu cultivo de soya NO puede ser factible en esta ubicación'
  
  if (data.message == 'OK') {
    container.classList.remove('bg-danger')
    container.classList.toggle('bg-success')
  } else {
    container.classList.remove('bg-success')
    container.classList.toggle('bg-danger')
  }
  
}

const form = document.getElementById('dataForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = Object.fromEntries(new FormData(e.target))

  Object.keys(data).forEach((key) => data[key] = parseFloat(data[key]))

  const response = await fetch(
    'https://us-central1-academia-boolean.cloudfunctions.net/globantDevFest',
    { method: 'POST', body: JSON.stringify(data)}
  )
  const responseData = await response.json()
  
  showResults(responseData)
})


initMap();