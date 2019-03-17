import React, { useState, useEffect } from "react";
import highcharts from "highcharts/highstock";
import HighchartsRect from "highcharts-react-official";
import styles from "./styles.scss";
import Spinner from "components/Spinner";

export default ({ date, name, dataPromise, optionsCreatorCallback }) => {
    const [data, setData] = useState(null);
    const [isFetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () => {
        setFetching(true);
        setError(null);

        dataPromise()
            .then(data => {
                setData(data);
                setFetching(false);
            })
            .catch(error => {
                setFetching(false);
                setError(error);
            });
    };

    if (error) {
        console.log(error);
    }

    useEffect(() => {
        fetchData();
    }, [date]);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.header}>{name}</div>
            <div className={styles.chart}>
                {isFetching && <Spinner text="Loading data..." />}
                {!isFetching && data && (
                    <HighchartsRect
                        options={optionsCreatorCallback(data)}
                        highcharts={highcharts}
                    />
                )}
            </div>
        </div>
    );
};
