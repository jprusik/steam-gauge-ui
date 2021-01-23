import { useMemo } from 'react';
import {
  ControllerSupport,
  Developers,
  Genres,
  InstallSizes,
  Name,
  Publishers,
  TimePlayed,
  TimeToBeat,
} from '../AppData';
import {
  mbToGB,
  minutesToHours,
  pricePerHourRatio,
  roundToPlaces,
} from '../../utils/math';
import { Boolean } from '../AppData/Boolean';
import { Checkbox } from './Checkbox';
import {
  booleanCount,
  countByCategory,
  numberValueAverage,
  numberValueSum,
  uniqueValueCount,
} from '../../utils/totals';
import {appFields} from '../../constants/appFields';

export const columnOptions = () => [
  {
    id: 'selection',
    disableSortBy: true,
    // @TODO: add sorting for selection
    // accessor: (row, index, meta) => !!meta.isSelected,
    // sortType: ({values}, {values: nextValues}) => (
    //   values.selection && !nextValues.selection ?
    //     -1 : 0
    // ),
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
    Footer: ({ selectedFlatRows }) => {
      return `${selectedFlatRows.length} selected`;
    },
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    minWidth: 30,
  },
  { accessor: appFields.APP_TYPE, Header: 'Type', minWidth: 40 },
  { accessor: appFields.APPID, Header: 'ID', minWidth: 26 },
  {
    accessor: appFields.NAME,
    Cell: ({ row: { original } }) => <Name {...original} />,
    Header: 'Title',
    minWidth: 36,
  },
  {
    accessor: appFields.PLAYTIME_FOREVER,
    Cell: ({
      row: {
        original: { [appFields.PLAYTIME_FOREVER]: value },
      },
    }) => <TimePlayed value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const valueSum = useMemo(
        () => numberValueSum(selectedFlatRows, appFields.PLAYTIME_FOREVER),
        [selectedFlatRows]
      );

      return `Total: ${minutesToHours(valueSum)} hrs`;
    },
    Header: 'Hours Played',
    minWidth: 80,
    type: 'numeric',
  },
  {
    accessor: ({time_to_beat}) => {
      // @TODO: `time_to_beat` can be either null or undefined. Update
      // API to omit field values when no records are found.
      if (time_to_beat?.hltb_id) {
        const minutesToBeatValues = [
          ...(time_to_beat.minutes_to_beat_completionist > 0 ? [time_to_beat.minutes_to_beat_completionist] : []),
          ...(time_to_beat.minutes_to_beat_extras > 0 ? [time_to_beat.minutes_to_beat_extras] : []),
          ...(time_to_beat.minutes_to_beat_main_game > 0 ? [time_to_beat.minutes_to_beat_main_game] : [])
        ];

        const minutesToBeatMin = minutesToHours(Math.min(...minutesToBeatValues), 1);
        const minutesToBeatMax = minutesToHours(Math.max(...minutesToBeatValues), 1);

        return {
          minutesToBeatMin,
          minutesToBeatMax,
          hltbId: time_to_beat.hltb_id
        }
      }

      return {};
    },
    Cell: ({value}) => <TimeToBeat value={value} />,
    Header: 'Time to Beat',
    id: 'timeToBeat',
    minWidth: 50,
    sortType: (value, nextValue) => (
      (!value?.minutesToBeatMin || 0) >
      (!nextValue?.minutesToBeatMin || 0) ?
        -1 : 1
    ),
  },
  {
    accessor: appFields.STORE_PRICE_DEFAULT_USD,
    emptyValue: '',
    Header: 'Regular Price (USD)',
    minWidth: 73,
    type: 'currency',
  },
  {
    accessor: ({
      [appFields.STORE_PRICE_DEFAULT_USD]: price,
      [appFields.PLAYTIME_FOREVER]: playtime,
    }) => (price ? pricePerHourRatio(price, playtime) : null),
    Header: 'Price / Hours Played ratio',
    Footer: ({ selectedFlatRows }) => {
      const {playtimeTotal, priceTotal} = useMemo(
        () => ({
          // @TODO: total with a single loop
          playtimeTotal: numberValueSum(selectedFlatRows, appFields.PLAYTIME_FOREVER),
          priceTotal: numberValueSum(selectedFlatRows, appFields.STORE_PRICE_DEFAULT_USD)
        }),
        [selectedFlatRows]
      );

      return pricePerHourRatio(priceTotal, playtimeTotal);
    },
    minWidth: 92,
    type: 'numeric',
  },
  {
    accessor: appFields.RELEASE_DATE,
    Header: 'Release Date',
    minWidth: 52,
    type: 'date',
  },
  {
    accessor: appFields.DEVELOPERS,
    Cell: ({
      row: {
        values: { [appFields.DEVELOPERS]: value },
      },
    }) => <Developers value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const itemList = useMemo(
        () => uniqueValueCount(selectedFlatRows, appFields.DEVELOPERS),
        [selectedFlatRows]
      );

      return `${itemList.length} unique developer(s)`;
    },
    Header: 'Developers',
    minWidth: 66,
  },
  {
    accessor: appFields.PUBLISHERS,
    Cell: ({
      row: {
        values: { [appFields.PUBLISHERS]: value },
      },
    }) => <Publishers value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const itemList = useMemo(
        () => uniqueValueCount(selectedFlatRows, appFields.PUBLISHERS),
        [selectedFlatRows]
      );

      return `${itemList.length} unique publisher(s)`;
    },
    Header: 'Publishers',
    minWidth: 64,
  },
  {
    accessor: appFields.METASCORE,
    Cell: ({
      row: {
        values: {
          [appFields.METASCORE]: metascore,
          [appFields.METASCORE_LINK]: metascore_link,
        },
      },
    }) => <a href={metascore_link}>{metascore}</a>,
    Footer: ({ selectedFlatRows }) => {
      const valueAverage = useMemo(
        () => numberValueAverage(selectedFlatRows, appFields.METASCORE),
        [selectedFlatRows]
      );

      return `${valueAverage} (average)`;
    },
    Header: 'Metascore',
    minWidth: 61,
    type: 'numeric',
  },
  {
    accessor: appFields.ACHIEVEMENTS_ENABLED,
    Cell: ({
      row: {
        values: { [appFields.ACHIEVEMENTS_ENABLED]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.ACHIEVEMENTS_ENABLED),
        [selectedFlatRows]
      );

      return `${total} game(s) with achievements`;
    },
    Header: 'Achievements',
    minWidth: 80,
    type: 'boolean',
  },
  {
    accessor: appFields.OS_WINDOWS,
    Cell: ({
      row: {
        values: { [appFields.OS_WINDOWS]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.OS_WINDOWS),
        [selectedFlatRows]
      );

      return `${total} Windows game(s)`;
    },
    Header: 'Windows',
    minWidth: 56,
    type: 'boolean',
  },
  {
    accessor: appFields.OS_MAC,
    Header: 'Mac',
    Cell: ({
      row: {
        values: { [appFields.OS_MAC]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.OS_MAC),
        [selectedFlatRows]
      );

      return `${total} Mac game(s)`;
    },
    minWidth: 36,
    type: 'boolean',
  },
  {
    accessor: appFields.OS_LINUX,
    Cell: ({
      row: {
        values: { [appFields.OS_LINUX]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.OS_LINUX),
        [selectedFlatRows]
      );

      return `${total} Linux game(s)`;
    },
    Header: 'Linux',
    minWidth: 44,
    type: 'boolean',
  },
  {
    accessor: appFields.SIZE_MB,
    Cell: ({
      row: {
        values: { [appFields.SIZE_MB]: value = 0 },
      },
    }) => <InstallSizes value={value} missingDataPlaceholder />,
    Footer: ({ selectedFlatRows }) => {
      const valueSum = useMemo(
        () => numberValueSum(selectedFlatRows, appFields.SIZE_MB),
        [selectedFlatRows]
      );

      const totalText = valueSum > 1000 ?
        `${mbToGB(valueSum)} GB` :
        `${valueSum} MB`;

      const average = roundToPlaces(valueSum / selectedFlatRows.length, 0);

      return (
        <div>
          <div>
            {totalText} (total)
          </div>
          <br />
          <div>
            {average > 1000 ?
              `${mbToGB(average, 1)} GB (average)` :
              `${average} MB (average)`
            }
          </div>
        </div>
      );
    },
    Header: 'Install Size',
    minWidth: 46,
    type: 'numeric',
  },
  {
    accessor: appFields.CONTROLLER_SUPPORT,
    Cell: ({
      row: {
        values: { [appFields.CONTROLLER_SUPPORT]: value },
      },
    }) => <ControllerSupport value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const categories = useMemo(
        () => countByCategory(selectedFlatRows, appFields.CONTROLLER_SUPPORT),
        [selectedFlatRows]
      );

      return Object.keys(categories).map((category) => (
        <div key={`${category}-count`}>
          {category}: {categories[category]}
        </div>
      ));
    },
    Header: 'Controller Support',
    minWidth: 70,
  },
  {
    accessor: appFields.MULTIPLAYER,
    Cell: ({
      row: {
        values: { [appFields.MULTIPLAYER]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.OS_LINUX),
        [selectedFlatRows]
      );

      return `${total} multiplayer game(s)`;
    },
    Header: 'Multiplayer',
    minWidth: 70,
  },
  {
    accessor: appFields.GENRES,
    Cell: ({
      row: {
        values: { [appFields.GENRES]: value },
      },
    }) => <Genres value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const itemList = useMemo(
        () => uniqueValueCount(selectedFlatRows, appFields.GENRES),
        [selectedFlatRows]
      );

      return `${itemList.length} unique genre(s)`;
    },
    Header: 'Genres',
    minWidth: 50,
  },
  {
    accessor: appFields.STEAMCLOUD_ENABLED,
    Cell: ({
      row: {
        values: { [appFields.STEAMCLOUD_ENABLED]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.STEAMCLOUD_ENABLED),
        [selectedFlatRows]
      );

      return `${total} Steam Cloud game(s)`;
    },
    Header: 'Steam Cloud',
    minWidth: 52,
    type: 'boolean',
  },
  {
    accessor: appFields.TRADINGCARDS_ENABLED,
    Header: 'Trading Cards',
    Cell: ({
      row: {
        values: { [appFields.TRADINGCARDS_ENABLED]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.TRADINGCARDS_ENABLED),
        [selectedFlatRows]
      );

      return `${total} Trading Card game(s)`;
    },
    minWidth: 56,
    type: 'boolean',
  },
  {
    accessor: appFields.WORKSHOP_ENABLED,
    Cell: ({
      row: {
        values: { [appFields.WORKSHOP_ENABLED]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.WORKSHOP_ENABLED),
        [selectedFlatRows]
      );

      return `${total} Steam Workshop game(s)`;
    },
    Header: 'Steam Workshop',
    minWidth: 66,
    type: 'boolean',
  },
  {
    accessor: appFields.STATS_ENABLED,
    Cell: ({
      row: {
        values: { [appFields.STATS_ENABLED]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.STATS_ENABLED),
        [selectedFlatRows]
      );

      return `${total} stats-enabled game(s)`;
    },
    Header: 'Stats',
    minWidth: 40,
    type: 'boolean',
  },
  {
    accessor: appFields.HDR,
    Cell: ({
      row: {
        values: { [appFields.HDR]: value },
      },
    }) => <Boolean value={value} />,
    Footer: ({ selectedFlatRows }) => {
      const total = useMemo(
        () => booleanCount(selectedFlatRows, appFields.HDR),
        [selectedFlatRows]
      );

      return `${total} HDR-enabled game(s)`;
    },
    Header: 'HDR',
    minWidth: 38,
  },
];
