export default function MaybeVisible({children, is}: {
    children: JSX.Element
    is: boolean
}) {
    return (
        is ?
        <div>{children}</div>
        :
        <div className="hidden">{children}</div>
    )
}