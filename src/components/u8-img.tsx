import { ComponentPropsWithoutRef, memo } from "react";

interface Props {
    src: Uint8Array | number[],
    inner?: ComponentPropsWithoutRef<'img'>
}

const U8Img = memo(({inner, src}: Props) => {
    return (
        <img {...inner} src={URL.createObjectURL(
            new Blob([Uint8Array.from(src).buffer])
        )}/>
    )
})

export default U8Img