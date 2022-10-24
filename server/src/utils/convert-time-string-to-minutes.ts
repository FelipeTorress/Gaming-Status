export function convertTimeStringToMinutes(hourString: String){
    const [hours, minutes] = hourString.split(':').map(Number)

    return hours * 60 + minutes;
}