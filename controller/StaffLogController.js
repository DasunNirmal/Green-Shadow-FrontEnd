var recordIndexStaffLogs;

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
        $('#txtLogCodeStaff').val("SL").attr("placeholder","");
        $('#txtMemberIDLogs').val("").attr("placeholder","");
        $('#txtFirstNameLogs').val("").attr("placeholder","");
        $('#txtPhoneNumberLogs').val("").attr("placeholder","");
        $('#txtStaffDetails').val("").attr("placeholder","");
        $('#txtLogDateStaff').val("").attr("placeholder","");
        $('#txtSearch-staff-logs').val("");
    }

    function validateFields() {
        var log_code = $('#txtLogCodeStaff').val();
        var img = $('#txtLogImageStaff').prop('files')[0];
        var details = $('#txtStaffDetails').val();
        var log_date = $('#txtLogDateStaff').val();
        var staff_id = $('#txtMemberIDLogs').val();
        var first_name = $('#txtFirstNameLogs').val();
        var phone_no = $('#txtPhoneNumberLogs').val();

        var isLogCodeValid = log_code.startsWith("SL") && /^\d+$/.test(log_code.substring(2));

        if (!isLogCodeValid || !img || details === "" || log_date === "" || staff_id === "" || first_name === "" || phone_no === "") {
            if (!isLogCodeValid) {
                $('#txtLogCodeStaff').addClass('inValidData-input red').attr("placeholder", "Must start with SL followed by numbers");
                alert("Log Code must start with SL followed by numbers");
            }
            if (!img) {
                $('#txtLogImageStaff').addClass('inValidData-input red').attr("placeholder", "Log Image is required");
            }
            if (details === "") {
                $('#txtStaffDetails').addClass('inValidData-input red').attr("placeholder", "Staff Details are required");
            }
            if (log_date === "") {
                $('#txtLogDateStaff').addClass('inValidData-input red').attr("placeholder", "Log Date is required");
            }
            if (staff_id === "") {
                $('#txtMemberIDLogs').addClass('inValidData-input red').attr("placeholder", "Staff ID is required");
            }
            if (first_name === "") {
                $('#txtFirstNameLogs').addClass('inValidData-input red').attr("placeholder", "First Name is required");
            }
            if (phone_no === "") {
                $('#txtPhoneNumberLogs').addClass('inValidData-input red').attr("placeholder", "Phone Number is required");
            }
        }
    }

$('#txtLogCodeStaff, #txtLogImageStaff, #txtStaffDetails, #txtLogDateStaff, #txtMemberIDLogs, #txtFirstNameLogs, #txtPhoneNumberLogs').on('input', function () {
    $(this).removeClass('inValidData-input red');

    if ($(this).attr('id') === 'txtLogCodeStaff') {
        $('#txtLogCodeStaff').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtLogImageStaff') {
        $('#txtLogImageStaff').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtStaffDetails') {
        $('#txtStaffDetails').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtLogDateStaff') {
        $('#txtLogDateStaff').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtMemberIDLogs') {
        $('#txtMemberIDLogs').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtFirstNameLogs') {
        $('#txtFirstNameLogs').removeClass('inValidData-input red');
    } else if ($(this).attr('id') === 'txtPhoneNumberLogs') {
        $('#txtPhoneNumberLogs').removeClass('inValidData-input red');
    }
});


export function loadStaffLogsTable() {
        $("#staff-logs-table-tb").empty();

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
                    url: `http://localhost:8081/greenShadow/api/v1/staffLogs`,
                    type: 'GET',
                    dataType: 'json',
                    headers: {
                        'Authorization': `Bearer ${getCookies("token")}`,
                    },
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
        var first_name = $(this).find(".sl-first_name").text();
        var phone_no = $(this).find(".sl-phone_no").text();
        var details = $(this).find(".sl-details").text();
        var log_date = $(this).find(".sl-log_date").text();

        $('#txtLogCodeStaff').val(log_code);
        $('#txtMemberIDLogs').val(staff_id);
        $('#txtFirstNameLogs').val(first_name);
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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
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

        if (log_code === "" || img === undefined || details === "" || log_date === "" || staff_id === "" || first_name === "" || phone_no === "") {
            validateFields();
            return;
        }

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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
                saveDetails(logData);
                clearFields();
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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            contentType: false,
            processData: false,
            success: (response) => {
                console.log('Log saved successfully:', response);
                loadStaffLogsTable();
                clearFields();
            },
            error: function(error) {
                console.error('Error saving log:', error);
            }
        });
    }

    $('#update-staff-logs').on('click', () => {
        var log_code = $('#txtLogCodeStaff').val();
        var img = $('#txtLogImageStaff').prop('files')[0];
        var details = $('#txtStaffDetails').val();
        var log_date = $('#txtLogDateStaff').val();
        var staff_id = $('#txtMemberIDLogs').val();
        var first_name = $('#txtFirstNameLogs').val();
        var phone_no = $('#txtPhoneNumberLogs').val();

        if (log_code === "" || img === undefined || details === "" || log_date === "" || staff_id === "" || first_name === "" || phone_no === "") {
            validateFields();
            return;
        }

        var logData = new FormData();
        logData.append('log_code', log_code);
        logData.append('img', img);
        logData.append('details', details);
        logData.append('log_date', log_date);
        logData.append('code', staff_id);
        logData.append('name', first_name);
        logData.append('additional', phone_no);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffLogs/' + log_code,
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
                        clearFields();
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

    $('#delete-staff-logs').on('click', () => {
        var log_code = $('#txtLogCodeStaff').val();
        var details = $('#txtStaffDetails').val();
        var log_date = $('#txtLogDateStaff').val();
        var staff_id = $('#txtMemberIDLogs').val();
        var first_name = $('#txtFirstNameLogs').val();
        var phone_no = $('#txtPhoneNumberLogs').val();

        if (log_code === "" || details === "" || log_date === "" || staff_id === "" || first_name === "" || phone_no === "") {
            validateFields();
            return;
        }

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffLogs/' + log_code,
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
                        loadStaffLogsTable();
                        clearFields();
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

    $('#search-staff-logs').on('click', function() {
        const searchQuery = $('#txtSearch-staff-logs').val();
        searchStaffLogsByID(searchQuery);
    });

function searchStaffLogsByID(query) {
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
                    url: `http://localhost:8081/greenShadow/api/v1/staffLogs?log_code=` + log_code,
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
                                data => data.log_code === log_code && data.log_code.startsWith('SL')
                            );

                            if (log) {
                                $('#txtLogCodeStaff').val(log.log_code);
                                $('#txtMemberIDLogs').val(log.staff_id);
                                $('#txtFirstNameLogs').val(log.first_name);
                                $('#txtPhoneNumberLogs').val(log.phone_no);
                                $('#txtStaffDetails').val(log.details);
                                $('#txtLogDateStaff').val(log.log_date);
                                $('#txtSearch-staff-logs').val("");
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
                loadStaffLogsTable();
            }
        });
    }
$('#clear-staff-logs').on('click', () => {
    clearFields();
});
