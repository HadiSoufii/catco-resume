import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const InputTagsContainer = styled(Box)(
    ({ theme }) => ({
        // border: "2px solid #000",
        borderRadius: "3px",
        width: "100%",
        marginBottom: "2em",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "0.5em",
    }),
);

const TagItem = styled(Box)(() => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "0.5em 0.75em",
    borderRadius: "20px",
    margin: "10px",
}))

const TagItemClose = styled(Box)(() => ({
    height: "20px",
    width: "20px",
    backgroundColor: "rgb(48, 48, 48)",
    color: "#fff",
    borderRadius: "50%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "0.5em",
    fontSize: "21px",
    cursor: "pointer",
}))

export { InputTagsContainer, TagItem, TagItemClose }