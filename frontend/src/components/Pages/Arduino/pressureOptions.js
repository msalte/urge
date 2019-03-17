import { themes } from "components/ThemeContext";
import moment from "moment";

export default (data, themeContext) => {
    const isDark = themeContext.theme === themes.dark;

    const { entries } = data;

    const categories = entries.map(d => moment(d.timestamp).format("HH:mm:ss"));

    const beforeIntercoolerData = entries.map(d => d.beforeIntercooler);
    const afterInercoolerData = entries.map(d => d.afterIntercooler);
    const oilEngineData = entries.map(d => d.oilEngine);
    const oilTurboData = entries.map(d => d.oilTurbo);
    const waterInjectionData = entries.map(d => d.waterInjection);
    const manifoilData = entries.map(d => d.manifoil);
    const fuelData = entries.map(d => d.fuel);

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
                text: "Pressure (bar)",
                style: { color: isDark ? "#ccc" : "#000" },
            },
            labels: {
                style: {
                    color: isDark ? "#ccc" : "#000",
                },
            },
            gridLineColor: isDark ? "#777" : "#e6e6e6",
        },
        tooltip: { shared: true, valueSuffix: " bar" },
        series: [
            {
                name: "Before Intercooler",
                yAxis: 0,
                data: beforeIntercoolerData,
            },
            {
                name: "After Intercooler",
                yAxis: 0,
                data: afterInercoolerData,
            },
            {
                name: "Oil Engine",
                yAxis: 0,
                data: oilEngineData,
            },
            {
                name: "Oil Turbo",
                yAxis: 0,
                data: oilTurboData,
            },
            {
                name: "Water Injection",
                yAxis: 0,
                data: waterInjectionData,
            },
            {
                name: "Manifoil",
                yAxis: 0,
                data: manifoilData,
            },
            {
                name: "Fuel",
                yAxis: 0,
                data: fuelData,
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
