import React, { useState } from "react";
import styles from "./styles.scss";
import { useEnsureNavigationEffect } from "../hooks";
import Card from "components/Card";
import FileInput from "components/FileInput";
import Button from "components/Button";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";
import moment from "moment";

const BLOB_URI = "https://urgestorage.blob.core.windows.net";
const BLOB_CONTAINER = "sensordata";

const upload = files => {
    if (!window.AzureStorage) {
        console.error("AzureStorage was not found.");
        return;
    }

    const blob = window.AzureStorage.Blob;

    fetch(serviceDiscovery.getArduinoApi() + "/sas/upload", true).then(
        token => {
            const azService = blob.createBlobServiceWithSas(BLOB_URI, token);

            for (var i = 0; i < files.length; i++) {
                const file = files[i];

                azService.createBlockBlobFromBrowserFile(
                    BLOB_CONTAINER,
                    `${moment().format("DD-MM-YYYY")}/${file.name}`,
                    file,
                    (error, result, response) => {
                        console.log(error, result, response);
                    }
                );
            }
        }
    );
};

const UploadCard = () => {
    const [files, setFiles] = useState(null);

    const body = (
        <FileInput
            onChange={files => setFiles(files)}
            placeholder="Select files..."
        />
    );

    const footer = (
        <Button primary onClick={() => upload(files)}>
            Upload
        </Button>
    );

    return (
        <div className={styles.uploadCardContainer}>
            <Card title="Upload sensor data" body={body} footer={footer} />
        </div>
    );
};

export default ({ match }) => {
    useEnsureNavigationEffect(match);

    return (
        <div className={styles.adminPageContainer}>
            <UploadCard />
        </div>
    );
};
