import styled from "styled-components";

interface InputProps {
    color?: string;
    width?: string;
    height?: string;
}

export const StyledInput = styled.input<InputProps>`
    font-size: 1.5rem;
    border: none;
    outline: 0;
    color: ${((props) => props.color || '#000')};
    width: ${((props) => props.width || "100%")};
    height: ${((props) => props.height || "30px")};
`;