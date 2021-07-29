import { createSelector } from "reselect";

const bilanInputSelector = (state) => state.bilan;

export const bilanSelector = createSelector(bilanInputSelector, (bilan) =>
  bilan.bilansList.map((bilan) => {
    bilan.key = bilan.id;
    bilan.intitulé = bilan.evenement?.intitulé;
    return bilan;
  })
);

export const bilanIsLoadingSelector = createSelector(
  bilanInputSelector,
  (bilan) => bilan.isBilansLoading
);

export const currentBilanSelector = createSelector(
  bilanInputSelector,
  (bilan) => bilan.currentBilan
);
export const isCurrentBilanLoadingSelector = createSelector(
  bilanInputSelector,
  (bilan) => bilan.isCurrentBilanLoading
);
