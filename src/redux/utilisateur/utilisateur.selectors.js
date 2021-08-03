import { createSelector } from "reselect";

const utilisateurInputSelector = (state) => state.utilisateur;

export const utilisateurSelector = createSelector(
  utilisateurInputSelector,
  (utilisateur) =>
    utilisateur.utilisateursList.map((utilisateur) => {
      utilisateur.key = utilisateur.id;
      utilisateur.intitulé = utilisateur.evenement?.intitulé;
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
