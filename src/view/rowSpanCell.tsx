import { h, Component } from 'preact';
import { ViewRow, RowSpan, Row, ColumnInfo } from '../store/types';
import { connect } from './hoc';
import { DispatchProps } from '../dispatch/create';
import { getRowSpanByRowKey } from '../helper/rowSpan';
import { BodyCell } from './bodyCell';

interface OwnProps {
  viewRow: ViewRow;
  columnInfo: ColumnInfo;
  refreshRowHeight: Function | null;
}

interface StoreProps {
  rowSpan: RowSpan | null;
  enableRowSpan: boolean;
}

type Props = OwnProps & StoreProps & DispatchProps;

export class RowSpanCellComp extends Component<Props> {
  public render() {
    const { columnInfo, refreshRowHeight, rowSpan, enableRowSpan, viewRow } = this.props;
    let rowSpanAttr = null;

    if (enableRowSpan && rowSpan) {
      if (!rowSpan.mainRow) {
        return null;
      }
      rowSpanAttr = { rowSpan: rowSpan.spanCount };
    }

    return (
      <BodyCell
        viewRow={viewRow}
        columnInfo={columnInfo}
        refreshRowHeight={refreshRowHeight}
        rowSpanAttr={rowSpanAttr}
      />
    );
  }
}

export const RowSpanCell = connect<StoreProps, OwnProps>(({ data }, { viewRow, columnInfo }) => {
  const { rowKey } = viewRow;
  const { sortOptions, rawData } = data;
  const rowSpan = getRowSpanByRowKey(rowKey, columnInfo.name, rawData as Row[]);
  const enableRowSpan = sortOptions.columnName === 'rowKey';

  return { rowSpan, enableRowSpan };
})(RowSpanCellComp);
