import React from 'react';
import PropTypes from 'prop-types';
import nullable from 'prop-types-nullable';
import classNames from 'classnames';
import EntriesPage from './EntriesPage';
import NavFilters from './NavFilters';
import NavSources from './NavSources';
import NavSearch from './NavSearch';
import NavTags from './NavTags';
import NavToolBar from './NavToolBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '../icons';
import { LoadingState } from '../requests/LoadingState';
import { useAllowedToWrite } from '../helpers/authorizations';
import { LocalizationContext } from '../helpers/i18n';

export default function Navigation({
    entriesPage,
    setNavExpanded,
    navSourcesExpanded,
    setNavSourcesExpanded,
    offlineState,
    allItemsCount,
    allItemsOfflineCount,
    unreadItemsCount,
    unreadItemsOfflineCount,
    starredItemsCount,
    starredItemsOfflineCount,
    sourcesState,
    setSourcesState,
    sources,
    setSources,
    tags,
    reloadAll,
}) {
    const _ = React.useContext(LocalizationContext);

    const canWrite = useAllowedToWrite();

    return (
        <React.Fragment>
            <div id="nav-logo"></div>
            {canWrite &&
                <button
                    accessKey="a"
                    id="nav-mark"
                    onClick={entriesPage !== null ? () => entriesPage.markVisibleRead(false) : null}
                    disabled={entriesPage === null}
                >
                    {_('markread')}
                </button>
            }

            <div className="separator"><hr /></div>

            {canWrite &&
                <button
                    accessKey="u"
                    id="nav-mark"
                    onClick={entriesPage !== null ? () => entriesPage.markVisibleRead(true) : null}
                    disabled={entriesPage === null}
                >
                    Mark as unseen
                </button>
            }

            <NavFilters
                setNavExpanded={setNavExpanded}
                offlineState={offlineState}
                allItemsCount={allItemsCount}
                allItemsOfflineCount={allItemsOfflineCount}
                unreadItemsCount={unreadItemsCount}
                unreadItemsOfflineCount={unreadItemsOfflineCount}
                starredItemsCount={starredItemsCount}
                starredItemsOfflineCount={starredItemsOfflineCount}
            />

            <div className="separator"><hr /></div>

            <div className={classNames({'nav-ts-wrapper': true, offline: offlineState, online: !offlineState})}>
                <NavTags tags={tags} setNavExpanded={setNavExpanded} />
                <NavSources
                    setNavExpanded={setNavExpanded}
                    navSourcesExpanded={navSourcesExpanded}
                    setNavSourcesExpanded={setNavSourcesExpanded}
                    sourcesState={sourcesState}
                    setSourcesState={setSourcesState}
                    sources={sources}
                    setSources={setSources}
                />
            </div>

            <div className={classNames({'nav-unavailable': true, offline: offlineState, online: !offlineState})}>
                <span className="fa-layers fa-2x">
                    <FontAwesomeIcon icon={icons.connection} />
                    <FontAwesomeIcon icon={icons.slash} />
                </span>
                <p>{_('offline_navigation_unavailable')}</p>
            </div>

            <div className="separator"><hr /></div>

            <NavSearch
                setNavExpanded={setNavExpanded}
                offlineState={offlineState}
            />

            <NavToolBar
                reloadAll={reloadAll}
                setNavExpanded={setNavExpanded}
            />
        </React.Fragment>
    );
}

Navigation.propTypes = {
    entriesPage: nullable(PropTypes.instanceOf(EntriesPage)).isRequired,
    setNavExpanded: PropTypes.func.isRequired,
    navSourcesExpanded: PropTypes.bool.isRequired,
    setNavSourcesExpanded: PropTypes.func.isRequired,
    offlineState: PropTypes.bool.isRequired,
    allItemsCount: PropTypes.number.isRequired,
    allItemsOfflineCount: PropTypes.number.isRequired,
    unreadItemsCount: PropTypes.number.isRequired,
    unreadItemsOfflineCount: PropTypes.number.isRequired,
    starredItemsCount: PropTypes.number.isRequired,
    starredItemsOfflineCount: PropTypes.number.isRequired,
    sourcesState: PropTypes.oneOf(Object.values(LoadingState)).isRequired,
    setSourcesState: PropTypes.func.isRequired,
    sources: PropTypes.arrayOf(PropTypes.object).isRequired,
    setSources: PropTypes.func.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired,
    reloadAll: PropTypes.func.isRequired
};
