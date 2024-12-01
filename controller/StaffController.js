$(document).ready(function () {
    var recordIndexStaff;
    loadStaffTable();

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
    }

    function loadStaffTable() {
        $("#staff-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (Array.isArray(res)) {
                    res.forEach(function(staff) {
                        var staffRecord = `
                        <tr>
                            <td class="s-staff-id">${staff.staff_id}</td>
                            <td class="s-first-name">${staff.first_name}</td>
                            <td class="s-last-name">${staff.last_name}</td>
                            <td class="s-email">${staff.email}</td>
                            <td class="s-phone-no">${staff.phone_no}</td>
                            <td class="s-designation">${staff.designation}</td>
                            <td class="s-dob">${staff.dob}</td>
                            <td class="s-role">${staff.role}</td>
                            <td class="s-gender">${staff.gender}</td>
                            <td class="s-joined-date">${staff.joined_date}</td>
                            <td class="s-address-01">${staff.address_01}</td>
                            <td class="s-address-02">${staff.address_02}</td>
                            <td class="s-address-03">${staff.address_03}</td>
                            <td class="s-address-04">${staff.address_04}</td>
                            <td class="s-address-05">${staff.address_05}</td>
                        </tr>`;
                        $('#staff-table-tb').append(staffRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                } else {
                    console.log('No staff data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading staff data:', res);
            }
        });
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
           phone_no: phone_no,
       }
       const staffJSON = JSON.stringify(staffData);
       console.log(staffJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff',
            type: 'POST',
            data: staffJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                loadStaffTable();
            },
            error: (res) => {
                console.error(res);
            }
        });
    });

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
            phone_no: phone_no,
        }
        const staffJSON = JSON.stringify(staffData);
        console.log(staffJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff/' + staff_id,
            type: 'PATCH',
            data: staffJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Staff updated");
                loadStaffTable();
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Staff not updated");
            }
        });
    });

    $('#delete-staff').on('click',() => {
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

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff/' + staff_id,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                loadStaffTable();
                console.log("Staff Deleted");
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Staff Not Deleted");
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
            success: (response) => {
                console.log('Full response:', response);
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
                    $('#txtSearch-staff').val("");
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
                loadStaffTable();
            }
        });
    }

    $('#clear-staff').on('click', () => {
        clearFields();
    });
});