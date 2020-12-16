import React  from 'react';

import cls from './SelectionHandles.module.sass';

export const SelectionHandles = () => {
    return (
        <div className={cls.handles}>
            <div className={cls.topLeftHandle} />
            <div className={cls.topRightHandle} />
            <div className={cls.bottomLeftHandle} />
            <div className={cls.bottomRightHandle} />
        </div>
    )
}
export default SelectionHandles;