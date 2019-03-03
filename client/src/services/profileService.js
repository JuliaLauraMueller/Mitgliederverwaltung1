import axios from 'axios';
import formatDate from '../helpers/formatter';

async function getUserData(id) {
  var userData = await axios.get('/users/' + id).then(resp => {
    return {
      member: {
        status: 'Junior',
        memberNumber: resp.data.memberNumber,
        entryDate: resp.data.entryDate,
        city: resp.data.circle,
        godfather: resp.data.godfather,
        birthdate: resp.data.birthdate,
        sector: resp.data.sector,
        job: resp.data.job,
        function: resp.data.function,
        company: resp.data.company,
        companyTel: resp.data.companyTel,
        companyMobile: resp.data.companyMobile,
        companyEmail: resp.data.companyEmail,

        privateTel: resp.data.privateTel,
        privateMobile: resp.data.privateMobile,
        privateEmail: resp.data.privateEmail,
        privateStreet: resp.data.privateStreet,
        privateStreetNr: resp.data.privateStreetNr,
        privateZip: resp.data.privateZip,
        privateCity: resp.data.privateCity,
        invoiceAddress: resp.data.invoiceAddress,

        salutation: resp.data.salutation,
        title: resp.data.title,
        firstname: resp.data.firstname,
        surename: resp.data.surname,
        alias: resp.data.alias,

        xingLink: resp.data.xingLink,
        linkedinLink: resp.data.linkedinLink,
        facebookLink: resp.data.facebookLink,
        instagramLink: resp.data.instagramLink,
        offerings: resp.data.offerings
      }
    };
  });

  if (userData.member.godfather) {
    await axios.get('/users/' + userData.member.godfather).then(resp => {
      if (resp) {
        userData.member.godfather =
          resp.data.firstname + ' ' + resp.data.surname;
      }
    });
  }

  if (userData.member.city) {
    await axios.get('/circles/' + userData.member.city).then(resp => {
      userData.member.city = resp.data.name;
    });
  }

  if (userData.member.entryDate)
    userData.member.entryDate = formatDate(new Date(userData.member.entryDate));
  if (userData.member.birthdate)
    userData.member.birthdate = formatDate(new Date(userData.member.birthdate));

  return userData;
}

function getCompanyLocationData(id) {
  return axios.get('/companyLocations/' + id).then(resp => {
    return {
      member: {
        companyID: resp.data.company,
        companyStreet: resp.data.companyStreet,
        companyStreetNr: resp.data.companyStreetNr,
        companyZip: resp.data.companyZip,
        companyCity: resp.data.companyCity
      }
    };
  });
}

function getCompanyData(id) {
  return axios.get('/companies/' + id).then(resp => {
    return {
      member: {
        company: resp.data.companyName,
        companyURL: resp.data.companyURL
      }
    };
  });
}

const profileService = { getUserData, getCompanyData, getCompanyLocationData };
export default profileService;
