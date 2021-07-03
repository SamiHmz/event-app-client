import { createSelector } from "reselect";

const demandesInputSelector = (state) => state.evenement;

export const demandesSelector = createSelector(
  [demandesInputSelector],
  ({ demandes }) => {
    return demandes.map((demande) => {
      return {
        key: demande.id,
        intitulé: demande.intitulé,
        date: demande.createdAt,
        etat: demande.etat,
      };
    });
  }
);

export const demandesIsLoadingSelector = createSelector(
  demandesInputSelector,
  ({ isDemandesLoading }) => isDemandesLoading
);

export const demandeValidationSelector = createSelector(
  demandesInputSelector,
  ({ demandesValidation }) => {
    return demandesValidation.map((validation) => {
      return {
        key: validation.id,
        date: validation.createdAt,
        etat: validation.etat,
        details: validation.details,
      };
    });
  }
);

export const demandeValidationIsLoadingSelector = createSelector(
  demandesInputSelector,
  ({ isValidationLoading }) => isValidationLoading
);

export const currentDemandeSelector = createSelector(
  demandesInputSelector,
  ({ currentDemande }) => currentDemande
);

export const currentDemandeIsLoadingSelector = createSelector(
  demandesInputSelector,
  ({ isCurrentDemandeLoading }) => isCurrentDemandeLoading
);
