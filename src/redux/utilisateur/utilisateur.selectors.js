import { createSelector } from "reselect";
import { baseUrl } from "../../config.json";
const utilisateurInputSelector = (state) => state.utilisateur;

export const utilisateurSelector = createSelector(
  utilisateurInputSelector,
  (utilisateur) =>
    utilisateur.utilisateursList.map((utilisateur) => {
      utilisateur.key = utilisateur.id;
      utilisateur.intitulé = utilisateur.evenement?.intitulé;
      utilisateur.photo = baseUrl + utilisateur.photo;
      return utilisateur;
    })
);

export const utilisateurIsLoadingSelector = createSelector(
  utilisateurInputSelector,
  (utilisateur) => utilisateur.isUtilisateursLoading
);

export const currentUtilisateurSelector = createSelector(
  utilisateurInputSelector,
  (utilisateur) => utilisateur.currentUtilisateur
);
export const isCurrentUtilisateurLoadingSelector = createSelector(
  utilisateurInputSelector,
  (utilisateur) => utilisateur.isCurrentUtilisateurLoading
);
