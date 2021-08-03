import UtilisateurActions from "./utilisateur.actions.type";

const INITIAL_STATE = {
  utilisateursList: [],
  isUtilisateursLoading: true,
  currentUtilisateur: null,
  isCurrentUtilisateurLoading: true,
};

const utilisateurReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UtilisateurActions.UTILISATEUR_FETCHING_SUCCESS: {
      return {
        ...state,
        utilisateursList: action.payload.utilisateurs,
        isUtilisateursLoading: false,
      };
    }
    case UtilisateurActions.CREATE_UTILISATEUR_SUCCESS: {
      return {
        ...state,
        utilisateursList: [
          action.payload.utilisateur,
          ...state.utilisateursList,
        ],
      };
    }
    case UtilisateurActions.DELETE_UTILISATEUR_SUCCESS: {
      return {
        ...state,
        utilisateursList: state.utilisateursList.filter(
          (validation) => validation.id !== action.payload.id
        ),
      };
    }
    case UtilisateurActions.UPDATE_UTILISATEUR_SUCCESS:
      return {
        ...state,
        utilisateursList: state.utilisateursList.map((utilisateur) => {
          if (utilisateur.id === action.payload.utilisateur.id)
            return action.payload.utilisateur;
          return utilisateur;
        }),
      };
    case UtilisateurActions.ONE_UTILISATEUR_FETCHING_SUCCESS:
      return {
        ...state,
        isCurrentUtilisateurLoading: false,
        currentUtilisateur: action.payload.utilisateur,
      };
    case UtilisateurActions.VALIDATE_UTILISATEUR_SUCCESS:
      return {
        ...state,
        utilisateursList: state.utilisateursList.map((utilisateur) => {
          if (utilisateur.id === action.payload.id) {
            utilisateur.etat = action.payload.decision;
          }
          return utilisateur;
        }),
      };

    default:
      return state;
  }
};

export default utilisateurReducer;
