import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/HooksForRedux/redux';
import { setPage } from '../store/DeviceSlice';

const Pages: FC = () => {
    const dispatch = useAppDispatch();
    const page = useAppSelector((state) => state.deviceReducer.page);
    const totalCount = useAppSelector((state) => state.deviceReducer.totalCount);
    const limit = useAppSelector((state) => state.deviceReducer.limit);
    const pageCount = Math.ceil(totalCount / limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className='mt-5'>
            {pages.map(pageNumber => 
                <Pagination.Item
                    key={pageNumber}
                    active={page === pageNumber}
                    onClick={() => dispatch(setPage(pageNumber))}
                >
                    {pageNumber}
                </Pagination.Item>
            )}
        </Pagination>
    );
};

export default Pages;