import { createSelector } from "reselect";
import { userInputSelector } from "../user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import moment from "moment";
const demandesInputSelector = (state) => state.evenement;

export const demandesSelector = createSelector(
  [demandesInputSelector, userInputSelector],
  ({ demandes }, { currentUser }) => {
    if (currentUser.type === typeUtilisateur.INITIATEUR) {
      return demandes.map((demande) => {
        return {
          key: demande.id,
          intitulé: demande.intitulé,
          date: moment(demande.createdAt).format("DD-MMM-YYYY , h:mm:ss a"),
          etat: demande.etat,
        };
      });
    }
    return demandes.map((demande) => {
      return {
        initiateur: demande.initiateur.nom,
        key: demande.id,
        intitulé: demande.intitulé,
        date: moment(demande.createdAt).format("DD-MMM-YYYY , h:mm:ss a"),
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
        date: moment(validation.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
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
