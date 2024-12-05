$(document).ready(function () {
    loadCropLogsTable();
    var recordIndexCropLogs;

    function loadCropLogsTable() {
        $("#crop-logs-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs',
            type: 'GET',
            dataType: 'json',
            success: function(logsResponse) {
                console.log('Staff data:', logsResponse);

                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/cropLogs`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(cropResponse) {
                        console.log('details data',cropResponse);

                        const combinedData = populateData(logsResponse, cropResponse);
                        populateStaffTable(combinedData);
                    },
                    error: function(err) {
                        console.error(`Error loading field data for staff_id`, err);
                    }
                });
            },
            error: function(err) {
                console.error('Error loading logs data:', err);
            }
        });
    }

    function populateData(logsResponse, cropResponse) {
        // Create a map of staffResponse by staff_id for easy merging
        const logsMap = new Map(logsResponse.map(logs => [logs.log_code, logs]));

        // Iterate through fieldStaffResponse to add or update entries in the map
        cropResponse.forEach(cropLogs => {
            if (logsMap.has(cropLogs.log_code)) {
                // Merge additional fields into the existing staff entry
                Object.assign(logsMap.get(cropLogs.log_code), cropLogs);
            } else {
                // Add new field staff entry if it doesn't already exist
                logsMap.set(cropLogs.log_code, cropLogs);
            }
        });

        // Convert the map back to an array
        return Array.from(logsMap.values());
    }

    function populateStaffTable(data) {
        if (Array.isArray(data)) {
            data.forEach(function (cropLogsData) {
                if (cropLogsData.log_code.startsWith('CL')) {
                    const fieldLogRecord = `
                <tr>
                    <td class="fl-log_code">${cropLogsData.log_code}</td>
                    <td class="fl-field_code">${cropLogsData.crop_code}</td>
                    <td class="fl-field_name">${cropLogsData.crop_name}</td>
                    <td class="fl-details">${cropLogsData.details}</td>
                    <td class="fl-log_date">${cropLogsData.log_date}</td>
                    <td class="fl-img"><img src="data:image/png;base64,${cropLogsData.img}" width="150px"></td>
                </tr>`;
                    $('#crop-logs-table-tb').append(fieldLogRecord);
                }
            });
        }
    }

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
                loadCropLogsTable();
            },
            error: function(error) {
                console.error('Error saving crop log:', error);
            }
        });
    }


});