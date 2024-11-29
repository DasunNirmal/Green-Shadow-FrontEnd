$(document).ready(function () {
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
                console.log(res);
            },
            error: (res) => {
                console.error(res);
            }
        });
    });
});