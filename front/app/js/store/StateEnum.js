import Enum from '../utils/Enum';

export const State = Enum(
  'fetching',
  'fetchError',
  'fetchSuccess',
  'run',
  'end'
);
