import React, { Component } from 'react';
import axios from 'axios';
import WeatherList from './WeatherList/WeatherList';
import DayData from './DayData/DayData'


class weatherMain extends Component {
    state = {
        stats: [
            { id: 1, weatherDate: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 2, weatherDate: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 3, weatherDate: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 4, weatherDate: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 5, weatherDate: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" }
        ],
        city : "DELHI",
        citySearch : "DELHI",
        selectedDayId: null
    }

    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=6719f8ac47f8290dedc157d8b54f6433`)
            .then(response => {
                var weatherData = [], tempData = [];

                for (var i = 0; i < response.data.list.length; i++) {
                    if (i % 8 == 0) {
                        weatherData.push(response.data.list[i].weather);
                        tempData.push(response.data.list[i].main)
                    }
                }

                for (i = 0; i < weatherData.length; i++) {
                    const statFound = this.state.stats.find(stat => stat.id === i + 1);
                    statFound.weatherDate = response.data.list[i * 8].dt_txt.split(" ")[0];
                    statFound.weatherImage = `http://openweathermap.org/img/wn/${weatherData[i][0].icon}@2x.png`;
                    statFound.weatherDesc = weatherData[i][0].description;
                    statFound.minTemp = tempData[i].temp_min;
                    statFound.maxTemp = tempData[i].temp_max;

                    const duplicatestats = this.state.stats.filter(stat => stat.id !== i + 1);
                    this.setState({
                        stats: [...duplicatestats, statFound]
                    })
                }
            }).catch(err => {
                console.log("ERROR - ", err);
            })
    }


    componentDidUpdate(prevProps, prevState){
        if(prevState.city !== this.state.city){
            this.componentDidMount()
        }
    }

    onSelectedDay = id => {
        this.setState({
            selectedDayId: id
        })
    }

    handleBodyChange = event =>{
        event.preventDefault();
        this.setState({
            citySearch : event.target.value
        })
    }

    oncityChange = event => {
        event.preventDefault();
        var a = this.state.citySearch
        a = a.toUpperCase()
        this.setState({
            city : a,
            selectedDayId : null
        })
    }

    onclose = event => {
        event.preventDefault();
        this.setState({
            selectedDayId : null
        })
    }

    render() {
        let dayData = null, closeBtn = null;

        if (this.state.selectedDayId) {

            dayData = <DayData id={this.state.selectedDayId} city={this.state.city}/>
            closeBtn = <button type = "button" class = "btn btn-info btn-block" onClick={this.onclose}>Close</button>
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">WeatherApp</a>
                        <form className="d-flex ">
                            <input className="form-control me-2" type="search" style={{textTransform: 'uppercase'}} onChange={this.handleBodyChange} placeholder="Enter City" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" onClick={this.oncityChange}>Search</button>
                        </form>
                    </div>
                </nav>

                    <h3 className="bg-primary text-white"> WEATHER</h3>
                    <div className="container" > 
                        
                    <WeatherList stats={this.state.stats}
                    onSelectedDay={id => this.onSelectedDay(id)}/>
                    <hr/>
                    {dayData}
                    <hr />
                    {closeBtn}
                    </div>
            </div>
        );
    }
}

export default weatherMain;
