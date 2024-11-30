$(document).ready(function () {
    loadFieldTable();
    function loadFieldTable() {
        $("#fields-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/field',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (Array.isArray(res)) {
                    res.forEach(function(field) {
                        var fieldRecord = `
                        <tr>
                            <td class="f-id">${field.field_code}</td>
                            <td class="f-name">${field.field_name}</td>
                            <td class="f-location">${field.field_location}</td>
                            <td class="f-size">${field.extent_size}</td>
                            <td class="f-image-1"><img src="data:image/png;base64,${field.img_01}" width="150px"></td>
                            <td class="f-image-2"><img src="data:image/png;base64,${field.img_02}" width="150px"></td>
                        </tr>`;
                        $('#fields-table-tb').append(fieldRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                } else {
                    console.log('No field data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading field data:', res);
            }
        });
    }

    $('#save-fields').on('click', () => {
        var fieldID = $('#txtFieldID').val();
        var fieldName = $('#txtFieldName').val();
        var fieldLocation = $('#txtFieldLocation').val();
        var fieldSize = $('#txtFieldSize').val();
        var image_01 = $('#txtFieldImage1').prop('files')[0];
        var image_02 = $('#txtFieldImage2').prop('files')[0];

        var fieldData = new FormData();
        fieldData.append('fieldID', fieldID);
        fieldData.append('fieldName', fieldName);
        fieldData.append('fieldLocation', fieldLocation);
        fieldData.append('fieldSize', fieldSize);
        fieldData.append('image_01', image_01);
        fieldData.append('image_02', image_02);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/field',
            type: 'POST',
            data: fieldData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (res) => {
                loadFieldTable();
                console.log(res);
                console.log("field saved");
            },
            error: (res) => {
                console.error(res);
            }
        });
    });
});