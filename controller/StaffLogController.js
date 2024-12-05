$(document).ready(function () {
    loadCropLogsTable();
    var recordIndexStaffLogs;

    function loadCropLogsTable() {
        $("#staff-logs-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/logs',
            type: 'GET',
            dataType: 'json',
            success: function(logsResponse) {
                console.log('Staff data:', logsResponse);

                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/staffLogs`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(staffResponse) {
                        console.log('details data',staffResponse);

                        const combinedData = populateData(logsResponse, staffResponse);
                        populateStaffLogTable(combinedData);
                    },
                    error: function(err) {
                        console.error(`Error loading staff data for staff_id`, err);
                    }
                });
            },
            error: function(err) {
                console.error('Error loading logs data:', err);
            }
        });
    }

    function populateData(logsResponse, staffResponse) {
        // Create a map of staffResponse by staff_id for easy merging
        const logsMap = new Map(logsResponse.map(logs => [logs.log_code, logs]));

        // Iterate through fieldStaffResponse to add or update entries in the map
        staffResponse.forEach(staffLogs => {
            if (logsMap.has(staffLogs.log_code)) {
                // Merge additional fields into the existing staff entry
                Object.assign(logsMap.get(staffLogs.log_code), staffLogs);
            } else {
                // Add new field staff entry if it doesn't already exist
                logsMap.set(staffLogs.log_code, staffLogs);
            }
        });

        // Convert the map back to an array
        return Array.from(logsMap.values());
    }

    function populateStaffLogTable(data) {
        if (Array.isArray(data)) {
            data.forEach(function (staffLogsData) {
                if (staffLogsData.log_code.startsWith('SL')) {
                    const staffLogRecord = `
                <tr>
                    <td class="sl-log_code">${staffLogsData.log_code}</td>
                    <td class="sl-staff_id">${staffLogsData.staff_id}</td>
                    <td class="sl-first_name">${staffLogsData.first_name}</td>
                    <td class="sl-phone_no">${staffLogsData.phone_no}</td>
                    <td class="sl-details">${staffLogsData.details}</td>
                    <td class="sl-log_date">${staffLogsData.log_date}</td>
                    <td class="sl-img"><img src="data:image/png;base64,${staffLogsData.img}" width="150px"></td>
                </tr>`;
                    $('#staff-logs-table-tb').append(staffLogRecord);
                }
            });
        }
    }

    $('#staff-logs-table-tb').on('click','tr',function () {
        recordIndexStaffLogs = $(this).index();

        var log_code = $(this).find(".sl-log_code").text();
        var staff_id = $(this).find(".sl-staff_id").text();
        var rst_name = $(this).find(".sl-first_name").text();
        var phone_no = $(this).find(".sl-phone_no").text();
        var details = $(this).find(".sl-details").text();
        var log_date = $(this).find(".sl-log_date").text();

        $('#txtLogCodeStaff').val(log_code);
        $('#txtMemberIDLogs').val(staff_id);
        $('#txtFirstNameLogs').val(rst_name);
        $('#txtPhoneNumberLogs').val(phone_no);
        $('#txtStaffDetails').val(details);
        $('#txtLogDateStaff').val(log_date);
    });

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
                loadCropLogsTable();
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    }

    $('#delete-staff-logs').on('click', () => {
        var log_code = $('#txtLogCodeStaff').val();
        var img = $('#txtLogImageStaff').prop('files')[0];
        var details = $('#txtStaffDetails').val();
        var log_date = $('#txtLogDateStaff').val();
        var staff_id = $('#txtMemberIDLogs').val();
        var first_name = $('#txtFirstNameLogs').val();
        var phone_no = $('#txtPhoneNumberLogs').val();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffLogs/' + log_code,
            type: 'DELETE',
            success: (response) => {
                console.log('Log Deleted successfully:', response);
                $.ajax({
                    url: 'http://localhost:8081/greenShadow/api/v1/logs/' + log_code,
                    type: 'DELETE',
                    success: (response) => {
                        console.log('Log Details Deleted successfully:', response);
                        loadCropLogsTable();
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
});