import { AppDevelopers } from '../AppDevelopers';
import { AppGenres } from '../AppGenres';
import { AppInstallSizes } from '../AppInstallSizes';
import { AppName } from '../AppName';
import { AppPublishers } from '../AppPublishers';
import { AppTimeToBeat } from '../AppTimeToBeat';
import { minutesToHours, pricePerHourRatio } from '../../utils/math';
import { AppBoolean } from '../AppBoolean';
import { Checkbox } from '../Checkbox';

export const columnOptions = () => [
  {
    id: 'selection',
    Header: ({ getToggleAllRowsSelectedProps }) => (
      <Checkbox {...getToggleAllRowsSelectedProps()} />
    ),
    Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
  },
  { Header: 'Type', accessor: 'app_type', width: 47 },
  { Header: 'ID', accessor: 'appid', width: 42 },
  {
    Header: 'Title',
    accessor: 'name',
    Cell: ({ row: { original } }) => <AppName {...original} />,
    width: 73,
  },
  {
    Header: 'Hours Played',
    accessor: 'playtime_forever',
    type: 'numeric',
    Cell: ({
      row: {
        original: { playtime_forever },
      },
    }) => minutesToHours(playtime_forever, 1),
    width: 88,
  },
  {
    Header: 'Time to Beat',
    accessor: 'timeToBeat',
    Cell: ({ row: { original } }) => <AppTimeToBeat {...original} />,
    width: 68,
  },
  {
    Header: 'Regular Price (USD)',
    accessor: 'store_price_default_usd',
    type: 'currency',
    emptyValue: '',
    width: 81,
  },
  {
    Header: 'Price / Hours Played ratio',
    accessor: 'priceHoursRatio',
    type: 'numeric',
    Cell: ({
      row: {
        values: { store_price_default_usd, playtime_forever },
      },
    }) =>
      store_price_default_usd
        ? pricePerHourRatio(store_price_default_usd, playtime_forever)
        : null,
    width: 56,
  },
  {
    Header: 'Release Date',
    accessor: 'release_date',
    type: 'date',
    width: 62,
  },
  {
    Header: 'Developers',
    accessor: 'developers',
    Cell: ({
      row: {
        values: { developers },
      },
    }) => <AppDevelopers developers={developers} />,
    width: 77,
  },
  {
    Header: 'Publishers',
    accessor: 'publishers',
    Cell: ({
      row: {
        values: { publishers },
      },
    }) => <AppPublishers publishers={publishers} />,
    width: 74,
  },
  {
    Header: 'Metascore',
    accessor: 'metascore',
    type: 'numeric',
    Cell: ({
      row: {
        values: { metascore, metascore_link },
      },
    }) => <a href={metascore_link}>{metascore}</a>,
    width: 74,
  },
  {
    Header: 'Windows',
    accessor: 'os_windows',
    type: 'boolean',
    width: 67,
    Cell: ({
      row: {
        values: { os_windows },
      },
    }) => <AppBoolean value={os_windows} />,
  },
  {
    Header: 'Mac',
    accessor: 'os_mac',
    type: 'boolean',
    width: 45,
    Cell: ({
      row: {
        values: { os_mac },
      },
    }) => <AppBoolean value={os_mac} />,
  },
  {
    Header: 'Linux',
    accessor: 'os_linux',
    type: 'boolean',
    width: 50,
    Cell: ({
      row: {
        values: { os_linux },
      },
    }) => <AppBoolean value={os_linux} />,
  },
  {
    Header: 'Install Size',
    accessor: 'size_mb',
    type: 'numeric',
    Cell: ({
      row: {
        values: { size_mb = 0 },
      },
    }) => <AppInstallSizes sizeMB={size_mb} missingDataPlaceholder />,
    width: 91,
  },
  { Header: 'Controller Support', accessor: 'controller_support', width: 71 },
  {
    Header: 'Multiplayer',
    accessor: 'multiplayer',
    Cell: ({
      row: {
        values: { multiplayer },
      },
    }) => <AppBoolean value={multiplayer} />,
    width: 76,
  },
  {
    Header: 'Genres',
    accessor: 'genres',
    Cell: ({
      row: {
        values: { genres },
      },
    }) => <AppGenres genres={genres} />,
    width: 59,
  },
  {
    Header: 'Steam Cloud',
    accessor: 'steamcloud_enabled',
    type: 'boolean',
    Cell: ({
      row: {
        values: { steamcloud_enabled },
      },
    }) => <AppBoolean value={steamcloud_enabled} />,
  },
  {
    Header: 'Trading Cards',
    accessor: 'tradingcards_enabled',
    type: 'boolean',
    Cell: ({
      row: {
        values: { tradingcards_enabled },
      },
    }) => <AppBoolean value={tradingcards_enabled} />,
  },
  {
    Header: 'Steam Workshop',
    accessor: 'workshop_enabled',
    type: 'boolean',
    Cell: ({
      row: {
        values: { workshop_enabled },
      },
    }) => <AppBoolean value={workshop_enabled} />,
  },
  {
    Header: 'Stats',
    accessor: 'stats_enabled',
    type: 'boolean',
    Cell: ({
      row: {
        values: { stats_enabled },
      },
    }) => <AppBoolean value={stats_enabled} />,
  },
  {
    Header: 'HDR',
    accessor: 'hdr',
    Cell: ({
      row: {
        values: { hdr },
      },
    }) => <AppBoolean value={hdr} />,
  },
];
