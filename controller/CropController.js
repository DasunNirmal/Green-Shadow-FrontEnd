$(document).ready(function () {
    var recordIndexCrops;
    loadCropTable();

    function clearFields() {
        $('#txtCropCode').val("");
        $('#txtCommonName').val("");
        $('#txtScientificName').val("");
        $('#txtCategory').val("");
        $('#txtCropImage').val("");
        $('#txtSeason').val("");
        $('#txtSearchField').val("");
        $('#txtCropFieldName').val("");
    }

    function loadCropTable() {
        $("#crops-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/crop',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (Array.isArray(res)) {
                    res.forEach(function(crop) {
                        var cropRecord = `
                        <tr>
                            <td class="c-crop_code">${crop.crop_code}</td>
                            <td class="c-common_name">${crop.common_name}</td>
                            <td class="c-scientific_name">${crop.scientific_name}</td>
                            <td class="c-category">${crop.category}</td>
                            <td class="c-season">${crop.season}</td>
                            <td class="c-field_code">${crop.field_code}</td>
                            <td class="c-img"><img src="data:image/png;base64,${crop.img}" width="150px"></td>
                        </tr>`;
                        $('#crops-table-tb').append(cropRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                } else {
                    console.log('No crop data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading crop data:', res);
            }
        });
    }

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

    $('#crops-table-tb').on('click','tr',function () {
        recordIndexCrops = $(this).index();

        var crop_code = $(this).find(".c-crop_code").text();
        var common_name = $(this).find(".c-common_name").text();
        var scientific_name = $(this).find(".c-scientific_name").text();
        var category = $(this).find(".c-category").text();
        var season = $(this).find(".c-season").text();
        var field_code = $(this).find(".c-field_code").text();
        searchFieldsByID(field_code);

        $('#txtCropCode').val(crop_code);
        $('#txtCommonName').val(common_name);
        $('#txtScientificName').val(scientific_name);
        $('#txtCategory').val(category);
        $('#txtSeason').val(season);
        $('#txtSearchField').val(field_code);
    });

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
                loadCropTable();
                clearFields();
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

    $('#update-crops').on('click', () => {
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
            url: 'http://localhost:8081/greenShadow/api/v1/crop/' + crop_code,
            type: 'PATCH',
            data: cropData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (res) => {
                loadCropTable();
                console.log(res);
                console.log("crop updated");
                clearFields();
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

    $('#delete-crops').on('click',() => {
        var crop_code = $('#txtCropCode').val();
        var common_name = $('#txtCommonName').val();
        var scientific_name = $('#txtScientificName').val();
        var category = $('#txtCategory').val();
        var img = $('#txtCropImage').prop('files')[0];
        var season = $('#txtSeason').val();
        var field_code = $('#txtSearchField').val();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/crop/' + crop_code,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                loadCropTable();
                console.log("Crop Deleted");
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Crop Not Deleted");
            }
        });
    });

    $('#search-crop').on('click', function() {
        const searchQuery = $('#txtSearch-crops').val();
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
                    $('#txtCropCode').val(crop.crop_code);
                    $('#txtCommonName').val(crop.common_name);
                    $('#txtScientificName').val(crop.scientific_name);
                    $('#txtCategory').val(crop.category);
                    $('#txtSeason').val(crop.season);
                    $('#txtSearchField').val(crop.field_code);
                    searchFieldsByID(crop.field_code);
                    $('#txtSearch-crops').val("");
                } else {
                    console.error('Crop not found');
                }
            },
            error: function(error) {
                console.error('Error searching crop:', error);
                loadCropTable();
            }
        });
    }

    $('#clear-crops').on('click', () => {
        clearFields();
    });
});