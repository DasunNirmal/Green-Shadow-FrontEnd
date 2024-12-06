var recordIndexFieldsLogs;

function getCookies(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

    function clearFields() {
        $('#txtLogCode').val("");
        $('#txtFieldDetails').val("");
        $('#txtLogDate').val("");
        $('#txtFieldCodeLogs').val("");
        $('#txtFieldNameLogs').val("");
        $('#txtFieldLocationLogs').val("");
        $('#txtSearch-field-logs').val("");
        $('#txtLogImage').val("");
    }

    $('#btnSearchFieldsLogs').on('click', function() {
        const searchQuery = $('#txtSearchFieldsLogs').val();
        searchFieldsByID(searchQuery);
    });

    function searchFieldsByID(query) {
        const field_code = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/field?field_code=' + field_code,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (response) => {
                console.log('Full response:', response);
                for (let i = 0; i < response.length; i++) {
                    if (field_code === response[i].field_code) {
                        var field = response[i];
                        break;
                    }
                }

                if (field) {
                    console.log('Field retrieved successfully:', field);
                    $('#txtFieldCodeLogs').val(field.field_code);
                    $('#txtFieldNameLogs').val(field.field_name);
                    $('#txtFieldLocationLogs').val(field.field_location);
                    $('#txtSearchFieldsLogs').val("");
                } else {
                    console.error('Field not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    export function loadFieldLogsTable() {
        $("#field-logs-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: function(logsResponse) {
                console.log('Staff data:', logsResponse);

                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/fieldLogs`,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${getCookies("token")}`,
                    },
                    success: function(fieldResponse) {
                        console.log('details data',fieldResponse);

                        const combinedData = populateData(logsResponse, fieldResponse);
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

    function populateData(logsResponse, fieldResponse) {
        // Create a map of staffResponse by staff_id for easy merging
        const logsMap = new Map(logsResponse.map(logs => [logs.log_code, logs]));

        // Iterate through fieldStaffResponse to add or update entries in the map
        fieldResponse.forEach(fieldLogs => {
            if (logsMap.has(fieldLogs.log_code)) {
                // Merge additional fields into the existing staff entry
                Object.assign(logsMap.get(fieldLogs.log_code), fieldLogs);
            } else {
                // Add new field staff entry if it doesn't already exist
                logsMap.set(fieldLogs.log_code, fieldLogs);
            }
        });

        // Convert the map back to an array
        return Array.from(logsMap.values());
    }

    function populateStaffTable(data) {
        if (Array.isArray(data)) {
            data.forEach(function (fieldLogsData) {
                if (fieldLogsData.log_code.startsWith('FL')) {
                    const fieldLogRecord = `
                <tr>
                    <td class="fl-log_code">${fieldLogsData.log_code}</td>
                    <td class="fl-field_code">${fieldLogsData.field_code}</td>
                    <td class="fl-field_name">${fieldLogsData.field_name}</td>
                    <td class="fl-field_location">${fieldLogsData.field_location}</td>
                    <td class="fl-details">${fieldLogsData.details}</td>
                    <td class="fl-log_date">${fieldLogsData.log_date}</td>
                    <td class="fl-img"><img src="data:image/png;base64,${fieldLogsData.img}" width="150px"></td>
                </tr>`;
                    $('#field-logs-table-tb').append(fieldLogRecord);
                }
            });
        }
    }

    $('#field-logs-table-tb').on('click','tr',function () {
        recordIndexFieldsLogs = $(this).index();

        var log_code = $(this).find(".fl-log_code").text();
        var field_code = $(this).find(".fl-field_code").text();
        var field_name = $(this).find(".fl-field_name").text();
        var field_location = $(this).find(".fl-field_location").text();
        var details = $(this).find(".fl-details").text();
        var log_date = $(this).find(".fl-log_date").text();

        $('#txtLogCode').val(log_code);
        $('#txtFieldDetails').val(details);
        $('#txtLogDate').val(log_date);
        $('#txtFieldCodeLogs').val(field_code);
        $('#txtFieldNameLogs').val(field_name);
        $('#txtFieldLocationLogs').val(field_location);
    });

    $('#save-field-logs').on('click', () => {
        var log_code = $('#txtLogCode').val();
        var img = $('#txtLogImage').prop('files')[0];
        var details = $('#txtFieldDetails').val();
        var log_date = $('#txtLogDate').val();

        var field_code = $('#txtFieldCodeLogs').val();
        var field_name = $('#txtFieldNameLogs').val();
        var field_location = $('#txtFieldLocationLogs').val();

        var logData = new FormData();
        logData.append('log_code', log_code);
        logData.append('img', img);
        logData.append('details', details);
        logData.append('log_date', log_date);
        logData.append('code', field_code);
        logData.append('name', field_name);
        logData.append('additional', field_location);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
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
            url: 'http://localhost:8081/greenShadow/api/v1/fieldLogs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
                loadFieldLogsTable();
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    }

    $('#update-field-logs').on('click', () => {
        var log_code = $('#txtLogCode').val();
        var img = $('#txtLogImage').prop('files')[0];
        var details = $('#txtFieldDetails').val();
        var log_date = $('#txtLogDate').val();

        var field_code = $('#txtFieldCodeLogs').val();
        var field_name = $('#txtFieldNameLogs').val();
        var field_location = $('#txtFieldLocationLogs').val();

        var logData = new FormData();
        logData.append('log_code', log_code);
        logData.append('img', img);
        logData.append('details', details);
        logData.append('log_date', log_date);
        logData.append('code', field_code);
        logData.append('name', field_name);
        logData.append('additional', field_location);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/fieldLogs/' + log_code,
            type: 'PATCH',
            data: logData,
            mimeType: 'multipart/form-data',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log Details updated successfully:', response);
                $.ajax({
                    url: 'http://localhost:8081/greenShadow/api/v1/logs/' + log_code,
                    type: 'PATCH',
                    data: logData,
                    mimeType: 'multipart/form-data',
                    headers: {
                        'Authorization': `Bearer ${getCookies("token")}`,
                    },
                    contentType: false,
                    processData: false,
                    success: (response) => {
                        console.log('Log updated successfully:', response);
                        saveDetails(logData);
                    },
                    error: function(error) {
                        console.error('Error updating log:', error);
                    }
                });
            },
            error: function(error) {
                console.error('Error updating log details:', error);
            }
        });
    });

    $('#delete-field-logs').on('click', () => {
        var log_code = $('#txtLogCode').val();
        var img = $('#txtLogImage').prop('files')[0];
        var details = $('#txtFieldDetails').val();
        var log_date = $('#txtLogDate').val();
        var field_code = $('#txtFieldCodeLogs').val();
        var field_name = $('#txtFieldNameLogs').val();
        var field_location = $('#txtFieldLocationLogs').val();


        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/fieldLogs/' + log_code,
            type: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (response) => {
                console.log('Log Deleted successfully:', response);
                $.ajax({
                    url: 'http://localhost:8081/greenShadow/api/v1/logs/' + log_code,
                    type: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getCookies("token")}`,
                    },
                    success: (response) => {
                        console.log('Log Details Deleted successfully:', response);
                        loadFieldLogsTable();
                    },
                    error: (error) =>{
                        console.error('Error deleting log:', error);
                    }
                });
            },
            error: (error) =>{
                console.error('Log Not Deleted:', error);
            }
        });
    });

    $('#search-field-logs').on('click', function() {
        const searchQuery = $('#txtSearch-field-logs').val();
        searchFieldLogsByID(searchQuery);
    });

    function searchFieldLogsByID(query) {
        const log_code = query.toUpperCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs?log_code=' + log_code,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (logResponse) => {
                console.log('staff data:', logResponse);
                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/fieldLogs?log_code=` + log_code,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${getCookies("token")}`,
                    },
                    success: function(detailsResponse) {
                        console.log('details data',detailsResponse);

                        const combinedData = populateData(logResponse, detailsResponse);
                        if (Array.isArray(combinedData)) {
                            const log = combinedData.find(
                                data => data.log_code === log_code && data.log_code.startsWith('FL')
                            );

                            if (log) {
                                $('#txtLogCode').val(log.log_code);
                                $('#txtFieldDetails').val(log.details);
                                $('#txtLogDate').val(log.log_date);
                                $('#txtFieldCodeLogs').val(log.field_code);
                                $('#txtFieldNameLogs').val(log.field_name);
                                $('#txtFieldLocationLogs').val(log.field_location);
                                $('#txtSearch-field-logs').val("");
                            } else {
                                console.error('Log not found for the given log_code:', log_code);
                            }
                        } else {
                            console.error('Invalid combinedData structure:', combinedData);
                        }
                    },
                    error: function(err) {
                        console.error(`Error loading details data for log_code`, err);
                    }
                });
            },
            error: function(error) {
                console.error('Error searching logs:', error);
                loadFieldLogsTable();
            }
        });
    }

    $('#clear-field-logs').on('click', () => {
        clearFields();
    });
