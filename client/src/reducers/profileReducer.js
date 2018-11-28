import { FETCH_PROFILE } from '../actions/types';
import { PUT_PROFILE } from '../actions/types';

const initialState = {
  member: {
    status: 'Junior',
    memberNumber: '101',
    entryDate: '2016',
    city: 'Bern',
    godfather: 'Tabea',
    birthdate: '12.09.1990',
    sector: 'IT',
    job: 'JS Entwickler',
    function: 'Chef',
    company: 'Marc IT',
    companyTel: 'asdf',
    companyMobile: '0799994560',
    companyEmail: 'asdf',
    companyStreet: 'asdf',
    companyStreetNr: 'asdf',
    companyZip: 'asdf',
    companyCity: 'asdf',
    companyURL: 'asdf',

    privateTel: 'asdf',
    privateMobile: 'asdf',
    privateEmail: 'asdf',
    privateStreet: 'asdf',
    privateStreetNr: 'asdf',
    privateZip: 'asdf',
    privateCity: 'asdf',

    salutation: 'Hr',
    title: 'Dr',
    firstname: 'Marc',
    surename: 'Zimmermann',
    alias: 'Zimmi',

    xingLink: 'www.xing.com',
    linkedinLink: 'asdf',
    facebookLink: 'asdf',
    instagramLink: 'asdf',
    offerings: 'asdf'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return state;
    case PUT_PROFILE:
      return {
        member: action.payload
      };
    default:
      return state;
  }
}
