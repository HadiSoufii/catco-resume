import { FC } from "react";
import { Box } from '@mui/material';
import { UserCard as Card, UserCardHeader, UserCardOverlay, UserCardName, UserCardThumb, UserCardTitle, UserDescription } from "../../core-ui/UserCard";

interface IProps {
    avatar: string,
    userName: string,
    fullName: string,
    aboutMe: string,
}

const UserCard: FC<IProps> = ({ avatar, userName, fullName, aboutMe }) => {
    return (
        <Box sx={{ width: { xs: "100%" }, height: "100%" }} className='gradient-border'>
            <Card addressImage={avatar}>
                <UserCardOverlay className='user-card__overlay'>
                    <UserCardHeader className='gradient-border user-card__header'>
                        <UserCardThumb src={avatar} alt={userName} />
                        <Box>
                            <UserCardTitle>
                                {userName}
                            </UserCardTitle>
                            <UserCardName>
                                {fullName}
                            </UserCardName>
                        </Box>
                    </UserCardHeader>
                    <UserDescription>
                        {aboutMe}
                    </UserDescription>
                </UserCardOverlay>
            </Card>
        </Box>
    );
};

export default UserCard;