import { FETCH_PROFILE } from '../types/profileTypes';
import { PUT_PROFILE } from '../types/profileTypes';

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
    offerings: 'Ich bin eine super gute Informatikerin mit 10000 Jahren Berufserfahrung'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      return state;
    case PUT_PROFILE:
      return {
        member: { ...state.member, ...action.payload }
      };
    default:
      return state;
  }
}
