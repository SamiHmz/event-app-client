import UtilisateurActions from "./utilisateur.actions.type";

export const startUtilisateurFetching = (pageNumber) => ({
  type: UtilisateurActions.START_UTILISATEUR_FETCHING,
  payload: {
    pageNumber,
  },
});

export const utilisateurFetchingSuccess = (utilisateurs) => ({
  type: UtilisateurActions.UTILISATEUR_FETCHING_SUCCESS,
  payload: {
    utilisateurs,
  },
});

export const startCreateUtilisateur = (payload) => ({
  type: UtilisateurActions.START_CREATE_UTILISATEUR,
  payload,
});

export const createUtilisateurSuccess = (utilisateur) => ({
  type: UtilisateurActions.CREATE_UTILISATEUR_SUCCESS,
  payload: {
    utilisateur,
  },
});

export const startDeleteUtilisateur = (id) => ({
  type: UtilisateurActions.START_DELETE_UTILISATEUR,
  payload: {
    id,
  },
});

export const deleteUtilisateurSuccess = (id) => ({
  type: UtilisateurActions.DELETE_UTILISATEUR_SUCCESS,
  payload: {
    id,
  },
});

export const startUpdateUtilisateur = ({ utilisateur, id, ...others }) => ({
  type: UtilisateurActions.START_UPDATE_UTILISATEUR,
  payload: {
    utilisateur,
    id,
    ...others,
  },
});

export const updateUtilisateurSuccess = (utilisateur) => ({
  type: UtilisateurActions.UPDATE_UTILISATEUR_SUCCESS,
  payload: {
    utilisateur,
  },
});

export const startOneUtilisateurFetching = (id) => ({
  type: UtilisateurActions.START_ONE_UTILISATEUR_FETCHING,
  payload: { id },
});

export const OneUtilisateurFetchingSuccess = (utilisateur) => ({
  type: UtilisateurActions.ONE_UTILISATEUR_FETCHING_SUCCESS,
  payload: { utilisateur },
});

export const startValidateUtilisateur = (id, decision) => ({
  type: UtilisateurActions.START_VALIDATE_UTILISATEUR,
  payload: { id, decision },
});
export const validateUtilisateurSuccess = (id, decision) => ({
  type: UtilisateurActions.VALIDATE_UTILISATEUR_SUCCESS,
  payload: { id, decision },
});
