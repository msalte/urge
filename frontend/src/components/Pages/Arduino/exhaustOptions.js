import { themes } from "components/ThemeContext";
import moment from "moment";

export default (data, themeContext) => {
    const isDark = themeContext.theme === themes.dark;

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

    const options = {
        title: { text: "" },
        chart: {
            type: "spline",
            zoomType: "xy",
            backgroundColor: isDark ? "#666" : "#fff",
        },
        xAxis: {
            title: { text: "" },
            categories: categories,
            lineColor: isDark ? "#777" : "#e6e6e6",
            min: 0,
            max: 10,
            scrollbar: {
                enabled: true,
            },
            tickLength: 0,
            labels: {
                style: {
                    color: isDark ? "#ccc" : "#000",
                },
            },
        },
        legend: {
            itemHiddenStyle: { color: isDark ? "#999" : "#ccc" },
            itemHoverStyle: { color: isDark ? "#ccc" : "#000" },
            itemStyle: {
                color: isDark ? "#ccc" : "#000",
            },
        },
        yAxis: {
            title: {
                text: "Temperature (°C)",
                style: { color: isDark ? "#ccc" : "#000" },
            },
            labels: {
                style: {
                    color: isDark ? "#ccc" : "#000",
                },
            },
            gridLineColor: isDark ? "#777" : "#e6e6e6",
        },
        tooltip: { shared: true, valueSuffix: "°C" },
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
    };

    return options;
};
