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
});