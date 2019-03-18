import moment from "moment";
import baseOptions from "./base";

export default (data, themeContext) => {
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

    const base = baseOptions("Pressure (bar)", "bar", themeContext);

    const options = Object.assign({}, base, {
        xAxis: {
            ...base.xAxis,
            categories,
        },
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
    });

    return options;
};
