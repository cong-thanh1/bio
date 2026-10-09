import { useEffect, useState } from 'react';
import './App.css';
import PaymentCard from './components/PaymentCard';
import MySetup from './components/MySetup';

type Account = { bank: string; number: string; image: string };

const accounts: Account[] = [
  { bank: 'MB BANK', number: '82699918052303', image: '/qr-mb.jpg' },
  { bank: 'TECHCOMBANK', number: '5555558936', image: '/qr-techcombank.jpg' },
  { bank: 'MOMO', number: '0905103187', image: '/qr-momo.jpg' },
];

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!selectedAccount) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedAccount(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedAccount]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const copyAccount = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setToastMessage(`Đã sao chép: ${number}`);
    } catch {
      setToastMessage(`Số tài khoản: ${number}`);
    }
  };

  return <main className="page-shell">
    <div className="ambient ambient-one" aria-hidden="true" />
    <div className="ambient ambient-two" aria-hidden="true" />
    <div className="ambient-dots" aria-hidden="true">
      <i style={{ left: '12%', top: '24%', animationDelay: '1s' }} />
      <i style={{ left: '76%', top: '18%', animationDelay: '4.2s' }} />
      <i style={{ left: '88%', top: '64%', animationDelay: '7.1s' }} />
      <i style={{ left: '22%', top: '77%', animationDelay: '2.8s' }} />
      <i style={{ left: '54%', top: '47%', animationDelay: '5.6s' }} />
      <i style={{ left: '39%', top: '11%', animationDelay: '8.4s' }} />
    </div>
    <section className="profile-card" aria-labelledby="profile-name">
      <div className="cover-placeholder" role="img" aria-label="Khu vực ảnh bìa sẽ được cập nhật sau">
        <span className="cover-corner cover-corner-left" aria-hidden="true">＋<br />＋<br />＋</span>
        <span className="cover-label"><i /> ẢNH BÌA SẼ ĐƯỢC CẬP NHẬT <i /></span>
        <span className="cover-corner cover-corner-right" aria-hidden="true">＋<br />＋<br />＋</span>
      </div>
      <header className="profile-header">
        <div className="avatar-wrap"><img src="/avatar.jpg" alt="Ảnh đại diện của Dương Công Thành" className="avatar" /></div>
        <h1 id="profile-name">Dương Công Thành</h1>
        <nav className="profile-tags" aria-label="Thông tin cá nhân">
          <span className="profile-tag profile-tag-pending" title="Bài viết Check Legit trên Facebook sẽ được cập nhật sau">CHECK LEGIT</span>
          <a className="profile-tag" href="https://tracker.gg/valorant/profile/riot/Cigarette%23bunbo" target="_blank" rel="noopener noreferrer">VALORANT</a>
          <a className="profile-tag" href="#gear-setup">GAMING GEAR</a>
          <a className="profile-tag" href="https://maps.app.goo.gl/8WndafS8GewCLxcJA" target="_blank" rel="noopener noreferrer">TPHCM</a>
        </nav>
        <p className="profile-tag-note">Bài viết Check Legit trên Facebook sẽ được cập nhật sau.</p>
        <p className="handle">@bunboque</p>
        <p className="intro">Thu mua, buôn bán Gaming Gear, phụ kiện PC.<br />Kết nối với mình qua những kênh bên dưới nhé.</p>
        <nav className="social-links" aria-label="Liên kết cá nhân">
          <a className="social-icon" href="https://www.facebook.com/duong.congphuong.7/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
            <img src="/avt/blue-social-media-logo_197792-1759.avif" alt="" />
          </a>
          <a className="social-icon" href="https://zalo.me/0905103187" target="_blank" rel="noopener noreferrer" aria-label="Zalo" title="Zalo">
            <img src="/avt/Icon_of_Zalo.svg.jpg" alt="" />
          </a>
          <a className="social-icon phone-icon" href="tel:0905103187" aria-label="Gọi điện 0905103187" title="Gọi điện">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9 3l2 4.4-1.7 1.7a15 15 0 0 0 5.6 5.6l1.7-1.7 4.4 2-.5 2.4a2 2 0 0 1-2.2 1.6A17.5 17.5 0 0 1 5 5.7a2 2 0 0 1 1.6-2.2Z" /></svg>
          </a>
        </nav>
      </header>
      <section className="support-section" aria-labelledby="support-title">
        <div className="section-heading"><span className="section-icon" aria-hidden="true">✦</span><h2 id="support-title">Tài khoản cá nhân</h2><span className="heading-rule" /></div>
        <div className="payment-list">
          <PaymentCard logo="/avt/mbbank-logo-5-768x768.png" logoAlt="MB Bank" logoClass="mb-logo-mark" name="MB BANK" number="82699918052303" label="Sao chép số tài khoản MB Bank" onOpen={() => setSelectedAccount(accounts[0])} onCopy={copyAccount} />
          <PaymentCard logo="/avt/logo-techcombank-inkythuatso-10-15-11-46.jpg" logoAlt="Techcombank" name="TECHCOMBANK" number="5555558936" label="Sao chép số tài khoản Techcombank" onOpen={() => setSelectedAccount(accounts[1])} onCopy={copyAccount} />
          <PaymentCard logo="/avt/Logo-MoMo-Square.jpg" logoAlt="MoMo" name="MOMO" number="0905103187" label="Sao chép số MoMo" onOpen={() => setSelectedAccount(accounts[2])} onCopy={copyAccount} />
        </div>
        <p className="qr-note"><span className="qr-symbol" aria-hidden="true">▦</span> Nhấn vào tài khoản để xem mã QR</p>
      </section>
      <MySetup />
      <footer className="card-footer"><span>© 2026 DƯƠNG CÔNG THÀNH</span><span className="footer-heart"> <b>♥</b></span></footer>
    </section>
    <p className="page-caption">A LITTLE PLACE ON THE INTERNET <span>•</span> TPHCM</p>

    {selectedAccount && <section className="qr-screen" role="dialog" aria-modal="true" aria-label={`Mã QR ${selectedAccount.bank}`} onClick={() => setSelectedAccount(null)}>
      <div className="qr-popup" onClick={(event) => event.stopPropagation()}>
        <button className="qr-close" type="button" onClick={() => setSelectedAccount(null)} aria-label="Đóng mã QR">×</button>
        <img src={selectedAccount.image} alt={`Mã QR ${selectedAccount.bank}`} />
      </div>
    </section>}
    <div className={`toast${toastMessage ? ' show' : ''}`} role="status" aria-live="polite">{toastMessage}</div>
  </main>;
}









