import {MdSportsBasketball, MdPeople, MdOutlineShield, MdOutlineInsertEmoticon} from 'react-icons/md';

const Icon = ( { name } ) => {
    switch ( name ) {
        case 'Esportes':
            return <MdSportsBasketball/>;
        case 'Famosos':
            return <MdPeople/>;
        case 'Política':
            return <MdOutlineShield/>;
        case 'Entretenimento':
            return <MdOutlineInsertEmoticon/>;
    }
}

const getLayout = ( name ) => {
    switch ( name ) {
        case 'Esportes':
            return 'text-primary';
        case 'Famosos':
            return 'text-success';
        case 'Política':
            return 'text-danger';
        case 'Entretenimento':
            return 'text-warning';
    }
}