import { createSelector } from "reselect";

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
