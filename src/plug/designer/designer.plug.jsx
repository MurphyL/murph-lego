import { createContext } from 'react';


import Bigscreen from './controls/bigscreen/v1/bigscreen.v1.module';

import Chart from './controls/chart/v1/chart.v1.module';

import Board from './controls/board/v1/board.v1.module';

export const DispatchContext = createContext(null);

export const schemaComponents = {
    Bigscreen, 
    Board,
    Chart
};

