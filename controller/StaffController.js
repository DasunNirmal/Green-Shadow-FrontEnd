 var recordIndexStaff;

    function clearFields() {
        $('#txtMemberID').val("");
        $('#txtFirstName').val("");
        $('#txtLastName').val("");
        $('#txtDesignation').val("");
        $('#txtEmail').val("");
        $('#txtRole').val("");
        $('#txtGender').val("");
        $('#txtJoinedDate').val("");
        $('#txtDateOfBirth').val("");
        $('#txtAddressLine1').val("");
        $('#txtAddressLine2').val("");
        $('#txtAddressLine3').val("");
        $('#txtAddressLine4').val("");
        $('#txtAddressLine5').val("");
        $('#txtPhoneNumber').val("");
        $('#txtSearch-staff').val("");
        $('#txtSearchFields-staff').val("");
        $('#txtFieldCode-staff').val("");
        $('#txtFieldName-staff').val("");
    }

    $('#btnSearchFields-staff').on('click', function() {
        const searchQuery = $('#txtSearchFields-staff').val();
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

                    $('#txtFieldCode-staff').val(field.field_code);
                    $('#txtFieldName-staff').val(field.field_name);
                } else {
                    console.error('Field not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    export function loadStaffTable() {
        $("#staff-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff',
            type: 'GET',
            dataType: 'json',
            success: function(staffResponse) {
                console.log('Staff data:', staffResponse);

                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/staffAndFieldsDetails`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(fieldStaffResponse) {
                        console.log('details data',fieldStaffResponse);

                        const combinedData = populateData(staffResponse, fieldStaffResponse);
                        populateStaffTable(combinedData);
                    },
                    error: function(err) {
                        console.error(`Error loading field staff data for staff_id`, err);
                    }
                });
            },
            error: function(err) {
                console.error('Error loading staff data:', err);
            }
        });
    }

    function populateData(staffResponse, fieldStaffResponse) {
        // Create a map of staffResponse by staff_id for easy merging
        const staffMap = new Map(staffResponse.map(staff => [staff.staff_id, staff]));

        // Iterate through fieldStaffResponse to add or update entries in the map
        fieldStaffResponse.forEach(fieldStaff => {
            if (staffMap.has(fieldStaff.staff_id)) {
                // Merge additional fields into the existing staff entry
                Object.assign(staffMap.get(fieldStaff.staff_id), fieldStaff);
            } else {
                // Add new field staff entry if it doesn't already exist
                staffMap.set(fieldStaff.staff_id, fieldStaff);
            }
        });

        // Convert the map back to an array
        return Array.from(staffMap.values());
    }

    function populateStaffTable(data) {
        if (Array.isArray(data)) {
            data.forEach(function (staffFieldData) {
                const staffRecord = `
                <tr>
                    <td class="s-staff-id">${staffFieldData.staff_id}</td>
                    <td class="s-first-name">${staffFieldData.first_name}</td>
                    <td class="s-last-name">${staffFieldData.last_name}</td>
                    <td class="s-email">${staffFieldData.email}</td>
                    <td class="s-phone-no">${staffFieldData.phone_no}</td>
                    <td class="s-designation">${staffFieldData.designation}</td>
                    <td class="s-dob">${staffFieldData.dob}</td>
                    <td class="s-role">${staffFieldData.role}</td>
                    <td class="s-gender">${staffFieldData.gender}</td>
                    <td class="s-joined-date">${staffFieldData.joined_date}</td>
                    <td class="s-address-01">${staffFieldData.address_01}</td>
                    <td class="s-address-02">${staffFieldData.address_02}</td>
                    <td class="s-address-03">${staffFieldData.address_03}</td>
                    <td class="s-address-04">${staffFieldData.address_04}</td>
                    <td class="s-address-05">${staffFieldData.address_05}</td>
                    <td class="s-field-code">${staffFieldData.field_code}</td>
                </tr>`;
                $('#staff-table-tb').append(staffRecord);
            });
        }
    }

    $('#staff-table-tb').on('click','tr',function () {
        recordIndexStaff = $(this).index();

        var staff_id = $(this).find(".s-staff-id").text();
        var first_name = $(this).find(".s-first-name").text();
        var last_name = $(this).find(".s-last-name").text();
        var email = $(this).find(".s-email").text();
        var phone_no = $(this).find(".s-phone-no").text();
        var designation = $(this).find(".s-designation").text();
        var dob = $(this).find(".s-dob").text();
        var role = $(this).find(".s-role").text();
        var gender = $(this).find(".s-gender").text();
        var joined_date = $(this).find(".s-joined-date").text();
        var address_01 = $(this).find(".s-address-01").text();
        var address_02 = $(this).find(".s-address-02").text();
        var address_03 = $(this).find(".s-address-03").text();
        var address_04 = $(this).find(".s-address-04").text();
        var address_05 = $(this).find(".s-address-05").text();
        var field_code = $(this).find(".s-field-code").text();
        searchFieldsByID(field_code);

        $('#txtMemberID').val(staff_id);
        $('#txtFirstName').val(first_name);
        $('#txtLastName').val(last_name);
        $('#txtDesignation').val(designation);
        $('#txtEmail').val(email);
        $('#txtRole').val(role);
        $('#txtGender').val(gender);
        $('#txtJoinedDate').val(joined_date);
        $('#txtDateOfBirth').val(dob);
        $('#txtAddressLine1').val(address_01);
        $('#txtAddressLine2').val(address_02);
        $('#txtAddressLine3').val(address_03);
        $('#txtAddressLine4').val(address_04);
        $('#txtAddressLine5').val(address_05);
        $('#txtPhoneNumber').val(phone_no);
        $('#txtFieldCode-staff').val(field_code);
    });

    $('#save-staff').on('click', () => {
        var staff_id = $('#txtMemberID').val();
        var first_name = $('#txtFirstName').val();
        var last_name = $('#txtLastName').val();
        var designation = $('#txtDesignation').val();
        var email = $('#txtEmail').val();
        var role = $('#txtRole').val();
        var gender = $('#txtGender').val();
        var joined_date = $('#txtJoinedDate').val();
        var dob = $('#txtDateOfBirth').val();
        var address_01 = $('#txtAddressLine1').val();
        var address_02 = $('#txtAddressLine2').val();
        var address_03 = $('#txtAddressLine3').val();
        var address_04 = $('#txtAddressLine4').val();
        var address_05 = $('#txtAddressLine5').val();
        var phone_no = $('#txtPhoneNumber').val();
        var field_code = $('#txtFieldCode-staff').val();

        const staffData = {
           staff_id: staff_id,
           first_name: first_name,
           last_name: last_name,
           designation: designation,
           email: email,
           role: role,
           gender: gender,
           joined_date: joined_date,
           dob: dob,
           address_01: address_01,
           address_02: address_02,
           address_03: address_03,
           address_04: address_04,
           address_05: address_05,
           phone_no: phone_no
        }
        const staffAndFieldDetailData = {
            details_id: staff_id,
            first_name: first_name,
            email: email,
            phone_no: phone_no,
            role: role,
            staff_id: staff_id,
            field_code: field_code,
        }
        const staffJSON = JSON.stringify(staffData);
        const staffAndDetailsJSON = JSON.stringify(staffAndFieldDetailData);
        console.log(staffJSON);
        console.log(staffAndDetailsJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff',
            type: 'POST',
            data: staffJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("staff saved")
                saveDetails(staffAndDetailsJSON);
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

    function saveDetails(staffAndDetailsJSON) {
        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffAndFieldsDetails',
            type: 'POST',
            data: staffAndDetailsJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("details saved")
                loadStaffTable();
            },
            error: (res) => {
                console.error(res);
            }
        });
    }

    $('#update-staff').on('click',() => {
        var staff_id = $('#txtMemberID').val();
        var first_name = $('#txtFirstName').val();
        var last_name = $('#txtLastName').val();
        var designation = $('#txtDesignation').val();
        var email = $('#txtEmail').val();
        var role = $('#txtRole').val();
        var gender = $('#txtGender').val();
        var joined_date = $('#txtJoinedDate').val();
        var dob = $('#txtDateOfBirth').val();
        var address_01 = $('#txtAddressLine1').val();
        var address_02 = $('#txtAddressLine2').val();
        var address_03 = $('#txtAddressLine3').val();
        var address_04 = $('#txtAddressLine4').val();
        var address_05 = $('#txtAddressLine5').val();
        var phone_no = $('#txtPhoneNumber').val();
        var field_code = $('#txtFieldCode-staff').val();

        const staffData = {
            staff_id: staff_id,
            first_name: first_name,
            last_name: last_name,
            designation: designation,
            email: email,
            role: role,
            gender: gender,
            joined_date: joined_date,
            dob: dob,
            address_01: address_01,
            address_02: address_02,
            address_03: address_03,
            address_04: address_04,
            address_05: address_05,
            phone_no: phone_no
        }
        const staffAndFieldDetailData = {
            details_id: staff_id,
            first_name: first_name,
            email: email,
            phone_no: phone_no,
            role: role,
            staff_id: staff_id,
            field_code: field_code,
        }
        const staffJSON = JSON.stringify(staffData);
        const staffAndDetailsJSON = JSON.stringify(staffAndFieldDetailData);
        console.log(staffJSON);
        console.log(staffAndDetailsJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffAndFieldsDetails/' + staff_id,
            type: 'PATCH',
            data: staffAndDetailsJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Details updated");
                $.ajax({
                    url: 'http://localhost:8081/greenShadow/api/v1/staff/' + staff_id,
                    type: 'PATCH',
                    data: staffJSON,
                    contentType: 'application/json',
                    success: (res) => {
                        console.log(JSON.stringify(res));
                        console.log("Staff updated");
                    },
                    error: (res) => {
                        console.error(res);
                        console.log("Staff not updated");
                    }
                });
                loadStaffTable();
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Details not updated");
            }
        });
    });

    $('#delete-staff').on('click',() => {
        var staff_id = $('#txtMemberID').val();
        var field_code = $('#txtFieldCode-staff').val();
        var first_name = $('#txtFirstName').val();
        var last_name = $('#txtLastName').val();
        var designation = $('#txtDesignation').val();
        var email = $('#txtEmail').val();
        var role = $('#txtRole').val();
        var gender = $('#txtGender').val();
        var joined_date = $('#txtJoinedDate').val();
        var dob = $('#txtDateOfBirth').val();
        var address_01 = $('#txtAddressLine1').val();
        var address_02 = $('#txtAddressLine2').val();
        var address_03 = $('#txtAddressLine3').val();
        var address_04 = $('#txtAddressLine4').val();
        var address_05 = $('#txtAddressLine5').val();
        var phone_no = $('#txtPhoneNumber').val();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staffAndFieldsDetails/' + staff_id,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Details Deleted");
                $.ajax({
                    url: 'http://localhost:8081/greenShadow/api/v1/staff/' + staff_id,
                    type: 'DELETE',
                    success: (res) => {
                        console.log(JSON.stringify(res));
                        loadStaffTable();
                        console.log("Staff Deleted");
                    },
                    error: (res) => {
                        console.error(res);
                        console.log("Staff Not Deleted");
                    }
                });
                loadStaffTable();
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Details Not Deleted");
            }
        });
    });

    $('#search-staff').on('click', function() {
        const searchQuery = $('#txtSearch-staff').val();
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
                $.ajax({
                    url: `http://localhost:8081/greenShadow/api/v1/staffAndFieldsDetails?staff_id=` + staff_id,
                    type: 'GET',
                    dataType: 'json',
                    success: function(fieldStaffResponse) {
                        console.log('details data',fieldStaffResponse);

                        const combinedData = populateData(staffResponse, fieldStaffResponse);
                        addSearchData(combinedData,staff_id);
                    },
                    error: function(err) {
                        console.error(`Error loading field staff data for staff_id`, err);
                    }
                });
            },
            error: function(error) {
                console.error('Error searching staff:', error);
                loadStaffTable();
            }
        });
    }

    function addSearchData(response,staff_id) {
        for (let i = 0; i < response.length; i++) {
            if (staff_id === response[i].staff_id) {
                var staff = response[i];
                break;
            }
        }

        if (staff) {
            console.log('Staff retrieved successfully:', staff);

            $('#txtMemberID').val(staff.staff_id);
            $('#txtFirstName').val(staff.first_name);
            $('#txtLastName').val(staff.last_name);
            $('#txtDesignation').val(staff.designation);
            $('#txtEmail').val(staff.email);
            $('#txtRole').val(staff.role);
            $('#txtGender').val(staff.gender);
            $('#txtJoinedDate').val(staff.joined_date);
            $('#txtDateOfBirth').val(staff.dob);
            $('#txtAddressLine1').val(staff.address_01);
            $('#txtAddressLine2').val(staff.address_02);
            $('#txtAddressLine3').val(staff.address_03);
            $('#txtAddressLine4').val(staff.address_04);
            $('#txtAddressLine5').val(staff.address_05);
            $('#txtPhoneNumber').val(staff.phone_no);
            $('#txtFieldCode-staff').val(staff.field_code);
            searchFieldsByID(staff.field_code);
            $('#txtSearch-staff').val("");
        } else {
            console.error('Staff not found');
        }
    }

    $('#clear-staff').on('click', () => {
        clearFields();
    });