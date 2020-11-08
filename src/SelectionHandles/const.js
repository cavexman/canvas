export const circle =
    <svg width='100' height='100'>
        <circle cx='50' cy='50' r='40' stroke='green' strokeWidth='4' fill='yellow' />
    </svg>;

export const rect =
    <svg height='140' width='500'>
        <rect width='300' height='100' style={{fill:'rgb(0,0,255)',strokeWidth:3,stroke:'rgb(0,0,0)'}} />
    </svg>;

export const ellipse =
    <svg width='400' height='110'>
        <ellipse cx='200' cy='80' rx='100' ry='50'
             style='fill:yellow;stroke:purple;strokeWidth:2' />
    </svg>;

export const polygon =
    <svg height='210' width='250'>
        <polygon points='200,10 250,190 160,210' style={{fill:'lime',stroke:'purple',strokeWidth:1}} />
    </svg>;

export const polyline =
    <svg height='200' width='500'>
        <polyline points='20,20 40,25 60,40 80,120 120,140 200,180'
                  style='fill:none;stroke:black;strokeWidth:3' />
    </svg>;

export const path =
    <svg height='210' width='400'>
        <path d='M150 0 L75 200 L225 200 Z' />
    </svg>;
