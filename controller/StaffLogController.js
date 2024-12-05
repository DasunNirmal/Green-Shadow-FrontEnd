$(document).ready(function () {
    /*loadCropLogsTable();
    var recordIndexCropLogs;*/

    $('#btnSearchMembersLogs').on('click', function() {
        const searchQuery = $('#txtSearchMembersLogs').val();
        searchStaffByID(searchQuery);
    });

    function searchStaffByID(query) {
        const staff_id = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff?staff_id=' + staff_id,
            type: 'GET',
            dataType: 'json',
            success: (staffResponse) => {
                console.log('staff data:', staffResponse);
                for (let i = 0; i < staffResponse.length; i++) {
                    if (staff_id === staffResponse[i].staff_id) {
                        var staff = staffResponse[i];
                        break;
                    }
                }

                if (staff) {
                    console.log('Staff retrieved successfully:', staff);
                    $('#txtMemberIDLogs').val(staff.staff_id);
                    $('#txtFirstNameLogs').val(staff.first_name);
                    $('#txtPhoneNumberLogs').val(staff.phone_no);
                    $('#txtSearchFieldsLogs').val("");
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    $('#save-staff-logs').on('click', () => {
        var log_code = $('#txtLogCodeStaff').val();
        var img = $('#txtLogImageStaff').prop('files')[0];
        var details = $('#txtStaffDetails').val();
        var log_date = $('#txtLogDateStaff').val();

        var staff_id = $('#txtMemberIDLogs').val();
        var first_name = $('#txtFirstNameLogs').val();
        var phone_no = $('#txtPhoneNumberLogs').val();

        var logData = new FormData();
        logData.append('log_code', log_code);
        logData.append('img', img);
        logData.append('details', details);
        logData.append('log_date', log_date);
        logData.append('code', staff_id);
        logData.append('name', first_name);
        logData.append('additional', phone_no);

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
            url: 'http://localhost:8081/greenShadow/api/v1/staffLogs',
            type: 'POST',
            data: logData,
            mimeType: 'multipart/form-data',
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
                /*loadFieldLogsTable();*/
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    }
});