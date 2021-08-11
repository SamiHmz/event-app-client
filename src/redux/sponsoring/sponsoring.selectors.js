import { createSelector } from "reselect";
import moment from "moment";
import { userInputSelector } from "../user/user.selectors";
import { typeUtilisateur } from "../../util/magic_strings";
import { baseUrl } from "../../config.json";
const sponsoringInputSelector = (state) => state.sponsoring;

export const sponsoringSelector = createSelector(
  sponsoringInputSelector,
  (sponsoring) =>
    sponsoring.sponsoringList.map((sponsoring) => {
      sponsoring.key = sponsoring.id;
      sponsoring.intitulé = sponsoring.evenement?.intitulé;
      sponsoring.initiateur = sponsoring.evenement?.initiateur?.nom;
      sponsoring.dossier = baseUrl + sponsoring.dossier;
      return sponsoring;
    })
);

export const sponsoringIsLoadingSelector = createSelector(
  sponsoringInputSelector,
  (sponsoring) => sponsoring.isSponsoringsLoading
);

export const currentSponsoringSelector = createSelector(
  sponsoringInputSelector,
  (sponsoring) => sponsoring.currentSponsoring
);
export const isCurrentSponsoringLoadingSelector = createSelector(
  sponsoringInputSelector,
  (sponsoring) => sponsoring.isCurrentSponsoringLoading
);

export const sponsoringValidationsSelector = createSelector(
  [sponsoringInputSelector, userInputSelector],
  ({ sponsoringValidations }, { currentUser }) => {
    if (currentUser.type === typeUtilisateur.INITIATEUR)
      return sponsoringValidations.map((validation) => {
        return {
          key: validation.id,
          date: moment(validation.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
          etat: validation.etat,
          details: validation.details,
          validateur: validation.administrateur.nom,
          administrateur_id: validation.administrateur_id,
        };
      });
    return sponsoringValidations.map((validation) => {
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
  sponsoringInputSelector,
  (sponsoring) => sponsoring.isValidationLoading
);
