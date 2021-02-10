import React from 'react';
import HeaderScreen from './HeaderScreen';

function ContactScreen(){
    return(
        <div className="grid-container">
            <HeaderScreen />
            <div>
                <ul className="contact">
                    <li>
                        Indirizzo : Via Venezia 30 Parma PR
                    </li>
                    <li>
                        Telefono: 0521/111111
                    </li>
                    <li>
                        Email : pizzaalvolo@gmail.com
                    </li>
                    <li>
                        Orario apertura : tutti giorni  18:00 - 22:00
                    </li>
                </ul>
            </div>
        </div>
    );
}
export default ContactScreen;