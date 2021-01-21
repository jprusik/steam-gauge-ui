import React from 'react';
import Remove from '@material-ui/icons/Remove';

export const InstallSizes = ({
  missingDataPlaceholder = false,
  value: sizeMB = 0
}) => {
  if (!sizeMB || sizeMB === 0) {
    return missingDataPlaceholder ?
      <Remove /> : <div>0 (MB)</div>;
  }

  const sizeGB = Math.round((sizeMB / 1000) * 10) / 10;

  return (
    <div>
      { sizeMB > 1000 ? (
        <div>{sizeGB} GB</div>
      ) : (
        <div>{sizeMB} MB</div>
      )}
    </div>
  );
};
