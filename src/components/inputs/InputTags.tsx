import { KeyboardEvent, useRef, FC } from 'react';
import { Box, TextField } from '@mui/material';
import { InputTagsContainer, TagItem, TagItemClose } from "../../core-ui/InputTags";

interface IProps {
    required: boolean,
    name: string,
    id: string,
    label: string,
    error?: boolean,
    helperText?: string | string[] | false | undefined,
    valueTags: string[],
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

const InputTags: FC<IProps> = ({ required, name, id, label, error, helperText, valueTags, setFieldValue }) => {

    const inputTagsRef = useRef<HTMLInputElement>(null);

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== 'Enter') return
        event.preventDefault();
        const value = inputTagsRef.current?.value || "";
        if (!value.trim()) return
        setFieldValue(name, [...valueTags, value], true)
        if (inputTagsRef.current?.value) inputTagsRef.current.value = ''
    }

    function removeTag(index: number) {
        setFieldValue(name, valueTags.filter((el, i) => i !== index), true)
    }

    return (
        <InputTagsContainer>
            <TextField
                fullWidth
                required={required}
                name={name}
                id={id}
                label={label}
                type="text"
                onKeyDown={handleKeyDown}
                inputRef={inputTagsRef}
                variant="standard"
                error={error}
                helperText={helperText}
            />
            {valueTags.map((tag, index) => (
                <TagItem className='gradient-border' key={index}>
                    <Box>{tag}</Box>
                    <TagItemClose onClick={() => removeTag(index)}>&times;</TagItemClose>
                </TagItem>
            ))}
        </InputTagsContainer>
    )
};

export default InputTags;