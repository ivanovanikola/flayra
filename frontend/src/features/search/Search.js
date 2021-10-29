import React, { useEffect, useRef, useState, useMemo } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
    createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import styles from './Search.module.css';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { LastPublish } from '../../components/TimeAgo'
import { ArrowReturnLeft } from './ArrowReturnLeft';
import { SearchIcon } from '../search/SearchIcon'
import { ClearIcon } from '../search/ClearIcon'
import { SearchAutocomplete } from './SearchAutocomplete';
import { Suggestion } from './Suggesten';
import { HeartOutlined, MessageOutlined, UploadOutlined, TwitterOutlined, LinkOutlined, LoadingOutlined, SearchOutlined, HomeOutlined, UserOutlined, MenuOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Divider, Space, Image, Tooltip, Typography, Affix, Alert, Popover, Button} from 'antd';


export const Search = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button 
            className="custom-navbar-btn custom-navbar-btn-search" 
            icon={<SearchOutlined />} 
            onClick={handleShow}
            size="large"
            />

            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Поиск</Modal.Title>
                </Modal.Header>
                {/* */}
                <Modal.Body>
                    <SearchAutocomplete placeholder="Search" openOnFocus={true} debug={true} />
                </Modal.Body>
                <Modal.Footer>
                    {/* */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

