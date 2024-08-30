import React from 'react'
import { Button, ButtonProps } from '@radix-ui/themes';

interface CustomButtonProps extends ButtonProps {
    text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, ...buttonProps }) => {
    const style: object = {
        fontFamily: 'IBM Plex Mono',
        fontWeight: 400
    }

    return (
        <Button {...buttonProps}>
            <div style={style}>{text}</div>
        </Button>
    )
};

export default CustomButton;