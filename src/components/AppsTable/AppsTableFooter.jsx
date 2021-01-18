import styled from '@emotion/styled';
import {minutesToHours} from '../../utils/math';
import {AppInstallSizes} from '../AppInstallSizes';

const summaryTypes = {
  averageFields: [
    'metascore',
    'playtime_forever',
    'size_mb',
    'store_price_default_usd',
    'timeToBeat'
  ],
  countTotalFields: [
    'appid',
    'controller_support',
    'hdr',
    'multiplayer',
    'os_linux',
    'os_mac',
    'os_windows',
    'stats_enabled',
    'steamcloud_enabled',
    'tradingcards_enabled',
    'workshop_enabled'
  ],
  valueTotalFields: [
    'playtime_forever',
    'size_mb',
    'store_price_default_usd',
    'timeToBeat'
  ]
};

const getValueTotal = (apps = [], field) => {
  if (field === 'timeToBeat') {
    // @TODO: timeToBeat
    return;
  }

  return apps.reduce((valueTotal, app) => {
    const appFieldValue = app[field] || 0;

    return valueTotal + appFieldValue;
  }, 0);
}

const getValueAverage = (apps, field) => {

};

const appendValueUnits = (value, field) => {
  switch (field) {
    case 'appid':
      return `${value} selected`;
    case 'playtime_forever':
      return [
        <div key={`${field}-hours`}>{minutesToHours(value)} hours</div>,
        <div key={`${field}-minutes`}>{value} minutes</div>
      ];
    case 'size_mb':
      return <AppInstallSizes sizeMB={value} />
    case 'store_price_default_usd':
      return `$${value}`;
    default:
      return value;
  }
}

const AppsTableFooterCell = ({apps = [], field}) => {
  if (!field) {
    return <TableFooterRowData />;
  }

  const {countTotalFields, valueTotalFields, averageFields} = summaryTypes;

  // @TODO: calculate these in the same iterator, rather than independently
  const countTotal = countTotalFields.includes(field) && apps.filter(app => !!app[field]).length;
  const valueTotal = valueTotalFields.includes(field) && getValueTotal(apps, field);
  const valueAverage = averageFields.includes(field) && getValueAverage(apps, field);

  return (
    <TableFooterRowData>
      { countTotal && <div>{ appendValueUnits(countTotal, field) }</div> }
      { valueTotal && <div>{ appendValueUnits(valueTotal, field) } (total)</div> }
      { valueAverage && <div>{ appendValueUnits(valueAverage, field) } (avg)</div> }
    </TableFooterRowData>
  );
};

export const AppsTableFooter = ({selectedRows, columns}) => {
  const selectedApps = selectedRows.map(({values}) => values);

  return (
    <TableFooter>
      <TableFooterRow>
        {/* checkbox cell */}
        <AppsTableFooterCell />
        { columns.map(({accessor, hidden}) => !hidden &&
          <AppsTableFooterCell key={`footer-${accessor}`} apps={selectedApps} field={accessor} />
        ) }
      </TableFooterRow>
    </TableFooter>
  );
};

const TableFooter = styled.tfoot`
  border-top: 1px solid #a0a0a0;
  background-color: #74706f;
  text-align: left;
  color: #FFFFFF;
  font-size: 0.875rem;
  font-weight: bold;
`;

const TableFooterRow = styled.tr`
  display: table-row;
  outline: 0;
  color: #FFFFFF;
`;

const TableFooterRowData = styled.td`
  display: table-cell;
  border-top: 1px solid #ddd;
  border-right: 1px solid #666666;
  border-bottom: 1px solid rgba(81, 81, 81, 1);
  background-color: #74706f;
  padding: 8px;
  vertical-align: top;
  text-align: left;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 0.875rem;
  font-weight: bold;
`;
