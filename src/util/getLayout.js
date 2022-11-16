import {MdSportsBasketball, MdPeople, MdOutlineShield, MdOutlineInsertEmoticon} from 'react-icons/md';

const Icon = ( { name } ) => {
    switch ( name ) {
        case 'esportes':
            return <MdSportsBasketball/>;
        case 'famosos':
            return <MdPeople/>;
        case 'politica':
            return <MdOutlineShield/>;
        case 'entretenimento':
            return <MdOutlineInsertEmoticon/>;
    }
}

const getLayout = ( name ) => {
    switch ( name ) {
        case 'esportes':
            return 'text-primary';
        case 'famosos':
            return 'text-success';
        case 'politica':
            return 'text-danger';
        case 'entretenimento':
            return 'text-warning';
    }
}

export {
    Icon,
    getLayout
}