/* This helper function is used to set a timeout for the notification component. 
    Once it pops up, it will disappear in 1200 milliseconds. */

    export function showNotification(setter) {
      setter(true);
      setTimeout(() => {
        setter(false);
      }, 1200);
    }
  
  
  