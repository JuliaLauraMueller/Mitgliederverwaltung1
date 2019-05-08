import axios from 'axios';
import formatDate from '../helpers/formatter';

async function getUserData(id) {
  var userData = await axios.get('/users/' + id).then(resp => {
    return {
      member: {
        _id: id,
        status: resp.data.status,
        memberNumber: resp.data.memberNumber,
        entryDate: resp.data.entryDate,
        city_id: resp.data.circle,
        godfather_id: resp.data.godfather,
        birthdate: resp.data.birthdate,
        sector: resp.data.sector,
        job: resp.data.job,
        function: resp.data.function,
        company_id: resp.data.company,
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
        surname: resp.data.surname,
        alias: resp.data.alias,

        xingLink: resp.data.xingLink,
        linkedinLink: resp.data.linkedinLink,
        facebookLink: resp.data.facebookLink,
        instagramLink: resp.data.instagramLink,
        offerings: resp.data.offerings,

        avatar: resp.data.avatar,
        avatarTag: resp.data.avatarTag
      }
    };
  });

  if (userData.member.godfather_id) {
    await axios.get('/users/' + userData.member.godfather_id).then(resp => {
      if (resp) {
        userData.member.godfather =
          resp.data.firstname + ' ' + resp.data.surname;
      }
    });
  } else {
    userData.member.godfather = '';
  }

  if (userData.member.city_id) {
    await axios.get('/circles/' + userData.member.city_id).then(resp => {
      userData.member.city = resp.data.name;
    });
  }

  if (userData.member.entryDate)
    userData.member.entryDate = formatDate(new Date(userData.member.entryDate));
  if (userData.member.birthdate)
    userData.member.birthdate = formatDate(new Date(userData.member.birthdate));

  return userData;
}

function getCompanyData(id) {
  return axios.get('/companies/' + id).then(resp => {
    return {
      member: {
        company: resp.data.companyName,
        companyURL: resp.data.companyURL,
        companyStreet: resp.data.companyStreet,
        companyStreetNr: resp.data.companyStreetNr,
        companyZip: resp.data.companyZip,
        companyCity: resp.data.companyCity
      }
    };
  });
}

async function setUserData(userData, companyData) {
  var data = { userData: userData, companyData: companyData };
  return await axios
    .put('/users/' + data.userData._id, data)
    .then(res => {
      return res.data.updated;
    })
    .catch(error => {
      if (error && error.data.errors && error.data.type === 'invalid_input') {
        return Promise.reject(error.data.errors);
      }
    });
}

async function setCompanyData(data) {
  var res = axios.put('/companies/' + data.company_id, data);
  return res;
}

async function changePassword(data) {
  return await axios
    .put('/users/changePassword/' + data._id, data)
    .then(res => {
      return Promise.resolve(res);
    })
    .catch(error => {
      if (error && error.data.msg) {
        return Promise.reject(error.data.msg);
      } else {
        return Promise.reject('Passwort konnte nicht geändert werden');
      }
    });
}

const profileService = {
  getUserData,
  getCompanyData,
  setUserData,
  setCompanyData,
  changePassword
};
export default profileService;
