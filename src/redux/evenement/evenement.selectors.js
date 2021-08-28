import { createSelector } from "reselect";
import { userInputSelector } from "../user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import moment from "moment";
const evenmentInputSelector = (state) => state.evenement;

export const demandesSelector = createSelector(
  [evenmentInputSelector, userInputSelector],
  ({ demandes }, { currentUser }) => {
    if (currentUser.type === typeUtilisateur.INITIATEUR) {
      return demandes.map((demande) => {
        demande.key = demande.id;
        demande.date = moment(demande.createdAt).format(
          "DD-MMM-YYYY , h:mm:ss a"
        );
        return demande;
      });
    }
    return demandes.map((demande) => {
      demande.key = demande.id;
      demande.date = moment(demande.createdAt).format(
        "DD-MMM-YYYY , h:mm:ss a"
      );
      demande.initiateur = demande.initiateur?.nom;

      return demande;
    });
  }
);
export const demandesIsLoadingSelector = createSelector(
  evenmentInputSelector,
  ({ isDemandesLoading }) => isDemandesLoading
);

export const demandeValidationSelector = createSelector(
  evenmentInputSelector,
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
  evenmentInputSelector,
  ({ isValidationLoading }) => isValidationLoading
);

export const currentDemandeSelector = createSelector(
  evenmentInputSelector,
  ({ currentDemande }) => currentDemande
);

export const currentDemandeIsLoadingSelector = createSelector(
  evenmentInputSelector,
  ({ isCurrentDemandeLoading }) => isCurrentDemandeLoading
);

export const evenementsSelector = createSelector(
  evenmentInputSelector,
  ({ evenements }) => evenements
);
export const evenementsIsLoadingSelector = createSelector(
  evenmentInputSelector,
  ({ isEvenementLoading }) => isEvenementLoading
);

export const evenementPageNumberSelector = createSelector(
  evenmentInputSelector,
  ({ evenementPageNumber }) => evenementPageNumber
);
