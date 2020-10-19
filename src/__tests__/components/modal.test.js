import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import Modal from '@/components/modal/Modal';

afterEach(cleanup);

describe('modal component', () => {
    const Child = () => <div>Test Element</div>;
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal');
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    test('should render modal', () => {
        render(
            <Modal isOpen={true}>
                <Child />
            </Modal>
        );
        expect(screen.queryByText('Test Element')).not.toBeNull();
    });

    test('should properly close modal with button', () => {
        let isOpen = true;
        const handleClose = jest.fn(() => (isOpen = false));
        const component = () => (
            <Modal isOpen={isOpen} handleClose={handleClose}>
                <Child />
            </Modal>
        );

        const { queryByTestId, rerender } = render(component());
        const close = queryByTestId('button');
        fireEvent.click(close);
        expect(handleClose).toBeCalledTimes(1);

        rerender(component());
        expect(screen.queryByText('Test Element')).toBeNull();
    });
});
