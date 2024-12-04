$(document).ready(function () {


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
        logData.append('field_code', field_code);
        logData.append('field_name', field_name);
        logData.append('field_location', field_location);

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
            url: 'http://localhost:8081/greenShadow/api/v1/fieldLogs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    }
});