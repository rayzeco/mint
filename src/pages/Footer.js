import * as React from 'react';
import './styles/footer.scss';
import { UserContext } from '../App';

const Footer = () => {
    const value = React.useContext(UserContext);

    return (
        <div className='footer-container' style={{backgroundColor:value.collection.foreground}}>

        </div>
    )
};

export default Footer;