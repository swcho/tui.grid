import { storiesOf } from '@storybook/html';
import { withKnobs, button } from '@storybook/addon-knobs';
import Grid from '../src/grid';
import { OptGrid } from '../src/types';
import { Omit } from 'utility-types';
import { data } from '../samples/basic';
import { CellRendererProps } from '../src/renderer/types';

import '../src/css/grid.css';
import '../samples/css/rowHeaders.css';

const stories = storiesOf('Row Headers', module);
stories.addDecorator(withKnobs);

const columns = [
  { name: 'name', minWidth: 150 },
  { name: 'artist', minWidth: 150 },
  { name: 'type', minWidth: 150 },
  { name: 'release', minWidth: 150 },
  { name: 'genre', minWidth: 150 }
];

function alertObjectToJson(obj: object, useSpace?: boolean) {
  alert(JSON.stringify(obj, null, useSpace ? '\t' : null));
}

function createGrid(options: Omit<OptGrid, 'el'>) {
  const el = document.createElement('div');
  el.style.width = '800px';

  const grid = new Grid({ el, ...options });

  return { el, grid };
}

function createButtons(grid) {
  button('check(1)', () => grid.check(1));
  button('uncheck(1)', () => grid.uncheck(1));

  button('checkAll()', () => grid.checkAll());
  button('uncheckAll()', () => grid.uncheckAll());

  button('getCheckedRowKeys()', () => {
    alertObjectToJson(grid.getCheckedRowKeys());
  });

  button('getCheckedRows()', () => {
    alertObjectToJson(grid.getCheckedRows(), true);
  });
}

export class RowNumberRenderer {
  private el: HTMLElement;

  public constructor(props: CellRendererProps) {
    const el = document.createElement('span');

    el.innerHTML = `No.${props.value}`;

    this.el = el;
  }

  public getElement() {
    return this.el;
  }

  public render(props: CellRendererProps) {
    this.el.innerHTML = props.formattedValue;
  }
}

class SingleCheckRenderer {
  private el: HTMLLabelElement;

  public constructor(props: CellRendererProps) {
    const { grid, rowKey } = props;

    const label = document.createElement('label');
    label.className = 'checkbox';
    label.setAttribute('for', String(rowKey));

    const hiddenInput = document.createElement('input');
    hiddenInput.className = 'hidden-input';
    hiddenInput.id = String(rowKey);

    const customInput = document.createElement('span');
    customInput.className = 'custom-input';

    label.appendChild(hiddenInput);
    label.appendChild(customInput);

    hiddenInput.type = 'checkbox';
    hiddenInput.addEventListener('change', () => {
      if (hiddenInput.checked) {
        grid.check(rowKey);
      } else {
        grid.uncheck(rowKey);
      }
    });

    this.el = label;

    this.render(props);
  }

  public getElement() {
    return this.el;
  }

  public render(props: CellRendererProps) {
    const hiddenInput = this.el.querySelector('.hidden-input') as HTMLInputElement;
    const checked = Boolean(props.value);

    hiddenInput.checked = checked;
  }
}

stories.add('single use - row number', () => {
  const { el } = createGrid({
    data,
    columns,
    rowHeaders: ['rowNum']
  });
  const rootEl = document.createElement('div');
  rootEl.appendChild(el);

  return rootEl;
});

stories.add(
  'single use - checkbox',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: ['checkbox']
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    (window as any).grid = grid;

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);

stories.add(
  'multi use - checkbox, row number',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: ['checkbox', 'rowNum']
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);

stories.add(
  'set object type option',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: [
        {
          type: 'rowNum',
          header: 'row number',
          width: 100,
          align: 'left'
        },
        {
          type: 'checkbox',
          header: 'checkbox',
          width: 100,
          align: 'left'
        }
      ]
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);

stories.add(
  'use custom renderer - row number',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: [
        {
          type: 'rowNum',
          renderer: {
            type: RowNumberRenderer
          }
        }
      ]
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);

stories.add(
  'use custom renderer - checkbox',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: [
        {
          type: 'checkbox',
          header: `
            <label for="all-checkbox" class="checkbox">
              <input type="checkbox" id="all-checkbox" class="hidden-input" name="_checked" />
              <span class="custom-input"></span>
            </label>
          `,
          renderer: {
            type: SingleCheckRenderer
          }
        }
      ]
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);

stories.add(
  'use frozen columns',
  () => {
    const { el, grid } = createGrid({
      data,
      columns,
      rowHeaders: ['rowNum', 'checkbox'],
      columnOptions: {
        frozenCount: 2
      }
    });
    const rootEl = document.createElement('div');
    rootEl.appendChild(el);

    createButtons(grid);

    return rootEl;
  },
  { html: { preventForcedRender: true } }
);
