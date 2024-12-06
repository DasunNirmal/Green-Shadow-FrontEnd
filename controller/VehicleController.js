var recordIndexVehicle;

    function clearFields() {
        $('#txtVehicleCode').val("");
        $('#txtLicensePlate').val("");
        $('#txtFuelType').val("");
        $('#txtVehicleCategory').val("");
        $('#txtRemarks').val("");
        $('#txtStatus').val("");
        $('#txtVehicleMemberID').val("");
        $('#txtVehicleFirstName').val("");
        $('#txtVehicleRole').val("");
        $('#txtVehiclePhoneNumber').val("");
        $('#txtVehicleEmail').val("");
    }

    export function loadVehicleTable() {
        $("#vehicles-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle',
            type: 'GET',
            dataType: 'json',
            success: function(res) {
                console.log(res);
                if (Array.isArray(res)) {
                    res.forEach(function(vehicle) {
                        var staff_id = vehicle.staff_id == null ? "Not Available" : vehicle.staff_id;
                        var vehicleRecord = `
                        <tr>
                            <td class="v-vehicle_code">${vehicle.vehicle_code}</td>
                            <td class="v-license_plate">${vehicle.license_plate}</td>
                            <td class="v-fuel_type">${vehicle.fuel_type}</td>
                            <td class="v-vehicle_category">${vehicle.vehicle_category}</td>
                            <td class="v-remarks">${vehicle.remarks}</td>
                            <td class="v-status">${vehicle.status}</td>
                            <td class="v-staff_id">${staff_id}</td>
                            <td class="v-first_name">${vehicle.first_name}</td>
                            <td class="v-role">${vehicle.role}</td>
                            <td class="v-phone_no">${vehicle.phone_no}</td>
                            <td class="v-email">${vehicle.email}</td>
                        </tr>`;
                        $('#vehicles-table-tb').append(vehicleRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                } else {
                    console.log('No vehicle data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading vehicle data:', res);
            }
        });
    }

    $('#vehicles-table-tb').on('click','tr',function () {
        recordIndexVehicle = $(this).index();

        var vehicle_code = $(this).find(".v-vehicle_code").text();
        var license_plate = $(this).find(".v-license_plate").text();
        var fuel_type = $(this).find(".v-fuel_type").text();
        var vehicle_category = $(this).find(".v-vehicle_category").text();
        var remarks = $(this).find(".v-remarks").text();
        var status = $(this).find(".v-status").text();
        var staff_id = $(this).find(".v-staff_id").text();
        var first_name = $(this).find(".v-first_name").text();
        var role = $(this).find(".v-role").text();
        var phone_no = $(this).find(".v-phone_no").text();
        var email = $(this).find(".v-email").text();

        var isAvailable = status === "Available";

        $('#txtVehicleRole').prop('disabled', !isAvailable).val(role);
        $('#txtVehicleFirstName').prop('disabled', !isAvailable).val(first_name);
        $('#txtVehiclePhoneNumber').prop('disabled', !isAvailable).val(phone_no);
        $('#txtVehicleEmail').prop('disabled', !isAvailable).val(email);
        $('#txtVehicleMemberID').prop('disabled', !isAvailable).val(staff_id);
        $('#txtSearchEmploys').prop('disabled', !isAvailable);
        $('#btnSearchEmploys').prop('disabled', !isAvailable);
        $('#txtVehicleCode').val(vehicle_code);
        $('#txtLicensePlate').val(license_plate);
        $('#txtFuelType').val(fuel_type);
        $('#txtVehicleCategory').val(vehicle_category);
        $('#txtRemarks').val(remarks);
        $('#txtStatus').val(status);
    });

    $('#btnSearchEmploys').on('click', function() {
        const searchQuery = $('#txtSearchEmploys').val();
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
                    $('#txtVehicleMemberID').val(staff.staff_id);
                    $('#txtVehicleFirstName').val(staff.first_name);
                    $('#txtVehicleEmail').val(staff.email);
                    $('#txtVehicleRole').val(staff.role);
                    $('#txtVehiclePhoneNumber').val(staff.phone_no);
                    $('#txtSearchEmploys').val("");
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    $('#save-vehicles').on('click', () => {
        var vehicle_code = $('#txtVehicleCode').val();
        var license_plate = $('#txtLicensePlate').val();
        var fuel_type = $('#txtFuelType').val();
        var vehicle_category = $('#txtVehicleCategory').val();
        var remarks = $('#txtRemarks').val();
        var status = $('#txtStatus').val();

        var isAvailable = status === "Available";
        var staff_id = isAvailable ? $('#txtVehicleMemberID').val() : null;
        var first_name = isAvailable ? $('#txtVehicleFirstName').val() : "*--*";
        var role = isAvailable ? $('#txtVehicleRole').val() : "*--*";
        var phone_no = isAvailable ? $('#txtVehiclePhoneNumber').val() : "*--*";
        var email = isAvailable ? $('#txtVehicleEmail').val() : "*--*";

        const vehicleData = {
            vehicle_code:vehicle_code,
            license_plate:license_plate,
            fuel_type:fuel_type,
            role:role,
            remarks:remarks,
            vehicle_category:vehicle_category,
            status:status,
            first_name:first_name,
            phone_no:phone_no,
            email:email,
            staff_id:staff_id
        };

        const vehicleJSON = JSON.stringify(vehicleData);
        console.log(vehicleJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle',
            type: 'POST',
            data: vehicleJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Vehicle saved successfully.");
                loadVehicleTable();
                clearFields();
            },
            error: (err) => {
                console.error("Error saving vehicle:", err);
            }
        });
    });

    $('#update-vehicles').on('click', () => {
        var vehicle_code = $('#txtVehicleCode').val();
        var license_plate = $('#txtLicensePlate').val();
        var fuel_type = $('#txtFuelType').val();
        var vehicle_category = $('#txtVehicleCategory').val();
        var remarks = $('#txtRemarks').val();
        var status = $('#txtStatus').val();

        var isAvailable = status === "Available";
        var staff_id = isAvailable ? $('#txtVehicleMemberID').val() : null;
        var first_name = isAvailable ? $('#txtVehicleFirstName').val() : "*--*";
        var role = isAvailable ? $('#txtVehicleRole').val() : "*--*";
        var phone_no = isAvailable ? $('#txtVehiclePhoneNumber').val() : "*--*";
        var email = isAvailable ? $('#txtVehicleEmail').val() : "*--*";

        const vehicleData = {
            vehicle_code:vehicle_code,
            license_plate:license_plate,
            fuel_type:fuel_type,
            role:role,
            remarks:remarks,
            vehicle_category:vehicle_category,
            status:status,
            first_name:first_name,
            phone_no:phone_no,
            email:email,
            staff_id:staff_id
        };

        const vehicleJSON = JSON.stringify(vehicleData);
        console.log(vehicleJSON);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle/' + vehicle_code,
            type: 'PATCH',
            data: vehicleJSON,
            contentType: 'application/json',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Vehicle updated successfully.");
                loadVehicleTable();
                clearFields();
            },
            error: (err) => {
                console.error("Error updating vehicle:", err);
            }
        });
    });

    $('#delete-vehicles').on('click',() => {
        var vehicle_code = $('#txtVehicleCode').val();
        var license_plate = $('#txtLicensePlate').val();
        var fuel_type = $('#txtFuelType').val();
        var vehicle_category = $('#txtVehicleCategory').val();
        var remarks = $('#txtRemarks').val();
        var status = $('#txtStatus').val();
        var staff_id = $('#txtVehicleMemberID').val();
        var first_name = $('#txtVehicleFirstName').val();
        var role = $('#txtVehicleRole').val();
        var phone_no = $('#txtVehiclePhoneNumber').val();
        var email = $('#txtVehicleEmail').val();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle/' + vehicle_code,
            type: 'DELETE',
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Vehicle Deleted");
                loadVehicleTable();
                clearFields();
            },
            error: (res) => {
                console.error(res);
                console.log("Vehicle Not Deleted");
            }
        });
    });

    $('#search-vehicle').on('click', function() {
        const searchQuery = $('#txtSearch-vehicles').val();
        searchVehiclesByID(searchQuery);
    });

    function searchVehiclesByID(query) {
        const vehicle_code = query.toLowerCase();
        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/vehicle?vehicle_code=' + vehicle_code,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                for (let i = 0; i < response.length; i++) {
                    if (vehicle_code === response[i].vehicle_code) {
                        var vehicle = response[i];
                        break;
                    }
                }
                if (vehicle) {
                    var isAvailable = vehicle.status === "Available";
                    var staff_id = vehicle.staff_id == null ? "Not Available" : vehicle.staff_id;
                    $('#txtVehicleRole').prop('disabled', !isAvailable).val(vehicle.role);
                    $('#txtVehicleFirstName').prop('disabled', !isAvailable).val(vehicle.first_name);
                    $('#txtVehiclePhoneNumber').prop('disabled', !isAvailable).val(vehicle.phone_no);
                    $('#txtVehicleEmail').prop('disabled', !isAvailable).val(vehicle.email);
                    $('#txtVehicleMemberID').prop('disabled', !isAvailable).val(staff_id);
                    $('#txtSearchEmploys').prop('disabled', !isAvailable);
                    $('#btnSearchEmploys').prop('disabled', !isAvailable);
                    $('#txtVehicleCode').val(vehicle.vehicle_code);
                    $('#txtLicensePlate').val(vehicle.license_plate);
                    $('#txtFuelType').val(vehicle.fuel_type);
                    $('#txtVehicleCategory').val(vehicle.vehicle_category);
                    $('#txtRemarks').val(vehicle.remarks);
                    $('#txtStatus').val(vehicle.status);
                    $('#txtSearch-vehicles').val("");
                } else {
                    console.error('Vehicle not found');
                }
            },
            error: function(error) {
                console.error('Error searching vehicle:', error);
                loadVehicleTable();
            }
        });
    }

    $('#clear-vehicles').on('click', () => {
        clearFields();
    });