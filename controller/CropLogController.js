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
});