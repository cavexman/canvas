import { useState } from 'react';

export const useForceUpdate = ()  => {
    // eslint-disable-next-line no-unused-vars
    const [dirty, isDirty] = useState(0);
    /*
    * return a function that calls the state setter
    * pass the state setter a function that takes the current state as a param and return the param + 1
    * result: cause state to increment thus marking state dirty and schedules this component for render
    * */
    return () => isDirty((dirtyCount) => {return ++dirtyCount} );
}