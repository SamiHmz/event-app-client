import {
  typeUtilisateur,
  etat,
  typeInitiateur,
  modeSponsoring,
  typeIntervenant,
  modeEvenement,
  typeEvenement,
  sexe,
} from "./magic_strings";

export const demandeFilterOptions = [
  {
    title: "etat",
    options: Object.values(etat),
    default: etat.ATENTE,
  },
  {
    title: "type",
    options: typeEvenement,
  },
  {
    title: "mode",
    options: modeEvenement,
  },
];

export const intervenantFilterOptions = [
  {
    title: "etat",
    options: Object.values(etat),
    default: etat.ATENTE,
  },
  {
    title: "type",
    options: typeIntervenant,
  },
  {
    title: "sexe",
    options: sexe,
  },
];
export const sponsoringFilterOptions = [
  {
    title: "etat",
    options: Object.values(etat),
    default: etat.ATENTE,
  },
  {
    title: "type",
    options: modeSponsoring,
  },
];
export const bilanFilterOptions = [
  {
    title: "etat",
    options: Object.values(etat),
    default: etat.ATENTE,
  },
];
export const usersFilterOptions = [
  {
    title: "type",
    options: typeInitiateur,
  },
];
