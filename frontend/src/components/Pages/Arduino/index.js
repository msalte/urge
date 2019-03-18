import React, { useContext } from "react";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import styles from "./styles.scss";
import ThemeContext from "components/ThemeContext";
import { useEnsureNavigationEffect } from "./hooks";
import Chart from "./Chart";
import exhaustOptions from "./chartOptions/exhaust";
import miscOptions from "./chartOptions/misc";
import pressureOptions from "./chartOptions/pressure";

export default ({ match }) => {
    const themeContext = useContext(ThemeContext);

    useEnsureNavigationEffect(match);

    const {
        params: { date },
    } = match;

    const exhaustDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/exhaust/${date}`);
    const pressureDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/pressure/${date}`);
    const miscDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/misc/${date}`);

    return (
        <div className={styles.arduinoContainer}>
            <Chart
                key={`Exhaust: ${date}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustDataPromise()}
                optionsCreatorCallback={data =>
                    exhaustOptions(data, themeContext)
                }
            />
            <Chart
                key={`Pressure: ${date}`}
                name="Pressure (bar)"
                dataPromise={() => pressureDataPromise()}
                optionsCreatorCallback={data =>
                    pressureOptions(data, themeContext)
                }
            />
            <Chart
                key={`Misc.: ${date}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscDataPromise()}
                optionsCreatorCallback={data => miscOptions(data, themeContext)}
            />
        </div>
    );
};
