let button = document.getElementById(`search`)
let cityName = document.getElementById(`city`)
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mapIframe = document.getElementById('map');



button.addEventListener(`click`,function(event){
    event.preventDefault();
    const nameOfCity = cityName.value
    const apiKey = `5820c8faff63c6b4504212821d389588`
    const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=${nameOfCity}&appid=${apiKey}`
    const currentDate = new Date();
    const dayName = days[currentDate.getDay()];
    const monthName = months[currentDate.getMonth()];
    const date = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${date} ${monthName}, ${year}`
    

    // Testing with XHR- Old style, i know :)
    //     let request = new XMLHttpRequest()
    //     request.open(`GET`, endPoint, true)
    //     request.send()

    //     request.onreadystatechange = function(){
    //         if(request.readyState === 4 && request.status === 200){
    //             let weatherData = JSON.parse(request.responseText)
    //             console.log(weatherData)

    //             // Using FETCH
    //             fetch()

                
    //             const latitude = weatherData.coord.lat;
    //             const longitude = weatherData.coord.lon;

    //             const mapIframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik`;
                


    //             dataHtml = `                
    //             <div class="left-output">
    //                 <div class="overlay">
    //                     <div class="top-output">
    //                         <div class="left-details">
    //                             <h3>${dayName}</h3>
    //                             <p>${formattedDate}</p>
    //                         </div>

    //                         <div class="right-details">
    //                             <span class="material-symbols-sharp">location_on</span>
    //                             <h4>${nameOfCity}</h4>
    //                         </div>
    //                     </div>

    //                     <div class="mid-ouput">
    //                         <div class="temperature-container">
    //                             <div class="left-temp">
    //                                 <h1>${(weatherData.main.temp-273.15).toFixed(2)}</h1>
    //                                 <p>${weatherData.weather[0].description}</p>
    //                             </div>
    //                             <div class="right-temp">
    //                                 <div class="circle">

    //                                 </div>
    //                                 <p>C</p>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div class="last-output">
    //                         <div class="metrics">
    //                             <div class="data">
    //                                 <h2>0%</h2>
    //                                 <p>Precipitation</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${weatherData.main.humidity}%</h2>
    //                                 <p>Humidity</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${(weatherData.main.feels_like-273.15).toFixed(2)}°</h2>
    //                                 <p>Real feel</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${weatherData.main.sea_level}</h2>
    //                                 <p>Sea Level</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${weatherData.main.pressure}mb</h2>
    //                                 <p>Pressure</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${(weatherData.wind.speed * 3.6).toFixed(2)}km/h</h2>
    //                                 <p>Wind</p>
    //                             </div>
    //                             <div class="data">
    //                                 <h2>${weatherData.visibility}km</h2>
    //                                 <p>Visibility</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //             <div class="right-output">
    //                 <div class="background-map">
    //                 <div class="loading-spinner">Loading map...</div>
    //                     <iframe id="map" width="100%" height="100%"
    //                         style="border:0; border-top-right-radius: 1rem;      border-bottom-right-radius: 1rem;" loading="eager"
    //                         referrerpolicy="no-referrer-when-downgrade" src="${mapIframeSrc}">
    //                     </iframe>

    //                 </div>
    //             </div>`       

    //             document.querySelector(`.output-container`).innerHTML = dataHtml

    //         }
        
    //     }

    // })


    // Using fetch method

    fetch(endPoint).then((response)=>{
        return response.json()
    }).then((weatherData)=>{
        console.log(weatherData)
        const latitude = weatherData.coord.lat;
        const longitude = weatherData.coord.lon;

        const mapIframeSrc = getMapUrl(latitude, longitude)
        


        dataHtml = `                
        <div class="left-output">
            <div class="overlay">
                <div class="top-output">
                    <div class="left-details">
                        <h3>${dayName}</h3>
                        <p>${formattedDate}</p>
                    </div>

                    <div class="right-details">
                        <span class="material-symbols-sharp">location_on</span>
                        <h4>${nameOfCity}</h4>
                    </div>
                </div>

                <div class="mid-ouput">
                    <div class="temperature-container">
                        <div class="left-temp">
                            <h1>${(weatherData.main.temp-273.15).toFixed(2)}</h1>
                            <p>${weatherData.weather[0].description}</p>
                        </div>
                        <div class="right-temp">
                            <div class="circle">

                            </div>
                            <p>C</p>
                        </div>
                    </div>
                </div>

                <div class="last-output">
                    <div class="metrics">
                        <div class="data">
                            <h2>0%</h2>
                            <p>Precipitation</p>
                        </div>
                        <div class="data">
                            <h2>${weatherData.main.humidity}%</h2>
                            <p>Humidity</p>
                        </div>
                        <div class="data">
                            <h2>${(weatherData.main.feels_like-273.15).toFixed(2)}°</h2>
                            <p>Real feel</p>
                        </div>
                        <div class="data">
                            <h2>${weatherData.main.sea_level}</h2>
                            <p>Sea Level</p>
                        </div>
                        <div class="data">
                            <h2>${weatherData.main.pressure}mb</h2>
                            <p>Pressure</p>
                        </div>
                        <div class="data">
                            <h2>${(weatherData.wind.speed * 3.6).toFixed(2)}km/h</h2>
                            <p>Wind</p>
                        </div>
                        <div class="data">
                            <h2>${weatherData.visibility}km</h2>
                            <p>Visibility</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-output">
            <div class="background-map">
            <div class="loading-spinner">Loading map...</div>
                <iframe id="map" width="100%" height="100%"
                    style="border:0; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem;" loading="eager"
                    referrerpolicy="no-referrer-when-downgrade" src="${mapIframeSrc}">
                </iframe>

            </div>
        </div>`       

        document.querySelector(`.output-container`).innerHTML = dataHtml

        const mapIframe = document.getElementById(`map`)
        mapIframe.onload = function(){
            let spinner = document.querySelector(`.loading-spinner`)
            spinner.style.display = `none`
        }

    }).catch((error)=>{
        console.error(`Failed to fetch:`)
    })
})

let mapCache = {};

function getMapUrl(latitude, longitude) {
    const cacheKey = `${latitude},${longitude}`;
    if (mapCache[cacheKey]) {
        return mapCache[cacheKey]; // Return cached URL
    }
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.05},${latitude - 0.05},${longitude + 0.05},${latitude + 0.05}&layer=mapnik`;
    mapCache[cacheKey] = url; // Cache the URL
    return url;
}