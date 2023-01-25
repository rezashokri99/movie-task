import styles from './footer.module.scss';

const Footer = () => {
    return (
        <div className={styles.footer_container}>
            <p className={styles.footer_title}>
                Designed By Reza With &#10084;
            </p>
        </div>
    );
}

export default Footer;