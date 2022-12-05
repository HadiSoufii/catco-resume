import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';


export const UserCard = styled("div")<{ addressImage: string }>(({ addressImage }) => ({
    position: "relative",
    display: "block",
    height: "100%",
    borderRadius: "calc(40 * 1px)",
    textDecoration: "none",
    overflow: "hidden",
    background: `url(${addressImage})no-repeat center center / cover`,
    "&:hover .user-card__overlay, &:hover .user-card__header": {
        transform: "translateY(0)",
    },
}))

export const UserCardOverlay = styled("div")(() => ({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    borderRadius: "calc(40 * 1px)",
    backgroundColor: "#121212",
    transform: "translateY(100%)",
    transition: ".2s ease-in-out",
}));

export const UserCardHeader = styled("div")(() => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "2em",
    padding: "2em",
    cursor: "pointer",
    transform: "translateY(-100%)",
    transition: ".2s ease-in-out",
}))

export const UserCardThumb = styled(Avatar)(() => ({
    flexShrink: 0,
    width: "50px",
    height: "50px",
    borderRadius: "50%",
}))

export const UserCardTitle = styled("h3")(() => ({
    fontSize: "1em",
    margin: "0 0 .3em",
    color: "#6A515E",
}))

export const UserCardName = styled("span")(() => ({
    fontSize: ".8em",
    color: "#D7BDCA",
}))

export const UserDescription = styled("p")(() => ({
    padding: "0 2em 2em",
    margin: "10px",
    textAlign: "justify",
    display: "-webkit-flex",
    WebkitLineClamp: 8,
    overflow: "hidden",
}))