import MailSent from './MailSent.svg'

type Props = {
    icon: string,
    color: string,
    width: number,
    height: number
}

export const Icon = ({icon, color, width, height}: Props) => {
    return(
        <div style={{ width, height}}>
            {icon === 'mailsent' && <MailSent color={color} />}
        </div>
    )
}