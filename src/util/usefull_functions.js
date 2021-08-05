import { typeUtilisateur } from "./magic_strings";

export const getColumn = (user, AdminstrateurColumn, initiateurColumn) => {
  return user.type === typeUtilisateur.ADMINISTRATEUR
    ? AdminstrateurColumn
    : initiateurColumn;
};

export const capitaliseFirst = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

export const stringifySearchAndFilter = (search, filter) => {
  return [JSON.stringify(search), JSON.stringify(filter)];
};
