$(document).ready(function () {

    $('#btnSearchField').on('click', function() {
        const searchQuery = $('#txtSearchField').val();
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

                    $('#txtSearchField').val(field.field_code);
                    $('#txtCropFieldName').val(field.field_name);
                } else {
                    console.error('Field not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    $('#save-crops').on('click', () => {
        var crop_code = $('#txtCropCode').val();
        var common_name = $('#txtCommonName').val();
        var scientific_name = $('#txtScientificName').val();
        var category = $('#txtCategory').val();
        var img = $('#txtCropImage').prop('files')[0];
        var season = $('#txtSeason').val();
        var field_code = $('#txtSearchField').val();

        var cropData = new FormData();
        cropData.append('crop_code', crop_code);
        cropData.append('common_name', common_name);
        cropData.append('scientific_name', scientific_name);
        cropData.append('category', category);
        cropData.append('img', img);
        cropData.append('season', season);
        cropData.append('field_code', field_code);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/crop',
            type: 'POST',
            data: cropData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (res) => {
                console.log(res);
                console.log("crop saved");
            },
            error: (res) => {
                console.error(res);
            }
        });
    });
});