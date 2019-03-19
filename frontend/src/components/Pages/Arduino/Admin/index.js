import React, { useState } from "react";
import styles from "./styles.scss";
import { useEnsureNavigationEffect } from "../hooks";
import Card from "components/Card";
import FileInput from "components/FileInput";
import Button from "components/Button";
import moment from "moment";
import azStorage from "ext/az-storage";

const upload = files => {
    const folder = moment().format("DD-MM-YYYY");
    const onError = error => {
        console.error(error);
    };
    const onSuccess = result => {
        console.log(result);
    };

    azStorage.upload(folder, files, onSuccess, onError);
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
