const toDDMMYYYY = (date) => {
    const splitted = date.split('T')[0].split('-');
    return (`${splitted[2]}.${splitted[1]}.${splitted[0]}`);
}

export default toDDMMYYYY;