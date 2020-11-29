import React, { Component } from 'react';
import { getList, setTotalPages, setLoading, setCurrentPage } from './paginationActions'
import { withRouter } from "react-router-dom"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Box from '@material-ui/core/Box'
import {
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    KeyboardArrowRight as NextPageIcon,
    KeyboardArrowLeft as PrevPageIcon
} from '@material-ui/icons'


class PaginationComponent extends Component {

    _nextPage(e) {
        e.preventDefault();
        if (this.props.currentPage === (this.props.totalPages - 1)) {
            return false;
        }
        this.props.getList(this.props, (this.props.currentPage + 1));
    }

    _previousPage(e) {
        e.preventDefault();
        if (this.props.currentPage === 0) {
            return false;
        }
        this.props.getList(this.props, (this.props.currentPage - 1));
    }

    _firstPage(e) {
        e.preventDefault();
        if (this.props.currentPage === 0) {
            return false;
        }
        this.props.getList(this.props, 0);
    }

    _lastPage(e) {
        e.preventDefault();
        if (this.props.currentPage === (this.props.totalPages - 1)) {
            return false;
        }
        this.props.getList(this.props, (this.props.totalPages - 1));
    }

    _goToPage(page, e) {
        e.preventDefault();
        this.props.getList(this.props, page);
    }

    renderPreviousButtons() {

        var buttons = [];

        for (var i = 2; i >= 0; i--) {
            if (this.props.currentPage > i) {
                buttons = buttons.concat([
                    <Button key={'ant-' + (this.props.currentPage - i)}
                        onClick={this._goToPage.bind(this, (this.props.currentPage - (i + 1)))}
                    >
                        {(this.props.currentPage - i)}
                    </Button>
                ]);
            }
        }

        return buttons;
    }

    renderNextButtons() {

        var buttons = [];

        if (this.props.currentPage === (this.props.totalPages - 1)) {
            return buttons;
        }

        for (var i = (this.props.currentPage + 2); i <= (this.props.currentPage + 4); i++) {
            if (i < (this.props.totalPages - 2)) {
                buttons = buttons.concat([
                    <Button key={'prox-' + i}
                        onClick={this._goToPage.bind(this, (i - 1))}
                    >
                        {i}
                    </Button>
                ]);
            }
        }

        return buttons;
    }


    render() {
        if (!this.props.totalPages || this.props.totalPages <= 1) {
            return (
                ''
            )
        }
        return (
            <Box mt={2}>
                <ButtonGroup size="small" aria-label="Pagination">
                    <Button
                        disabled={(this.props.currentPage < 1)}
                        onClick={this._firstPage.bind(this)}
                    >
                        <FirstPageIcon />
                    </Button>
                    <Button
                        disabled={(this.props.currentPage === 0)}
                        onClick={this._previousPage.bind(this)}
                    >
                        <PrevPageIcon />
                    </Button>
                    {this.renderPreviousButtons()}
                    <Button
                        onClick={e => e.preventDefault()}
                    >
                        {(this.props.currentPage + 1)}
                    </Button>
                    {this.renderNextButtons()}
                    <Button
                        disabled={(this.props.currentPage === (this.props.totalPages - 1))}
                        onClick={this._nextPage.bind(this)}
                    >
                        <NextPageIcon />
                    </Button>
                    <Button
                        disabled={(this.props.currentPage === (this.props.totalPages - 1))}
                        onClick={this._lastPage.bind(this)}
                    >
                        <LastPageIcon />
                    </Button>
                </ButtonGroup>
            </Box>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.paginationReducer.loading,
    currentPage: state.paginationReducer.currentPage,
    totalPages: state.paginationReducer.totalPages
})

const mapDispatchToProps = dispatch => bindActionCreators({
    getList,
    setLoading,
    setTotalPages,
    setCurrentPage
}, dispatch)

const ShowTheLocationWithRouter = withRouter(PaginationComponent)
export default connect(mapStateToProps, mapDispatchToProps)(ShowTheLocationWithRouter)