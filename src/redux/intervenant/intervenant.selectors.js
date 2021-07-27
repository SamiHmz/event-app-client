import { createSelector } from "reselect";
import moment from "moment";
import { userInputSelector } from "../user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";

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
  [intervenantInputSelector, userInputSelector],
  ({ intervenantValidations }, { currentUser }) => {
    if (currentUser.type === typeUtilisateur.INITIATEUR)
      return intervenantValidations.map((validation) => {
        return {
          key: validation.id,
          date: moment(validation.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          etat: validation.etat,
          details: validation.details,
          validateur: validation.administrateur.nom,
          administrateur_id: validation.administrateur_id,
        };
      });
    return intervenantValidations.map((validation) => {
      return {
        key: validation.id,
        date: moment(validation.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
        etat: validation.etat,
        details: validation.details,
        administrateur_id: validation.administrateur_id,
        validateur: validation.administrateur.nom,
      };
    });
  }
);

export const isValidationLoadingSelector = createSelector(
  intervenantInputSelector,
  (intervenant) => intervenant.isValidationLoading
);
