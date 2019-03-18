import moment from "moment";
import baseOptions from "./base";

export default (data, themeContext) => {
    const { entries } = data;

    const categories = entries.map(d => moment(d.timestamp).format("HH:mm:ss"));

    const sensor1Data = entries.map(d => d.sensor1);
    const sensor2Data = entries.map(d => d.sensor2);
    const sensor3Data = entries.map(d => d.sensor3);
    const sensor4Data = entries.map(d => d.sensor4);
    const sensor5Data = entries.map(d => d.sensor5);
    const sensor6Data = entries.map(d => d.sensor6);
    const averageData = entries.map(d =>
        parseFloat(Number(d.average).toFixed(2))
    );

    const base = baseOptions("Temperature (°C)", "°C", themeContext);

    const options = Object.assign({}, base, {
        xAxis: {
            ...base.xAxis,
            categories,
        },
        series: [
            {
                name: "Sensor 1",
                yAxis: 0,
                data: sensor1Data,
            },
            {
                name: "Sensor 2",
                yAxis: 0,
                data: sensor2Data,
            },
            {
                name: "Sensor 3",
                yAxis: 0,
                data: sensor3Data,
            },
            {
                name: "Sensor 4",
                yAxis: 0,
                data: sensor4Data,
            },
            {
                name: "Sensor 5",
                yAxis: 0,
                data: sensor5Data,
            },
            {
                name: "Sensor 6",
                yAxis: 0,
                data: sensor6Data,
            },
            {
                name: "Average",
                yAxis: 0,
                data: averageData,
            },
        ],
    });
    return options;
};
