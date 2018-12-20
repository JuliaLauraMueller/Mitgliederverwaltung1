import {
  PROFILE_USER_FETCHED,
  PROFILE_COMPLOC_FETCHED,
  PROFILE_COMP_FETCHED,
  PUT_PROFILE,
  FETCH_PROFILE
} from '../types/profileTypes';

const initialState = { member: {} };

/*
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
    invoiceAddress: '1',

    salutation: 'Hr.',
    title: 'Dr.',
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
*/

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      //console.log(state);
      return state;
    case PUT_PROFILE:
      return {
        member: { ...state.member, ...action.payload }
      };
    case PROFILE_USER_FETCHED:
      return {
        member: { ...state.member, ...action.payload }
      };
    case PROFILE_COMPLOC_FETCHED:
      return {
        member: { ...state.member, ...action.payload }
      };
    case PROFILE_COMP_FETCHED:
      return {
        member: { ...state.member, ...action.payload }
      };
    default:
      return state;
  }
}
