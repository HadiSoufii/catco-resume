import { FC } from "react";
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { TextField } from '@mui/material';
import { ILink } from "../../interfaces";

interface IProps {
    linksInformation: ILink,
}

const LinksInformation: FC<IProps> = ({ linksInformation }) => {
    return (
        <Grid container spacing={3}>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={linksInformation.stackOverflow ?
                        linksInformation.stackOverflow !== "" : "لینکی ثبت نشده است"}
                    label="استک اورفلو"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                    dir="ltr"
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={linksInformation.gitHub !== "" ? linksInformation.gitHub : "لینکی ثبت نشده است"}
                    label="گیت هاب"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                    dir="ltr"
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={linksInformation.gitLab !== "" ? linksInformation.gitLab : "لینکی ثبت نشده است"}
                    label="گیت لب"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                    dir="ltr"
                />
            </Grid>
            <Grid xs={12}>
                <TextField
                    fullWidth
                    type='text'
                    defaultValue={linksInformation.linkdein !== "" ? linksInformation.linkdein : "لینکی ثبت نشده است"}
                    label="لینکدین"
                    variant='standard'
                    inputProps={
                        { readOnly: true, }
                    }
                    dir="ltr"
                />
            </Grid>
        </Grid>
    );
};

export default LinksInformation;