import React, { Component } from 'react';
import axios from 'axios';
import DayDataList from './DayDataList/DayDataList'

class DayData extends Component {
    state = {
        days: [
            { id: 1, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 2, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 3, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 4, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 5, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 6, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 7, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" },
            { id: 8, weatherTime: "", weatherImage: "", weatherDesc: "", minTemp: "", maxTemp: "" }
        ],
    }

    componentDidMount() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&units=metric&appid=6719f8ac47f8290dedc157d8b54f6433`)
            .then(response => {
                var weatherData = [], tempData = [], time = [];

                for (var i = (this.props.id-1)*8,j=0; j < 8; i++,j++) {
                        weatherData.push(response.data.list[i].weather);
                        tempData.push(response.data.list[i].main)
                        time.push(response.data.list[i].dt_txt);
                }
                console.log(weatherData);
                console.log(tempData);
                console.log(time);

                for (i = 0; i < weatherData.length; i++) {
                    const statFound = this.state.days.find(day => day.id === i + 1);
                    statFound.weatherTime = time[i]
                    statFound.weatherImage = `http://openweathermap.org/img/wn/${weatherData[i][0].icon}@2x.png`;
                    statFound.weatherDesc = weatherData[i][0].description;
                    statFound.minTemp = tempData[i].temp_min;
                    statFound.maxTemp = tempData[i].temp_max;

                    const duplicatedays = this.state.days.filter(day => day.id !== i + 1);
                    this.setState({
                        stats: [...duplicatedays, statFound]
                    })
                }
            }).catch(err => {
                console.log("ERROR - ", err);
            })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.id !== this.props.id||prevProps.city !== this.props.city){
            this.componentDidMount()
        }
    }


    render() {
        console.log(this.props.id)
        return (
            <div>
                <h3 className="text-success">Daily Data</h3>
                <DayDataList days={this.state.days}/>
                <hr />
            </div>
        );
    }
}

export default DayData;

