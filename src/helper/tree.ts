import { Row, ColumnDefaultValues, RowKey } from '../store/types';
import { createRawRow } from '../store/data';
import { OptRow } from '../types';
import { observable, observe, notify } from './observable';
import { includes, findProp, removeArrayItem, isNull } from './common';

export const DEFAULT_INDENT_WIDTH = 22;

let treeRowKey = -1;

function generateTreeRowKey() {
  // @TODO 키 제너레이터 추가
  treeRowKey += 1;

  return treeRowKey;
}

export function addChildRowKey(row: Row, rowKey: RowKey) {
  const { tree } = row._attributes;

  if (tree && !includes(tree.childRowKeys, rowKey)) {
    tree.childRowKeys.push(rowKey);
    notify(tree, 'childRowKeys');
  }
}

export function removeChildRowKey(row: Row, rowKey: RowKey) {
  const { tree } = row._attributes;

  if (tree) {
    removeArrayItem(rowKey, tree.childRowKeys);
    notify(tree, 'childRowKeys');
  }
}

export function getParentRowKey(row: Row) {
  const { tree } = row._attributes;

  return tree && tree.parentRowKey !== row.rowKey ? tree.parentRowKey : null;
}

export function getChildRowKeys(row: Row) {
  const { tree } = row._attributes;

  return tree ? tree.childRowKeys.slice() : [];
}

export function isLeaf(row: Row) {
  const { tree } = row._attributes;

  return !!tree && !tree.childRowKeys.length;
}

export function isExpanded(row: Row) {
  const { tree } = row._attributes;

  return !!tree && tree.expanded;
}

export function getDepth(rawData: Row[], row: Row) {
  let parentRow: Row | undefined = row;
  let depth = 0;

  do {
    depth += 1;
    parentRow = findProp('rowKey', getParentRowKey(parentRow), rawData);
  } while (parentRow);

  return depth;
}

function hasChildrenState(row: OptRow) {
  const { _children } = row;

  return Array.isArray(_children) && _children.length > 0;
}

function getExpandedState(row: OptRow) {
  if (row && row._attributes) {
    const { expanded = false } = row._attributes;

    return expanded;
  }

  return false;
}

export function getHiddenChildState(row: Row) {
  if (row) {
    const { tree } = row._attributes;
    const collapsed = !isExpanded(row);
    const hiddenChild = !!(tree && tree.hiddenChild);

    return collapsed || hiddenChild;
  }

  return false;
}

function createTreeRawRow(
  row: OptRow,
  defaultValues: ColumnDefaultValues,
  parentRow: Row | null,
  keyColumnName?: string
) {
  const rawRow = createRawRow(row, generateTreeRowKey(), defaultValues, keyColumnName);
  const { rowKey } = rawRow;
  const defaultAttributes = {
    parentRowKey: parentRow ? parentRow.rowKey : null,
    childRowKeys: []
  };

  if (parentRow) {
    addChildRowKey(parentRow, rowKey);
  }

  rawRow._attributes.tree = observable({
    ...defaultAttributes,
    ...(hasChildrenState(row) && { expanded: getExpandedState(row) }),
    ...(!!parentRow && { hiddenChild: getHiddenChildState(parentRow) })
  });

  return rawRow;
}

export function flattenTreeData(
  data: OptRow[],
  defaultValues: ColumnDefaultValues,
  parentRow: Row | null,
  keyColumnName?: string
) {
  const flattenedRows: Row[] = [];

  data.forEach((row) => {
    const rawRow = createTreeRawRow(row, defaultValues, parentRow, keyColumnName);

    flattenedRows.push(rawRow);

    if (hasChildrenState(row)) {
      flattenedRows.push(
        ...flattenTreeData(row._children || [], defaultValues, rawRow, keyColumnName)
      );
      delete rawRow._children;
    }
  });

  return flattenedRows;
}

export function createTreeRawData(
  data: OptRow[],
  defaultValues: ColumnDefaultValues,
  keyColumnName?: string
) {
  treeRowKey = -1;

  return flattenTreeData(data, defaultValues, null, keyColumnName);
}

export function getTreeCellInfo(rawData: Row[], row: Row, useIcon?: boolean) {
  const depth = getDepth(rawData, row);
  let indentWidth = depth * DEFAULT_INDENT_WIDTH;

  if (useIcon) {
    indentWidth += DEFAULT_INDENT_WIDTH;
  }

  return {
    depth,
    indentWidth,
    leaf: isLeaf(row),
    expanded: isExpanded(row)
  };
}

export function createTreeCellInfo(rawData: Row[], row: Row, useIcon?: boolean) {
  const treeInfo = observable(getTreeCellInfo(rawData, row, useIcon));

  observe(() => {
    treeInfo.expanded = isExpanded(row);
    treeInfo.leaf = isLeaf(row);
  });

  return treeInfo;
}

export function traverseAncestorRows(rawData: Row[], row: Row, iteratee: Function) {
  let parentRowKey = getParentRowKey(row);
  let parentRow;

  while (!isNull(parentRowKey)) {
    parentRow = findProp('rowKey', parentRowKey, rawData);

    iteratee(parentRow);

    parentRowKey = parentRow ? getParentRowKey(parentRow) : null;
  }
}

export function traverseDescendantRows(rawData: Row[], row: Row, iteratee: Function) {
  let childRowKeys = getChildRowKeys(row);
  let rowKey, childRow;

  while (childRowKeys.length) {
    rowKey = childRowKeys.shift();
    childRow = findProp('rowKey', rowKey, rawData);

    iteratee(childRow);

    if (childRow) {
      childRowKeys = childRowKeys.concat(getChildRowKeys(childRow));
    }
  }
}
