import React from 'react';

const WeatherDay = (props) => {
    var dateObj = new Date(props.stat.weatherDate)
    var weekday = dateObj.toLocaleString("default", { weekday: "short" })
    // console.log(weekday);
    // console.log(props.stat.weatherDate.split(" "))
    return (
        <div>

            <div class="card bg-light" style={{ width: "14rem" }}>
                <div class="card-header"><p>{props.stat.weatherDate.split("-").reverse().join("-")}</p></div>
                <div class="card-body" onClick={() => props.selectedDay(props.stat.id) }>
                    <h4 class="card-title"> <p>{weekday}</p></h4>
                    <img src={props.stat.weatherImage} alt="this is weather image" />
                    <p>{props.stat.weatherDesc}</p>
                    <p>Min-temp: {props.stat.minTemp}</p>
                    <p>Max-temp: {props.stat.maxTemp}</p>
                </div>
            </div>
        </div>
    );
}

export default WeatherDay;
