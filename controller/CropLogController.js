$(document).ready(function () {
    /*loadCropLogsTable();*/
    var recordIndexCropLogs;


    $('#btnSearchCropsLogs').on('click', function() {
        const searchQuery = $('#txtSearchCropsLogs').val();
        searchCropsByID(searchQuery);
    });

    function searchCropsByID(query) {
        const crop_code = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/crop?crop_code=' + crop_code,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                for (let i = 0; i < response.length; i++) {
                    if (crop_code === response[i].crop_code) {
                        var crop = response[i];
                        break;
                    }
                }

                if (crop) {
                    $('#txtCropCodeLogs').val(crop.crop_code);
                    $('#txtCropNameLogs').val(crop.common_name);
                    $('#txtSearchCropsLogs').val("");
                } else {
                    console.error('Crop not found');
                }
            },
            error: function(error) {
                console.error('Error searching crop:', error);
            }
        });
    }

    $('#save-crop-logs').on('click', () => {
        var log_code = $('#txtLogCodeCrop').val();
        var img = $('#txtLogImageCrop').prop('files')[0];
        var details = $('#txtCropDetails').val();
        var log_date = $('#txtLogDateCrop').val();

        var crop_code = $('#txtCropCodeLogs').val();
        var crop_name = $('#txtCropNameLogs').val();

        var logData = new FormData();
        logData.append('log_code', log_code);
        logData.append('img', img);
        logData.append('details', details);
        logData.append('log_date', log_date);
        logData.append('code', crop_code);
        logData.append('name', crop_name);
        logData.append('additional', crop_name);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
                saveDetails(logData);
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    });

    function saveDetails(logData) {
        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/cropLogs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
            },
            error: function(error) {
                console.error('Error saving crop log:', error);
            }
        });
    }
});