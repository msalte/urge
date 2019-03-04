import React, { useState, useEffect, useContext } from "react";
import { fetch } from "../../../global/fetch";
import serviceDiscovery from "../../../global/serviceDiscovery";
import styles from "./styles.scss";
import highcharts from "highcharts/highstock";
import HighchartsRect from "highcharts-react-official";
import Spinner from "../../Spinner";
import NavigationContext, { SideBarItems } from "../../../NavigationContext";
import ThemeContext, { themes } from "../../../ThemeContext";

const renderChart = (data, isDark) => {
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

    return <HighchartsRect options={options} highcharts={highcharts} />;
};

export default () => {
    const navContext = useContext(NavigationContext);
    const themeContext = useContext(ThemeContext);

    const [data, setData] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        navContext.setActiveSideBarItem(SideBarItems.arduino);
    }, []);

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
    }, []);

    if (error) {
        console.error(error);
    }

    return (
        <div className={styles.arduinoContainer}>
            {isFetching && <Spinner text="Loading Arduino data..." />}
            {!isFetching &&
                data &&
                renderChart(data, themeContext.theme === themes.dark)}
        </div>
    );
};
