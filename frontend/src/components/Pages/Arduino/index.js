import React, { useContext } from "react";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import styles from "./styles.scss";
import ThemeContext from "components/ThemeContext";
import { useEnsureNavigationEffect } from "./hooks";
import Chart from "./Chart";
import exhaustOptions from "./exhaustOptions";
import miscOptions from "./miscOptions";
import pressureOptions from "./pressureOptions";

export default ({ match }) => {
    const themeContext = useContext(ThemeContext);

    useEnsureNavigationEffect(match);

    const {
        params: { id },
    } = match;

    const exhaustDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/exhaust/${id}`);
    const pressureDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/pressure/${id}`);
    const miscDataPromise = () =>
        fetch(serviceDiscovery.getArduinoApi() + `/data/misc/${id}`);

    return (
        <div className={styles.arduinoContainer}>
            <Chart
                key={`Exhaust: ${id}`}
                name="Exhaust temperatures (°C)"
                dataPromise={() => exhaustDataPromise()}
                optionsCreatorCallback={data =>
                    exhaustOptions(data, themeContext)
                }
            />
            <Chart
                key={`Pressure: ${id}`}
                name="Pressure (bar)"
                dataPromise={() => pressureDataPromise()}
                optionsCreatorCallback={data =>
                    pressureOptions(data, themeContext)
                }
            />
            <Chart
                key={`Misc.: ${id}`}
                name="Miscellaneous temperatures (°C)"
                dataPromise={() => miscDataPromise()}
                optionsCreatorCallback={data => miscOptions(data, themeContext)}
            />
        </div>
    );
};
