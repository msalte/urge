import az from "./azure-storage.blob.min.js";
import { fetch } from "global/fetch";
import serviceDiscovery from "global/serviceDiscovery";

const BLOB_URI = "https://urgestorage.blob.core.windows.net";
const BLOB_CONTAINER = "sensordata";

const fetchSharedAccessSignature = () =>
    fetch(serviceDiscovery.getArduinoApi() + "/sas/upload", true);

export default {
    upload: (folder, files, onSuccess, onError) => {
        fetchSharedAccessSignature().then(token => {
            const blobService = az.createBlobServiceWithSas(BLOB_URI, token);

            for (var i = 0; i < files.length; i++) {
                const file = files[i];

                blobService.createBlockBlobFromBrowserFile(
                    BLOB_CONTAINER,
                    `${folder}/${file.name}`,
                    file,
                    (error, result, response) => {
                        if (error) {
                            onError && onError(error);
                        } else if (response.ok) {
                            onSuccess && onSuccess(result);
                        }
                    }
                );
            }
        });
    },
};
