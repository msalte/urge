import { themes } from "components/ThemeContext";

export default (yAxisTitle, tooltipSuffix, themeContext) => {
    const isDark = themeContext.theme === themes.dark;

    const options = {
        title: { text: "" },
        chart: {
            type: "spline",
            zoomType: "xy",
            backgroundColor: isDark ? "#666" : "#fff",
        },
        xAxis: {
            title: { text: "" },
            categories: [],
            lineColor: isDark ? "#777" : "#e6e6e6",
            min: 0,
            max: 5,
            scrollbar: {
                enabled: true,
                barBackgroundColor: isDark ? "#333" : "#ccc",
                barBorderColor: isDark ? "#333" : "#ccc",
                trackBackgroundColor: isDark ? "#555" : "#f2f2f2",
                trackBorderColor: isDark ? "#555" : "#f2f2f2",
                buttonBackgroundColor: isDark ? "#666" : "#e6e6e6",
                buttonBorderColor: isDark ? "#444" : "#ccc",
                buttonArrowColor: isDark ? "#ccc" : "#333",
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
                text: yAxisTitle,
                style: { color: isDark ? "#ccc" : "#000" },
            },
            labels: {
                style: {
                    color: isDark ? "#ccc" : "#000",
                },
            },
            gridLineColor: isDark ? "#777" : "#e6e6e6",
        },
        tooltip: { shared: true, valueSuffix: tooltipSuffix },
        series: [],
    };

    return options;
};
