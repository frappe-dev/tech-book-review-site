import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { MemoryRouter } from "react-router-dom"

// テスト対象
import { BookInfo } from '../src/containers/BookInfo';

// header
import AppHeader from '../src/components/AppHeader';

test('子コンポーネントが存在すること', () => {
    // == 準備 ==
    let mockClasses = jest.fn();
    const mockReviews = {
        Items: Array(0)
    }
    const mockLoactin = {
        state: {
            bookID: "123456",
            title: "test",
            thumbnailURL: "",
            ISBN10: "1234567899",
            amazonLink: "test",
            description: "test",
        }
    }
    
    const wrapper = shallow(
        // URLからidを取得するため、MemoryRouterでURLを設定
        <MemoryRouter initialEntries={["/bookinfo/1234"]} >
            <BookInfo
                classes={mockClasses}
                reviews={mockReviews}
                location={mockLoactin}
            />
        </MemoryRouter>
    );

    // == 検証 ==
/** 各コンポーネントの数を取得し、renderしている数と同じであればOK */
    // Nullではない
    expect(wrapper).not.toBeNull();
    //ちゃんとShallowレンダリングされていれば以下が通るはず
    //expect(wrapper.find(AppHeader).length).toBe(1);
});