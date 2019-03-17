import { themes } from "components/ThemeContext";
import moment from "moment";

export default (data, themeContext) => {
    const isDark = themeContext.theme === themes.dark;

    const { entries } = data;

    const categories = entries.map(d => moment(d.timestamp).format("HH:mm:ss"));

    const tempWaterData = entries.map(d => d.temperatureWater);
    const tempOilData = entries.map(d => d.temperatureOil);
    const tempBeforeIntData = entries.map(d => d.temperatureBeforeIntercooler);
    const tempAfterIntData = entries.map(d => d.temperatureAfterIntercooler);

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
            max: 5,
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
                name: "Water",
                yAxis: 0,
                data: tempWaterData,
            },
            {
                name: "Oil",
                yAxis: 0,
                data: tempOilData,
            },
            {
                name: "Before Intercooler",
                yAxis: 0,
                data: tempBeforeIntData,
            },
            {
                name: "After Intercooler",
                yAxis: 0,
                data: tempAfterIntData,
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
