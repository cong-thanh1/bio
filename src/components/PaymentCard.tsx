type PaymentCardProps = {
  logo: string;
  logoAlt: string;
  logoClass?: string;
  name: string;
  number: string;
  label: string;
  onOpen: () => void;
  onCopy: (number: string) => void;
};

export default function PaymentCard({ logo, logoAlt, logoClass, name, number, label, onOpen, onCopy }: PaymentCardProps) {
  return (
    <article className="payment-card" role="button" tabIndex={0} onClick={(event) => {
      if ((event.target as HTMLElement).closest('.copy-button')) return;
      onOpen();
    }} onKeyDown={(event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onOpen();
      }
    }} aria-label={`Xem mã QR ${name}`}>
      <span className={`bank-mark ${logoClass ?? ''}`} aria-hidden="true"><img src={logo} alt={logoAlt} /></span>
      <div className="payment-info"><span className="bank-name">{name}</span><code>{number}</code></div>
      <button className="copy-button" type="button" onClick={() => onCopy(number)} aria-label={label} title="Sao chép số tài khoản">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" /></svg>
      </button>
    </article>
  );
}


