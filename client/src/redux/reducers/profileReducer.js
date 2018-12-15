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
    companyEmail: 'mz@youngleader.ch',
    companyStreet: 'Blümliweg',
    companyStreetNr: '09',
    companyZip: '5000',
    companyCity: 'Spreitenbach',
    companyURL: 'www.youngleaders.ch/index',

    privateTel: '0627945489',
    privateMobile: '0799345642',
    privateEmail: 'welcome@gmail.com',
    privateStreet: 'Rigibachberghangweg',
    privateStreetNr: '20a',
    privateZip: '4500',
    privateCity: 'Küngoldingen',
    invoiceAddress: '1',

    salutation: 'Hr.',
    title: 'Dr.',
    firstname: 'Marc',
    surename: 'Zimmermann',
    alias: 'Zimmi',

    xingLink: 'www.xing.com/sdmwpew',
    linkedinLink: 'www.linkedin.com/asdmwpewasdfasdf',
    facebookLink: 'www.facebook.com/sdasdfmwpewsdfasdfasdf',
    instagramLink: 'www.instagram.com/sdasdfasdfmwpew',
    offerings:
      'Ich bin eine super gute Informatikerin mit 10000 Jahren Berufserfahrung'
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
