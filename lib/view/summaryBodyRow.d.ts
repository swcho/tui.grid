import { Component } from 'preact';
import { ColumnInfo } from '../store/types';
interface OwnProps {
    columns: ColumnInfo[];
}
declare type Props = OwnProps;
export declare class SummaryBodyRow extends Component<Props> {
    shouldComponentUpdate(nextProps: Props): boolean;
    render({ columns }: Props): JSX.Element;
}
export {};
