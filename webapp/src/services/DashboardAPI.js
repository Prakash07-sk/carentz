import axios from "axios";

const baseUrl = ' https://carentz.stackroute.io/bookings-management';
// const baseUrl = 'https://carentz.stackroute.io/bookings-management';


export const UploadCars = (vechNo) => {
    var data = {
        isSuccess: false,
        data:'',
    };
   return axios.get(`${baseUrl}/api/v4/getvehicleByVendor/`+ vechNo)
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err
        return data
    })

}