import React from 'react';
import { shallow, mount, render } from 'enzyme';

// テスト対象
import App from './App';

// Component
import ErrorBoundary from '../src/components/ErrorBoundary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

test('子コンポーネントが存在すること', () => {
  // == 準備 ==
  /** Appコンポーネントをshallowレンダリング */
  const wrapper = shallow(<App />);

  // == 検証 ==
  /** 各コンポーネントの数を取得し、renderしている数と同じであればOK */
  expect(wrapper.find(ErrorBoundary).length).toBe(1);
  expect(wrapper.find(BrowserRouter).length).toBe(1);
  expect(wrapper.find(Switch).length).toBe(1);
  expect(wrapper.find(Route).length).toBe(10);
});

//XXX: Routeのテストはコンポーネントがあるだけでなく別で必要な気がする
//XXX: やるとしたら、NotFoundのテストをする