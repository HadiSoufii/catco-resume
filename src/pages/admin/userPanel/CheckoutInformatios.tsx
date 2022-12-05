import { useState, FC, Dispatch, SetStateAction, useContext } from 'react';
import { Box } from '@mui/material';

import { AlertDialogSlide } from '../../../components/windows';
import { UserPanelStepper } from '../../../components/user';

import { ContactInformation, PersonalInformation, JobInformation, LinksInformation } from './../userPanel';
import { AdminContext } from "./../../../services/contexts"

interface IProps {
    step: number,
    setStep: Dispatch<SetStateAction<number>>,
}

function getStepContent(step: number, setStep: Dispatch<SetStateAction<number>>) {
    switch (step) {
        case 0:
            return <ContactInformation setStep={setStep} />;
        case 1:
            return <PersonalInformation setStep={setStep} />;
        case 2:
            return <JobInformation setStep={setStep} />;
        case 3:
            return <LinksInformation setStep={setStep} />;
        default:
            return
    }
}

const descriptionDialog = "برای دسترسی به بخش رزومه و پنل کاربری خود باید اطلاعات خود را اول ثبت کنید تا لینک دسترسی به آنها برای شما نمایش داده شود ❤";

const CheckoutInformatios: FC<IProps> = ({ step, setStep }) => {
    const { userLocalStorage } = useContext(AdminContext);
    const fullName = userLocalStorage?.fullName || "کاربر ";
    const [name] = fullName.split(" ");
    const [openDialog, setOpenDialog] = useState<boolean>(true);

    return (
        <>
            <UserPanelStepper stepActive={step} />
            {
                step === 0 && <AlertDialogSlide open={openDialog} setOpen={setOpenDialog} title={`سلام ${name} عزیز`}
                    description={descriptionDialog} />
            }
            <Box sx={{ mt: 10 }}>
                {
                    getStepContent(step, setStep)
                }
            </Box>
        </>
    );
};

export default CheckoutInformatios;