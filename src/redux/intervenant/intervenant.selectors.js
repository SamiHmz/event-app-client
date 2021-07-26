import { createSelector } from "reselect";
import moment from "moment";
const intervenantInputSelector = (state) => state.intervenant;

export const intervenantSelector = createSelector(
  intervenantInputSelector,
  (intervenant) =>
    intervenant.intervenantsList.map((intervenant) => {
      intervenant.key = intervenant.id;
      return intervenant;
    })
);

export const intervenantIsLoadingSelector = createSelector(
  intervenantInputSelector,
  (intervenant) => intervenant.isIntervenantsLoading
);

export const currentIntervenantSelector = createSelector(
  intervenantInputSelector,
  (intervenant) => intervenant.currentIntervenant
);
export const isCurrentIntervenantLoadingSelector = createSelector(
  intervenantInputSelector,
  (intervenant) => intervenant.isCurrentIntervenantLoading
);

export const intervenantValidationsSelector = createSelector(
  intervenantInputSelector,
  (intervenant) =>
    intervenant.intervenantValidations.map((validation) => {
      return {
        key: validation.id,
        date: moment(validation.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        etat: validation.etat,
        details: validation.details,
        validateur: validation.administrateur.nom,
      };
    })
);
export const isValidationLoadingSelector = createSelector(
  intervenantInputSelector,
  (intervenant) => intervenant.isValidationLoading
);
