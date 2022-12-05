import { FC } from 'react';
import { Stack, Stepper, Step, StepLabel } from '@mui/material';

import {
    ContactPhone as ContactPhoneIcon,
    ContactPage as ContactPageIcon,
    ContactEmergency as ContactEmergencyIcon,
    DatasetLinked as DatasetLinkedIcon,
} from '@mui/icons-material';

import { StepIconProps } from '@mui/material/StepIcon';
import { ColorlibConnector, ColorlibStepIconRoot } from "../../core-ui/Stepper";

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <ContactPhoneIcon />,
        2: <ContactPageIcon />,
        3: <ContactEmergencyIcon />,
        4: <DatasetLinkedIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['ثبت اطلاعات تماس', 'ثبت اطلاعات فردی', 'ثبت اطلاعات شغلی', 'ثبت لینکها (اختیاری)'];
interface IProps {
    stepActive: number,
}

const UserPanelStepper: FC<IProps> = ({ stepActive }) => {
    return (
        <Stack sx={{ width: '100%', }} spacing={4}>
            <Stepper alternativeLabel activeStep={stepActive} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default UserPanelStepper;