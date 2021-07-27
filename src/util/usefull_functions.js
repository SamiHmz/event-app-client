import { typeUtilisateur } from "./magic_strings";

export const getColumn = (user, AdminstrateurColumn, initiateurColumn) => {
  return user.type === typeUtilisateur.ADMINISTRATEUR
    ? AdminstrateurColumn
    : initiateurColumn;
};
