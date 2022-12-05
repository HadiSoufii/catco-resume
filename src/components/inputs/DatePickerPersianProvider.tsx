import { ReactNode, FC } from "react";
import jMoment from "moment-jalaali";
import AdapterJalaali from "@date-io/jalaali";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


jMoment.loadPersian({ dialect: "persian-modern" });

interface IProps {
    children: ReactNode
}

const DatePickerPersianProvider: FC<IProps> = ({ children }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterJalaali}>
            {
                children
            }
        </LocalizationProvider>
    );
};

export default DatePickerPersianProvider;