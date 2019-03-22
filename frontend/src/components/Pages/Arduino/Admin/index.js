import React, { useState } from "react";
import styles from "./styles.scss";
import { useEnsureNavigationEffect } from "../hooks";
import Card from "components/Card";
import FileInput from "components/FileInput";
import Button from "components/Button";
import moment from "moment";
import azStorage from "ext/az-storage";
import AlertMessage from "components/AlertMessage";

const performUpload = (files, onError, onSuccess) => {
    const folder = moment().format("DD-MM-YYYY");

    azStorage.upload(folder, files, onSuccess, onError);
};

const UploadCard = () => {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const onError = error => {
        setError(error);
        setSuccess(false);
    };

    const onSuccess = () => {
        setSuccess(true);
        setError(null);
        setFiles(null);
    };

    const handleOnFilesChanged = files => {
        setFiles(files);
        setSuccess(false);
        setError(null);
    };

    const body = (
        <React.Fragment>
            <FileInput
                onChange={files => handleOnFilesChanged(files)}
                placeholder="Select files..."
            />
            {(error || success) && (
                <div className={styles.messages}>
                    {error && (
                        <AlertMessage danger>
                            {error.statusCode} {error.code}.
                        </AlertMessage>
                    )}
                    {success && <AlertMessage success>Upload successful.</AlertMessage>}
                </div>
            )}
        </React.Fragment>
    );

    const footer = (
        <Button
            primary={(files !== null) === true}
            disabled={!files}
            onClick={() => performUpload(files, onError, onSuccess)}
        >
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
