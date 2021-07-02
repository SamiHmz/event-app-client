import { createSelector } from "reselect";

const demandesInputSelector = (state) => state.evenement.demandes;

export const demandesSelector = createSelector(
  [demandesInputSelector],
  (demandes) => {
    return demandes.data.map((demande) => {
      return {
        key: demande.id,
        intitulé: demande.intitulé,
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

const demandeValidationInputSelector = (state) =>
  state.evenement.demandesValidation;

export const demandeValidationSelector = createSelector(
  demandeValidationInputSelector,
  (demandesValidation) => {
    return demandesValidation.data.map((validation) => {
      return {
        key: validation.id,
        date: validation.createdAt,
        etat: validation.etat,
        details: validation.details,
      };
    });
  }
);

export const demandeValidationIsLoading = createSelector(
  demandeValidationInputSelector,
  (demandesValidation) => demandesValidation.isLoading
);
