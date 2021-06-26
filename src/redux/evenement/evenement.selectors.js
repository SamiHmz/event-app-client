import { createSelector } from "reselect";

const demandesInputSelector = (state) => state.evenement.demandes;

export const demandesSelector = createSelector(
  [demandesInputSelector],
  (demandes) => {
    return demandes.data.map((demande) => {
      return {
        key: demande.id,
        nom: demande.titre,
        date: demande.createdAt,
        etat: demande.etat,
      };
    });
  }
);

export const demandeIsLoading = createSelector(
  demandesInputSelector,
  (demandes) => demandes.isLoading
);
// export default {
//   demandesSelector,
// };
