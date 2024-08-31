import React from 'react'
import { Button, ButtonProps } from '@radix-ui/themes';

interface CustomButtonProps extends ButtonProps {
    text: string;
    textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, textStyle, ...buttonProps }) => {
    const style: object = {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 500,
        ...textStyle
    }

    return (
        <Button {...buttonProps}>
            <div style={style}>{text}</div>
        </Button>
    )
};

export default CustomButton;