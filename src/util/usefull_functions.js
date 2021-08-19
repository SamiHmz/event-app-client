import { typeUtilisateur } from "./magic_strings";

export const getColumn = (user, AdminstrateurColumn, initiateurColumn) => {
  return user.type === typeUtilisateur.ADMINISTRATEUR
    ? AdminstrateurColumn
    : initiateurColumn;
};

export const capitaliseFirst = (str) => {
  const str2 = str.charAt(0).toUpperCase() + str.slice(1);
  return str2;
};

export const stringifySearchAndFilter = (search, filter) => {
  return [JSON.stringify(search), JSON.stringify(filter)];
};

export const addBeforeCloseHandler = (callback) => {
  window.addEventListener(
    "beforeunload",
    function (e) {
      e.preventDefault();
      callback();
      return (e.returnValue = "Are you sure you want to close?");
    },
    { passive: true }
  );
};

export const removeBeforeCloseHandler = (callback) => {
  console.log("removed");
  window.removeEventListener("beforeunload", callback, { capture: false });
};

export function removeListenersFromElement(element, listenerType) {
  const listeners = window.getEventListeners(window)["beforeunload"];
  let l = listeners.length;
  for (let i = l - 1; i >= 0; i--) {
    window.removeEventListener(listenerType, listeners[i].listener);
  }
}

export const getChartData = (data) => {
  var categories = [];
  var series = [];
  data.forEach((element) => {
    categories.push(element.nom);
    series.push(element.count);
  });
  return [categories, series];
};
