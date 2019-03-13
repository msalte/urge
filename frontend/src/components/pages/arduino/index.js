import React, { useState, useEffect, useContext } from "react";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import styles from "./styles.scss";
import highcharts from "highcharts/highstock";
import HighchartsRect from "highcharts-react-official";
import Spinner from "components/Spinner";
import NavigationContext from "components/NavigationContext";
import ThemeContext, { themes } from "components/ThemeContext";

const renderChart = (data, themeContext) => {
    const isDark = themeContext.theme === themes.dark;

    const categories = data.map(d => d.timestamp);
    const sensor1Data = data.map(d => d.sensor1);
    const sensor2Data = data.map(d => d.sensor2);
    const sensor3Data = data.map(d => d.sensor3);
    const sensor4Data = data.map(d => d.sensor4);
    const sensor5Data = data.map(d => d.sensor5);
    const sensor6Data = data.map(d => d.sensor6);

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
                text: "Temperature",
                style: { color: isDark ? "#ccc" : "#000" },
            },
            labels: {
                style: {
                    color: isDark ? "#ccc" : "#000",
                },
            },
            gridLineColor: isDark ? "#777" : "#e6e6e6",
        },
        tooltip: { shared: true },
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
        ],
    };

    return (
        <div className={styles.chart}>
            <HighchartsRect options={options} highcharts={highcharts} />
        </div>
    );
};

export default ({
    match: {
        params: { id },
    },
}) => {
    const navContext = useContext(NavigationContext);
    const themeContext = useContext(ThemeContext);

    const [data, setData] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const {
            locations,
            activeLocation,
            activeSubMenuItem,
            locations: {
                arduino: {
                    subMenu: { items },
                },
            },
        } = navContext;

        if (locations.arduino !== activeLocation) {
            navContext.setActiveLocation(locations.arduino);
        }

        if (!activeSubMenuItem) {
            const subMenuItem = items.find(i => i.link.indexOf(id) !== -1);

            if (subMenuItem) {
                navContext.setActiveSubMenuItem(subMenuItem);
            }
        }
    }, [navContext]);

    useEffect(() => {
        setFetching(true);
        fetch(serviceDiscovery.getSpaApi() + "/data/arduino")
            .then(data => {
                setData(data);
                setFetching(false);
            })
            .catch(error => {
                setError(error);
                setFetching(false);
            });
    }, [id]);

    if (error) {
        console.error(error);
    }

    return (
        <div className={styles.arduinoContainer}>
            {isFetching && <Spinner floating text="Loading data..." />}
            {!isFetching && data && renderChart(data, themeContext)}
        </div>
    );
};
