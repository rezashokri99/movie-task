import styles from './header.module.scss';
import { FiSearch } from 'react-icons/fi';
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { search: searchQuery } = queryString.parse(location.search);

    const [search, setSearch] = useState(searchQuery ? searchQuery : "")


    const searchHandler = (e) => {
        e.preventDefault();
        navigate({
            search: `?search=${search}&page=1`,
        });
        setSearch(search)
        window.scrollTo(0, 0)
    }


    return (
        <div className={styles.header_container}>
            <div className={styles.header_content}>
                <div>
                    <form onSubmit={searchHandler} className={styles.search_container}>
                        <button type='submit' className={styles.search_icon_container}>
                            <FiSearch
                                className={styles.search_icon}
                            />
                        </button>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="search movie ..."
                        />
                        <CgClose
                            onClick={() => setSearch("")}
                            className={styles.close_icon}
                            style={{ display: "inline-block" }}
                        />
                    </form>
                </div>
                <div>
                    logo
                </div>
            </div>
        </div>
    );
}

export default Header;